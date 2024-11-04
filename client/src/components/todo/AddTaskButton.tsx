"use client"
import Button from "@mui/material/Button";
import {postData} from "@/utils/fetchData";
import {useRouter} from "next/navigation";

export default function AddTaskButton({jwtCookie, todoId}: { jwtCookie: string | undefined, todoId: number}) {
  const router = useRouter()
  const createTask = async () => {
    const res = await postData(`/api/task/${todoId}`, {name: "task"}, jwtCookie);
    if (res) {
      router.refresh();
    }
  }
  return (
    <Button onClick={createTask}>Add</Button>
  )
}
