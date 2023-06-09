import Head from 'next/head'
import Message from '@/components/message'
import { Inter } from 'next/font/google'
import { useState,useEffect } from 'react'
import { db } from '@/utils/firebase'
import { doc, onSnapshot, orderBy, query,collection } from 'firebase/firestore'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const[allposts,setAllposts]=useState([]);
  const getPosts=async()=>{
    const collectionRef=collection(db,'posts');
    const q=query(collectionRef,orderBy('timestamp','desc'))
    const unsubscribe=onSnapshot(q,(snapshot)=>{
      setAllposts(snapshot.docs.map((doc) =>({...doc.data(),id:doc.id})))
    })
    return unsubscribe
  }

  useEffect(()=>{
    getPosts();
  },[])
  return (
    
     <div>
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='my-12 text-lg font-medium'>
        <h1 className='text-center text-stone-200 text-4xl font:mono'>See what other people are saying</h1>
        <h2 className='text-xl font-mono'>
        
        {allposts.map((post)=>(
          <Message key={post.id} {...post}>
         <Link href={{pathname:`/${post.id}`,query:{...post}}}>
         <button>
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
         
         </Link>
          </Message>
        ))}
          
        
        </h2>
          
      </div>
     </div>
    
  )
}
