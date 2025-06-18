import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Pin = ({ disable, pin, isSaved, refreshSavedPins }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const {
    id,
    alt_description,
    urls: { small },
    user: { name: postedBy },
    links: { html: destination, download: downloadUrl },
  } = pin;

  // console.log("Pin received  : " ,pin);[]

  //to extract user from browser's local storage
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  // function to delete Pin
  // const deletePin = (id) => {
  //   client.delete(id).then(() => {
  //     window.location.reload();
  //   });
  // };

  // function to savePin to Profile

  const savePinToProfile = async (userId, pinId, refreshSavedPins) => {
    console.log("savePinToProfile Function -> userId : ", userId);
    console.log("savePinToProfile Function -> pinId : ", pinId);

    try {
      const res = await fetch(
        `http://localhost:4000/api/pins/saved/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pinId }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Pin is already saved");
      }
      refreshSavedPins();
    } catch (error) {
      console.error("❌ Error saving pin:", error.message);
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${id}`)}
        className=" relative cursor-pointer mb-4 hover:shadow-lg overflow-hidden hover:scale-105 hover:opacity-80"
      >
        {pin && (
          <img
            className="rounded-xl w-full"
            src={small}
            alt={alt_description || "unsplash-post"}
          />
        )}

        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              {/* Download icon */}
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer" // This is for saftey so that new tab doesn't changes the URL or original tab
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>

              {/* Saved Icon */}

              {!disable &&
                (isSaved ? (
                  <button
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePinToProfile(user.sub, id, refreshSavedPins);
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    Save
                  </button>
                ))}
            </div>

            {/* LinkIcon */}
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill />
                </a>
              ) : undefined}

              {/* Delete Icon */}

              {/* {JSON.stringify(postedBy?._id) === JSON.stringify(user?.sub) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
