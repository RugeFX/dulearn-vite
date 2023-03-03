import { motion } from "framer-motion";
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

const Materials = () => {
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [subject, setSubject] = useState(0);
  const [materials, setMaterials] = useState([]);
  const { user } = useContext(AuthContext);

  const [koleksiId, setKoleksiId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    axiosClient.get("/api/materials").then((res) => {
      // console.log(res);
      setMaterials(res.data.data);
    });
    axiosClient.get("/api/me").then((res) => {
      const koleksiIds =
        res.data.koleksi.length > 0
          ? res.data.koleksi.map((kol) => kol.material_id)
          : null;
      setKoleksiId(koleksiIds);
    });
  }, []);

  const handleAddBookmark = (id) => {
    axiosClient
      .post(`/api/me/koleksi/${id}`)
      .then((res) => {
        setKoleksiId([...koleksiId, +res.data.data.material_id]);
        console.log("Added Bookmark");
      })
      .catch((err) => console.error(err.response.data));
    // console.log("Bookmark Removed!");
  };

  const handleRemoveBookmark = (id) => {
    axiosClient
      .delete(`/api/me/koleksi/${id}`)
      .then((res) => {
        console.log(res.data);
        setKoleksiId(koleksiId.filter((kol) => kol !== id));
      })
      .catch((err) => console.error(err.response.data));
    // console.log("Bookmark Removed!");
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
                />
                <button>
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
                    <p className="text-white text-left">{mat.material}</p>
                    <div className="grid grid-flow-col w-full">
                      <div className="flex w-full justify-start gap-3">
                        {koleksiId !== null && koleksiId.includes(mat.id) ? (
                          <button
                            onClick={() => handleRemoveBookmark(mat.id)}
                            className="px-4 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all"
                          >
                            <FaBookmark color="orange" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddBookmark(mat.id)}
                            className="px-4 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all"
                          >
                            <FaRegBookmark />
                          </button>
                        )}
                        <button className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3">
                          <FaComment /> Diskusi
                        </button>
                      </div>
                      <div className="flex w-full justify-end gap-3">
                        <button
                          onClick={() => navigate(`/material/${mat.id}`)}
                          className="p-3 bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                        >
                          Read More
                          <FaAngleRight />
                        </button>
                      </div>
                    </div>
                  </motion.div>
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
