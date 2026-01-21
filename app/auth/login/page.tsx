import { auth } from "@/server/auth";        
import { redirect } from "next/navigation";
import Login from "./login";            

export default async function LoginPage() {
  const session = await auth();         

  if (session?.user) {
    redirect("/");
  }

  return <Login />;                     
}
