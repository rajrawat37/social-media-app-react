import React, { useState, useRef, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components/";
import { client } from "../client";
import Pins from "./Pins";
import Navbar from "./Navbar/Navbar";
import { userQuery } from "../utils/data";


const Home = () => {
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear;

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
    <div className="bg-gray-50 flex-col duration-75 ease-out">
      <div className="flex flex-row w-full  shadow-md">
        <Navbar user={user && user}  />
      </div>

      <div
        className="pb-2 flex-1 bg-red-500 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
