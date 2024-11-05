"use client"
import {TodoInterface} from "@/types/Todo";
import {TaskInterface} from "@/types/Task";
import Stack from "@mui/material/Stack";
import {mainStackStyle, todoStackStyle} from "@/components/todo/styles";
import Task from "./Task";
import {useState} from "react";
import {deleteData, postData} from "@/utils/fetchData";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({name, id, tasks}: TodoInterface) {
  const [nameState, setNameState] = useState(name);
  const [tasksState, setTasksState] = useState<TaskInterface[] | null>(
    tasks
      ? tasks.sort((a: any, b: any) => a.id - b.id)
      : null
  );
  const [isDeleted, setIsDeleted] = useState(false);

  const createTask = async () => {
    const {res, data} = await postData(`/api/task/${id}`, {name: "task"});

    if (res.ok) {
      if (tasksState) {
        setTasksState([...tasksState, data]);
        return
      }
      setTasksState(data)
    }
  }
  const deleteTodo = async () => {
    const res = await deleteData(`/api/todo/${id}`);
    if (res) {
      setIsDeleted(true);
    }
  }
  if (isDeleted) return;
  return (
    <Stack sx={mainStackStyle}>
      <h1>{nameState}</h1>
      <Stack sx={todoStackStyle}>
        {tasksState && tasksState.map((task: TaskInterface) => <Task
          key={task.id}
          name={task.name}
          id={task.id}
          completed={task.completed}
          todoId={id}
        />)}
        <Button onClick={createTask}>Add</Button>
        <IconButton onClick={deleteTodo} aria-label="delete">
          <DeleteIcon/>
        </IconButton>
      </Stack>
    </Stack>
  )
}