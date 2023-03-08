import React, { useContext, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axiosClient from "../apiClient";
import AuthContext from "../contexts/AuthContext";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Editor() {
  const { user } = useContext(AuthContext);

  const [subject, setSubject] = useState("1");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("**Hello world!!!**");
  const [subjects, setSubjects] = useState([]);

  const fillSubjectDropwdown = () => {
    axiosClient
      .get("/api/subjects")
      .then((res) => {
        console.log(res);
        setSubjects(res.data.data);
      })
      .catch((err) => console.error(err));
  };

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

  useEffect(() => {
    fillSubjectDropwdown();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar chosenTab={3} />
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
            {subjects.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.subject}
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
