import React, { useState } from "react";
import { Outlet , useNavigate} from "react-router-dom";

export default function AdminDelete() {
const navigate = useNavigate();
const [search, setSearch] = useState("");
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array","HashMap"] },
    { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String","Sliding Window"] },
    { id: 3, title: "Merge K Lists", difficulty: "Hard", tags: ["LinkedList","Heap"] },
    { id: 4, title: "Binary Search", difficulty: "Easy", tags: ["Binary Search","DP"] }
  ];

  const DeleteProblem = async(id) => { 
  console.log(id);
  const response = await fetch(`http://localhost:3000/problem/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
       credentials: "include"
    });
    const data = await response.json();
    console.log(data);
  };

  const filteredProblems = problems.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div className="lg:p-8 md:p-6 sm:p-2">

      <h1 className="lg:w-[84%] md:w-[90%]  text-blue-500 text-center text-2xl font-semibold mb-6">
        Delete any problem
      </h1>
      
      {/* Search Any problem */}
      <div className="lg:w-[84%] md:w-[90%] sm:full mt-3 mx-auto">
        <input type="text" placeholder="Search any problem"
        className="border p-2" 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}      
        ></input>
      </div>
      <table className="lg:w-[84%] md:w-[90%] sm:w-full mx-auto border mt-3">

        <thead className="bg-white text-black border-3 border-black">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Tags</th>
          </tr>
        </thead>

        <tbody>
          {filteredProblems.map((p) => (
            <tr key={p.id} className="border-t bg-gray-800 border-2 border-gray-900 ">
              
              
              <td className="p-3 text-white font-bold cursor-pointer items-center hover:text-green-500" onClick={() => {navigate(`/solve/${p.id}`)}}>
                  {p.title}
              </td>

              <td className={`p-3 ${
                p.difficulty === "Easy"
                  ? "text-green-600"
                  : p.difficulty === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
                {p.difficulty}
              </td>

               <td className="p-3">
                 <button onClick={() => {DeleteProblem(`${p.id}`)}} className="bg-red-400 px-3 py-1 rounded cursor-pointer hover:bg-red-700">Delete</button>
                </td> 
            </tr>
          ))}
        </tbody>

      </table> 

    </div>
  );

}