import React, { useState, useRef, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components/";
import { client } from "../client";
import { HiMenu } from "react-icons/hi";
import Pins from "./Pins";
import Navbar from "../components/Navbar";
import { userQuery } from "../utils/data";
import homeLogo from "../assets/homeLogo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  // console.log("User info is : ", userInfo);

  useEffect(() => {
    (async () => {
      // console.log("Id is : ", userInfo?.sub);
      const query = userQuery(userInfo?.sub);

      // console.log("Query is : ", query);
      const data = await client.fetch(`${query}`);
      console.log("Data is : ", data[0]);

      setUser(data[0]);
    })();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row  flex-col h-screen">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen ">
        <Sidebar user={user && user} />
      </div>

      {/* Mobile Sidebar */}
      <div className="flex md:hidden  flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={homeLogo} alt="logo" className="w-28" />
          </Link>
          
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 transition duration-150 ease-in-out">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      
      <div className="pb-2 flex-1 h-screen  overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
      
    </div>
  );
};
export default Home;
