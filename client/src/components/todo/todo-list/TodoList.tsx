import {cookies} from "next/headers";
import {getData} from "@/utils/fetchData";
import Stack from "@mui/material/Stack";
import Todo from "@/components/todo/Todo";
import {todoListStackStyle} from "@/components/todo/styles";
import {getAccessToken} from "@/utils/getAccessToken";

export default async function TodoList(){
  const jwtCookie = await getAccessToken();
  const todos = await getData("/api/todo", jwtCookie);
  return(
    <Stack sx={todoListStackStyle}>
      {todos.length ? todos.map((todo:any) => <Todo name={todo.name} id={todo.id}/>) : null}
    </Stack>
  )
}