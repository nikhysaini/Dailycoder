import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

export default function AdminCreate() {
  const [problem,setProblem] = useState({
  title:null,
  difficulty:null,
  tags:null,
  constraints:null,
  VisibleTescase:null,
  HiddenTescase:null,
  solution:[
        {
            "language": "C++",
            "completeCode": ""
        },
        {
            "language": "Java",
            "completeCode": ""
        },
        {
            "language": "JavaScript",
            "completeCode": ""
        },
        {
            "language": "Python",
            "completeCode": ""
        }
    ],
  })
  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }
  const handleSubmit = async(e) => {
   console.log(problem); 
   async function api() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/problem/create`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ...problem
      }),
         credentials: "include"
      });
      console.log(response);
      alert("update successfully")
     }
      api();
  }
 return ( <>
 <h1 className=" text-blue-500  p-2 text-center text-3xl font-semibold mt-4 border-1 border-gray-900">
        Create a problem
      </h1>
 <form className="w-[80%] mx-auto text-center flex flex-col gap-3" onSubmit={handleSubmit}>
      
      <p className="mt-4 ">Title</p>
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        className="border p-2 rounded bg-gray-800 "
        onChange={handleChange}
      />
       
     <p className="mt-4">Description</p>
      <textarea
        name="description"
        placeholder="Problem Description"
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      />
      
      <p  className="mt-4">Difficulty</p>
      <select
        name="difficulty"
        className="border p-2 rounded bg-gray-800"
        onChange={handleChange}
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      
      <p  className="mt-4">Tags</p>
      <input
        type="text"
        name="tags"
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
      <textarea
        name="VisibleTescase"
        rows="8"
        placeholder="Sample Output"
        className="border p-2 rounded bg-gray-800 big-textarea"
        onChange={handleChange}
      />
      
     <p  className="mt-4">Hidden Tescase</p>
      <textarea
        name="HiddenTescase"
        rows="10"
        placeholder="Sample Output"
        className="border p-2 rounded bg-gray-800 "
        onChange={handleChange}
      />

      <p  className="mt-4">Reference solution</p>
      <textarea
        name="solution"
        rows="10"
        placeholder="solution code"
        className="border p-2 rounded bg-gray-800 "
        onChange={handleChange}
      />

      <button className="bg-blue-500 text-white p-2 rounded my-6 mb-10">
        Create Problem
      </button>

    </form>
 

 </>);

}