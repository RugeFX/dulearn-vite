import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import {
  FaAngleRight,
  FaBookmark,
  FaComment,
  FaRegBookmark,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AuthContext from "../contexts/AuthContext";
import ph from "/src/img/rightsideph.png";

import ReactMarkdown from "react-markdown";

const Materials = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState(0);
  const [isLoading, setIsLoading] = useState(1);

  const [searchFocus, setSearchFocus] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [searchMaterials, setSearchMaterials] = useState([]);
  const [koleksiId, setKoleksiId] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchAllDatas = () => {
    axiosClient.get("/api/materials").then((res) => {
      // console.log(res);
      setMaterials(res.data.data);
    });
  };

  useEffect(() => {
    // console.log(user);
    setIsLoading(1);
    fetchAllDatas();
    axiosClient.get("/api/me").then((res) => {
      const koleksiIds =
        res.data.koleksi.length > 0
          ? res.data.koleksi.map((kol) => kol.material_id)
          : null;
      setKoleksiId(koleksiIds);
      setIsLoading(0);
    });
  }, []);

  const handleAddBookmark = (id) => {
    setKoleksiId((prevIds) => {
      return prevIds ? [...prevIds, +id] : [+id];
    });
    axiosClient
      .post(`/api/me/koleksi/${id}`)
      .then((res) => {
        console.log("Added Bookmark");
      })
      .catch((err) => console.error(err.response));
    // console.log("Bookmark Removed!");
  };

  const handleRemoveBookmark = (id) => {
    setKoleksiId(koleksiId.filter((kol) => kol !== id));
    axiosClient
      .delete(`/api/me/koleksi/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err.response.data));
    // console.log("Bookmark Removed!");
  };

  const handleSearch = () => {
    setIsLoading(1);
    if (search === "") {
      fetchAllDatas();
      setIsLoading(0);
      return;
    }
    //TODO Search materials
    fetchSearchDatas(search).then((res) => {
      if (res.data.data === null) {
        setIsLoading(2);
        return;
      }
      setSearchMaterials(res.data.data);
    });
    return;
  };

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={handleSearch}>
                  <FaSearch color="white" className="m-4" />
                </button>
              </div>
            </div>
            <div className="w-full grid grid-flow-row gap-5">
              {materials.length > 0 ? (
                materials.map((mat) => (
                  <motion.div
                    transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className={`w-full flex flex-col justify-between h-80 bg-blue-primary rounded-xl bg-[url("/src/img/materialsbgcircles.png")] bg-center bg-cover px-10 py-6 hover:brightness-110`}
                    key={mat.id}
                  >
                    <h2 className="font-bold text-white text-3xl">
                      {mat.title}
                    </h2>
                    <p className="text-white text-left w-72 h-full truncate">
                      <ReactMarkdown>{mat.material}</ReactMarkdown>
                    </p>
                    <div className="grid grid-flow-col w-full">
                      <div className="flex w-full justify-start gap-3">
                        <button
                          onClick={
                            koleksiId !== null && koleksiId.includes(mat.id)
                              ? () => handleRemoveBookmark(mat.id)
                              : () => handleAddBookmark(mat.id)
                          }
                          className="px-4 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all relative"
                        >
                          <AnimatePresence>
                            {koleksiId !== null &&
                            koleksiId.includes(mat.id) ? (
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
                            ) : (
                              <motion.div
                                key="bookmark-off"
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
                                <FaRegBookmark />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                        <button
                          className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                          onClick={() =>
                            navigate(`/material/${mat.id}`, {
                              state: { isDiscussionOpen: true },
                            })
                          }
                        >
                          <FaComment />
                          <span className="hidden lg:inline-block">
                            Diskusi
                          </span>
                        </button>
                      </div>
                      <div className="flex w-full justify-end gap-3">
                        <button
                          onClick={() => navigate(`/material/${mat.id}`)}
                          className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                        >
                          <span className="hidden md:inline-block">
                            Read More
                          </span>
                          <FaAngleRight />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : isLoading === 1 ? (
                <>
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src="/src/img/materialsbgph.png"
                    className={`w-full flex flex-col justify-between pointer-events-none h-80 bg-blue-primary rounded-xl object-fill animate-pulse`}
                  ></motion.img>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-full flex flex-col justify-between pointer-events-none h-80 bg-blue-primary rounded-xl bg-[url("/src/img/materialsbgph.png")] bg-center bg-cover px-10 py-6 animate-pulse`}
                  ></motion.div>
                </>
              ) : isLoading === 2 ? (
                <div className="w-full">
                  <h2 className="text-white font-bold text-2xl">
                    Materi tidak ditemukan!
                  </h2>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-72 h-full p-5 bg-blue-primary rounded-xl grid-flow-row gap-5 hidden lg:grid"
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
