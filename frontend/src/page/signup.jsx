import React, { useState } from "react";
import { Outlet , useNavigate} from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  


  const handleSignup = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname:firstname,
        lastname:lastname,
        email: email,
        password: password ,
      }),
       credentials: "include"
    });
    const data = await response.json();
    if(!response.ok)
     throw new Error(data.message);
     setLoading(false);
     alert(data.message);
  }
  catch(e)
  {
    setLoading(false);
    alert(`${e.message}`)
  }
  };

  return ( <>
    {loading &&
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

      <div className="bg-white p-8 rounded-xl w-[90%] md:w-[30%]">

        <h2 className="text-green-600 text-2xl text-center mb-2 font-bold">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Join our coding community
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

         <p className="text-lg mb-2 text-black">
          First Name:
          </p>
          <input
            type="text"
            placeholder="Enter first name"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={firstname}
            onChange={(e)=>setfirstname(e.target.value)}
            required
          />

          <p className="text-lg mb-2 text-black">
          Last Name:
          </p>
          <input
            type="text"
            placeholder="Enter last name"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={lastname}
            onChange={(e)=>setlastname(e.target.value)}
            required
          />


          <p className="text-lg mb-2 text-black">
          Email :
          </p>
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          
          <p className="text-lg mb-2 text-black">
          Password:
          </p>
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          
          <p className="text-lg mb-2 text-black">
          Re-Type Password:
          </p>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-md font-semibold text-sm text-center mt-5 text-gray-600">
          Already have an account? 
          <a href="/login" className="text-green-600 font-semibold ml-1">
            Login
          </a>
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