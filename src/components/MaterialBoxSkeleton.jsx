import React from "react";
import box from "/src/img/matskel.png";
import { motion } from "framer-motion";

const MaterialBoxSkeleton = ({ amount, pulse }) => {
  const elements = [];
  for (let i = 0; i < amount; i++) {
    elements.push(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className="h-[206px] w-[449px]"
        key={i}
      >
        <img
          src={box}
          alt="Skeleton Box"
          className={`pointer-events-none object-cover ${
            pulse && "animate-pulse"
          }`}
        />
      </motion.div>
    );
  }
  return elements.map((el) => el);
};

export default MaterialBoxSkeleton;
