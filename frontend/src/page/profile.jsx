import Chart from "react-apexcharts";
import {FaUser,FaCrown} from "react-icons/fa";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";



export default function Profile() {
  const endDate = new Date();
  const startDate = new Date();
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

  return (
  <div className="bg-black min-h-screen">

    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-3 p-5 pt-15">
     <div className="justify-items-center">
        <button className="text-xl cursor-pointer flex items-center border-solid rounded-lg border-2 border-gray-700   text-purple-600 rounded px-3 py-1 mt-2 mb-3"><FaCrown/> GetPremium</button>
        <FaUser className="text-9xl bg-gray-300 rounded-full p-0.5 pt-[6%]" /> 
        <p className="text-3xl font-semibold mt-2.5">Nikhil Saini</p>
        <p className="text-lg mt-0.5">Email</p>
        <button className="text-lg cursor-pointer  items-center font-semibold bg-blue-600 text-white rounded-lg px-6 py-2 mt-6">Edit Profile</button>
     </div>
     <div className="">
       <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3">
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Problem</p> <p className="text-3xl font-bold text-center">100</p></span>
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Total Days</p> <p className="text-3xl font-bold text-center">20</p></span>
         <span className="bg-gray-950 border border-gray-700 text-white p-3"><p className="text-center">Rank</p> <p className="text-3xl font-bold text-center">1</p></span>
        </div>
      <div className="bg-gray-950 border border-gray-800 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-3 p-[1.5%] pt-[3%] mt-[3%]">
        <div >
          <Chart options={options} series={series} type="donut" height={260} />
        </div>
        <div className="w-full grid grid-cols-1 gap-2 pt-[3%]">
         <span className="flex justify-between items-center rounded-lg  bg-gray-700 px-[3.5%] pr-[5%]"><div className={ `text-green-500 ` } >Easy</div><div>20</div></span>
         <span className="flex justify-between items-center rounded-lg   bg-gray-700 px-[3.5%] pr-[5%]"><div className={` text-yellow-500 rounded text-center `} >Medium</div><div>20</div></span>
         <span className="flex justify-between items-center rounded-lg   bg-gray-700 px-[3.5%] pr-[5%]"><div className={` text-red-500 rounded text-center  `} >Hard</div><div>20</div></span>
        </div>
      </div>
     </div>
   </div>

   <div className="w-full px-[5%] pt-[5%]">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
      />
    </div>
  
 </div>

  );
}


