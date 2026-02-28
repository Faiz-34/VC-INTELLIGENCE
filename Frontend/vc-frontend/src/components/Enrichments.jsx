import React, { useEffect, useState } from "react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function Enrichments() {
  const [enrichments, setEnrichments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrichments from backend
  useEffect(() => {
    api.get("/enrichments/")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setEnrichments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching enrichments:", err);
        setLoading(false);
      });
  }, []);

  // Update enrichment status
  const updateStatus = (id, newStatus) => {
    api.patch(`/enrichments/${id}/`, { status: newStatus })
      .then(() => {
        setEnrichments(prev =>
          prev.map(e => e.id === id ? { ...e, status: newStatus } : e)
        );
      })
      .catch(err => console.error("Error updating enrichment:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary mb-4">🔧 Manage Enrichments</h2>

      {loading ? (
        <p className="text-muted">Loading enrichments...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrichments.length > 0 ? (
                enrichments.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-medium">{item.company_name}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${item.status === "Enriched" ? "bg-success" : "bg-warning text-dark"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{new Date(item.date).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => updateStatus(item.id, "Enriched")}
                      >
                        Enriched
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => updateStatus(item.id, "Pending")}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No enrichments found 🚫</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Enrichments;