import Header from "@/components/header/Header"
import TodoList from "@/components/todo/todo-list/TodoList";
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import Styles from "./page.module.css"

export default async function Page() {
  const buttonStyle = {
    bgcolor: "#21B1FF",
    aspectRatio: "1/1",
    borderRadius: "50%",
    right: "10px",
    bottom: "90px",
    position: "absolute",
    color: "white"
  }
  return (
    <>
      <Header/>
      <div className={Styles.main}>
        <TodoList/>
        <Button sx={buttonStyle}><AddIcon/></Button>
      </div>
    </>
  )
}