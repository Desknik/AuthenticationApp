import Form from "./form"
import { redirect } from "next/navigation"
import { getCurrentuser } from "@/lib/session"

export default async function Page() {

    const userIsLogged = await getCurrentuser()
    if(userIsLogged) redirect('/')

  return (
    <div className="flex justify-center items-center h-screen">
        <Form/>
    </div>
  )
}
