import { Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskCard = ({
  task,
  setEditingTask,
  setShowEditModal,
  handleDeleteTask,
  handleMarkDone,
}) => {
  const openEditModal = () => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  return (
    <div className="card bg-card shadow rounded p-4 hover:shadow-lg transition relative">
      <h2 className="font-semibold text-lg text-foreground">{task.title}</h2>
      <span
        className={`mt-2 inline-block px-2 py-1 text-sm rounded ${
          task.status === "Completed"
            ? "bg-green-100 text-success"
            : task.status === "In Progress"
            ? "bg-yellow-100 text-warning"
            : "bg-muted/10 text-muted-foreground"
        }`}
      >
        {task.status}
      </span>
      {task.status === "Completed" && (
        <p className="text-sm text-muted-foreground mt-1">
          Time Spent: {task.timeSpent}h
        </p>
      )}

      <div className="flex gap-2 mt-3">
        {task.status !== "Completed" && (
          <Button
            onClick={() => handleMarkDone(task)}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Check className="w-4 h-4" /> Done
          </Button>
        )}
        <Button onClick={openEditModal} className="flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Button>
        <Button
          onClick={() => handleDeleteTask(task.id)}
          variant="destructive"
          className="flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
