import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import MainHome from "../components/MainHome";

export default function Home(props) {
  useEffect(() => {
    document.title = `Home - DuLearn`;
  }, []);

  return (
    <>
      <Navbar />
      <MainHome />
    </>
  );
}
