import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages Import
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MateriSementara from "./pages/MateriSementara";

import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import Materials from "./pages/Materials";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            index
            element={
              <ProtectedRoute accessBy="guest">
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute accessBy="guest">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute accessBy="guest">
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute accessBy="authenticated">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/material"
            element={
              <ProtectedRoute accessBy="authenticated">
                <MateriSementara />
              </ProtectedRoute>
            }
          />
          <Route
            path="/materials"
            element={
              <ProtectedRoute accessBy="authenticated">
                <Materials />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
