import Button from "@/components/ui/Button"
import Form from "@/components/ui/Form"
import FormField from "@/components/ui/FormField"
import { Field, Formik } from "formik"

const initialValues = { title: "" }

const TaskForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
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
}

export default TaskForm
