import { useState, useEffect } from "react";
import { Trash2, RefreshCw } from "lucide-react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function Saved({ onRunSearch }) {
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    api.get("/saved-searches/")
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];
        setSavedSearches(data);
      })
      .catch(error => console.error("Error fetching saved searches:", error));
  }, []);

  const removeSearch = async (id) => {
    try {
      await api.delete(`/saved-searches/${id}/`);
      setSavedSearches(savedSearches.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting search:", error);
    }
  };

  const rerunSearch = (search) => {
    if (onRunSearch) onRunSearch(search.query);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Saved Searches</h1>
      <ul className="space-y-2">
        {savedSearches.map((search) => (
          <li
            key={search.id}
            className="flex justify-between items-center border rounded-md px-4 py-2 shadow-sm hover:bg-blue-50 transition text-sm"
          >
            <span className="text-gray-800">{search.query}</span>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition flex items-center gap-1"
                onClick={() => rerunSearch(search)}
              >
                <RefreshCw size={14} /> Re‑run
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded-md text-xs hover:bg-red-700 transition flex items-center gap-1"
                onClick={() => removeSearch(search.id)}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </li>
        ))}
        {savedSearches.length === 0 && (
          <li className="text-gray-500 italic text-sm">No saved searches 🚫</li>
        )}
      </ul>
    </div>
  );
}

export default Saved;