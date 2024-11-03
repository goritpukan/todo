"use client"
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {mainStackStyle,todoStackStyle ,todoTextFieldStyle, buttonStyle} from "@/components/todo/styles";
import Task from "./Task";
import {useState} from "react";

interface TaskType {
  name: string;
  completed: boolean;
  id: number;
}
export default function Todo(){
  const [tasks, setTasks] = useState<TaskType[]>([{name: "", completed: false, id: 0}]);
  const addTask = (index: number) => {
    setTasks([...tasks, {name: "", completed: false, id: index + 1}]);
  }
  const changeTask = (task: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((_task) =>
        _task.id === task.id ? { ..._task, ...task } : _task
      )
    );
  }
  return(
    <Stack sx={mainStackStyle} >
      <TextField sx={todoTextFieldStyle} label={"Name"} variant={"standard"}></TextField>
      <Stack sx={todoStackStyle}>
        {tasks.map((task, index) => <Task addTask={() => addTask(index)} task={{id: index, name: task.name, completed: task.completed}} changeTask={changeTask} isLast={index === tasks.length - 1}/>)}
      </Stack>
      <Button sx={buttonStyle} variant={"contained"}>Save</Button>
    </Stack>
  )
}