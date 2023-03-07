import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import AuthContext from "../contexts/AuthContext";
import axiosClient from "../apiClient";
import MaterialBoxSkeleton from "../components/MaterialBoxSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaAngleRight,
  FaCheck,
  FaPencilAlt,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

export function ConfirmModal({ isOpen, onConfirm, onCancel, judulMateri }) {
  return (
    <div
      className={`bg-translucent-black fixed w-screen h-screen z-50 ${
        isOpen ? `flex` : `hidden`
      } justify-center items-center`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className=" w-[30rem] h-[15rem] p-7 rounded-lg bg-gradient-to-br from-[#42489E] to-[#161A58] grid place-items-center"
          >
            <p className="text-white text-lg text-center font-bold">
              Yakin ingin menghapus materi dengan judul : {judulMateri}
            </p>
            <div className="flex justify-center gap-10 w-full">
              <button
                className="p-4 rounded-lg bg-yellow-primary hover:bg-[#e49400] transition-colors duration-200 text-white text-lg font-bold grid place-items-center"
                onClick={onConfirm}
              >
                <FaCheck />
              </button>
              <button
                className="p-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white text-lg font-bold grid place-items-center"
                onClick={onCancel}
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MyMaterials = () => {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    judul: "",
  });
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleDeleteMaterial = (matid) => {
    setConfirmPopup(true);
  };

  const getMaterials = () => {
    axiosClient
      .get("/api/me/materials")
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMaterials(res.data.data);
      })
      .catch((err) => {
        console.error(err.response);
        setLoading(false);
        setMaterials([]);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMaterials();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={confirmPopup}
        judulMateri={selectedItem.judul}
        onConfirm={() => {
          axiosClient
            .delete(`api/materials/${selectedItem.id}`)
            .then((res) => {
              if (res.data.success === "Success") {
                setConfirmPopup(false);
                getMaterials();
                // setTopAlert()
              }
            })
            .catch((err) => {
              console.error(err);
              setConfirmPopup(false);
            });
        }}
        onCancel={() => {
          setConfirmPopup(false);
        }}
      />
      <Navbar />
      <Sidebar chosenTab={6} />
      <MainContainer>
        <h1 className="text-white text-3xl font-bold mb-4">Materi Anda</h1>
        <div className="box-border w-full h-full my-5 grid grid-cols-1 gap-7 justify-start content-start md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <MaterialBoxSkeleton fullWidth={true} amount={6} pulse={true} />
          ) : materials.length > 0 ? (
            // TODO : my materials box
            materials.map((mat) => (
              <motion.div
                key={mat.id}
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
                  {mat.title}
                  <span className="pl-3 text-yellow-primary text-sm font-thin">
                    {mat.subject.subject}
                  </span>
                </span>
                <p className="text-white h-28 overflow-y-clip">
                  {mat.material}
                </p>
                <div className="flex w-full flex-1 items-end justify-between gap-3">
                  <div className="flex w-full justify-start gap-3">
                    <button
                      onClick={() => {
                        setSelectedItem({ id: mat.id, judul: mat.title });
                        setConfirmPopup(true);
                      }}
                      className="px-4 bg-red-600 opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all relative"
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
                          <FaTrash />
                        </motion.div>
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
                      <FaPencilAlt />
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/material/${mat.id}`)}
                    className="p-3 justify-self-end bg-white opacity-75 hover:opacity-100 text-base font-bold border-base border-2 rounded-xl transition-all flex items-center justify-between gap-3"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            materials.length === 0 && (
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

export default MyMaterials;
