export default function Pagination({ page, setPage }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={() => setPage(p => Math.max(p - 1, 1))}>
        ⬅ Prev
      </button>

      <span style={{ margin: "0 10px" }}>Page {page}</span>

      <button onClick={() => setPage(p => p + 1)}>
        Next ➡
      </button>
    </div>
  );
}
