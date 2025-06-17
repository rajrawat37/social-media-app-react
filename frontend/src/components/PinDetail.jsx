import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState([]);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [pinComments, setPinComments] = useState([]);
  const [addingComment, setAddingComment] = useState(false);

  // const user = JSON.parse(localStorage.getItem("user"));

  // 1️⃣ Fetch Pin Details + Related Images
  useEffect(() => {
    const fetchPinDetails = async () => {
      const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/${pinId}?client_id=${accessKey}`
        );
        const data = await res.json();
        setPinDetail(data);

        const relatedRes = await fetch(
          `https://api.unsplash.com/photos/${pinId}/related?client_id=${accessKey}`
        );
        const relatedPhotos = await relatedRes.json();

        // Remove current pin from related list
        setPins(relatedPhotos.results.filter((p) => p.id !== data.id));
      } catch (err) {
        console.error("Error fetching pin details", err);
      }
    };

    fetchPinDetails();
  }, [pinId]);

  // 2️⃣ Fetch Comments only after pinDetail is set
  useEffect(() => {
    fetchComments();
  }, [pinId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/comments/display/${pinId}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setPinComments(data);
      console.log(pinComments);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };
  const addComment = async () => {
    if (!comment.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("✅ ✅ ✅ ", user);
    console.log("PinId is : ", pinId);

    try {
      console.log("📤 Sending body:", {
        user: {
          sub: user.sub,
          userName: user.name,
          userImage: user.picture,
        },
        comment,
      });

      const res = await fetch(`http://localhost:4000/api/comments/${pinId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            sub: user.sub, // so backend's user?.sub check works
            userName: user.name,
            userImage: user.picture,
          },
          comment: comment,
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      setPinComments((prev) => [newComment, ...prev]); // optional: update UI immediately
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    setComment("");
  };

  if (!pinDetail) return <Spinner message="Showing pin..." />;

  // Destructure safely after data is loaded
  const {
    id,
    alt_description,
    urls: { regular },
    user: {
      name: postedBy,
      profile_image: { small: profileImg },
    },
    links: { html: destination },
  } = pinDetail;

  return (
    <>
      <div className="flex flex-col xl:flex-row w-full p-3 bg-white">
        <div className="flex justify-center max-w-lg items-center md:items-start flex-initial">
          <img
            className="rounded-t-lg mt-10 rounded-b-lg"
            src={regular}
            alt={alt_description || "unsplash-image"}
          />
        </div>

        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {alt_description}
            </h1>
            <a
              href={destination}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 break-all mt-2 inline-block"
            >
              View on Unsplash ↗
            </a>
          </div>

          <div className="flex gap-2 mt-5 items-center bg-white rounded-lg">
            <img
              src={profileImg}
              className="w-8 h-8 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">{postedBy}</p>
          </div>
          <h2 className="mt-5 text-2xl">Comments</h2>

          <div className="mt-3 flex flex-col gap-4">
            {pinComments?.length > 0 ? (
              pinComments.map((commentObj, index) => {
                const createdAt = new Date(commentObj.createdAt);
                const now = new Date();
                const diffInMs = now - createdAt;
                const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

                return (
                  <div key={index} className="flex items-start gap-3">
                    <img
                      src={commentObj.user?.userImage}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {commentObj.user?.userName}
                        </p>
                        <span className="text-xs text-gray-500">
                          {diffInHours === 0
                            ? "Just now"
                            : `${diffInHours} hour${
                                diffInHours > 1 ? "s" : ""
                              } ago`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {commentObj.comment}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>

          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${id}`}>
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>

      {/* More Like This */}
      {pins?.length > 0 && (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More from {postedBy}
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
};

export default PinDetail;
