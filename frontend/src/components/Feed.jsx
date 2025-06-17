import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

function Feed() {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setLoading(true);

    console.log("✅ Feed Page is Loaded ✅");

    const fetchImages = async () => {
      const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

      if (!accessKey) {
        console.error("❌ Unsplash Access Key is missing!");
        return;
      }

      try {
        let allImages = [];
        const totalPages = 7; // fetch 3 pages (50 x 10 = 500 images)

        for (let page = 1; page <= totalPages; page++) {
          const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=50&client_id=${accessKey}`
          );

          const data = await response.json();
          allImages = [...allImages, ...data];
        }

        setPins(allImages);
        setLoading(false);
      } catch (error) {
        console.error("🚫 Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return <Spinner message="We are adding new ideas in your feed" />;

  return (
    <div>
      <div>{pins && <MasonryLayout pins={pins} />}</div>
    </div>
  );
}

export default Feed;
