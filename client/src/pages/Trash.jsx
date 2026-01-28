import { useEffect, useState } from "react"
import { filesAPI } from "../api/api"
import FileCard from "../components/FileCard"
import "../styles/dashboard.css"

export default function Trash() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTrash = async () => {
    const res = await filesAPI.getTrash()
    setFiles(res.data.files || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchTrash()
  }, [])

  const handleRestore = async (id) => {
    await filesAPI.restoreFile(id)
    fetchTrash()
  }

  const handleDeleteForever = async (id) => {
    if (!window.confirm("Delete permanently?")) return
    await filesAPI.deleteForever(id)
    fetchTrash()
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Trash</h1>
        <p>Deleted files can be restored or removed permanently</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files in trash</p>
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
  )
}
