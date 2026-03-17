import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

export default function AdminUpdateFurther() {
  const { id } = useParams();
  const [problem,setProblem] = useState(null)

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
      setProblem(data);
      console.log(data);
     }
      api();

    },[]);

  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  const handleTestcaseChange = (e, index) => {
  const { name, value } = e.target;

  const newTestcases = [...problem.visibleTestCases];
  newTestcases[index][name] = value;

  setProblem({
    ...problem,
    visibleTestCases: newTestcases
  });
};

const handlehiddenTestcaseChange = (e, index) =>{
const { name, value } = e.target;

  const newTestcases = [...problem.hiddenTestCases];
  newTestcases[index][name] = value;

  setProblem({
    ...problem,
    hiddenTestCases: newTestcases
  });
  console.log(problem.hiddenTestCases)
}

  const handleSubmit = async(e) => {
  }
 return ( <>
 <h1 className=" text-blue-500  p-2 text-center text-3xl font-semibold mt-4 border-1 border-gray-900">
        Update a problem
      </h1>
 {problem!=null && <form className="w-[80%] mx-auto text-center flex flex-col gap-3" onSubmit={handleSubmit}>
      
      <p className="mt-4 ">Title</p>
      <input
        type="text"
        name="title"
        value={`${problem.title}`}
        className="border p-2 rounded bg-gray-800 "
        onChange={handleChange}
      />
       
     <p className="mt-4">Description</p>
      <textarea
        name="description"
        placeholder="Problem Description"
        value={`${problem.description}`}
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      />
      
      <p  className="mt-4">Difficulty</p>
      <select
        name="difficulty"
        value={`${problem.difficulty}`}
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      
      <p className="mt-4">Tags</p>
      <input
        type="text"
        name="tags"
        value={`${problem.tags}`}
        placeholder="Tags (array, dp, graph)"
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      />
       
      <p  className="mt-4">Constraints</p>
      <textarea
        name="constraints"
        placeholder="Sample Input"
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      />
     
      <p  className="mt-4">Visible Tescase</p>
      {problem.visibleTestCases.map((tc, index) => (
    <div key={index} className="flex flex-col gap-2">
    
    <textarea
      name="input"
      value={tc.input}
      placeholder="Sample Input"
      className="border p-2 rounded bg-gray-800"
      onChange={(e) => handleTestcaseChange(e, index)}
    />

    <textarea
      name="output"
      value={tc.output}
      placeholder="Sample Output"
      className="border p-2 rounded bg-gray-800"
      onChange={(e) => handleTestcaseChange(e, index)}
    />

    </div>
   ))}
      
     <p  className="mt-4">Hidden Tescase</p>
     {problem.hiddenTestCases.map((tc, index) => (
    <div key={index} className="flex flex-col gap-2">
    
     <textarea
      name="input"
      value={tc.input}
      placeholder="Sample Input"
      className="border p-2 rounded bg-gray-800"
      onChange={(e) => handlehiddenTestcaseChange(e, index)}
     />

     <textarea
      name="output"
      value={tc.output}
      placeholder="Sample Output"
      className="border p-2 rounded bg-gray-800"
      onChange={(e) => handlehiddenTestcaseChange(e, index)}
     />

      </div>
     ))}

      <button className="bg-blue-500 text-white p-2 rounded my-6 mb-10">
        Create Problem
      </button>

    </form>}
 

 </>);

}