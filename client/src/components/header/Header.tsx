import Stack from "@mui/material/Stack";
import Styles from "./Header.module.css"
import {getData} from "@/utils/fetchData";
import {cookies} from "next/headers";
import AvatarDropdown from "@/components/header/AvatarDropdown";
import {redirect} from "next/navigation";

export default async function Header() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('access_token')?.value;
  const data = await getData("/api/user", jwtCookie);
  if(!data) redirect("/signin");
  return (
    <Stack sx={{bgcolor: "#21B1FF", height: 60, alignItems: "center", justifyContent: "space-between", padding: 1}}
           direction="row" spacing={2}>
      <h1 className={Styles.header}>Todo app</h1>
      <AvatarDropdown username={data.username}/>
    </Stack>
  )
}