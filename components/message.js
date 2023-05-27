import { Children } from "react";

export default function Message({children,avatar,userName,description}){
    return(
        <div className=" bg-slate-400 outline-none border-none p-8 border-b-2 mt-7 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <h2>{userName}</h2>
            </div>
            <div className="py-4"> 
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}