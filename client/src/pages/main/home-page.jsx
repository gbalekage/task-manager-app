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
  const [timeSpent, setTimeSpent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      setLoading(false);
      navigate("/auth/sign-in");
      toast.error("No ID provided, please login");
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/auth/user/${id}`);
        setUser(res.data.user);

        const tasksTemplate = [
          {
            id: 1,
            title: "Complete Project Proposal",
            status: "In Progress",
            timeSpent: 0,
          },
          { id: 2, title: "Team Meeting", status: "Pending", timeSpent: 0 },
          { id: 3, title: "Code Review", status: "Completed", timeSpent: 2 },
        ];
        setTasks(tasksTemplate);
      } catch (err) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    navigate("/auth/sign-in");
  };

  const handleAddTask = (title) => {
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    const task = { id: Date.now(), title, status: "Pending", timeSpent: 0 };
    setTasks([task, ...tasks]);
    setNewTaskTitle("");
    toast.success("Task added");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    toast.success("Task updated");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task deleted");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );

  if (!user) return <div>No user found.</div>;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 w-full bg-background z-50 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Hello, {user.name}
        </h1>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Button>
      </div>

      {/* Task cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setEditingTask={setEditingTask}
            setShowEditModal={setShowEditModal}
            handleDeleteTask={handleDeleteTask}
            handleMarkDone={(task) => {
              if (!timeSpent)
                return toast.error("Please enter time spent (hours)");
              const updated = {
                ...task,
                status: "Completed",
                timeSpent: parseFloat(timeSpent),
              };
              handleUpdateTask(updated);
              setTimeSpent("");
            }}
          />
        ))}
      </div>

      {/* Add Task Bar */}
      <AddTaskBar
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />

      {/* Edit Modal */}
      {showEditModal && (
        <EditTaskModal
          task={editingTask}
          editForm={editForm}
          setEditForm={setEditForm}
          setShowEditModal={setShowEditModal}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default HomePage;
