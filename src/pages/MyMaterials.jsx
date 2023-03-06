import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import AuthContext from "../contexts/AuthContext";
import axiosClient from "../apiClient";
import MaterialBoxSkeleton from "../components/MaterialBoxSkeleton";

const MyMaterials = () => {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/api/me/materials")
      .then((res) => {
        setLoading(false);
        setMaterials(res.data.data);
      })
      .catch((err) => {
        console.error(err.response);
        setLoading(false);
        setMaterials([]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar chosenTab={6} />
      <MainContainer>
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
                  {mat.material.title}
                  <span className="pl-3 text-yellow-primary text-sm font-thin">
                    {mat.material.subject.subject}
                  </span>
                </span>
                <p className="text-white h-28 overflow-y-clip">
                  {mat.material.material}
                </p>
                <div className="flex w-full flex-1 items-end justify-between gap-3">
                  <div className="flex w-full justify-start gap-3">
                    <button
                      onClick={() => handleRemoveBookmark(mat.material_id)}
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
