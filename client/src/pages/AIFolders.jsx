import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AIFolders() {
  const [folders, setFolders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await API.get("/files/my-files");
      const files = res.data.files || [];

      const grouped = {};

      files.forEach(file => {
        const name = file.folder || "General";
        if (!grouped[name]) grouped[name] = [];
        grouped[name].push(file);
      });

      setFolders(grouped);
    };

    fetchFolders();
  }, []);

  const folderNames = Object.keys(folders).sort();

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Generated Folders</h2>

      {folderNames.length === 0 ? (
        <p>No folders yet</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {folderNames.map(name => (
            <div
              key={name}
              onClick={() =>
                navigate(`/dashboard?folder=${encodeURIComponent(name)}`)
              }
              style={{
                padding: "14px 18px",
                background: "#f5f5f5",
                borderRadius: "12px",
                marginBottom: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.2s"
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "#e9ecef")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
            >
              <span>📁 {name}</span>
              <span style={{ opacity: 0.6 }}>
                {folders[name].length}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
