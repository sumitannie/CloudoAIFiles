import "../styles/fileCard.css"

function FileCard({
  file,
  onDelete,
  onRestore,
  onDeleteForever,
  isTrash = false,
}) {
  const getFileIcon = (name = "") => {
    const ext = name.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️"
    if (ext === "pdf") return "📕"
    if (["doc", "docx"].includes(ext)) return "📘"
    if (ext === "txt") return "📝"
    if (["zip", "rar"].includes(ext)) return "🗜️"
    if (["mp3", "wav"].includes(ext)) return "🎵"
    if (["mp4", "avi"].includes(ext)) return "🎬"
    return "📄"
  }

  const formatFileSize = (bytes = 0) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={`file-card ${isTrash ? "trash" : ""}`}>
      <div className="file-icon">{getFileIcon(file.originalName)}</div>

      <div className="file-info">
        <h4 className="file-name" title={file.originalName}>
          {file.originalName}
        </h4>
        <p className="file-size">{formatFileSize(file.size)}</p>
      </div>

      <div className="file-actions">
        {!isTrash ? (
          <>
            <button onClick={() => window.open(file.url, "_blank")}>
              Open
            </button>
            <button
              onClick={() => onDelete(file._id)}
              className="btn-delete"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onRestore(file._id)}>
              Restore
            </button>
            <button
              onClick={() => onDeleteForever(file._id)}
              className="btn-delete"
            >
              Delete Forever
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FileCard
