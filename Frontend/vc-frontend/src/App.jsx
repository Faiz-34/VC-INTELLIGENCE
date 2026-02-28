import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Companies from "./pages/companies";
import CompanyProfile from "./pages/companyprofile";
import Lists from "./pages/Lists";
import Dashboard from "./components/Dashboard";
import Saved from "./pages/Saved";
import Navbar from "./components/Navbar";
import AddCompany from "./components/AddCompany";
import Enrichments from "./components/Enrichments";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/add-company" element={<AddCompany />} /> {/* New Route */}
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/enrichments" element={<Enrichments />}/>
      </Routes>
    </Router>
  );
}

export default App;