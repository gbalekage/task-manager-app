import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTaskBar = ({ newTaskTitle, setNewTaskTitle, handleAddTask }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform bg-white -translate-x-1/2 flex gap-2 w-full max-w-md px-4 z-40 rounded-lg p-2">
      <Input
        placeholder="New Task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button onClick={() => handleAddTask(newTaskTitle)}>Add</Button>
    </div>
  );
};

export default AddTaskBar;
