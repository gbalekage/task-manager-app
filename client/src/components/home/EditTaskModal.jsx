import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";

const EditTaskModal = ({
  task,
  editForm,
  setEditForm,
  setShowEditModal,
  handleUpdateTask,
  editing,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded shadow-lg w-full max-w-md relative">
        <Button
          className="absolute top-3 right-3"
          onClick={() => setShowEditModal(false)}
          variant="outline"
        >
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold mb-4 text-foreground">Edit Task</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-foreground">
            Title
          </label>
          <Input
            placeholder="Title"
            value={editForm.title}
            disabled={editing}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setShowEditModal(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateTask(task._id, editForm);
              setShowEditModal(false);
            }}
            disabled={editing}
          >
            {editing ? <Loader2 className="animate-spin size-4" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
