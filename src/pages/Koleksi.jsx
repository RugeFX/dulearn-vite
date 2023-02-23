import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";

const Koleksi = () => {
  return (
    <>
      <Navbar />
      <Sidebar chosenTab={5} />
      <MainContainer>
        <h1 className="text-white text-3xl font-bold">Koleksi Anda</h1>
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
      </MainContainer>
    </>
  );
};

export default Koleksi;
