import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/logo.png";

function Sidebar({ user, closeToggle }) {

  const handleCloseSidebar = () => {
    if(closeToggle)
      closeToggle(false);
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" className="flex px-5 items-center" onClick={handleCloseSidebar}>
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
