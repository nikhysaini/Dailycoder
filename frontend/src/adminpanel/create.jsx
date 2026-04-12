import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function AdminCreate() {
  const auth = JSON.parse(localStorage.getItem("auth"))||null;
  const [loading, setLoading] = useState(null);
  const [addtc,setaddtc] = useState({input:"" , output:"" })
  const [problem,setProblem] = useState({
  title:null,
  difficulty:"Easy",
  description:null,
  tags:"Array,Dp",
  constraints:"1<=n<=1e5 , 1<=arr[i]<=1e9",
  visibleTestCases:[
    { sinput:"arr =[1,2,5] , k = 5",
      input: "1 2 5 5",
      output: "5",
      explanation: "2 + 3 equals 5"
    },
    { sinput:"arr =[6,1,5] , k = 2",
      input: "6 1 5 2",
      output: "4",
      explanation: "-1 + 5 equals 4"
    }
  ],
  hiddenTestCases:[
        {
            "input": "10 20",
            "output": "30"
        },
        {
            "input": "100 250",
            "output": "350"
        }
    ],
  "referenceSolution": [
        {
            "language": "C++",
            "completeCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}"
        },
        {
            "language": "Java",
            "completeCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
        },
        {
            "language": "Python",
            "completeCode": ""
        }
    ]
  })
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
    setLoading("Loading");
    const tg = problem.tags.split(",") , ct = problem.constraints.split(",");
    const tocreate = {...problem,tags:tg,constraints:ct};
    console.log(tocreate); 
   async function api() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/problem/create`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":auth.token
        },
        body: JSON.stringify({
        ...tocreate
      }),
         credentials: "include"
      });
      console.log(response);
      setLoading(null);
      alert("Create successfully")
     }
     api();
  }
 return ( <>
 {loading===null && <div>
 <h1 className=" text-blue-500  p-2 text-center text-3xl font-semibold mt-4 ">
        Create a problem
      </h1>
 <form className="w-[80%] mx-auto text-center flex flex-col gap-3 bg-white">
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
        Create Problem
      </button>

    </form>
   </div> }

    {loading != null && (
      <div className="grid place-items-center min-h-screen text-xl pr-2 pb-20">
       
        <div className="flex flex-col items-center gap-3">
         <ClipLoader size={42} color="#3b82f6" />
         <p>{loading}</p>
        </div>
     </div>
      )}

 </>);

}