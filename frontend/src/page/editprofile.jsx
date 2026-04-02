import React, { useState,useEffect } from "react";
import { Outlet , useNavigate} from "react-router-dom";

export default function EditProfile() {
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [about, setabout] = useState("");
  const [age, setage] = useState("");
  const [institution, setinstitution] = useState("");
  const auth = JSON.parse(localStorage.getItem("auth"))||null;
  const navigate = useNavigate();

  useEffect(() => { 
    console.log(auth);
    async function api() {
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getprofile`,{
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         "token":auth.token
       },
        credentials: "include"
     });
     const data = await response.json();
     console.log(data);
     setfirstname(data.user.firstname);
     setlastname(data.user.lastname);
     setemail(data.user.email);
     setage(data.user.age);
     setinstitution(data.user.institution);
     setabout(data.user.about);
    }
     api();
   
   },[]);


  const handleUpdate = (e) => {
    e.preventDefault();
    

    async function api() {
     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/editprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token":auth.token
      },
      body: JSON.stringify({
        email: email,
        firstname:firstname,
        lastname:lastname,
        age:age,
        institution:institution,
        about:about
      }),
       credentials: "include"
    })
    const data = await response.json();
   }  
   api();
   
  };

  return (
    <>
    { email!="" && <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

      <div className="bg-white p-8 rounded-xl w-[80%] md:w-[30%]">

       <h2 className="text-yellow-600 text-2xl text-center mb-2 font-bold">Edit Profile </h2>


        <form onSubmit={handleUpdate} className="space-y-4">

          <p className="text-lg mb-2 text-black"> First name : </p>
          <input type="text" placeholder="Email address"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={firstname} onChange={(e)=>setfirstname(e.target.value)} required />
          
           <p className="text-lg mb-2 text-black"> Last name : </p>
          <input type="text" placeholder="Email address"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={lastname} onChange={(e)=>setlastname(e.target.value)} required />

          <p className="text-lg mb-2 text-black"> Email : </p>
          <input type="email" placeholder="Email address"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={email} onChange={(e)=>setemail(e.target.value)} disabled />

          <p className="text-lg my-0 py-0 text-black"> Age: </p>
          <input type="text" placeholder="Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={age} onChange={(e)=>setage(e.target.value)} />

         <p className="text-lg my-0 py-0 text-black"> Institution: </p>
          <input type="text" placeholder="Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={institution} onChange={(e)=>setinstitution(e.target.value)} />

         <p className="text-lg my-0 py-0 text-black"> About: </p>
          <textarea type="text" placeholder="Password"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={about} onChange={(e)=>setabout(e.target.value)}/>

         <span  className="py-0 text-black" ></span>
          <button type="submit"
            className="cursor-pointer w-full bg-yellow-700 text-white p-2 rounded-md hover:bg-green-700 transition"
          > Update </button>

        </form>


      </div>

    </div>}
  </>
  );
}