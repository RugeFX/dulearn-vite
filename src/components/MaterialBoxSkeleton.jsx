import React from "react";
import box from "/src/img/matskel.png";
import { motion } from "framer-motion";

const MaterialBoxSkeleton = ({ fullWidth, amount, pulse }) => {
  const elements = [];
  for (let i = 0; i < amount; i++) {
    elements.push(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className={fullWidth ? "h-60 w-full" : "h-[206px] w-[449px]"}
        key={i}
      >
        <img
          src={box}
          alt="Skeleton Box"
          className={`pointer-events-none object-fill ${
            pulse && "animate-pulse"
          }${fullWidth && " w-full h-full"}`}
        />
      </motion.div>
    );
  }
  return elements.map((el) => el);
};

export default MaterialBoxSkeleton;
