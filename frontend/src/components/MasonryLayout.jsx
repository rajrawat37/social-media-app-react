import React from "react";
import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";
import Pin from "./Pin";

function MasonryLayout({ disable, pins, userId }) {
  const [savedPins, setSavedPins] = useState(new Set());

  const getBreakpointColumns = (pinCount) => {
    if (pinCount >= 10) return { default: 4, 1200: 3, 800: 2, 500: 1 };
    if (pinCount >= 6) return { default: 3, 1000: 2, 600: 1 };
    if (pinCount >= 3) return { default: 2, 600: 1 };
    return { default: 1 };
  };

  const breakpointObj = getBreakpointColumns(pins.length);

  const fetchSavedPins = async () => {
    const res = await fetch(`http://localhost:4000/api/pins/saved/${userId}`);
    const data = await res.json();
    setSavedPins(new Set(data.savedPins)); // For faster lookup
    console.log(savedPins);
  };

  useEffect(() => {
    console.log("✅ Masonry File is Loaded ✅");
    // const sortedPins = [...pins].sort((a, b) => b.height - a.height);
    fetchSavedPins();
  }, [userId]);

  return (
    <Masonry className="flex" breakpointCols={breakpointObj}>
      {pins.map((pin, index) => (
        <Pin
          key={`${pin.id}-${index}`}
          pin={pin}
          disable={disable}
          isSaved={savedPins.has(pin.id)}
          refreshSavedPins={fetchSavedPins}
          className="w-max"
          style={{ minHeight: "250px" }}
          sl
        />
      ))}
    </Masonry>
  );
}

export default MasonryLayout;
