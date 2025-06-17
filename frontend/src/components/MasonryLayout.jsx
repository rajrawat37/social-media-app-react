import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

function MasonryLayout({ pins }) {
  const breakpointObj = {
    default: 4,
    3000: 7,
    2500: 6,
    2000: 5,
    1500: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  // const shuffle = (array) => {
  //   return array.sort(() => Math.random() - 0.5);
  // };

  // const shuffledPins = shuffle(pins);

  return (
    <Masonry className="flex" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin.id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
}

export default MasonryLayout;
