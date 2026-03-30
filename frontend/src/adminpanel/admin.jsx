import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Plus, Edit, Trash2} from 'lucide-react';

export default function Admin() {
    const navigate = useNavigate();
    const problem = [
    {type:`Create problem`,page:"create",icon:Plus,color:"bg-teal-500",color1:"bg-green-400",des:`Add a new coding problem to the platform`},
    {type:`Update problem`,page:"update",icon:Edit,color:"bg-stone-500",color1:"bg-yellow-400",des:`Edit existing problem and their details`},
    {type:`Delete problem`,page:"delete",icon:Trash2,color:"bg-rose-300",color1:"bg-rose-400",des:`Remove problem from the platform`},
    ]
    return (
     <>
     <div className="lg:mx-15 md:mx-10 sm:mx-6 text-4xl mt-5 text-center font-semibold text-blue-500"> Admin Panel </div>
     <div className="lg:mx-15 md:mx-10 sm:mx-6 text-xl text-center font-semibold mt-2"> Manage problems & Contests on the platform </div>
     <div className="grid lg:grid-cols-3 mt-8 lg:mx-15 md:mx-10 sm:mx-6 md:grid-cols-2 sm:grid-cols-1 "> 
      {
        problem.map((p,index)=>(
         <div key={index} className="bg-gray-800 border-1  border-gray-900 rounded-lg m-2 p-3 flex flex-col items-center text-center">
           <p className="text-xl"><p.icon className={`w-13 h-13 p-2 mt-3 rounded-full ${p.color}`} /></p>
           <p className="text-2xl font-semibold mt-3"> {p.type}</p>
           <p className="mt-3"> {p.des}</p>
           <button onClick={()=>{navigate(`${p.page}`)}} className={`mt-6 mb-4 rounded-lg p-2 px-2.5 cursor-pointer font-semibold text-black ${p.color1}`}>{p.type}</button>
         </div>
        )
        )
      }

     </div>
     </>
     
    );
}