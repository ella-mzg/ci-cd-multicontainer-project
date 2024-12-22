import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import Alert from "@/components/ui/Alert"
import {
  addTask,
  deleteTask,
  fetchTasks,
  toggleTask
} from "@/utils/taskHandlers"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    fetchTasks(setTasks, setAlert)
  }, [])

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
          onToggle={(taskId) => toggleTask(tasks, setTasks, setAlert, taskId)}
        />
      </div>
    </div>
  )
}

export default HomePage
