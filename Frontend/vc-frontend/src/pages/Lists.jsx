import React, { useEffect, useState } from "react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function Lists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  // Fetch lists + companies
  useEffect(() => {
    api.get("/lists/")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setLists(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching lists:", err);
        setLoading(false);
      });

    api.get("/companies/")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setAllCompanies(data);
      })
      .catch(err => console.error("Error fetching companies:", err));
  }, []);

  // Add new list
  const addList = (e) => {
    e.preventDefault();
    api.post("/lists/", { 
      title: title, 
      companies: companies   // send selected company IDs
    })
      .then(res => {
        setLists([...lists, res.data]);
        setTitle("");
        setCompanies([]);
      })
      .catch(err => console.error("Error adding list:", err.response?.data || err));
  };

  // Delete list
  const deleteList = (id) => {
    api.delete(`/lists/${id}/`)
      .then(() => {
        setLists(prev => prev.filter(list => list.id !== id));
      })
      .catch(err => console.error("Error deleting list:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-success mb-4">📂 Saved Lists</h2>

      {/* Add List Form */}
      <form onSubmit={addList} className="mb-4">
        <div className="mb-3">
          <label className="form-label fw-bold">List Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Select Companies</label>
          <select
            multiple
            className="form-select"
            value={companies}
            onChange={(e) =>
              setCompanies([...e.target.selectedOptions].map(opt => opt.value))
            }
          >
            {allCompanies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <small className="text-muted">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple companies
          </small>
        </div>

        <button type="submit" className="btn btn-success">Add List</button>
      </form>

      {loading ? (
        <p className="text-muted">Loading lists...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm">
            <thead className="table-success">
              <tr>
                <th>List Title</th>
                <th>Companies</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.length > 0 ? (
                lists.map((list) => (
                  <tr key={list.id}>
                    <td className="fw-medium">{list.title}</td>
                    <td>
                      {list.companies && list.companies.length > 0 ? (
                        list.companies.map((company, idx) => (
                          <span key={idx} className="badge bg-primary me-2">
                            {company.name || company} {/* handle both object or ID */}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">No companies</span>
                      )}
                    </td>
                    <td>{new Date(list.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteList(list.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No lists found 🚫</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Lists;