import React from "react";
import box from "/src/img/matskel.png";

const MaterialBoxSkeleton = () => {
  return (
    <>
      <img src={box} alt="Skeleton Box" className="pointer-events-none " />
    </>
  );
};

export default MaterialBoxSkeleton;
