import {auth,db} from "../utils/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { useEffect,useState } from 'react';
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { addDoc,doc} from "firebase/firestore";
import { toast } from "react-toastify";
export default function Post(){
    const[post,setPost]=useState({description:""})
    const[user,loading]=useAuthState(auth)
    const route=useRouter()
    const routeData=route.query
    //submit post
    const submitPost=async(e)=>{
        e.preventDefault();

        if(!post.description){
            toast.error("Description Field empty 😅",{
                 position:toast.POSITION.TOP_CENTER,
                 autoClose:1000,
            })
        return
        }
        if(post.description.length>300){
            toast.error("Description is too long 😅",{
                 position:toast.POSITION.TOP_CENTER,
                 autoClose:1000,
            })
        return
        }
        if(post?.hasOwnProperty("id")){
            const docRef=doc(db,'posts',post.id)
            const updatePost={...post,timestamp:serverTimestamp()}
           
            await updateDoc(docRef,updatePost);
            
           
               return route.push("/")

        }

        else{
            const collectionRef=collection(db,"posts");
            await addDoc(collectionRef,{
                ...post,
               timestamp:serverTimestamp(),
               user:user.uid,
               avatar:user.photoURL,
               username:user.displayName,
            })
            setPost({description:""});
            toast.success("Post Updated ",{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500
               })
            return route.push("/")
        }
        }
   
    const checkUser=async()=>{
        if(loading) return
        if(!user) route.push("/auth/login")
        if(routeData.id){
            setPost({description:routeData.description,id:routeData.id})
        }    }
    useEffect(()=>{
        checkUser();
    },[user,loading])
    
    return(
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                
         <h1 className="text-2xl text-stone-200 text-center font-mono text-2xl   font-bold">{post.hasOwnProperty("id")?"Edit your Poem":"Create a New Poem"}</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2 text-amber-50"></h3>
                    <textarea  value={post.description}
                    onChange={(e)=>{
                        setPost({...post,description:e.target.value})
                    }} 
                    
                    className=" bg-gray-200 h-80 w-96 text-mono text-black rounded-lg border-none p-2 text-xl text-black outline-0"></textarea>
                    <p 
                     className={`text-cyan-600 font-medium text-sm ${post.description.length>300 ?'text-red-600':''}`}>{post.description.length}/300</p>
                </div>
                <button 
                type="submit"
                
                className="w-96 h-12 font-mono bg-cyan-600 text-white font-medium  p-2 my-2 rounded-lg text-xl
                ">Submit</button>
            </form>
           
                    
        </div>
    )
}