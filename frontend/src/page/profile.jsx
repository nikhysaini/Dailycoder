import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import {FaUser,FaCrown,FaCheckCircle } from "react-icons/fa";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Outlet , useNavigate} from "react-router-dom";
import { ClipLoader } from "react-spinners";


export default function Profile() {
  const [user,setuser] = useState({firstname:null,lastname:null,email:null,about:null,institution:null});
  const auth = JSON.parse(localStorage.getItem("auth"))||null;
  const navigate = useNavigate();
  const endDate = new Date();
  const startDate = new Date();
  const [loading, setLoading] = useState(false);

  startDate.setDate(endDate.getDate() - 365); 
   const values = [
    { date: "2026-03-01", count: 1 },
    { date: "2026-03-02", count: 100 },
    { date: "2026-03-03", count: 0 },
    { date: "2026-03-04", count: 5 },
    { date: "2026-03-05", count: 2 },
  ];

   const series = [44, 55, 13];

  const options = {
    chart: {
      type: "donut"
    },

    labels: ["Easy", "Medium", "Hard"],

    colors: ["#22c55e", "#facc15", "#ef4444"],

    legend: {
      position: "bottom"
    }
  };

  useEffect(() => { 
      setLoading(true);
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
       setuser({...user,firstname:data.user.firstname,lastname:data.user.lastname,
               email:data.user.email,about:data.user.about});
       setLoading(false);
       }
       api();
       
     },[]);
  

  return ( <>

  {!loading && auth!=null && ( 
  <div className="bg-black min-h-screen">

    <div className="grid lg:grid-cols-2 md:grid-cols-1 text-white sm:grid-cols-1 gap-3 p-5 pt-15">
     <div className="justify-items-center">
        <button className="text-xl cursor-pointer flex items-center border-solid rounded-lg border-2 border-gray-700   text-purple-600 rounded px-3 py-1 mt-2 mb-3"><FaCrown/> GetPremium</button>
        <FaUser className="text-9xl bg-gray-300 rounded-full p-0.5 pt-[6%]" /> 
        <p className="text-3xl font-semibold mt-2.5">{user.firstname} {user.lastname}</p>
       <div className="flex justify-between items-center">
        <p className="text-lg mt-0.5">{user.email}</p>
        <FaCheckCircle color="green" size={20} className="mt-1 ml-0.5" />
       </div>
        <p className="text-lg mt-0.5 rounded-lg p-2 py-1.5 mt-1 w-fit">{user.about}</p>
        <div className="text-center"><button onClick={ () => navigate("/editprofile")} className=" text-center text-lg cursor-pointer  items-center  font-semibold bg-blue-600 text-white rounded-lg px-6 py-2 mt-6">Edit Profile</button></div>
     </div>
     <div className="">
       <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3">
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Problem</p> <p className="text-3xl font-bold text-center">100</p></span>
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Total Days</p> <p className="text-3xl font-bold text-center">20</p></span>
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Rank</p> <p className="text-3xl font-bold text-center">1</p></span>
        </div>
      <div className="bg-gray-950 border shadow-xl border-gray-800 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-3 p-[1.5%] pt-[3%] mt-[3%]">
        <div >
          <Chart options={options} series={series} type="donut" height={260} />
        </div>
        <div className="w-full grid grid-cols-1 gap-2 pt-[3%]">
         <span className="flex text-xl justify-between items-center rounded-lg  bg-gray-700 px-[3.5%] pr-[5%]"><div className={ `text-green-500 ` } >Easy</div><div>20</div></span>
         <span className="flex text-xl justify-between items-center rounded-lg   bg-gray-700 px-[3.5%] pr-[5%]"><div className={` text-yellow-500 rounded text-center `} >Medium</div><div>20</div></span>
         <span className="flex text-xl justify-between items-center rounded-lg   bg-gray-700 px-[3.5%] pr-[5%]"><div className={` text-red-500 rounded text-center  `} >Hard</div><div>20</div></span>
        </div>
      </div>
     </div>
   </div>

   <div className="w-full px-[5%] py-[5%]">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
      />
    </div>
  
 </div> )}
  {loading && auth!=null && (
      <div className="grid place-items-center min-h-screen text-xl pr-2 pb-20">
       <div><ClipLoader size={42} color="#3b82f6" className="ml-3.5"></ClipLoader> <p>Loading</p></div>
      </div>
      )}
  
  </>);
}


