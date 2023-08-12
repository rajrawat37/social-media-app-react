import React from "react";
import { Dna } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Dna
        visible={true}
        height="100 "
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        className="mt-5"
      />
        
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
