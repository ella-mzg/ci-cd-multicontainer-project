import { deleteTask } from "@/utils/taskHandlers"
import axios from "axios"

jest.mock("axios")

afterEach(() => {
  jest.clearAllMocks()
  jest.clearAllTimers()
})

test("deleteTask removes a task and updates state", async () => {
  jest.useFakeTimers()

  const mockTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
  ]
  const taskId = 1

  axios.delete.mockResolvedValueOnce()

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await deleteTask(mockTasks, setTasks, setAlert, taskId)

  expect(axios.delete).toHaveBeenCalledWith(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`
  )
  expect(setTasks).toHaveBeenCalledWith([
    { id: 2, title: "Task 2", completed: true }
  ])
  expect(setAlert).toHaveBeenCalledWith({
    message: "Task deleted successfully",
    type: "success"
  })

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})

test("deleteTask sets alert on API error", async () => {
  jest.useFakeTimers()

  axios.delete.mockRejectedValueOnce(new Error("Network error"))

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await deleteTask([], setTasks, setAlert, 1)

  expect(axios.delete).toHaveBeenCalled()
  expect(setTasks).not.toHaveBeenCalled()
  expect(setAlert).toHaveBeenCalledWith({
    message: "Failed to delete task",
    type: "danger"
  })

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})
