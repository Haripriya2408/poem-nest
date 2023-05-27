import Link from "next/link"
import {auth} from '../utils/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
export default function Nav(){
    const[user,loading]=useAuthState(auth);
    console.log(user)
    return (
       <nav className=" flex justify-between items-center py-10 bg-gray-300 w-full rounded-xl h-5">
        <Link href="/">
            <button className="text-3xl font-medium mx-8  font-mono">Poem Nest</button>
        </Link>
        <ul className=" flex items-center gap-10">
          {!user &&(
              <Link href={"/auth/login"}>
              <p  className="py-1.5 px-4 text-xl bg-slate-950 text-white rounded-lg font-medi
               mx-8 mt-3 font-mono">Join now</p>
                 </Link>
          )}
          {user && (
            <div className=" flex items-center gap-6">
                <Link href="/post">
                    <button className="py-1.5 w-28 px-4 text-xl bg-slate-950 text-white rounded-lg font-medi
               mx-3 mt-3 font-mono">
                        Post
                    </button>
                </Link> 
                 <Link href="/dashboard">
                    <img src={user.photoURL} className="w-12 mr-4 mt-3 rounded-full cursor-pointer"/>
                </Link>
            </div>
          )}
        </ul>

       </nav>
    )
}