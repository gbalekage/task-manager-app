import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AddTaskBar = ({
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask,
  adding,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform bg-white -translate-x-1/2 flex gap-2 w-full max-w-md px-4 z-40 rounded-lg p-2">
      <Input
        placeholder="New Task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button onClick={() => handleAddTask(newTaskTitle)} disabled={adding}>
        {adding ? <Loader2 className="animate-spin size-4" /> : "Add"}
      </Button>
    </div>
  );
};

export default AddTaskBar;
