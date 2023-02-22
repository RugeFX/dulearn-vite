import React from "react";
import MaterialBox from "./MaterialBox";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import subjectbox from "/src/img/subjectbox.png";
import axiosClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import MaterialBoxSkeleton from "./MaterialBoxSkeleton";
import { motion } from "framer-motion";

const { useEffect, useState } = React;

const MainHome = (props) => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/api/materials")
      .then((res) => {
        console.log(res.data);
        setMaterials(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <main className="h-full bg-[#070B30] mt-20 pt-5 px-5">
      <div className="grid grid-cols-2 h-52 mb-5 gap-5">
        <div className="h-full p-5 bg-[#42489E] rounded-lg grid place-content-center">
          <h1 className="text-3xl text-white font-bold text-center">
            Selamat Datang Pengguna DuLearn
          </h1>
        </div>
        <div className="h-full">
          <div className="grid grid-rows-2 h-full items-center">
            <div>
              <h2 className="text-xl text-white font-bold">Cari Materi</h2>
              <div className="inline-flex w-full h-12 rounded-lg bg-white">
                <input
                  className="w-full rounded-lg p-3 outline-none transition-all focus:shadow-[#FAA41A] focus:shadow-input"
                  type="text"
                ></input>
                <button className="px-5 bg-[#FAA41A] rounded-lg transition-all hover:bg-[#bd8120]">
                  <FaSearch color="white" />
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-xl text-white font-bold">Kelas</h2>
              <div className="grid grid-cols-3 gap-5 w-full h-12 rounded-lg">
                <button
                  className="px-5 rounded-lg text-white text-lg font-bold transition-all hover:opacity-70"
                  style={{
                    backgroundImage: `url(${subjectbox})`,
                    backgroundSize: `cover`,
                  }}
                >
                  X
                </button>
                <button
                  className="px-5 rounded-lg text-white text-lg font-bold transition-all hover:opacity-70"
                  style={{
                    backgroundImage: `url(${subjectbox})`,
                    backgroundSize: `cover`,
                  }}
                >
                  XI
                </button>
                <button
                  className="px-5 rounded-lg text-white text-lg font-bold transition-all hover:opacity-70"
                  style={{
                    backgroundImage: `url(${subjectbox})`,
                    backgroundSize: `cover`,
                  }}
                >
                  XII
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-row gap-3 pb-5">
        <div className="text-white flex gap-5 items-end">
          <h1 className="text-3xl text-white font-bold">Materi Terbaru</h1>
          <motion.button
            transition={{ type: "spring", bounce: 0.6 }}
            whileHover={{ x: 10 }}
            onClick={() => navigate("/materials")}
            className="bg-[#42489E] px-2 flex justify-center items-center gap-2 rounded-lg"
          >
            See All <FaArrowRight color="white" />
          </motion.button>
        </div>
        {materials.length > 0 ? (
          <div className="py-5 grid grid-flow-col justify-start w-full gap-5 overflow-auto">
            {materials.map((mat) => (
              <MaterialBox
                key={mat.id}
                title={mat.title}
                subject={mat.subject.subject}
                onClick={() => {
                  navigate(`/material/${mat.id}`);
                }}
              >
                {mat.material}
              </MaterialBox>
            ))}
          </div>
        ) : (
          <div className="py-5 grid grid-flow-col justify-start w-full gap-5 overflow-hidden">
            <MaterialBoxSkeleton pulse={true} amount={10} />
          </div>
        )}
        <h1 className="text-3xl text-white font-bold">Materi A</h1>
        <div className="py-5 grid grid-flow-col justify-start w-full gap-5 overflow-auto">
          <MaterialBoxSkeleton amount={10} />
        </div>
        <h1 className="text-3xl text-white font-bold">Materi B</h1>
        <div className="py-5 grid grid-flow-col justify-start w-full gap-5 overflow-auto">
          <MaterialBoxSkeleton amount={10} />
        </div>
      </div>
    </main>
  );
};

export default MainHome;
