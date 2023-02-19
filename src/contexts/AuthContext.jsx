import axiosClient from "../apiClient";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    await axiosClient.get(`/sanctum/csrf-cookie`);
    const res = await axiosClient.post("/api/auth/web/login", payload);
    if (res.data.success === "Success") {
      let apiResponse = await axiosClient.get("/api/auth/user");
      localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
      setUser(apiResponse.data);
      navigate("/home");
    } else {
      throw new Error(res);
    }
  };

  const logout = async () => {
    await axiosClient.get("/api/auth/web/logout");
    localStorage.removeItem("userProfile");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;