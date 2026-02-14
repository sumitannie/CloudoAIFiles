import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API, { filesAPI } from "../api/api";
import FileCard from "../components/FileCard";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const folderFromURL = searchParams.get("folder");

  const limit = 12;

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
      setError("Failed to load files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    await filesAPI.deleteFile(id);
    fetchFiles();
  };

  const getFileCategory = (name = "") => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    if (["doc", "docx", "txt"].includes(ext)) return "doc";
    return "other";
  };

  /* ✅ FILTER FILES */

  const displayedFiles = folderFromURL
    ? files.filter(file => file.folder === folderFromURL)
    : files.filter((file) => {
        const name = file.originalName || "";

        const matchesSearch = name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesType =
          filterType === "all" ||
          getFileCategory(name) === filterType;

        return matchesSearch && matchesType;
      });

  const clearFolderFilter = () => {
    navigate("/dashboard");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Files</h1>
        <p>Manage and organize your uploads</p>
      </div>

      <div style={{ flex: 1 }}>
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="Search files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!!folderFromURL}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            disabled={!!folderFromURL}
          >
            <option value="all">All</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
            <option value="doc">Documents</option>
          </select>
        </div>

        {/* ✅ Folder breadcrumb */}
        {folderFromURL && (
          <div className="folder-breadcrumb">
            <button onClick={clearFolderFilter}>
              ← Back to All Files
            </button>
            <span>📁 {folderFromURL}</span>
          </div>
        )}

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

            {/* pagination disabled inside folder */}
            {!folderFromURL && totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                >
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
