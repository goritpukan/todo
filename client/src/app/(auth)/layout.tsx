import {getData} from "@/utils/fetchData";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }){
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get('access_token')?.value;
  const data = await getData("/api/user", jwtCookie);
  if(data) redirect("/")
  return children;
}