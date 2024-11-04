import {TodoPropsInterface} from "@/types/Todo";
import Stack from "@mui/material/Stack";
import {mainStackStyle, todoStackStyle} from "@/components/todo/styles";
import {getAccessToken} from "@/utils/getAccessToken";
import {getData} from "@/utils/fetchData";
import Task from "./Task";
import AddTaskButton from "@/components/todo/AddTaskButton";

export default async function Todo({name, id} : TodoPropsInterface){
  const jwtCookie = await getAccessToken();
  const tasks = await getData(`/api/task/${id}`, jwtCookie);
  const sortedTasks = tasks.sort((a:any, b:any) => {
    return a.id - b.id;
  })
  return(
  <Stack sx={mainStackStyle}>
    <h1>{name}</h1>
    <Stack sx={todoStackStyle}>
      {sortedTasks.map( (task:any) => <Task
        name={task.name}
        id={task.id}
        completed={task.completed}
        todoId={id}
        jwtToken={jwtCookie}
      />)}
      <AddTaskButton todoId={id} jwtCookie={jwtCookie}/>
    </Stack>
  </Stack>
  )
}