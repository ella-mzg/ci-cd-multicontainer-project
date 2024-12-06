import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import Alert from "@/components/ui/Alert"
import { addTask, deleteTask, toggleTask } from "@/utils/taskHandlers"
import { useState } from "react"

const mockTasks = [
  { id: 1, title: "Write documentation", completed: false },
  { id: 2, title: "Set up issue board", completed: true }
]

const HomePage = () => {
  const [tasks, setTasks] = useState(mockTasks)
  const [alert, setAlert] = useState(null)

  return (
    <div className="container mx-auto p-6">
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
      <div className="mb-6">
        <TaskForm
          onSubmit={(newTask) => addTask(tasks, setTasks, setAlert, newTask)}
        />
      </div>
      <div>
        <TaskList
          tasks={tasks}
          onDelete={(taskId) => deleteTask(tasks, setTasks, setAlert, taskId)}
          onToggle={(taskId) => toggleTask(tasks, setTasks, taskId)}
        />
      </div>
    </div>
  )
}

export default HomePage
