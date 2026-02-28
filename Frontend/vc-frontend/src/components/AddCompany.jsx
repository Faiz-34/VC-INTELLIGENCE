import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function AddCompany() {
  const [company, setCompany] = useState({
    name: "",
    sector: "",
    location: "",
    website: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/companies/", company);
      navigate("/companies"); // ✅ redirect after success
    } catch (err) {
      console.error("Error adding company:", err);
      alert("Company add karne me problem aa rahi hai. Backend API check karo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden transition hover:shadow-blue-400 hover:shadow-lg">
        
        {/* Compact Header with Icon */}
        <div className="bg-blue-600 text-white py-3 px-6 flex items-center justify-center gap-2 rounded-t-xl">
          <Building2 size={20} className="text-white" />
          <h2 className="text-base font-semibold">Add Company</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <input
              type="text"
              value={company.sector}
              onChange={(e) => setCompany({ ...company, sector: e.target.value })}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={company.location}
              onChange={(e) => setCompany({ ...company, location: e.target.value })}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={company.website}
              onChange={(e) => setCompany({ ...company, website: e.target.value })}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button with Glow Hover */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-400"
          >
            Save Company ✅
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;