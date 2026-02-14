import "../styles/collectionsSidebar.css";

export default function AutoCollectionsSidebar({
  active,
  folders,
  counts,
  onSelect,
  onClear,
}) {
  if (!folders || folders.length === 0) {
    return (
      <div className="collections-sidebar">
        <h4>AI Folders</h4>
        <p className="empty-folders">No folders yet</p>
      </div>
    );
  }

  return (
    <div className="collections-sidebar">
      <h4>AI Folders</h4>

      {folders.map((name) => (
        <button
          key={name}
          className={active === name ? "active" : ""}
          onClick={() => onSelect(name)}
        >
          📁 {name}
          <span>{counts[name]?.length || 0}</span>
        </button>
      ))}

      {active && (
        <button className="clear" onClick={onClear}>
          ✕ Clear Filter
        </button>
      )}
    </div>
  );
}
