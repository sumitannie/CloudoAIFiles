import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="landing-container">
      {/* Decorative blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="landing-content">
        {/* Hero */}
        <h1 className="landing-title">
          Cloudo<span>Files</span>AI
        </h1>

        <p className="landing-subtitle">
          A modern cloud file manager with AI-assisted organization, smart folders,
          and complete file lifecycle control.
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>

        {/* Feature Cards */}
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <h3>AI Auto Collections</h3>
            <p>
              Automatically groups files into Job Documents, Certificates,
              Study Materials, Media, Important, and Recent using intelligent
              metadata analysis.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">☁️</span>
            <h3>Cloud Storage</h3>
            <p>
              Secure cloud-based file uploads using Cloudinary with fast access,
              previews, and scalable storage.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔐</span>
            <h3>Secure Access</h3>
            <p>
              JWT-based authentication ensures that your files remain private
              and accessible only to you.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🗂️</span>
            <h3>Complete File Lifecycle</h3>
            <p>
              Upload, search, paginate, move to trash, restore files, or delete
              permanently — all in one clean dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
