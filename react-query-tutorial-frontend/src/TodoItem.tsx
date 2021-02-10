import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo } from "./ApiService";

export interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();

  const mutateDeleteTodo = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const mutateCheckTodo = useMutation(updateTodo, {
    onMutate: (newTodo) => {
      queryClient.cancelQueries(["todos", newTodo.id]);
      const previousTodo = queryClient.getQueryData(["todos", newTodo.id]);
      queryClient.setQueryData(["todos", newTodo.id], newTodo);
      return { previousTodo, newTodo };
    },
    onSettled: (newTodo) => {
      queryClient.invalidateQueries(["todos", newTodo]);
    },
  });

  const remove = () => {
    mutateDeleteTodo.mutate(todo.id);
  };

  const onCheck = () => {
    todo.done = !todo.done;
    console.log(todo);
    mutateCheckTodo.mutate(todo);
  };

  return (
    <>
      <li>
        <span>{todo.task}</span>
        <input type="checkbox" onChange={onCheck} checked={todo.done} />
        <button onClick={remove}>Delete</button>
      </li>
    </>
  );
};

export default TodoItem;
