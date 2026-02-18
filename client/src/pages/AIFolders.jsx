import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/aifolders.css";

export default function AIFolders() {
  const [folders, setFolders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await API.get("/files/my-files");
        const files = res.data.files || [];

        const grouped = {};

        files.forEach((file) => {
          const name = file.folder || "General";
          if (!grouped[name]) grouped[name] = [];
          grouped[name].push(file);
        });

        setFolders(grouped);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const folderNames = Object.keys(folders).sort();

  return (
    <div className="ai-folders-container">
      <h2 className="ai-folders-header">AI Generated Folders</h2>

      {folderNames.length === 0 ? (
        <p className="no-folders">No folders yet</p>
      ) : (
        <div className="ai-folders-list">
          {folderNames.map((name) => (
            <div
              key={name}
              className="ai-folder-card"
              onClick={() =>
                navigate(`/dashboard?folder=${encodeURIComponent(name)}`)
              }
            >
              <span className="folder-name">📁 {name}</span>
              <span className="folder-count">{folders[name].length} items</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}