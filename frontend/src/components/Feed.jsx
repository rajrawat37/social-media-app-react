import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

function Feed({ userId }) {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setLoading(true);

    console.log("✅ Feed Page is Loaded ✅");

    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/unsplash/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        console.log("Feed Page data format : ", data);

        setPins(data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching from backend:", error.message);
      }
    };
    fetchImages();
  }, []);

  if (loading)
    return <Spinner message="We are adding new ideas in your feed" />;

  return (
    <div>
      <div>
        {pins && <MasonryLayout disable={false} pins={pins} userId={userId} />}
      </div>
    </div>
  );
}

export default Feed;
