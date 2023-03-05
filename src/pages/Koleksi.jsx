import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";

import { AnimatePresence, motion } from "framer-motion";
import axiosClient from "../apiClient";
import MaterialBoxSkeleton from "../components/MaterialBoxSkeleton";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaBookmark, FaComment } from "react-icons/fa";
// import SelectInput from "../components/SelectInput";

const Koleksi = () => {
  const [koleksi, setKoleksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClickKoleksi = (matid) => {
    navigate(`/material/${matid}`);
  };

  const handleRemoveBookmark = (id) => {
    setKoleksi(koleksi.filter((kol) => kol.material_id !== id));
    axiosClient
      .delete(`/api/me/koleksi/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err.response.data));
    // console.log("Bookmark Removed!");
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get("/api/me/koleksi")
      .then((res) => {
        setKoleksi(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar chosenTab={5} />
      <MainContainer>
        <h1 className="text-white text-3xl font-bold mb-4">Koleksi Anda</h1>
        <div className="flex gap-5">
          <div className="grid grid-flow-row">
            <span className="text-md text-white">Filter</span>
            <select
              className="w-24 px-3 py-3 bg-[#464A83] rounded-lg text-yellow-primary font-bold outline-none focus:shadow-input cursor-pointer transition-shadow"
              name="subject"
              id="subjectSelect"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="0">All</option>
              <option value="1">DDG</option>
            </select>
          </div>
          <div className="grid grid-flow-row">
            <span className="text-md text-white">Sort By</span>
            <select
              className="w-24 px-3 py-3 bg-[#464A83] rounded-lg text-yellow-primary font-bold outline-none focus:shadow-input cursor-pointer transition-shadow"
              name="subject"
              id="subjectSelect"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="0">All</option>
              <option value="1">DDG</option>
            </select>
          </div>
        </div>
        <div className="box-border w-full h-full my-5 grid grid-cols-1 gap-7 justify-start content-start md:grid-cols-2 lg:grid-cols-3">
          {koleksi.length > 0 ? (
            koleksi.map((kol) => (
              <motion.div
                key={kol.id}
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
                style={{
                  backgroundImage: `url(/src/img/bgmaterial.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="p-5 flex flex-col box-border h-60 w-full hover:brightness-125 text-ellipsis rounded-lg"
              >
                <span className="text-white text-xl font-bold">
                  {kol.material.title}
                  <span className="pl-3 text-yellow-primary text-sm font-thin">
                    {kol.material.subject.subject}
                  </span>
                </span>
                <p className="text-white h-28 overflow-y-clip">
                  {kol.material.material}
                </p>
                <div className="flex w-full flex-1 items-end justify-between gap-3">
                  <div className="flex w-full justify-start gap-3">
                    <button
                      onClick={() => handleRemoveBookmark(kol.material_id)}
                      className="px-4 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all relative"
                    >
                      <AnimatePresence>
                        <motion.div
                          key="bookmark-on"
                          initial={{
                            scale: 0,
                            position: "absolute",
                            zIndex: 1,
                          }}
                          animate={{
                            scale: 1,
                            position: "relative",
                            zIndex: 1,
                          }}
                          exit={{
                            scale: 0,
                            opacity: 0,
                            position: "absolute",
                            zIndex: 0,
                          }}
                          className="top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center"
                        >
                          <FaBookmark color="orange" />
                        </motion.div>
                      </AnimatePresence>
                    </button>
                    <button
                      className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                      onClick={() =>
                        navigate(`/material/${kol.material_id}`, {
                          state: { isDiscussionOpen: true },
                        })
                      }
                    >
                      <FaComment />
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/material/${kol.material_id}`)}
                    className="p-3 justify-self-end bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </motion.div>
            ))
          ) : isLoading ? (
            <MaterialBoxSkeleton fullWidth={true} amount={6} pulse={true} />
          ) : (
            koleksi.length === 0 && (
              <div className="col-span-3 justify-self-center">
                <h1 className="text-white text-2xl font-bold">
                  Anda belum memiliki koleksi!
                </h1>
              </div>
            )
          )}
        </div>
      </MainContainer>
    </>
  );
};

export default Koleksi;
