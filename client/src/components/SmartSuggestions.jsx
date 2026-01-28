import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/suggestions.css";

export default function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await API.get("/files/ai/suggestions");
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error("AI suggestions error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading || suggestions.length === 0) return null;

  return (
    <div className="ai-suggestions">
      <h3>🧠 Smart Suggestions</h3>

      <ul>
        {suggestions.map((s) => (
          <li key={s.fileId} className={`priority-${s.priority}`}>
            {s.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
