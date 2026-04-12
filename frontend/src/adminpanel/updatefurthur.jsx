import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

export default function AdminUpdateFurther() {
  const { id } = useParams();
  const [addtc,setaddtc] = useState({input:"" , output:"" })
  const [problem,setProblem] = useState(null)

   useEffect(() => { 
    async function api() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/problem/problemById/${"698f6f74ce0bdfd0c9616a72"}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include"
      });
      const data = await response.json();
      setProblem({...data,
        tags:data.tags.join(","),
        constraints:data.constraints.join(","),
      })
      console.log(data);
      console.log(problem);
     }
      api();

    },[]);

    const addHiddenTestcase = (e) => {
  e.preventDefault();
  console.log(addtc);
  console.log(problem);
  setProblem({
    ...problem,
    hiddenTestCases: [
      ...problem.hiddenTestCases,
      addtc
    ]
  });
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    const tg = problem.tags.split(",") , ct = problem.constraints.split(",");
    const tocreate = {...problem,tags:tg,constraints:ct};
     async function api() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/problem/update/${"698f6f74ce0bdfd0c9616a72"}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ...tocreate
      }),
         credentials: "include"
      });
      console.log(response);
      alert("update successfully")
     }
      api();

  }
 return ( <>
 <h1 className=" text-blue-500  p-2 text-center text-3xl font-semibold mt-4">
        Update a problem
      </h1>
 {problem!=null &&<form className="w-[80%] mx-auto text-center flex flex-col gap-3 bg-white">
      <p className="mt-4">Title</p>
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        className="border p-2 rounded bg-gray-100 "
        value= {problem.title}
        onChange={(e) =>
             setProblem({ ...problem,title: e.target.value
         })}
      />
       
     <p className="mt-4">Description</p>
      <textarea
        name="description"
        placeholder="Problem Description"
        className="border p-2 rounded bg-gray-100"
        value= {problem.description}
        onChange={(e) =>
             setProblem({ ...problem,description:e.target.value
         })}
      />
      
      <p  className="mt-4">Difficulty</p>
      <select
        name="difficulty"
        className="border p-2 rounded bg-gray-100"
        value= {problem.difficulty}
       onChange={(e) =>
             setProblem({ ...problem,difficulty:e.target.value
         })}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      
      <p  className="mt-4">Tags</p>
      <input
        type="text"
        name="tags"
        className="border p-2 rounded bg-gray-100 "
        value = {problem.tags}
        onChange={(e) => {
            setProblem({...problem,tags:e.target.value});
        }}
      />
       
      <p  className="mt-4">Constraints</p>
      <input
        rows={5}
        cols={50}
        name="constraints"
        placeholder="Sample Input"
        className="border p-2 rounded bg-gray-100"
        value = {problem.constraints}
        onChange={(e) => {
            setProblem({...problem,constraints:e.target.value});
        }}
      />
     
      <p  className="mt-4">Visible Tescase</p>
     <textarea
        rows={14}
        cols={50}
        placeholder="Sample input"
        className="border p-2 rounded bg-gray-100 "
        value={JSON.stringify(problem.visibleTestCases , null, 2)}
        onChange={(e) => {
          try {
            setProblem({...problem,visibleTestCases:JSON.parse(e.target.value)});
          } catch (err) {
          }
        }}
      />
      
     <p  className="mt-4">Hidden Tescase</p>
      <textarea
        rows={15}
        cols={50}
        placeholder="Sample Output"
        className="border p-2 rounded bg-gray-100 "
        value={JSON.stringify(problem.hiddenTestCases , null, 2)}
        onChange={(e) => {
          try {
            setProblem({...problem,hiddenTestCases:JSON.parse(e.target.value)});
          } catch (err) {
          }
        }}
      />
      
      <div className="grid grid-cols-1 gap-2 border-2 border-black/80">
      <p className="text-xl text-green-400 m-1">Add New tescase</p>
      <input className="bg-gray-100 m-1 p-1" placeholder="input" value={addtc.input}
        onChange={(e)=>{setaddtc({...addtc,input:e.target.value})}}></input>
      <input className="bg-gray-100 m-1 p-1" placeholder="output " value={addtc.output}
        onChange={(e)=>{setaddtc({...addtc,output:e.target.value})}}></input>
      <button className="bg-green-500 m-1" onClick={addHiddenTestcase}>Add</button>
      </div>

      <p className="mt-4">Reference solution</p>
      <textarea
        name="solution"
        rows="10"
        placeholder="solution code"
        className="border p-2 rounded bg-gray-100 "
        value={JSON.stringify(problem.referenceSolution , null, 2)}
        onChange={(e) => {
          try {
            setProblem({...problem,referenceSolution:JSON.parse(e.target.value)});
          } catch (err) {
          }
        }}
      />

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded my-6 mb-10">
        Update Problem
      </button>

    </form>}
 

 </>);

}