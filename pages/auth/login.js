import {FcGoogle} from "react-icons/fc"
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../../utils/firebase'
import {useRouter} from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from "react"
import {AiOutlineForm} from 'react-icons/ai'
 export default function Login(){ 
    const route = useRouter()
    const[user,loading]=useAuthState(auth);
const googleProvider=new GoogleAuthProvider();
const GoogleLogin=async()=>{
    try{
       const result=await signInWithPopup(auth,googleProvider)
       route.push("/")
    }
    catch(error){
console.log(error)
    }
}
useEffect(()=>{
    if(user){
    route.push("/");
    }
    else{
        console.log("login")
    }

},[user])

    return(
        <div className=" shadow-xl bg-slate-400 col mt-28 p-32 text-gray-700 rounded-lg">
            <h2 className=" text-6xl flex font-bold font-mono text-center ml-28">Welcome To Poem Nest...<span><AiOutlineForm className="text-6xl"/> </span></h2>
            <div className="py-0">
                <h3 className="py-6 text-3xl text-center font-mono">Read! Write! Engage!</h3>
                <button 
                onClick={GoogleLogin}
                className="text-white bg-gray-700 w-fit font-medium rounded-lg flex ml-96 mt-10 p-4 gap-4">
                <FcGoogle className="text-2xl"/>Sign in with Google</button>
               
            </div>
        </div>
    )
} 