import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import {ReactTypingEffect} from "react-typing-effect";
import { motion } from "framer-motion";
import { Outlet , useNavigate,useLocation , Link} from "react-router-dom";

export default function Home() {
const navigate = useNavigate();
return (<div className="min-h-screen bg-gray-100 py-16 pt-20 px-16">

 <div className="bg-gray-200/10 hover:bg-white/15 shadow-xl rounded transform transition grid lg:grid-cols-2 sm:grid-cols-1 gap-2 gap-y-7 text-center p-10 py-26">
   <div className="">
     <div className="text-5xl  font-serif text-red-600/50">One <span className="text-blue-600">Problem</span> a day</div>
     <div className="text-md text-center pl-5 pt-1 ml-5 text-black">@ keeps rejection away</div>
     <div className="text-center"><button onClick={ () => navigate("/problem") } className="w-58 bg-green-400 hover:bg-green-500/90 rounded-lg text-lg cursor-pointer text-center mt-12 mr-50 px-2 py-2 text-black mx-auto">Solve premium problems</button></div>
    </div>
   

      <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:w-[75%] md:w-[70%] sm:w-full rounded-2xl overflow-hidden shadow-9xl border border-gray-700"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-sm">main.cpp</span>
        <div></div>
      </div>

      {/* Editor Body */}
      <div className="bg-[#0f172a] p-1 pt-0.5 font-mono text-sm text-left text-green-400 relative min-h-49">

        {/* Line Numbers */} 
        <div className="absolute left-2 top-4 text-gray-500 text-md leading-6 select-none">
           {Array.from({ length: 7 }, (_, i) => ( 
            <div key={i}>{i + 1}</div> ))} 
            </div> {/* Code */} 
        <div className="pl-8 whitespace-pre-wrap"> 
              <div className="bg-gray-900 p-4 rounded-xl w-[500px] text-md"> 
                <TypeAnimation sequence={[ 
            '#include<iostream>\nusing namespace std;\nint main(){\n cout<<"Hello World";\n return 0;\n}', 500,
            '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\nint a , b;\ncin>>a>>b;\ncout<<a+b;\nreturn 0;\n}', 1000,
             ]} speed={40} repeat={Infinity} className="text-green-400" /> </div> 
         </div>

        {/* Blinking Cursor */}
        <span className="absolute bottom-4 left-[120px] w-[2px] h-5 bg-white animate-pulse"></span>

      </div>
    </motion.div>

 </div>
 

</div>)
}