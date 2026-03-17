
import { Route , Routes } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Signup from "./page/signup";
import Solve from "./page/solve";
import Profile from "./page/profile";
import Problem from "./page/problem";
import Navbar from "./component/nav";
import Admin from "./adminpanel/admin"
import AdminCreate from "./adminpanel/create"
import AdminUpdate from "./adminpanel/update"
import AdminDelete from "./adminpanel/delete"
import AdminUpdateFurther from "./adminpanel/updatefurthur";

function App() {
  {/* Hello ji*/}
  return (
    <>
    <Routes >
    <Route path='/' element={<Home></Home>}> </Route>
    <Route path='/profile' element={<Profile></Profile>}> </Route>
    <Route path='/solve/:id' element={<Solve></Solve>}> </Route>
    <Route path='/problem' element={<Problem></Problem>}> </Route>
    <Route path='/login' element={<Login></Login>}> </Route>
    <Route path='/signup' element={<Signup></Signup>}> </Route>
    <Route path='/admin' element={<Admin></Admin>}> </Route>
    <Route path='/admin/create' element={<AdminCreate></AdminCreate>}> </Route>
    <Route path='/admin/update' element={<AdminUpdate></AdminUpdate>}> </Route>
    <Route path='/admin/update/:id' element={<AdminUpdateFurther></AdminUpdateFurther>}> </Route>
    <Route path='/admin/delete' element={<AdminDelete></AdminDelete>}> </Route>
    </Routes>
     </>
  )
}

export default App

// How a Application run on a device (pc,mobile,ios) ?

// When we click on an app, it create a new process for that app . Each app run in its own process with a unique id . The OS allocates the RAM for a process . If memory become low , it removes the background app .
// The CPU sechduler assign time slice for a app . Multiple app can run concurrently using multitasking . The CPU store the information of the app , so it can continue after some time where he left .
// App can't access hardware directly . They request services from the system calls to OS.