import React from "react";

const MainContainer = ({ children, className }) => {
  return (
    <main
      className={`min-h-screen bg-[#070B30] pt-24 pl-64 pr-5 lg:pl-[19rem] ${className}`}
    >
      {children}
    </main>
  );
};

export default MainContainer;
