import { HiMenu } from "react-icons/hi";
import {
  IoAddCircleOutline,
  IoBookmarksOutline,
  IoSearch,
} from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { Sling as Hamburger } from "hamburger-react";
import React, { useState, useRef, useEffect } from "react";

import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";

const Navbar = ({ user, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const [toggleSidebar, setToggleSidebar] = useState(false);

  if (!user) return null;

  const handleCloseSidebar = () => {
    setToggleSidebar(!toggleSidebar);
    console.log("Sidebar is clicked: ", toggleSidebar);
  };
  return (
    <>
      <div className="flex w-1/6 bg-white  justify-between p-2 items-center">
        <Hamburger
          size={20}
          easing="ease-in"
          toggled={toggleSidebar}
          toggle={setToggleSidebar}
          onClick={() => handleCloseSidebar()}
        />
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-28  items-center mr-4 justify-center "
          />
        </Link>
      </div>

      <div className="flex  p-2 w-5/6 bg-white justify-between">
        <div class=" w-5/6">
          <div class=" flex text-gray-600 ">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate("/Search")}
              class="bg-gray-100 h-10 mt-1 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
            />
            <IoSearch
              fontSize={22}
              className=" mt-3   -ml-8 cursor-pointer bg-gray-100 rounded-full "
            />
          </div>
        </div>
        <IoAddCircleOutline
          fontSize={25}
          color="white"
          className="mt-2  cursor-pointer "
        />
        <IoBookmarksOutline
          fontSize={25}
          color="white"
          className="mt-2 cursor-pointer "
        />
        <Link to="create-pin">
          <BiPlus
            fontSize={25}
            color="bg-gray-100"
            className="mt-2 mr-8 cursor-pointer"
          />
        </Link>
        <div className="mr-3">
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-10 rounded-full " />
          </Link>
        </div>
      </div>
      {toggleSidebar && (
        <div className="fixed w-1/6  overflow-y-auto h-screen shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <Hamburger
              size={20}
              easing="ease-in"
              toggled={toggleSidebar}
              toggle={setToggleSidebar}
              onClick={() => handleCloseSidebar()}
            />
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}
    </>
  );
};

export default Navbar;
