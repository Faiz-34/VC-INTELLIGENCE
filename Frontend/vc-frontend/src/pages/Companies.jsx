import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    location: "",
    website: ""
  });

  // Fetch companies
  useEffect(() => {
    api.get("/companies/")
      .then(response => {
        // Ensure response is an array
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];
        setCompanies(data);
      })
      .catch(error => console.error("Error fetching companies:", error));
  }, []);

  // Save search query
  const handleSearch = async (query) => {
    setSearch(query);
    if (query.trim() !== "") {
      try {
        await api.post("/saved-searches/", { query });
      } catch (error) {
        console.error("Error saving search:", error);
      }
    }
  };

  // Filter companies
  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(c => {
        const name = c.name || c.company_name || "";
        const sector = c.sector || c.industry || "";
        const location = c.location || c.city || "";
        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          sector.toLowerCase().includes(search.toLowerCase()) ||
          location.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  // Delete company
  const deleteCompany = (id) => {
    api.delete(`/companies/${id}/`)
      .then(() => setCompanies(prev => prev.filter(c => c.id !== id)))
      .catch(err => console.error("Error deleting company:", err));
  };

  // Start edit
  const startEdit = (company) => {
    setEditCompanyId(company.id);
    setFormData({
      name: company.name || company.company_name,
      sector: company.sector || company.industry,
      location: company.location || company.city,
      website: company.website || ""
    });
  };

  // Save update
  const updateCompany = (e) => {
    e.preventDefault();
    api.put(`/companies/${editCompanyId}/`, formData)
      .then(res => {
        setCompanies(prev =>
          prev.map(c => (c.id === editCompanyId ? res.data : c))
        );
        setEditCompanyId(null);
        setFormData({ name: "", sector: "", location: "", website: "" });
      })
      .catch(err => console.error("Error updating company:", err.response?.data || err));
  };

  return (
    <div className="p-4 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-primary">Companies Directory</h1>
        <div className="flex gap-3 items-center">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 w-40"
            />
          </div>
          {/* Add Company Button */}
          <Link
            to="/add-company"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            + Add Company
          </Link>
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full border-collapse text-center">
          <thead>
            <tr className="bg-blue-600 text-white text-sm">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Sector</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Website</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-blue-50 transition duration-200">
                {editCompanyId === company.id ? (
                  <>
                    {/* Inline Edit Form */}
                    <td className="border-t px-6 py-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-control border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border-t px-6 py-3">
                      <input
                        type="text"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="form-control border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border-t px-6 py-3">
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="form-control border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border-t px-6 py-3">
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="form-control border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border-t px-6 py-3 flex gap-2 justify-center">
                      <button
                        onClick={updateCompany}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCompanyId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-t px-6 py-3 font-medium text-gray-800">
                      {company.name || company.company_name}
                    </td>
                    <td className="border-t px-6 py-3 text-gray-700">
                      {company.sector || company.industry}
                    </td>
                    <td className="border-t px-6 py-3 text-gray-700">
                      {company.location || company.city}
                    </td>
                    <td className="border-t px-6 py-3">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition"
                      >
                        {company.website}
                      </a>
                    </td>
                    <td className="border-t px-6 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => startEdit(company)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCompany(company.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}

            {filteredCompanies.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No companies found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Companies;