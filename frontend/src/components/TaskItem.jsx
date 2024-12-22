import Button from "@/components/ui/Button"

const TaskItem = ({ task, onDelete, onToggle }) => (
  <div className="flex items-center justify-between p-4 border rounded">
    <div>
      <h3
        className={`font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
        {task.title}
      </h3>
    </div>
    <div className="flex items-center gap-2">
      <Button
        className="min-w-[150px]"
        variant={task.completed ? "secondary" : "primary"}
        size="sm"
        onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </Button>
      <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
        Delete
      </Button>
    </div>
  </div>
)

export default TaskItem
