import React, { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchSearchedImages(searchTerm);
      }
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchSearchedImages = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/unsplash/search?searchTerm=${encodeURIComponent(
          searchTerm
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch searched images");
      }

      const data = await response.json();
      console.log("Searched term pins are  : ", data);
      setPins(data); // or whatever state you use
    } catch (error) {
      console.error("❌ Error fetching searched images:", error.message);
    }
  };

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}

      {pins?.length !== 0 && <MasonryLayout pins={pins} />}

      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
