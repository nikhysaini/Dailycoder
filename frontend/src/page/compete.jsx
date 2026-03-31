import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ReactLoading from "react-loading";
import Editor from "@monaco-editor/react";
import { FaChevronDown, FaChevronUp,FaPlay} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdFullscreen } from "react-icons/md";
import {IoSend,IoCheckmark,IoClose,IoRemove,IoExpand} from "react-icons/io5";
import { useParams } from "react-router-dom";

const socket = io("https://dailycoder.onrender.com");

export default function Compete() {
  const [roomId, setRoomId] = useState("");
  const [problemtitle, setproblemtitle] = useState(null);
  const [problemId, setproblemId] = useState(null);
  const [contesttime, setcontesttime] = useState(null);
  const [roommenu, setroommenu] = useState("join");
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"))||null;
  const [board, setBoard] = useState([]);
  const [Tab,setTabs] = useState("roomproblem")

  const { id } = useParams();
    const [code, setCode] = useState("// Write your code here");
    const [houtput, sethoutput] = useState(0);
    const [result, setresult] = useState("Accepted");
    const [language, setLanguage] = useState("cpp");
    const [output, setOutput] = useState("");
    const [upper, setupper] = useState("problem");
    const [shotoutput, setshowoutput] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const arr= ["Array","Hashmap","Two Pointer","Array","Hashmap","Two Pointer","Array","Hashmap","Two Pointer"]
    const [testcases,settestcases] = useState(null)
    const [submitresult, setsubmitresult] = useState(null);
    const difficulty = "Medium"
    const [problems, setproblem] = useState(null);
    const [tab, setTab] = useState(0);


  useEffect(() => {

  socket.on("leaderboard_update", (data) => {
    setBoard(data);
  });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const joinRoom = () => {  
   
    if (!roomId) return;
    console.log(roomId);
    socket.emit("check_room",  roomId );
    
    socket.on("room_exists", ({ exists }) => {
    if (!exists) 
       { alert("Contest doesn't exists") ; return ; }
    else 
      {
        socket.emit("join_room", { 
        roomId, 
        user: auth?.email 
        });
        
      }
   });
    socket.on("join_results", (data) => {

    if (data.status === "accepted") 
       { setJoined(true); setproblemId(data.problemid);update();}
    else 
      alert("problem doesn't Exists");
  });
  };

   const createRoom = () => {  
    if (!roomId) return;
    console.log(roomId);
    socket.emit("check_room",  roomId );
    
    socket.on("room_exists", ({ exists }) => {
    if (exists) 
       {alert("Contest already exists") ;return ; }
    else 
      {
        socket.emit("create_room", { 
        roomId, 
        problemtitle,
        minutes:Number(contesttime),
        user: auth?.email 
        });
      }
   });
   socket.on("join_results", (data) => {

    if (data.status === "accepted") 
        { setJoined(true); setproblemId(data.problemid);}
    else 
      alert("problem doesn't Exists");
  });
  };

  const leaveRoom = () => {
  socket.emit("leave_room", { roomId,user:auth?.email });

   setJoined(false);
   setMessages([]);
   setRoomId("");
   setBoard([]);
   };

  const sendMessage = () => {
    if (!msg || !roomId) return;

    console.log("Sending:", msg);

    socket.emit("send_message", {
      roomId,
      user:auth.email,
      message: msg
    });

    setMsg("");
  };

  const solve = async() =>{
     console.log("Leaderboard called");
      socket.emit("add_point", {
      roomId,
      time:Date.now(),
      user: auth?.email
     });
     console.log("again")
     socket.on("leaderboard_update", (data1) => {
      console.log("called ld");
      console.log(data1);
      setBoard(data1);
      });
      
  }

  const update = async() =>{
     console.log("Leaderboard called");
      socket.emit("update", {
      roomId
     });
     socket.on("ld_update", (data1) => {
     setBoard(data1);
      });
      console.log(board);
  }
   
  {/* SOlve problem   */}

  useEffect(() => { 
    async function api() {
        const response = await fetch(`http://localhost:3000/problem/problemById/${"698f6f74ce0bdfd0c9616a72"}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include"
      });
      const data = await response.json();
      setproblem(data);
     }
      api();
    },[]);
    
    //Api call for Running Code 
    const handleRun = () => {
     
      sethoutput(0);
       async function run() {
        let lang = "C++";
        if(language==="python") lang = "Python";
        else if(language==="javascript") lang = "Javascript";
        else if(language==="java") lang = "Java";
       const response = await fetch(`http://localhost:3000/submission/run/${"698f6f74ce0bdfd0c9616a72"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: lang,
        }),
         credentials: "include"
      });
      const data = await response.json();
      setsubmitresult(null);
      settestcases(data);
      sethoutput(40);
     }
      run(); 
  
    };
    
  const finalResult = (() => {
  if (!testcases || testcases.length === 0) return "";

  for (let t of testcases) {
    if (t?.status?.id !== 3) {
      return t?.status?.description; 
    }
  }

  return "Accepted";
})();
    //Api call for Running Code 
    const handleSubmit = () => {
     
      async function submit() {
        sethoutput(0);
        let lang = "C++";
        if(language==="python") lang = "Python";
        else if(language==="javascript") lang = "Javascript";
        else if(language==="java") lang = "Java";
       const response = await fetch(`http://localhost:3000/submission/submit/${"698f6f74ce0bdfd0c9616a72"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token:(JSON.parse(localStorage.getItem("auth")).token)
        },
        body: JSON.stringify({
          code: code,
          language: lang,
        }),
         credentials: "include"
      });
      const data = await response.json();
      setsubmitresult(data);
      console.log(data);
      sethoutput(40);
      if (data.status === "Accepted" || data.status_id === 3)
      {
       solve();
       }
    }
      submit(); 
  
    };
  
    const toPlainText = (data) => {
  if (data === null || data === undefined) return "";

  if (typeof data === "number" || typeof data === "boolean") 
    return String(data);
  
  if (Array.isArray(data)) 
    return data.map(item => toPlainText(item)).join(" ");

  if (typeof data === "object") {
    return Object.values(data)
      .map(item => toPlainText(item))
      .join(" ");
  }

  if (typeof data === "string") {
    try {
      const decoded = atob(data);
      return decoded
        .replace(/\r?\n/g, " ")
        .trim();

    } catch {
      return data.trim();
    }
  }
  return "";
};

  return (
    <div>
     
      {!joined && auth != null && 
      <div>
       <div className="flex justify-center p-6 gap-15">
         <button className="bg-blue-600 p-1.5 rounded" onClick={()=>{setroommenu("join")}}>Join Room</button>
         <button className="bg-blue-600 p-1.5 rounded" onClick={()=>{setroommenu("click")}}>Create Room</button>
       </div>
       {roommenu==="join" && 
       <div className="text-center p-4">
      <input className="bg-gray-300 text-black p-2 py-1"
        placeholder="Enter Contest ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
       />
       <p></p>
      <button className="bg-green-600 mt-3 p-3 py-1.5 pointer-courser rounded" onClick={joinRoom}>Join Contest</button>
       </div>}
      {roommenu==="click" && 
       <div className="text-center">
      <input className="bg-gray-300 text-black mt-2.5 p-2 py-1"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
       />
       <p></p>
      <input className="bg-gray-300 text-black mt-2.5 p-2 py-1"
        placeholder="Enter valid problem Title"
        value={problemtitle}
        onChange={(e) => setproblemtitle(e.target.value)}
       /><p></p>
       <input className="bg-gray-300 text-black mt-2.5 p-2 py-1"
        placeholder="Contest Duration"
        value={contesttime}
        onChange={(e) => setcontesttime(e.target.value)}
       /><p></p>
      <button className="bg-green-600 mt-3.5 p-3 py-1.5 rounded courser-pointer" onClick={createRoom}>Create Contest</button>
       </div>}

      </div>
      }
       {joined && auth != null && (
      <>
      
  <div className="flex justify-between p-2 rounded-lg">
     <button
      onClick={() => setTabs("roomproblem")}
       className={`px-3 py-1.5 rounded courser-pointer ${
         tab === "roomproblem"
          ? "bg-blue-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
     >
      Problem
    </button>

    <button
      onClick={() => setTabs("leaderboard")}
      className={`px-3 py-1.5 rounded courser-pointer ${
        tab === "leaderboard"
          ? "bg-blue-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      Leaderboard
    </button>
   </div>
          
      {/* <div className="justify-between">
        <button className="mr-5 bg-gray-500 rounded p-1" onClick={()=>setTabs("roomproblem")}> problem</button>
        <button className="mx-5 bg-gray-500 rounded p-1" onClick={()=>setTabs("leaderboard")}>Leaderboard</button>
           
      </div> */}
      
      {Tab==='roomproblem' &&
          <>
         
          
         

         <div style={{ display: "flex", height: "100vh" }}>

      {/* Left Panel - Problem */} 

       {/* Tab */} 
      <div className="overflow-auto w-[45%] " >
         <div className="flex gap-8 items-center justify-between cursor-pointer bg-gray-800 rounded-md py-3 px-7 pr-20">
           <button onClick={() => setupper("problem")}> Problem</button>
           <span className="">Contest Id: {roomId}</span>
           <button className="bg-red-600  p-1.5 rounded flex items-center gap-1" onClick={leaveRoom}>
            <FiLogOut size={20} className="text-center"/>
            <span className="text-center">Leave</span>
            </button>
          
         </div>

       {/* Problem */}
       <div style={{padding: "20px",borderRight: "1px solid #ccc"}}>
         
       <h1 className="font-bold text-2xl"> {problems?.title}</h1>
        
        <span className=
              {`text-sm ${problems?.difficulty === "Easy" ? "text-green-600" : problems?.difficulty === "Medium"? "text-yellow-600" : "text-red-600"}`}>
                {problems?.difficulty}
              </span>
         
        <p className="my-5">
           
          {problems?.description} 
        </p>

        <p className="mt-5 mb-3 font-bold">Examples:</p>
      <div className="bg-gray-100 text-black p-2">
        <p><span >Input:</span> {problems?.visibleTestCases[0].input}</p>
        <p><span >Output:</span>{problems?.visibleTestCases[0].output}</p>
        <p><span >Explanation:</span>  { problems?.visibleTestCases[0].explanation } </p>
      </div>
       <h4 className="my-5"></h4>
      <div className="bg-gray-100 text-black p-2">
        <p><span >Input:</span>{problems?.visibleTestCases[1].input} </p>
        <p><span >Output:</span> {problems?.visibleTestCases[1].output}</p>
        <p><span >Explanation:</span> { problems?.visibleTestCases[1].explanation } </p>
      </div>
     
     
      <p className="mt-5 font-bold">Constraints</p>
      <div>
      <p>1 &lt;= n &lt;= 1e5</p>
      <p>1 &lt;= nums[i] , target &lt;= 1e9</p>
      </div>
      
      <button className="mt-5 font-bold flex items-center gap-2" onClick={() => setShowTags(!showTags)}>
       <span className="font-bold">Tags</span>  {showTags ? <FaChevronUp className="inline-block pt-1" /> : <FaChevronDown className="inline-block  pt-1" />}
      </button>

      {showTags && problems && (
        <div className="flex flex-wrap gap-3" style={{ marginTop: "10px" }}>
           {problems.tags.map((t, index) => (
          <span className="px-4 rounded-2xl bg-white text-xs  text-black py-2" key={index}>{t }</span>
          ))}
        </div>
      )}
     </div>

     {/* Run code - Output */} 
    { testcases!=null && <div className={`fixed bottom-0 w-[45%] left-0 bg-black text-white border-t border-gray-500 overflow-auto p-2 ${houtput===0 && "hidden"}`}
      style={{ height: `${houtput}%`,
      }} >

    <div className="flex items-center justify-between">
    <h1 className="text-xl mb-2 ">Result : {finalResult}</h1>
    <span className="flex items-center">
    {houtput===40 && <IoRemove onClick={() => houtput==10?sethoutput(40):sethoutput(7)}  className="text-white text-3xl"/>}
    {houtput===7 && <MdFullscreen onClick={() => sethoutput(40)}  className="text-white text-3xl"/>}
    <IoClose onClick={() => sethoutput(0)}  className="text-white text-3xl"/>
    </span>
    
  </div>
  <div className="bg-black text-white resize-y overflow-auto border border-gray-400 p-2 mt-3">
  
  <div className="flex gap-3 mb-2">
      {testcases.map((t,index) => (
        <button key={index} className="flex gap-1 items-center cursor-pointer bg-gray-800 rounded-md p-2" onClick={() => setTab(index)} >
        Test Case {index+1}
        {t?.status?.id === 3 ? (
          <IoCheckmark className="text-white text-lg bg-green-600 rounded" />
        ) : (
          <IoClose className="text-white text-lg bg-red-500 rounded" />
        )}
      </button>
    ))}
  </div>

  <div className="bg-gray-600 p-2 rounded">
    {testcases.map(
      (t,index) => tab === index && 
      <span key={index}>
      <p>Input : {toPlainText(t.stdin)}</p>
      <p>Output : {toPlainText(t.stdout) || "No output"}</p>
      <p>Expected Output : {toPlainText(t.expected_output)}</p>
      
      </span>
    )}
  </div>

  </div>

   </div>}

  {/* Submit Code - output */}
   {submitresult!=null && <div className={`fixed bottom-0 w-[45%] left-0 bg-black text-white border-t border-gray-500 overflow-auto p-2 ${houtput===0 && "hidden"}`}
      style={{ height: `${houtput}%`,
      }} >

    <div className="flex border-2 border-gray-800 items-center justify-between">
    <h1 className={`text-3xl mb-2 p-1  font-bold border-blue-600 ${submitresult.status === "Accepted" ? "text-green-800" : "text-red-800"}`}>{submitresult.status}</h1>
    <span className="flex items-center ">
    {houtput===40 && <IoRemove onClick={() => houtput==10?sethoutput(40):sethoutput(7)}  className="text-white text-3xl"/>}
    {houtput===7 && <MdFullscreen onClick={() => sethoutput(40)}  className="text-white text-3xl"/>}
    <IoClose onClick={() => sethoutput(0)}  className="text-white text-3xl"/>
    </span>
      </div>
     <div className={`p-2 rounded-lg text-black font-semibold ${submitresult.status === "Accepted" ? "bg-green-200" : "bg-red-100" }`}>
        <p className="text-2xl"> TestCase passed : {submitresult.testCasesPassed} /  {submitresult.testCasesTotal}</p>
        <p className="text-2xl"> Time : {submitresult.runtime} s</p>
        <p className="text-2xl"> Time : {(submitresult.memory / 1024).toFixed(2)} MB</p>
     </div>
    </div>
   }


      </div>
  

      {/* Right Panel - Code Editor */}
      <div className="overflow-auto" style={{  width: "55%", display: "flex", flexDirection: "column"  }} >
        <div className="flex justify-between">
      

        <div className="text-lg rounded " style={{ padding: "10px", borderBottom: "1px solid #ccc",  }} >
          <select  className="bg-white text-black p-1.5 py-1" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp" >C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
          </select>
        </div>
 
        <div className="m-1 items-center">
          <button onClick={handleRun} className="bg-yellow-400 text-white text-lg cursor-pointer rounded-md" >
           <span className="flex flex-wrap items-center gap-1 p-2.5 py-1"><FaPlay/> Run</span>
          </button>
        </div>
       </div>


        {/* Editor */}
        <Editor
          height="70%"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />

       
        {/* Submit Button */}
        <div className="border-y-2 border-white" style={{ padding: "10px" }}>
          <button className="bg-green-500 text-white cursor-pointer flex items-center gap-1 p-2 rounded-md"
            onClick={handleSubmit} 
          >
         <IoSend/>
          Submit Code
          </button>
        </div>

      </div>
    </div>

           



          
          </>
        }
        {Tab==='leaderboard' &&
          <>
          <h3 className="mt-10">Leaderboard</h3>
        <div className="text-center">
          <p className="grid grid-cols-3 bg-white/4 border border-bottom border-gray-200">
            <div> Rank </div>
             <div> Username</div>
            <div>Finish Time </div>   
           </p>
         {board.map((u, i) => (
           <p className="grid grid-cols-3 my-0.5 p-1.5 py-2 bg-blue-300/5 " key={i}>
            <div>
            {i+1} 
            </div>
             <div>
            {u.user.split("@")[0]} 
            </div>
            <div>
             {`${parseInt(u.time/60) < 10 ? "0" + parseInt(u.time/60) : parseInt(u.time/60)} `} 
             : {`${parseInt(u.time%60) < 10 ? "0" + parseInt(u.time%60) : parseInt(u.time%60)}`}
            </div> 
             
           </p>
           ))}
           </div>
          </>
         }
          </>
       )}
    </div>
  );
}