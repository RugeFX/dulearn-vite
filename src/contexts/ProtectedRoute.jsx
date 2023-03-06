import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);

  if (accessBy === "guest") {
    if (!user) {
      // console.log("guest");
      return children;
    }
    return <Navigate to="/home"></Navigate>;
  } else if (accessBy === "authenticated") {
    if (user) {
      // console.log("authenticated");
      return children;
    }
    return <Navigate to="/login"></Navigate>;
  } else if (accessBy === "editor") {
    if (user.level_id === 2) {
      // console.log("authenticated");
      return children;
    }
    return <Navigate to="/home"></Navigate>;
  }
};
export default ProtectedRoute;
