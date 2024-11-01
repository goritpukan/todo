import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <span>Home page</span>
      <Link href="/signup"><Button variant={"outlined"}>Test</Button></Link>

    </>
  )
}