import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axiosClient from "../apiClient";

const MateriSementara = () => {
  const [diskusi, setDiskusi] = useState(false);
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const handleDiskusi = () => {
    setDiskusi(!diskusi);
  };

  useEffect(() => {
    axiosClient.get(`/api/materials/${postId}`).then((mat) => {
      setPost(mat.data.data);
    });
  }, []);

  return (
    <>
      {/* <Head title="Materi" /> */}
      <Navbar />
      <Sidebar />
      <main className="h-screen bg-[#070B30] mt-20 pl-56 lg:pl-64 pt-5">
        {diskusi && (
          <div className="absolute z-10 bottom-0 w-[76vw] h-full bg-black">
            <h1>TEST</h1>
          </div>
        )}
        <div
          className="fixed z-20 w-[20rem] left-72 bottom-0 p-5 rounded-t-xl border-b-4 bg-[#42489E] hover:bg-[#2b317c] transition-all cursor-pointer"
          onClick={handleDiskusi}
        >
          <h1 className="text-2xl font-bold text-white">Diskusi</h1>
        </div>
        <div className="h-full mx-10 px-7 py-10 rounded-lg bg-gradient-to-b from-[#42489E] to-[#161A58]">
          <div className="mb-3">
            <span className="text-3xl text-white font-bold">
              {/* Membuat Desain dengan Addobe Ilustrator */}
              {post.title}
            </span>
            <span className="pl-3 text-[#FAA41A] text-setMaterials">DDG</span>
          </div>
          <p className="text-lg text-white">
            Pembuatan desain pada matapelajaran DDG ini kita berkenalan dengan
            Addobe Ilustrator yang menjadi dasar dalam pembuatan desain digital
          </p>
        </div>
      </main>
    </>
  );
};

export default MateriSementara;
0;
