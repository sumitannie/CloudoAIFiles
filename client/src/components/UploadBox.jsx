import { useState, useRef } from "react";
import { filesAPI } from "../api/api";
import "../styles/upload.css";

function UploadBox({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // ---------------- DRAG HANDLERS ----------------
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // ---------------- FILE SELECT ----------------
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // ---------------- UPLOAD ----------------
  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();

        // ✅ IMPORTANT: backend expects "file"
        formData.append("file", file);

        await filesAPI.uploadFiles(formData, (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        });
      }

      setFiles([]);
      setUploadProgress({});
      onUploadComplete();
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- REMOVE FILE ----------------
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- UI ----------------
  return (
    <div className="upload-box-container">
      <div
        className={`upload-dropzone ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">📁 Select Files</div>
        <p className="upload-text">
          Drag and drop files here, or click to browse
        </p>
        <span className="upload-subtext">Support for multiple files</span> {/* Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, GIF, MP4, ZIP */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {files.length > 0 && (
        <div className="files-list">
          <h3>Selected Files ({files.length})</h3>

          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-item-info">
                <span className="file-item-name">{file.name}</span>
                <span className="file-item-size">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>

              {uploading && uploadProgress[file.name] !== undefined && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${uploadProgress[file.name]}%`,
                    }}
                  />
                  <span className="progress-text">
                    {uploadProgress[file.name]}%
                  </span>
                </div>
              )}

              {!uploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="remove-file-btn"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="upload-button"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
