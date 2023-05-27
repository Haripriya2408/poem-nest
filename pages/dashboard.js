import {auth,db} from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { collection, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import Message from '@/components/message';
import { doc } from 'firebase/firestore';
export default function Dashboard(){
    const router=useRouter();
    const[user,loading]=useAuthState(auth)
    const[posts,setPosts]=useState([])
 
    const getData=async()=>{
 //see if use is logged
 if(loading) return;
 if(!user) return router.push('/auth/login')
 console.log("RUN!")
 const collectionRef=collection(db,'posts')
const q=query(collectionRef,where("user","==",user.uid))

const unsubscribe=onSnapshot(q,(snapshot=>{
    setPosts(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
}))
return unsubscribe

}
//delete post
const deletePost=async(id)=>{
    const docRef=doc(db,'posts',id)
    await deleteDoc(docRef)
}

    useEffect(()=>{
        getData();

    },[user,loading])

    return(
        <div>
            <h1 className=" mt-20 mb-16 text-slate-300 font-mono text-4xl text-center"> Your posts</h1>
            <div>
                {posts.map((post)=>{
                    return (
<Message {...post} key={post.id}>
 <div className='flex gap-4'>
 <Link href={{pathname:"/post",query:post }}>
 <button className=' flex items-cent
  justify-center gap-2 py-2 text-sm'><AiFillEdit className="text-2xl text-slate-200"/>
    </button>
    </Link>
    <button onClick={()=>deletePost(post.id)} className=' flex items-cent
  justify-center gap-2 py-2 text-sm'><AiFillDelete className="text-2xl text-slate-200"/>
        </button>
        
 </div>
 </Message>)
                })}
            </div>
           <div className=' ml-44'>
           <button className='font-medium text-lg rounded-lg items font:mono text-white bg-cyan-600 py-4 px-9 ml-96 my-10' onClick={()=>auth.signOut()}>Sign out</button>
           </div>
        </div>
    )
}