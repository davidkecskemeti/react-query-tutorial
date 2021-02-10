export const fetchTodos = () => {
  const url = `${process.env.REACT_APP_API_SERVER}/todos`;
  console.log(url + " called");

  return fetch(url).then((res) => res.json());
};

export const createTodo = (todo: Todo) => {
  const url = `${process.env.REACT_APP_API_SERVER}/todos`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = (id: string) => {
  const url = `${process.env.REACT_APP_API_SERVER}/todos/${id}`;
  return fetch(url, {
    method: "DELETE",
  });
};

export const updateTodo = (todo: Todo): Promise<Response> => {
  const url = `${process.env.REACT_APP_API_SERVER}/todos/${todo.id}`;
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};
