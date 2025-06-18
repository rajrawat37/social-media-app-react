import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PinDetail, CreatePin, Feed, Search } from "../components";
import Navbar from "../components/Navbar";

function Pins({ user }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className="max-h-max ">
        <Routes>
          <Route path="/" element={<Feed userId={user.sub} />}></Route>
          <Route path="/category/:categoryId" element={<Feed />}></Route>
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          ></Route>
          <Route path="/create-pin" element={<CreatePin user={user} />}></Route>
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default Pins;
