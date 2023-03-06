import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages Import
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MateriSementara from "./pages/Material";
import User from "./pages/Profile";
import Materials from "./pages/Materials";
import Editor from "./pages/Editor";
import Koleksi from "./pages/Koleksi";

import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import MyMaterials from "./pages/MyMaterials";

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
            path="/material/:postId"
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute accessBy="authenticated">
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute accessBy="editor">
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/koleksi"
            element={
              <ProtectedRoute accessBy="authenticated">
                <Koleksi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-materials"
            element={
              <ProtectedRoute accessBy="editor">
                <MyMaterials />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
