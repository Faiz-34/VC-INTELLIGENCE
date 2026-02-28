import React, { useEffect, useState } from "react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function Dashboard() {
  const [stats, setStats] = useState({ companies: 0, lists: 0, enrichments: 0 });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // Fetch stats from backend
    api.get("/dashboard-stats/")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));

    // Fetch activity
    api.get("/activity/")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setActivity(data);
      })
      .catch(err => console.error("Error fetching activity:", err));
  }, []);

  return (
    <div className="container-fluid p-4 bg-gradient min-vh-100" style={{background: "linear-gradient(to right, #f8f9fa, #e9f2ff)"}}>
      
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5">
        <h2 className="fw-bold text-primary">📊 Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4 col-sm-6">
          <div className="card border-0 shadow-lg h-100 hover-scale">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Companies</h6>
              <h2 className="fw-bold text-primary">{stats.companies}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card border-0 shadow-lg h-100 hover-scale">
            <div className="card-body text-center">
              <h6 className="text-muted">Saved Lists</h6>
              <h2 className="fw-bold text-success">{stats.lists}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card border-0 shadow-lg h-100 hover-scale">
            <div className="card-body text-center">
              <h6 className="text-muted">Recent Enrichments</h6>
              <h2 className="fw-bold text-info">{stats.enrichments}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card border-0 shadow-lg">
        <div className="card-body">
          <h5 className="mb-4 text-primary fw-bold">Recent Activity</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activity.length > 0 ? (
                  activity.map((item, idx) => (
                    <tr key={idx}>
                      <td className="fw-medium">{item.company}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${item.status === "Enriched" ? "bg-success" : "bg-warning text-dark"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">No activity found 🚫</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;