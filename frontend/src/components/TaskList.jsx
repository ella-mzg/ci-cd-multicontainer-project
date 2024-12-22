import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onDelete, onToggle }) => (
  <div className="space-y-4">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ))}
  </div>
)

export default TaskList
