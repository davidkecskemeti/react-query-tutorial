import { Field, Form } from "react-final-form";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "./ApiService";

export interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createTodo, {
    onSuccess: () => queryClient.refetchQueries("todos"),
  });

  const onSubmit = (todo: Todo) => {
    mutate(todo);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="task" component="input" />
            <button type="submit">Add todo</button>
          </form>
        )}
      />
      <hr />
    </>
  );
};

export default AddTodo;
