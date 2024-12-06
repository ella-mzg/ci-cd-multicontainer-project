export const addTask = (tasks, setTasks, setAlert, newTask) => {
  const id = tasks.length + 1
  setTasks([...tasks, { ...newTask, id, completed: false }])
  setAlert({ message: "Task added successfully", type: "success" })
  setTimeout(() => setAlert(null), 3000)
}

export const deleteTask = (tasks, setTasks, setAlert, taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId))
  setAlert({ message: "Task deleted successfully", type: "success" })
  setTimeout(() => setAlert(null), 3000)
}

export const toggleTask = (tasks, setTasks, taskId) => {
  setTasks(
    tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  )
}
