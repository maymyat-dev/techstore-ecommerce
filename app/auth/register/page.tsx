import { auth } from "@/server/auth";        
import { redirect } from "next/navigation";          
import Register from "./register";

export default async function RegisterPage() {
  const session = await auth();         

  if (session?.user) {
    redirect("/");
  }

  return <Register />;                     
}
