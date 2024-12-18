import Button from "@/components/ui/Button"
import Form from "@/components/ui/Form"
import FormField from "@/components/ui/FormField"
import { Field, Formik } from "formik"
import { object, string } from "yup"

const initialValues = { title: "" }
const validationSchema = object({
  title: string()
    .trim()
    .min(1, "Task title must contain at least 1 character")
    .max(60, "Task title must be 60 characters or less")
    .required("Task title is required")
})
const TaskForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      onSubmit(values)
      resetForm()
    }}>
    {() => (
      <Form>
        <FormField
          name="title"
          label="Task Title"
          placeholder="Enter task title"
          as={Field}
        />
        <Button type="submit" variant="primary">
          Add Task
        </Button>
      </Form>
    )}
  </Formik>
)

export default TaskForm
