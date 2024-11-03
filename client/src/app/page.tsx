import Header from "@/components/header/Header"
import Todo from "@/components/todo/Todo";
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import {getData} from "@/utils/fetchData";
import {cookies} from "next/headers";
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
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('access_token')?.value;
  const todo = await getData("/api/todo", jwtCookie);

  return (
    <>
      <Header/>
      <div className={Styles.main}>
        <Todo/>
        <Button sx={buttonStyle}><AddIcon/></Button>
      </div>
    </>
  )
}