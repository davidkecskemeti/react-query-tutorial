import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import { fetchTodos } from "./ApiService";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const App = () => {
  const { data, isLoading, isError, error } = useQuery<Todo[]>(
    "todos",
    fetchTodos
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error as any}</p>;
  }

  return (
    <>
      <AddTodo />
      <ul>
        {data?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
};

export default App;
