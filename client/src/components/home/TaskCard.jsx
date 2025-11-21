import { Edit, Trash2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const TaskCard = ({
  task,
  setEditingTask,
  setShowEditModal,
  handleDeleteTask,
  handleStartTask,
  handleFinishTask,
  deleting,
  starting,
  finishing,
}) => {
  const openEditModal = () => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  // Helper function to format time in seconds
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "0 seconds";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = [];
    if (hrs) result.push(`${hrs} ${hrs === 1 ? "hour" : "hours"}`);
    if (mins) result.push(`${mins} ${mins === 1 ? "minute" : "minutes"}`);
    if (secs) result.push(`${secs} ${secs === 1 ? "second" : "seconds"}`);

    return result.join(" ");
  };

  return (
    <Card className="hover:shadow-lg transition relative">
      <CardHeader>
        <h2 className="font-semibold text-lg text-foreground">{task.title}</h2>

        {task.timeSpent > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Time Spent: {formatTime(task.timeSpent)}
          </p>
        )}

        {task.started && (
          <p className="text-sm text-blue-500 mt-1">In Progress...</p>
        )}
        {task.isDone && (
          <p className="text-sm text-green-500 mt-1">Completed</p>
        )}
      </CardHeader>

      <CardFooter className="flex gap-2 mt-2">
        {/* Start / Finish Task */}
        {!task.isDone && !task.started && (
          <Button
            onClick={() => handleStartTask(task._id)}
            variant="outline"
            className="flex items-center gap-1"
            disabled={finishing || starting || deleting}
          >
            <Play className="w-4 h-4" />
            {starting ? <Loader2 className="animate-spin w-4 h-4" /> : "Start"}
          </Button>
        )}

        {task.started && (
          <Button
            onClick={() => handleFinishTask(task._id)}
            variant="outline"
            className="flex items-center gap-1"
            disabled={finishing || starting || deleting}
          >
            <Pause className="w-4 h-4" />
            {finishing ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Finish"
            )}
          </Button>
        )}

        {/* Edit Task */}
        <Button onClick={openEditModal} className="flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Button>

        {/* Delete Task */}
        <Button
          onClick={() => handleDeleteTask(task._id)}
          variant="destructive"
          className="flex items-center gap-1"
          disabled={deleting}
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
