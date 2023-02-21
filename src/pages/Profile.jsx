import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <MainContainer>
        <h1>{JSON.stringify(user.reg_num)}</h1>
      </MainContainer>
    </>
  );
};

export default Profile;
