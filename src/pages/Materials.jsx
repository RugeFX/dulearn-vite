import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaChartBar,
  FaComment,
  FaCommentAlt,
  FaLock,
  FaRegBookmark,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ph from "/src/img/rightsideph.png";
import phmat from "/src/img/materialsbgph.png";

const Materials = () => {
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [subject, setSubject] = useState(0);
  const [materials, setMaterials] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/api/materials").then((res) => {
      console.log(res);
      setMaterials(res.data.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar chosenTab={2} />
      <MainContainer>
        <div className="flex items-start gap-10">
          <div className="flex flex-col gap-5 w-full mb-5">
            <div className="flex w-full justify-between gap-10">
              <div className="inline-flex items-center gap-5">
                <h1 className="text-white text-3xl font-bold">Materials</h1>
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
              <div
                className={`inline-flex items-center bg-yellow-primary rounded-lg shadow-yellow-primary transition-all ${
                  searchFocus ? `shadow-input` : `shadow-none`
                }`}
              >
                <input
                  placeholder="Search"
                  type="search"
                  name="search"
                  id="search"
                  className={`w-full text-base h-full px-3 py-2 rounded-l-lg outline-none transition-all`}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                />
                <button>
                  <FaSearch color="white" className="m-4" />
                </button>
              </div>
            </div>
            <div className="w-full grid grid-flow-row gap-5">
              {materials.length > 0 ? (
                materials.map((mat) => (
                  <motion.button
                    onClick={() => navigate(`/material/${mat.id}`)}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className={`w-full flex flex-col justify-between h-80 bg-blue-primary rounded-xl bg-[url("/src/img/materialsbgcircles.png")] bg-center bg-cover px-10 py-6 hover:brightness-110`}
                  >
                    <h2 className="font-bold text-white text-3xl">
                      {mat.title}
                    </h2>
                    <p className="text-white">{mat.material}</p>
                    <div className="flex w-full justify-start gap-3">
                      <button className="px-4 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all">
                        <FaRegBookmark />
                      </button>
                      <button className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3">
                        <FaComment /> Diskusi
                      </button>
                    </div>
                  </motion.button>
                ))
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-full flex flex-col justify-between pointer-events-none h-80 bg-blue-primary rounded-xl bg-[url("/src/img/materialsbgph.png")] bg-center bg-cover px-10 py-6 animate-pulse`}
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-full flex flex-col justify-between pointer-events-none h-80 bg-blue-primary rounded-xl bg-[url("/src/img/materialsbgph.png")] bg-center bg-cover px-10 py-6 animate-pulse`}
                  ></motion.div>
                </>
              )}
            </div>
          </div>
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-72 h-full p-5 bg-blue-primary rounded-xl grid grid-flow-row gap-5"
          >
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
            <img src={ph} alt="Placeholder" className="object-contain w-full" />
          </motion.aside>
        </div>
      </MainContainer>
    </>
  );
};

export default Materials;
0;
