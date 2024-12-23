import axios from "axios"

const apiKey = "123456"
axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`, {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: false
  })
})
export const fetchTasks = async (setTasks, setAlert) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`
    )
    setTasks(data)
  } catch {
    setAlert({ message: "Failed to fetch tasks", type: "danger" })
  } finally {
    setTimeout(() => setAlert(null), 3000)
  }
}
export const addTask = async (tasks, setTasks, setAlert, newTask) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`,
      newTask
    )
    setTasks([...tasks, data])
    setAlert({ message: "Task added successfully", type: "success" })
  } catch {
    setAlert({ message: "Failed to add task", type: "danger" })
  } finally {
    setTimeout(() => setAlert(null), 3000)
  }
}
export const deleteTask = async (tasks, setTasks, setAlert, taskId) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`
    )
    setTasks(tasks.filter((task) => task.id !== taskId))
    setAlert({ message: "Task deleted successfully", type: "success" })
  } catch {
    setAlert({ message: "Failed to delete task", type: "danger" })
  } finally {
    setTimeout(() => setAlert(null), 3000)
  }
}
export const toggleTask = async (tasks, setTasks, setAlert, taskId) => {
  try {
    const taskToToggle = tasks.find((task) => task.id === taskId)
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed }
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`,
      updatedTask
    )
    setTasks(tasks.map((task) => (task.id === taskId ? data : task)))
  } catch {
    setAlert({ message: "Failed to toggle task", type: "danger" })
  } finally {
    setTimeout(() => setAlert(null), 3000)
  }
}
