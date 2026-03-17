import React, { useState,useEffect} from "react";
import ReactLoading from "react-loading";
import Editor from "@monaco-editor/react";
import { FaChevronDown, FaChevronUp,FaPlay} from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import {IoSend,IoCheckmark,IoClose,IoRemove,IoExpand} from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function Solve() {
  
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
  const [tab, setTab] = useState(0);
  const difficulty = "Medium"
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  const [problems, setproblem] = useState(null);
  console.log(id);

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
    settestcases(data);
    sethoutput(40);
   }
    run(); 

  };

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
   }
    submit(); 

  };
 
  return ( 
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Left Panel - Problem */} 

       {/* Tab */} 
      <div className="overflow-auto w-[45%] " >
         <div className="flex gap-8 items-center justify-between cursor-pointer bg-gray-800 rounded-md py-3 px-7 pr-20">
           <button onClick={() => setupper("problem")}> Problem</button>
           <button onClick={() => setupper("solution")}>Solution</button>
           <button onClick={() => setupper("submissions")}>Submissions</button>
           <button onClick={() => setupper("discuss")}>Discuss</button>
           <button onClick={() => setupper("aski")}>Ask Ai</button>
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
    <h1 className="text-xl mb-2 ">Result : {result}</h1>
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
      <p>Input : {t.stdin}</p>
      <p>Output : {t.stdout || "No output"}</p>
      <p>Expected Output : {t.expected_output}</p>
      {result==="Accepted" && setresult(t.status.description)}
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
            <option value="cpp" clas>C++</option>
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
  );
}