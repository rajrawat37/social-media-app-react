import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { HiMenu, HiHome } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import logo from "../assets/logo.png";

function Sidebar({ user, setToggleSidebar }) {
  const categories = [
    { name: "Animals" },
    { name: "Beauty" },
    { name: "Coding" },
    { name: "Gaming " },
    { name: "Entertainment" },
    { name: "Education" },
    { name: "Photography" },
    { name: "Travel" },
    { name: "Wallpapers" },
  ];

  const handleCloseSidebar = () => {
     setToggleSidebar(false);
  };

  return (
    <>
      <div class="min-h-screen  flex flex-row bg-white">
        <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
          <div class="flex items-center justify-center h-16  shadow-md">
            <h1 class="text-xl uppercase text-indigo-500">Logo</h1>
          </div>
          <li>
            <Link
              to="/"
              onClick={() => handleCloseSidebar()}
              className="flex flex-row items-center h-12 transform hover:bg-blue-100 rounded-full mt-2 mx-2 transition-transform ease-in-out duration-200 text-gray-500 hover:text-gray-800"
            >
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i class="bx bx-home"></i>
              </span>
              <span class="text-sm font-bold">Home</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              class="flex flex-row items-center h-12 text-gray-500 hover:text-gray-800"
            >
              <span class="ml-2 inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i class="bx bx-globe"></i>
              </span>
              <span class="text-sm font-medium">Discover Categories</span>
            </a>
          </li>
          <div class="flex flex-col ">
            {categories.slice(0, categories.length - 1).map((category) => (
              <div>
                <Link
                  to={`/category/${category.name}`}
                  onClick={() => handleCloseSidebar()}
                  className="flex flex-row items-center h-12 transform hover:bg-indigo-200 rounded-full mt-2 mx-2  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    {/* Map icons here for the categories */}
                  </span>
                  <span class="text-sm font-bold">{`${category.name}`}</span>
                </Link>
              </div>
            ))}
          </div>
          {user && (
            <div className="flex items-center justify-center mt-4 bg-white shadow-lg  cursor-pointer ml-4 py-2">
              <Link
                to={`user-profile/${user?._id}`}
                className=""
                onClick={() => handleCloseSidebar()}
              >
                <img
                  src={user.image}
                  className="w-6 h-6 rounded-full"
                  alt="user-profile"
                />
              </Link>
              <div className="text-sm ml-2">{user.userName}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
