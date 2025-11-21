import { Edit, Trash2, Play, Pause, Loader } from "lucide-react";
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

  const isInProgress = task.started;
  const isCompleted = task.isDone;

  return (
    <Card className="hover:shadow-lg transition relative w-full sm:w-auto">
      <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
        <h2 className="font-semibold text-lg sm:text-xl text-foreground break-words">
          {task.title}
        </h2>

        {task.timeSpent > 0 && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Time Spent: {formatTime(task.timeSpent)}
          </p>
        )}

        {task.started && (
          <p className="text-xs sm:text-sm text-blue-500 flex items-center gap-2 mt-1">
            <Loader className="animate-spin w-4 h-4" /> In Progress...
          </p>
        )}
        {task.isDone && (
          <p className="text-xs sm:text-sm text-green-500 mt-1">Completed</p>
        )}
      </CardHeader>

      <CardFooter className="flex flex-wrap gap-2 mt-2 px-4 py-3 sm:px-6 sm:py-4">
        {!task.isDone && !task.started && (
          <Button
            onClick={() => handleStartTask(task._id)}
            variant="outline"
            className="flex items-center gap-1 flex-1 sm:flex-auto"
            disabled={
              isInProgress || isCompleted || starting || finishing || deleting
            }
          >
            <Play className="w-4 h-4" />
            {starting ? <Loader2 className="animate-spin w-4 h-4" /> : "Start"}
          </Button>
        )}

        {task.started && (
          <Button
            onClick={() => handleFinishTask(task._id)}
            variant="outline"
            className="flex items-center gap-1 flex-1 sm:flex-auto"
            disabled={finishing || deleting}
          >
            <Pause className="w-4 h-4" />
            {finishing ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Finish"
            )}
          </Button>
        )}

        <Button
          onClick={openEditModal}
          className="flex items-center gap-1 flex-1 sm:flex-auto"
          disabled={isInProgress || isCompleted || deleting}
        >
          <Edit className="w-4 h-4" /> Edit
        </Button>

        <Button
          onClick={() => handleDeleteTask(task._id)}
          variant="destructive"
          className="flex items-center gap-1 flex-1 sm:flex-auto"
          disabled={isInProgress || isCompleted || deleting}
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
