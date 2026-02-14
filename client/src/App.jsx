import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Trash from "./pages/Trash";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import AIFolders from "./pages/AIFolders";

import "./styles/globals.css";

// Redirect logged-in users away from auth pages
const RedirectIfAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- LANDING ---------- */}
        <Route path="/" element={<Landing />} />

        {/* ---------- AUTH ---------- */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <Register />
            </RedirectIfAuth>
          }
        />

        {/* ---------- PROTECTED ---------- */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/ai-folders" element={<AIFolders />} />
        </Route>

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
