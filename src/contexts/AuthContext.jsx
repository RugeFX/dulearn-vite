import axiosClient from "../apiClient";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (!userProfle) {
      return null;
    }
    return JSON.parse(userProfle);
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    const csrfCookie = await axiosClient.get(`/sanctum/csrf-cookie`);
    console.log(csrfCookie);
    const res = await axiosClient.post("/api/auth/web/login", payload);
    console.log(res.data);
    if (res.data.success === "Success") {
      let apiResponse = await axiosClient.get("/api/me");
      localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
      setUser(apiResponse.data);
      navigate("/home");
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
