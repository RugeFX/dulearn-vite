import React from "react";

const MainContainer = ({ children }) => {
  return (
    <main className="h-screen bg-[#070B30] pt-24 px-5 text-white">
      {children}
    </main>
  );
};

export default MainContainer;
