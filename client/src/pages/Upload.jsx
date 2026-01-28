import { useNavigate } from "react-router-dom"
import UploadBox from "../components/UploadBox"
import "../styles/upload.css"

function Upload() {
  const navigate = useNavigate()

  const handleUploadComplete = () => {
    navigate("/")
  }

  return (
    <div className="upload-container">
      <div className="dashboard-header">
        <h1>Upload Files</h1>
        <p>Drag and drop your files or click to browse</p>
      </div>

      <UploadBox onUploadComplete={handleUploadComplete} />
    </div>
  )
}

export default Upload
