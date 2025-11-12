import { handlers } from "@/server/auth" 
export const { GET, POST } = handlers

console.log(process.env.NEXTAUTH_URL)
console.log(process.env.GOOGLE_CLIENT_ID)
