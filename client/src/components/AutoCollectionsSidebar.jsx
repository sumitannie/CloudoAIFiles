import "../styles/collectionsSidebar.css";

export default function AutoCollectionsSidebar({
  active,
  onSelect,
  collections,
}) {
  return (
    <div className="collections-sidebar">
      <h4>AI Collections</h4>

      <button
        className={active === "job" ? "active" : ""}
        onClick={() => onSelect("job")}
      >
        💼 Job Documents
        <span>{collections.job.length}</span>
      </button>

      <button
        className={active === "certificates" ? "active" : ""}
        onClick={() => onSelect("certificates")}
      >
        📜 Certificates
        <span>{collections.certificates.length}</span>
      </button>

      <button
        className={active === "study" ? "active" : ""}
        onClick={() => onSelect("study")}
      >
        📚 Study Materials
        <span>{collections.study.length}</span>
      </button>

      <button
        className={active === "media" ? "active" : ""}
        onClick={() => onSelect("media")}
      >
        🖼️ Media
        <span>{collections.media.length}</span>
      </button>

      <button
        className={active === "important" ? "active" : ""}
        onClick={() => onSelect("important")}
      >
        ⭐ Important Files
        <span>{collections.important.length}</span>
      </button>

      <button
        className={active === "documents" ? "active" : ""}
        onClick={() => onSelect("documents")}
      >
        📄 Documents
        <span>{collections.documents.length}</span>
      </button>

      <button
        className={active === "recent" ? "active" : ""}
        onClick={() => onSelect("recent")}
      >
        🕒 Recent Uploads
        <span>{collections.recent.length}</span>
      </button>

      {active && (
        <button className="clear" onClick={() => onSelect(null)}>
          ✕ Clear
        </button>
      )}
    </div>
  );
}
