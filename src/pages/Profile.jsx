import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Sidebar chosenTab={4} />
      <MainContainer>
        <div className="h-full px-7 py-10 rounded-lg bg-gradient-to-b from-[#42489E] to-[#161A58]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-3">
              <span className="text-3xl text-white font-bold">
                {user.registered_user.name}
              </span>
              <span className="pl-3 text-[#FAA41A] text-setMaterials">
                {user.level.level}
              </span>
            </div>
            <p className="text-lg text-white">{user.reg_num}</p>
          </motion.div>
        </div>
        <h1 className="text-white">{JSON.stringify(user.reg_num)}</h1>
      </MainContainer>
    </>
  );
};

export default Profile;
