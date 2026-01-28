import { useEffect, useState } from "react";
import API, { filesAPI } from "../api/api";
import FileCard from "../components/FileCard";
import SmartSuggestions from "../components/SmartSuggestions";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  // ---------------- FETCH FILES ----------------
  const fetchFiles = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/files/my-files", {
        params: { page: currentPage, limit },
      });

      setFiles(res.data.files || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch files error:", err);
      setError("Failed to load files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPage]);

  // ---------------- DELETE FILE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await filesAPI.deleteFile(id);
      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete file");
    }
  };

  // ---------------- FILE TYPE FILTER ----------------
  const getFileCategory = (name = "") => {
    const ext = name.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    if (["doc", "docx", "txt"].includes(ext)) return "doc";

    return "other";
  };

  // ---------------- NORMAL SEARCH + FILTER ----------------
  const displayedFiles = files.filter((file) => {
    const name = file.originalName || "";

    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType =
      filterType === "all" || getFileCategory(name) === filterType;

    return matchesSearch && matchesType;
  });

  // ---------------- UI ----------------
  return (
    <div className="dashboard-container">
      <SmartSuggestions />

      <div className="dashboard-header">
        <h1>My Files</h1>
        <p>Manage and organize your uploads</p>
      </div>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search files by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="pdf">PDFs</option>
          <option value="doc">Documents</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Loading files...</p>
      ) : displayedFiles.length === 0 ? (
        <p className="empty">No files found</p>
      ) : (
        <>
          <div className="files-grid">
            {displayedFiles.map((file) => (
              <FileCard
                key={file._id}
                file={file}
                onDelete={() => handleDelete(file._id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
