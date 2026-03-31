import { Outlet , useNavigate,useLocation } from "react-router-dom";
import {FaUser,FaCrown} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo1.png";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth")) || null;

  const logout = async()=>{
   try{
     const response = await fetch("http://localhost:3000/user/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json","token":auth.token},
       credentials: "include"
    })
    const data = await response.json();
    console.log(response);
   if(!response.ok) throw new Error(data.message || "Logout failed");
   else
   {
    localStorage.removeItem("auth");
    navigate("/");
    alert("Logout successfully");
   }
      
  }
  catch(e)
  {console.log(e);}
  }

  return (
    <>
      <nav className="bg-white shadow-md px-8 py-2.5 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold text-blue-500">
          <a href="/"><img src={logo} className="w-[150px] h-[28px]"></img></a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex  space-x-8 text-gray-700 font-bold">
          {auth!=null && auth.role==="admin" && <a href="/admin" className="font-bold hover:text-blue-600">Admin Panel</a>}
          {auth===null && <a href="/" className="font-bold hover:text-blue-600">Home</a>}
          {auth!=null && auth.role!="admin" && <a href="/" className="font-bold hover:text-blue-600">Home</a>}
          <a href="/problem" className="font-bold hover:text-blue-600">Problems</a>
          <a href="/compete" className="font-bold hover:text-blue-600">Compete</a>
          <a href="interview" className="font-bold hover:text-blue-600">Interview</a>
        </div>

        {/* Login */}
      <div className="">

       {auth===null &&
        <button onClick={ () => navigate("/login")} className=" bg-blue-700 group text-xl font-semibold text-white px-6 py-1 rounded-md">
          Login  </button> }
        
        
        {auth!=null && location.pathname!="/profile" &&
        <button onClick={ () => navigate("/profile")} className=" bg-white group  hover:bg-gray-200 transition cursor-pointer rounded-lg text-xl flex items-center gap-1 font-semibold text-black px-3 py-1">
          <span><FaUser className="text-2xl bg-gray-300 rounded-full p-0.5 pt-[6%]" /> </span> 
          <span className="text-xl">{auth.name}</span>
          {/* <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg hidden group-hover:block">
           <p className="p-2 hover:bg-gray-100 text-black cursor-pointer">My Profile </p>
           <p className="p-2 hover:bg-gray-100  text-black cursor-pointer"> Logout</p>
         </div> */}
        </button> }
        {auth!=null && location.pathname==="/profile" &&
        <button onClick={logout} className="text-black flex justify-between cursor-pointer gap-1 rounded items-center text-lg hover:bg-gray-200 px-3 py-1 font-semibold">
        <FiLogOut size={18} />
        <span className="pb-0.5"> Logout</span>
        </button> }
        </div>

      </nav>

      <Outlet />
        
    </>  
  );
}