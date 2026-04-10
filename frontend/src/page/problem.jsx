import React, { useState ,useEffect} from "react";
import { Outlet , useNavigate} from "react-router-dom";
import { ClipLoader } from "react-spinners";


export default function Problem() {
    const navigate = useNavigate();

  const problem = [
    { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array","HashMap"] },
    { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String","Sliding Window"] },
    { id: 3, title: "Merge K Lists", difficulty: "Hard", tags: ["LinkedList","Heap"] },
    { id: 4, title: "Binary Search", difficulty: "Easy", tags: ["Binary Search","DP"] }
  ];
  
  const [difficulty, setDifficulty] = useState("All");
  const [tag, setTag] = useState("All");
  const [problems, setproblem] = useState(null);
  const [loading, setLoading] = useState(null);

  const filteredProblems = problems?.filter((p) => {
    return (
      (difficulty === "All" || p.difficulty === difficulty) &&
      (tag === "All" || p.tags.includes(tag))
    );
  });
  useEffect(() => { 
    setLoading("Loading");
    async function api() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/problem/getAllProblem`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include"
      });
      const data = await response.json();
      setproblem(data);
      setLoading(null);
      console.log(problems);
     }
      api();
    },[]);
  return (
    <div className="bg-gray-100 min-h-screen">
    {!loading && 
    <div className="">
      <h1 className="w-[80%] mx-auto text-3xl font-bold mb-6 pt-3 text-blue-500 text-center">
        Premium problems
      </h1>

      {/* Filters */}
      <div className="w-[80%] mx-auto gap-4 mb-6  items-center flex justify-between">

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

    
      <table className="w-[80%] mx-auto ">
      
        <thead className="text-center bg-black text-white rounded-lg ">
          <tr className="grid grid-cols-3">
            <th className="p-3 text-center text-semibold font-serif" >Title</th>
            <th className="p-3 text-center text-semibold  font-serif">Difficulty</th>
            <th className="p-3 text-center text-semibold  font-serif">Tags</th>
          </tr>
        </thead>
    
        <div className="mt-1"></div>
        <tbody >
          {filteredProblems?.map((p) => (
            <tr key={p.id} className="rounded-lg grid grid-cols-3 text-center border-gray-100 bg-white border-3 border-gray-100 hover:bg-black/8">
              
              <td className="p-3 text-black  font-bold text-center cursor-pointer  hover:text-green-500" onClick={() => {navigate(`/solve/${p._id}`)}}>
                  {p.title}
              </td>

              <td className={`text-center p-3 ${
                p.difficulty === "Easy"
                  ? "text-green-600"
                  : p.difficulty === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
                <span className="text-center">{p.difficulty}</span>
              </td>

               <td className="p-3 text-center">
                 <button onClick={() => {navigate(`/solve/${p._id}`)}} className="bg-blue-500/95 hover:bg-blue-600/90 px-3 py-1 rounded cursor-pointer">Solve</button>
                </td> 
            </tr>
          ))}
        </tbody>

      </table> 

    </div>}
     {loading != null && (
   <div className="grid place-items-center min-h-screen text-xl pr-2 pb-20">
    
     <div className="flex flex-col items-center gap-3">
      <ClipLoader size={42} color="#3b82f6" />
      <p>{loading}</p>
     </div>
  </div>
   )}
  </div>);
}