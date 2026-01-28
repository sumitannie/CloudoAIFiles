import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Trash from "./pages/Trash";


import "./styles/globals.css";
// import "./styles/fileCard.css";
// import "./styles/dashboard.css";
// import "./styles/layout.css";
// import "./styles/globals.css";
// import "./styles/navbar.css";
// import "./styles/sidebar.css";
// import "./styles/upload.css";

// Small helper
const RedirectIfAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public (redirect if already logged in) */}
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

        {/* Protected */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="trash" element={<Trash />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
