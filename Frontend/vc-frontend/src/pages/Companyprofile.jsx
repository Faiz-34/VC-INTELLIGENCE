import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";   // 👈 path adjust karo agar api.js src/pages me hai to "./api"

function CompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [enrichment, setEnrichment] = useState(null);

  useEffect(() => {
    api.get(`/companies/${id}/`)
      .then(res => setCompany(res.data))
      .catch(err => console.error("Error fetching company:", err));
  }, [id]);

  const handleEnrich = () => {
    api.get(`/enrich/${id}/`)
      .then(res => setEnrichment(res.data))
      .catch(err => console.error("Error enriching company:", err));
  };

  if (!company) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <p><strong>Sector:</strong> {company.sector}</p>
      <p><strong>Location:</strong> {company.location}</p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          {company.website}
        </a>
      </p>

      {/* Enrich Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={handleEnrich}
      >
        Enrich Company Data
      </button>

      {/* Enrichment Data */}
      {enrichment && (
        <div className="mt-6 p-4 border rounded bg-gray-50 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Enriched Data</h2>
          <p><strong>Summary:</strong> {enrichment.summary}</p>

          <ul className="list-disc pl-6 mb-2">
            {enrichment.what_they_do?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <p><strong>Keywords:</strong> {enrichment.keywords?.join(", ")}</p>
          <p><strong>Signals:</strong> {enrichment.signals?.join(", ")}</p>

          <p className="mt-2"><strong>Sources:</strong></p>
          <ul className="list-disc pl-6">
            {enrichment.sources?.map((src, idx) => (
              <li key={idx}>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;