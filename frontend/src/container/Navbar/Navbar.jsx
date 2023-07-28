import { HiMenu } from "react-icons/hi";
import {
  IoAddCircleOutline,
  IoBookmarksOutline,
  IoSearch,
} from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";

import React, { useState, useRef, useEffect } from "react";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components";

const Navbar = ({user}) => {

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleCloseSidebar = () => {
    if(closeToggle)
      closeToggle(false);
  }
  return (
    <>
      <div className="flex w-1/6  justify-between p-2 items-center">
        <HiMenu
          fontSize={30}
          className=" cursor-pointer"
          onClick={()=>handleCloseSidebar}
        />
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-28  items-center mr-4 justify-center "
          />
        </Link>
      </div>

      <div className="flex  p-2 w-5/6  justify-between">
        <div class=" w-5/6">
          <form>
              <div class="flex bg-gray-200 rounded-3xl">
                <div class="flex rounded-3xl outline-none overflow-hidden w-full">
                  <IoSearch
                    fontSize={25}
                    className=" mt-2 ml-2 cursor-pointer rounded-md "
                  />
                  <input
                    type="text"
                    class="w-full p-2  rounded-md outline-none bg-gray-200 rounded-r-none "
                  />
                  <button class="bg-green-300 text-white px-6 text-lg font-semibold rounded-r-md">
                    Go
                  </button>
                </div>
              </div>
          </form>
        </div>
        <IoAddCircleOutline fontSize={25} className="mt-2  cursor-pointer " />
        <IoBookmarksOutline fontSize={25} className="mt-2 cursor-pointer " />
        <div className="mr-3">
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-10 rounded-full " />
          </Link>
        </div>
      </div>
      {toggleSidebar && (
          <div className="fixed w-1/4 bg-white overflow-y-auto h-screen shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer "
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
    </>
  );
};

export default Navbar;
