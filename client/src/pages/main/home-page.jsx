import { Loader2, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import EditTaskModal from "@/components/home/EditTaskModal";
import AddTaskBar from "@/components/home/AddTaskBar";
import TaskCard from "@/components/home/TaskCard";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ title: "" });
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [starting, setStarting] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedTasks = res.data.tasks.sort((a, b) => {
        if (a.started && !b.started) return -1;
        if (!a.started && b.started) return 1;
        return 0;
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) throw new Error("No ID provided");
      const res = await api.get(`/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/auth/sign-in");
  };

  const handleAddTask = async (title) => {
    setAdding(true);
    try {
      const res = await api.post(
        "/tasks/add-task",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        fetchTasks();
        setNewTaskTitle("");
        toast.success("Task added");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setEditing(true);
    try {
      const res = await api.put(`/tasks/edit/${taskId}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        const updatedTask = res.data;
        setTasks((prev) =>
          prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
        toast.success("Task updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setEditing(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setDeleting(true);
    try {
      await api.delete(`/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const handleStartTask = async (taskId) => {
    setStarting(true);
    try {
      const res = await api.post(`/tasks/start/${taskId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        fetchTasks();
        toast.success("Task started");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to start task");
    } finally {
      setStarting(false);
    }
  };

  const handleFinishTask = async (taskId) => {
    setFinishing(true);
    try {
      const res = await api.post(`/tasks/finish/${taskId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        fetchTasks();
        toast.success("Task finished");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to finish task");
    } finally {
      setFinishing(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "In Progress") return task.started;
    if (filter === "Completed") return task.isDone;
    if (filter === "Not Started") return !task.started && !task.isDone;
    return true;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );

  if (!user) return <div>No user found.</div>;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 w-full bg-background z-50 shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            Hello, {user.name}
          </h1>
        </div>

        {/* Task Filter Bar */}
        <div className="flex gap-2 mt-2 sm:mt-0">
          {["All", "In Progress", "Completed", "Not Started"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              size="sm"
            >
              {f}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Button>
      </div>

      {/* Task Cards */}
      {filteredTasks.length === 0 ? (
        <p className="flex items-center justify-center mt-6">No tasks</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4 mt-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setEditingTask={(task) => {
                setEditingTask(task);
                setEditForm({ title: task.title });
                setShowEditModal(true);
              }}
              handleDeleteTask={handleDeleteTask}
              deleting={deleting}
              handleStartTask={handleStartTask}
              handleFinishTask={handleFinishTask}
              starting={starting}
              finishing={finishing}
            />
          ))}
        </div>
      )}

      {/* Add Task */}
      <AddTaskBar
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
        adding={adding}
      />

      {/* Edit Modal */}
      {showEditModal && editingTask && (
        <EditTaskModal
          task={editingTask}
          editForm={editForm}
          setEditForm={setEditForm}
          setShowEditModal={setShowEditModal}
          handleUpdateTask={handleUpdateTask}
          editing={editing}
        />
      )}
    </div>
  );
};

export default HomePage;
