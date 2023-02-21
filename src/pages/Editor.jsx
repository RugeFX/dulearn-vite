import React, { useContext, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axiosClient from "../apiClient";
import AuthContext from "../contexts/AuthContext";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";

const subjectOptions = [
  {
    value: 1,
    label: "DDG",
  },
  {
    value: 2,
    label: "SIMDIG",
  },
  {
    value: 3,
    label: "SISKOM",
  },
];

export default function Editor() {
  const { user } = useContext(AuthContext);

  const [subject, setSubject] = useState("1");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("**Hello world!!!**");

  const handleAdd = () => {
    axiosClient
      .post("/api/materials", {
        class_id: user.registered_user.class_id,
        subject_id: subject,
        user_id: user.id,
        title,
        material,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="w-52 px-3 py-3 bg-[#464A83] rounded-lg text-white outline-none focus:shadow-input transition-shadow"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="w-52 px-3 py-3 text-justify bg-[#464A83] rounded-lg text-white outline-none focus:shadow-input cursor-pointer transition-shadow"
            name="subject"
            id="subbjectSelect"
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <MDEditor
          className="backdrop-white"
          value={material}
          onChange={setMaterial}
        />
        <MDEditor.Markdown source={material} className="whitespace-pre-wrap" />
        <div className="flex w-full justify-center mt-2">
          <button
            onClick={handleAdd}
            type="button"
            className="flex items-center gap-4 text-lg font-bold text-[#1c215c] bg-[#FAA41A] hover:bg-[#ffb949] rounded-lg px-5 py-2 focus:outline-0 focus:shadow-input focus:shadow-white transition-all hover:scale-110"
          >
            Add
          </button>
        </div>
      </MainContainer>
    </>
  );
}
