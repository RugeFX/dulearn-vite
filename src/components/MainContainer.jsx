import React from "react";

const MainContainer = ({ children }) => {
  return (
    <main className="h-screen bg-[#070B30] pt-24 pl-64 pr-5 lg:pl-[19rem]">
      {children}
    </main>
  );
};

export default MainContainer;
