import {
  IoAddCircleOutline,
  IoBookmarksOutline,
  IoSearch,
} from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import { Sling as Hamburger } from "hamburger-react";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./index";

const Navbar = ({ user, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    console.log("✅ Navbar File is loaded ✅ ");
    console.log(user.picture);
  });

  if (!user) return null;

  const handleCloseSidebar = () => {
    setToggleSidebar(!toggleSidebar);
    console.log("Sidebar is clicked: ", toggleSidebar);
  };
  return (
    <>
      <div className="flex  py-2 w-full bg-white justify-between">
        <div className=" w-5/6">
          <div className=" flex text-gray-600 ">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate("/Search")}
              className="bg-gray-100 h-10 mt-1 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
            />
            <IoSearch
              fontSize={22}
              className=" mt-3  -ml-8  bg-gray-100 rounded-full "
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
        {user?.picture && (
          <div className="mr-3">
            <Link to={`user-profile/${user?.sub}`}>
              <img
                src={user?.picture}
                alt="logo"
                referrerPolicy="no-referrer"
                className="w-10 rounded-full "
              />
            </Link>
          </div>
        )}
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
