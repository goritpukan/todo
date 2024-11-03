import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Styles from "./Header.module.css"
import {getData} from "@/utils/fetchData";
import {cookies} from "next/headers";

export default async function Header(){
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('access_token')?.value;
  let data = await getData("/api/user", jwtCookie);
  return(
    <Stack sx={{bgcolor: "#21B1FF", height: 60, alignItems: "center", justifyContent:"space-between", padding: 1}} direction="row" spacing={2}>
      <h1 className={Styles.header}>Todo app</h1>
      {data
        ?<Avatar sx={{bgcolor: "red", width: 60, height: 60, cursor: "pointer"}}>{data.username.charAt(0).toUpperCase()}</Avatar>
        :<Button component={Link} variant={"contained"} href="/signin">Sign in</Button>
      }
    </Stack>
  )
}