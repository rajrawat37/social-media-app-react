import React from "react";
import { MutatingDots } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
