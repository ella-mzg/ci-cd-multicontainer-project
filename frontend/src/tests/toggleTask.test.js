import { toggleTask } from "@/utils/taskHandlers"
import axios from "axios"

jest.mock("axios")

afterEach(() => {
  jest.clearAllMocks()
  jest.clearAllTimers()
})

test("toggleTask toggles task completion and updates state", async () => {
  jest.useFakeTimers()

  const mockTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
  ]
  const taskId = 1
  const updatedTask = { id: 1, title: "Task 1", completed: true }

  axios.put.mockResolvedValueOnce({ data: updatedTask })

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await toggleTask(mockTasks, setTasks, setAlert, taskId)

  expect(axios.put).toHaveBeenCalledWith(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${taskId}`,
    { id: 1, title: "Task 1", completed: true }
  )
  expect(setTasks).toHaveBeenCalledWith([
    updatedTask,
    { id: 2, title: "Task 2", completed: true }
  ])
  expect(setAlert).not.toHaveBeenCalled()

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})

test("toggleTask sets alert on API error", async () => {
  jest.useFakeTimers()

  axios.put.mockRejectedValueOnce(new Error("Network error"))

  const mockTasks = [{ id: 1, title: "Task 1", completed: false }]
  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await toggleTask(mockTasks, setTasks, setAlert, 1)

  expect(axios.put).toHaveBeenCalled()
  expect(setTasks).not.toHaveBeenCalled()
  expect(setAlert).toHaveBeenCalledWith({
    message: "Failed to toggle task",
    type: "danger"
  })

  jest.runAllTimers()
  expect(setAlert).toHaveBeenCalledWith(null)
})
