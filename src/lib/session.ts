import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getCurrentuser(){
    const session = await getServerSession(authOptions)
    return session?.user
}