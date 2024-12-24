import { addTask } from "@/utils/taskHandlers"
import axios from "axios"

jest.mock("axios")

afterEach(() => {
  jest.clearAllMocks()
  jest.clearAllTimers()
})

test("addTask adds a new task and updates state", async () => {
  jest.useFakeTimers()

  const mockTasks = [{ id: 1, title: "Existing Task", completed: false }]
  const newTask = { title: "New Task", completed: false }
  const returnedTask = { id: 2, ...newTask }

  axios.post.mockResolvedValueOnce({ data: returnedTask })

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await addTask(mockTasks, setTasks, setAlert, newTask)

  expect(axios.post).toHaveBeenCalledWith(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`,
    newTask
  )
  expect(setTasks).toHaveBeenCalledWith([...mockTasks, returnedTask])
  expect(setAlert).toHaveBeenCalledWith({
    message: "Task added successfully",
    type: "success"
  })

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})

test("addTask sets alert on API error", async () => {
  jest.useFakeTimers()

  axios.post.mockRejectedValueOnce(new Error("Network error"))

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await addTask([], setTasks, setAlert, { title: "New Task" })

  expect(axios.post).toHaveBeenCalled()
  expect(setTasks).not.toHaveBeenCalled()
  expect(setAlert).toHaveBeenCalledWith({
    message: "Failed to add task",
    type: "danger"
  })

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})
