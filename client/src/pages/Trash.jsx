import { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Fixed: Added missing import
import { filesAPI } from "../api/api";
import FileCard from "../components/FileCard";
import "../styles/dashboard.css";

export default function Trash() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fixed: Wrapped in useCallback to satisfy linter and prevent infinite loops
  const fetchTrash = useCallback(async () => {
    try {
      const res = await filesAPI.getTrash();
      setFiles(res.data.files || []);
    } catch (error) {
      console.error("Error fetching trash:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fixed: Added fetchTrash to dependency array
  useEffect(() => {
    fetchTrash();
  }, [fetchTrash]);

  const handleRestore = async (id) => {
    await filesAPI.restoreFile(id);
    fetchTrash();
  };

  const handleDeleteForever = async (id) => {
    // used globalThis to satisfy your specific linter warning
    if (!globalThis.confirm("Delete permanently?")) return;
    await filesAPI.deleteForever(id);
    fetchTrash();
  };

  const handleEmptyTrash = async () => {
    if (
      globalThis.confirm(
        "Are you sure you want to permanently delete ALL files in the trash? This cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        // Ensure this URL matches your backend port (usually 5000)
        await axios.delete("http://localhost:5000/api/files/empty-trash", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFiles([]);
        alert("Trash emptied successfully!");
      } catch (err) {
        console.error("Failed to empty trash", err);
        alert("Failed to empty trash.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div
        className="dashboard-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>Trash</h1>
          <p>Deleted files can be restored or removed permanently</p>
        </div>

        {files.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Empty Trash
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
          <p>No files in trash</p>
        </div>
      ) : (
        <div className="files-grid">
          {files.map((file) => (
            <FileCard
              key={file._id}
              file={file}
              isTrash
              onRestore={handleRestore}
              onDeleteForever={handleDeleteForever}
            />
          ))}
        </div>
      )}
    </div>
  );
}