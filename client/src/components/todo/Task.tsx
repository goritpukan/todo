"use client"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {taskStackStyle, taskTextFieldStyle} from "@/components/todo/styles";
import {useEffect, useState} from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}
interface TaskProps {
  task: {
    id: number;
    name: string;
    completed: boolean;
  };
  isLast: boolean;
  addTask: () => void;
  changeTask: (task: Task) => void;
}

const Task: React.FC<TaskProps> = ({task, addTask, isLast, changeTask}) => {
  const [name, setName] = useState(task.name);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    changeTask({id: task.id, name: task.name, completed: task.completed});
  },[name, completed]);
  return (
    <Stack direction="row" sx={taskStackStyle}>
      <TextField onChange={e => setName(e.target.value)} onClick={isLast ? addTask : () => {}} sx={taskTextFieldStyle} variant={"standard"} value={name}/>
    </Stack>
  )
}

export default Task;