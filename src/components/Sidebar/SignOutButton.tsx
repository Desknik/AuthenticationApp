import { signOut } from "next-auth/react"
import { IoExitOutline } from "react-icons/io5"

export default function SignOutButton(){
    return(
        <button className='text-xl transition-all hover:scale-105 hover:translate-x-1'
              onClick={() => {signOut()}}
        >
          <IoExitOutline />
        </button>
    )
}