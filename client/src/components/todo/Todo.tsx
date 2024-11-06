"use client"
import {TodoInterface} from "@/types/Todo";
import {TaskInterface} from "@/types/Task";
import Stack from "@mui/material/Stack";
import {mainStackStyle, todoStackStyle} from "@/components/todo/styles";
import Task from "./Task";
import {useState} from "react";
import {deleteData, patchData, postData} from "@/utils/fetchData";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Styles from "./todo.module.css";

export default function Todo({name, id, tasks}: TodoInterface) {
  const [nameState, setNameState] = useState(name);
  const [tasksState, setTasksState] = useState<TaskInterface[] | null>(
    tasks
      ? tasks.sort((a: any, b: any) => a.id - b.id)
      : null
  );
  const [isDeleted, setIsDeleted] = useState(false);
  const [focus, setFocus] = useState(false);

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
  const handleBlur = () => {
    patchData(`/api/todo/${id}`, {name: nameState})
    setFocus(false);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key ==='Enter'){
      patchData(`/api/todo/${id}`, {name: nameState})
      setFocus(false);
    }
  }
  if (isDeleted) return;
  return (
    <Stack sx={mainStackStyle}>
      {focus
        ? <TextField
          value={nameState}
          autoFocus
          variant={"outlined"}
          onBlur={handleBlur}
          onChange={e => setNameState(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{width: "100%", height: "auto"}}
        />
        : <h1 className={Styles.header} onClick={() => setFocus(true)}>{nameState}</h1>}
      <Stack sx={todoStackStyle}>
        {tasksState && tasksState.map((task: TaskInterface) => <Task
          key={task.id}
          name={task.name}
          id={task.id}
          completed={task.completed}
          todoId={id}
        />)}
        <Button onClick={createTask}>Add</Button>
        <div style={{flexGrow: 1}}/>
        <IconButton onClick={deleteTodo} aria-label="delete">
          <DeleteIcon fontSize={"large"} sx={{color: "red"}}/>
        </IconButton>
      </Stack>
    </Stack>
  )
}