import React from "react";
import { FaBook, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="fixed left-5 top-24 w-52 lg:w-64 h-[calc(100vh-7rem)] bg-[#42489E] flex flex-col rounded-lg overflow-auto">
      <a
        href="/home"
        className="text-white font-bold text-lg flex items-center gap-5 p-3 hover:bg-[#23286D] w-full h-fit text-center rounded-lg"
      >
        <FaHome />
        Home
      </a>
      <a
        href="/home"
        className="text-white font-bold text-lg flex items-center gap-5 p-3 bg-[#23286D] w-full h-fit rounded-lg"
      >
        <FaBook />
        Material
      </a>
    </aside>
  );
};

export default Sidebar;
