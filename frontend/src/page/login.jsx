import React, { useState } from "react";
import { Outlet , useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = JSON.parse(localStorage.getItem("auth"))||null;
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({email, password });
    async function api() {
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password ,
      }),
       credentials: "include"
    })
    const data = await response.json();
    if(!response.ok)
    {
       setLoading(false);
       console.log(response);
       throw new Error("Login failed");
    }
    localStorage.setItem("auth", JSON.stringify({
    token: data.token,
    name: data.user.name,
    email: data.user.email,
    role:data.user.role
   }));
    console.log(data);
    setLoading(false);
    navigate("/");
    alert("Login successfully");

   }      
   api();
   
  };

  return (<>
    
    {!loading && 
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

      <div className="bg-white p-8 rounded-xl w-[80%] md:w-[30%]">

       <h2 className="text-green-600 text-2xl text-center mb-2 font-bold">Login </h2>

        <p className="text-gray-500 text-center mb-6"> Join our coding community </p>

        <form onSubmit={handleSignup} className="space-y-4">

          <p className="text-lg mb-2 text-black"> Email : </p>
          <input type="email" placeholder="Email address"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={email} onChange={(e)=>setEmail(e.target.value)} required />
          
          <p className="text-lg my-0 py-0 text-black" space-b-1> Password: </p>
          <input type={showPassword ? "text" : "password"} placeholder="Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={password} onChange={(e)=>setPassword(e.target.value)} required/>
         <span  className="flex items-center space-t-1 py-0 text-black" onClick={() => setShowPassword(!showPassword)}>
          {!showPassword?"Show" :"Hide" } password {showPassword ? <FaEyeSlash size={21} className="pl-1 pt-1" /> : <FaEye size={21} className="pl-1 pt-1" />}</span>

          <button type="submit"
            className="w-full bg-green-600 text-white p-2 pt-0.5 rounded-md hover:bg-green-700 transition"
          > Login </button>

        </form>

         <p className="text-md font-semibold text-center mt-5 text-gray-600 "> Register now ? 
          <a href="/signup" className="text-green-600 font-semibold ml-1"> Signup </a>
         </p>

      </div>

    </div>}
     {loading &&  (
      <div className="grid place-items-center min-h-screen text-xl pr-2 pb-20">
       <div><ClipLoader size={42} color="#3b82f6" className="ml-3.5"></ClipLoader> <p>Loading</p></div>
      </div>
      )}
  </>);
}