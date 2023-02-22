import React from "react";
import boxbg from "/src/img/bgmaterial.png";
import { motion } from "framer-motion";

const MaterialBox = ({ title, subject, onClick, children }) => {
  return (
    <motion.div
      transition={{
        y: { type: "spring", bounce: 0.5, duration: 0.5 },
        opacity: { ease: "easeIn", duration: 0.5 },
        scale: { ease: "linear", duration: 0.1 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{
        scale: 0.92,
      }}
      whileHover={{
        y: -10,
      }}
      onClick={onClick}
      style={{
        backgroundImage: `url(${boxbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`p-5 h-[206px] w-[449px] cursor-pointer hover:brightness-125`}
    >
      <span className="text-white text-xl font-bold">{title}</span>
      <span className="pl-3 text-[#FAA41A] text-sm">{subject}</span>
      <p className="text-white">{children}</p>
    </motion.div>
  );
};

export default MaterialBox;
