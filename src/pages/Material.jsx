import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axiosClient from "../apiClient";
import ph from "/src/img/inmatph.png";
import { motion, AnimatePresence } from "framer-motion";
import MaterialBoxSkeleton from "../Components/MaterialBoxSkeleton";
import { FaArrowUp } from "react-icons/fa";
import MainContainer from "../components/MainContainer";

const MateriSementara = () => {
  const [diskusi, setDiskusi] = useState(false);
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const handleDiskusi = () => {
    setDiskusi(!diskusi);
  };

  useEffect(() => {
    axiosClient.get(`/api/materials/${postId}`).then((mat) => {
      document.title = `${mat.data.data.title} - DuLearn`;
      setPost(mat.data.data);
    });
  }, []);

  return (
    <>
      {/* <Head title="Materi" /> */}
      <Navbar />
      <Sidebar chosenTab={2} />
      <AnimatePresence>
        {diskusi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute w-full h-full bg-black"
          ></motion.div>
        )}
      </AnimatePresence>

      <MainContainer>
        <motion.div
          className={`fixed h-4/5 z-50 left-72 ${
            diskusi ? "bottom-16" : "-bottom-[71.8vh]"
          } transition-all ease-out duration-500 drop-shadow-2xl`}
          transition={{ ease: "linear", duration: 0.1 }}
          whileHover={!diskusi && { y: -10 }}
        >
          <div
            className="grid grid-flow-col place-items-center w-[15rem] bottom-0 p-5 rounded-t-3xl border-b-4 bg-[#2b317c] hover:bg-[#2a2e66] transition-all cursor-pointer"
            onClick={handleDiskusi}
          >
            <h1 className="text-2xl font-bold text-white">Diskusi</h1>
            <FaArrowUp
              color="white"
              className={`${
                diskusi ? `rotate-180` : `rotate-0`
              } transition-all duration-700 ease-in-out`}
            />
          </div>
          <div className="bg-[#2b317c] w-[calc(100vw-25rem)] h-full rounded-r-xl py-5 px-10 overflow-y-auto grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            <MaterialBoxSkeleton amount={10} />
          </div>
        </motion.div>
        <div className="h-full px-7 py-10 rounded-lg bg-gradient-to-b from-[#42489E] to-[#161A58]">
          {Object.keys(post).length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-3">
                <span className="text-3xl text-white font-bold">
                  {post.title}
                </span>
                <span className="pl-3 text-[#FAA41A] text-setMaterials">
                  {post.subject.subject}
                </span>
              </div>
              <p className="text-lg text-white">{post.material}</p>
            </motion.div>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={ph}
              className="pointer-events-none bg-center bg-no-repeat w-full max-w-5xl h-auto animate-pulse"
            />
          )}
        </div>
      </MainContainer>
    </>
  );
};

export default MateriSementara;
0;
