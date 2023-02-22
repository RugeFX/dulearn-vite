import React from "react";
import { FaBook, FaBookmark, FaEdit, FaHome, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sidebarItems = [
  {
    navigateTo: "/home",
    icon: <FaHome />,
    label: "Home",
  },
  {
    navigateTo: "/materials",
    icon: <FaBook />,
    label: "Materials",
  },
  {
    navigateTo: "/editor",
    icon: <FaEdit />,
    label: "Editor",
    bottomBorder: true,
  },
  {
    navigateTo: "/profile",
    icon: <FaUser />,
    label: "Profile",
  },
  {
    navigateTo: "/collection",
    icon: <FaBookmark />,
    label: "Koleksi",
  },
];

const Sidebar = ({ chosenTab }) => {
  const navigate = useNavigate();
  return (
    <motion.aside
      whileHover={{ scale: 1.01 }}
      className="z-30 fixed left-5 top-24 w-52 p-2 lg:w-64 h-[calc(100vh-7rem)] bg-gradient-to-b from-[#42489E] to-[#161A58] flex flex-col gap-2 rounded-xl overflow-auto"
    >
      {sidebarItems.map((val, i) => (
        <React.Fragment key={i}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            onClick={() => navigate(val.navigateTo)}
            className={`text-white font-bold text-lg flex items-center gap-5 p-3 ${
              i == chosenTab - 1 ? `bg-[#23286D]` : `hover:bg-[#23286D]`
            } w-full h-fit text-center rounded-xl cursor-pointer shadow-lg transition-colors`}
          >
            {val.icon}
            {val.label}
          </motion.div>
          {val.bottomBorder && <hr className="border-2 rounded-xl"></hr>}
        </React.Fragment>
      ))}
    </motion.aside>
  );
};

export default Sidebar;
