"use client"
import {TaskInterface} from "@/types/Task";
import CheckBox from "@mui/material/Checkbox"
import Stack from "@mui/material/Stack";
import {taskStackStyle} from "@/components/todo/styles";
import {useEffect, useState, useRef} from "react";
import {patchData, deleteData} from "@/utils/fetchData";
import TextField from "@mui/material/TextField";
import Styles from "./todo.module.css";

export default function Task({name, completed, id, todoId}: TaskInterface) {
  const [checked, setChecked] = useState(completed);
  const [nameState, setNameState] = useState(name);
  const [focus, setFocus] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const textFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    patchData(`/api/task/${todoId}/${id}`, {completed: checked});
  }, [checked]);
  useEffect(() => {
    if (!nameState) {
      deleteData(`/api/task/${todoId}/${id}`)
    }
  }, [nameState]);

  const handleBlur = () => {
    if (nameState) {
      patchData(`/api/task/${todoId}/${id}`, {name: nameState});
      setFocus(false);
    }
    setFocus(false);
  }
  const handleClick = () => {
    setFocus(true);
  }
  if (!nameState || !name) return;
  return (
    <Stack sx={taskStackStyle}>
      <CheckBox checked={checked} onClick={() => setChecked(!checked)}/>
      {focus ?
        <TextField
          autoFocus
          ref={textFieldRef}
          value={nameState}
          onChange={e => setNameState(e.target.value)}
          onBlur={handleBlur}/>
        : <span className={Styles.name} onClick={handleClick}>{nameState}</span>
      }
    </Stack>

  )
}