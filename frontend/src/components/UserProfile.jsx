import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { fetchUser } from "../utils/fetchUser";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-32 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-32 outline-none";

const UserProfile = ({ user }) => {
  // const [user, setUser] = useState();
  const [text, setText] = useState("Created");
  const [savedPins, setSavedPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgUrl, setBgUrl] = useState("");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const fetchSavedPins = async () => {
    const res = await fetch(`http://localhost:4000/api/pins/saved/${userId}`);
    const data = await res.json();
    const pinIds = data.savedPins; // array of pin IDs
    fetchUnsplashPins(pinIds); // call Unsplash after getting pins
  };

  const fetchUnsplashPins = async (pinIds) => {
    try {
      const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

      const unsplashData = await Promise.all(
        pinIds.map(async (id) => {
          const res = await fetch(
            `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
          );
          return res.ok ? res.json() : null;
        })
      );

      const filtered = unsplashData.filter(Boolean); // remove nulls
      setSavedPins(filtered); // state for displaying images
    } catch (err) {
      console.error("Error fetching from Unsplash:", err);
    }
  };

  useEffect(() => {
    fetchSavedPins();
    console.log(user);
  }, []);

  const removeUser = () => {
    localStorage.clear();
    googleLogout();
    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-60 2xl:h-510 shadow-lg object-cover"
              src="https://picsum.photos/800/600"
              alt="user-pic"
            />

            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              referrerPolicy="no-referrer"
              src={user.picture}
              alt="dp"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">{user.name}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>
        {/* To display saved Pins of the logged in User */}
        <div className="px-2">
          <MasonryLayout disable={true} pins={savedPins} userId={userId} />
        </div>

        {/* Display message if no pins are found */}
        {savedPins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
