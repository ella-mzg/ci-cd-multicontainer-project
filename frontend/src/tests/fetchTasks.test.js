import { fetchTasks } from "@/utils/taskHandlers"
import axios from "axios"

jest.mock("axios")

test("fetchTasks updates tasks state with API data", async () => {
  jest.useFakeTimers()

  const mockTasks = [{ id: 1, title: "Test Task", completed: false }]
  axios.get.mockResolvedValueOnce({ data: mockTasks })

  const setTasks = jest.fn()
  const setAlert = jest.fn()

  await fetchTasks(setTasks, setAlert)

  expect(axios.get).toHaveBeenCalledWith(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`
  )
  expect(setTasks).toHaveBeenCalledWith(mockTasks)
  expect(setAlert).not.toHaveBeenCalled()

  jest.runAllTimers()
})
