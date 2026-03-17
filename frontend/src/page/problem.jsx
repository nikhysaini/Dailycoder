import React, { useState } from "react";
import { Outlet , useNavigate} from "react-router-dom";


export default function Problem() {
  const navigate = useNavigate();
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array","HashMap"] },
    { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String","Sliding Window"] },
    { id: 3, title: "Merge K Lists", difficulty: "Hard", tags: ["LinkedList","Heap"] },
    { id: 4, title: "Binary Search", difficulty: "Easy", tags: ["Binary Search","DP"] }
  ];
  
  const [difficulty, setDifficulty] = useState("All");
  const [tag, setTag] = useState("All");

  const filteredProblems = problems.filter((p) => {
    return (
      (difficulty === "All" || p.difficulty === difficulty) &&
      (tag === "All" || p.tags.includes(tag))
    );
  });

  return (
    
    <div className="p-8">

      <h1 className="lg:w-[84%] md:w-[90%] sm:w-[96%] mx-auto text-2xl font-bold mb-6">
        Premium problems
      </h1>

      {/* Filters */}
      <div className="lg:w-[84%] md:w-[90%] sm:w-[96%] mx-auto flex gap-4 mb-6 items-center">

        {/* Difficulty Filter */}
        <select
          className="border p-2 rounded "
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}
        >
          <option className="text-black">All</option>
          <option className="text-black">Easy</option>
          <option className="text-black">Medium</option>
          <option className="text-black">Hard</option>
        </select>

        {/* Tag Filter */}
        <select
          className="border p-2 rounded"
          value={tag}
          onChange={(e)=>setTag(e.target.value)}
        >
          <option className="text-black">All</option>
          <option className="text-black">Array</option>
          <option className="text-black">HashMap</option>
          <option className="text-black">String</option>
          <option className="text-black">Stack</option>
          <option className="text-black">Sliding Window</option>
          <option className="text-black">DP</option>
          <option className="text-black">Graph</option>
          <option className="text-black">LinkedList</option>
          <option className="text-black">Heap</option>
          <option className="text-black">Binary Search</option>
        </select>

      </div>

    
      <table className="lg:w-[84%] md:w-[90%] sm:full mx-auto border">

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
              
              <td className="p-3 text-white font-bold text-center cursor-pointer  hover:text-green-500" onClick={() => {navigate(`/solve/${p.id}`)}}>
                  {p.title}
              </td>

              <td className={`text-center p-3 ${
                p.difficulty === "Easy"
                  ? "text-green-600"
                  : p.difficulty === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
                {p.difficulty}
              </td>

               <td className="p-3 text-center">
                 <button onClick={() => {navigate(`/solve/${p.id}`)}} className="bg-blue-600 px-3 py-1 rounded cursor-pointer">Solve</button>
                </td> 
            </tr>
          ))}
        </tbody>

      </table> 

    </div>
  );
}