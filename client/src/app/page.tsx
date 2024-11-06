import Header from "@/components/header/Header"
import TodoList from "@/components/todo/TodoList";
import Styles from "./page.module.css"
import {getAccessToken} from "@/utils/getAccessToken";
import {getData} from "@/utils/fetchData";

export default async function Page() {
  const jwtCookie = await getAccessToken();
  const todos = await getData("/api/todo", jwtCookie);
  const sortedTodos = todos ? todos.sort((a:any, b:any) => a.id - b.id) : null;
  return (
    <>
      <Header/>
      <div className={Styles.main}>
        <TodoList todos={sortedTodos}/>
      </div>
    </>
  )
}