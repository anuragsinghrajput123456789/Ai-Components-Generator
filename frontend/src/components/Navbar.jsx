import React from "react";
import { IoMdSunny } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
const Navbar = () => {
  return (
   <>
    <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800">
      <div className="logo">
        <h3 className="text-[25px] font-[700] sp-text">GenUI</h3>
      </div>
      <div className="icons flex items-center gap-[15px]">
        <div className="icon"><IoMdSunny /></div>
        <div className="icon"><FaUser /></div>
        <div className="icon"><IoMdSettings /></div>
      </div>
    </div>
      
   </>
  );
};

export default Navbar;


