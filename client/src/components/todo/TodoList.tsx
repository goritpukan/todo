"use client"
import Stack from "@mui/material/Stack";
import Todo from "@/components/todo/Todo";
import {todoListStackStyle, buttonStyle} from "@/components/todo/styles";
import {TodoInterface} from "@/types/Todo";
import {useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {getData, postData} from "@/utils/fetchData";

export default function TodoList({todos}: any) {
  const [todosState, setTodosState] = useState(todos);
  const addTodo = async () => {
    const {res, data} = await postData(`/api/todo`, {name: "todo"})
    if (res.ok) {
      const todo = await getData(`/api/todo/${data.id}`);
      if(todo) {
        setTodosState([...todosState, todo]);
      }
    }
  }
  return (
    <>
      <Stack sx={todoListStackStyle}>
        {todosState && todosState.length
          ? todosState.map((todo: TodoInterface) => <Todo key={todo.id} name={todo.name} id={todo.id} tasks={todo.tasks}/>)
          : null}
      </Stack>
      <Button onClick={addTodo} sx={buttonStyle}><AddIcon/></Button>
    </>
  )
}