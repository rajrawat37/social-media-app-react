import React, { useState } from "react";
import { urlFor } from "../client";
import { Link, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { fetchUser } from "../utils/fetchUser";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { BsFillArrowUpCircleFill} from "react-icons/bs";

// import { client, urlFor } from "../client";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === user.googleId
  )?.length;

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="mt-5 rounded-lg w-full hover:scale-125 transition-all duration-500 cursor-pointer"
          alt="user-post"
          src={urlFor(image).width(150).url()}
        />
        {postHovered && (
          <div className="absolute top-0 h-full w-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex gap-2">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className=" bg-white w-9 h-9 mt-4 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 
                hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            {alreadySaved ? <button>Saved</button> : <button>Save</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
