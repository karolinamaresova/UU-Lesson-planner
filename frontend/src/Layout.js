import { Outlet } from "react-router-dom";

//import NavBar from "./NavBar";

export default function  Layout () {
  return (
    <>
    <div className="card-header">
        
      <h1>Menu</h1>
      <Outlet />
    </div>
    
  </>
  );
}