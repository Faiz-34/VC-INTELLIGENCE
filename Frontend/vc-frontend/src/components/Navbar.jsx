import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Companies", path: "/companies" },
    { name: "Lists", path: "/lists" },
    { name: "Saved Searches", path: "/saved" },
    { name: "Enrichments", path: "/enrichments" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-decoration-none text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-transform duration-500 hover:rotate-3 hover:scale-110 hover:drop-shadow-lg"
        >
          VC INTELLIEGENCE
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-decoration-none relative text-sm font-semibold transition-all duration-300 group ${
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <span className="inline-block group-hover:animate-[bounce_0.6s_ease-in-out_1] transition-transform duration-300">
                {link.name}
              </span>
              <span
                className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)} // close menu on click
                className={`w-full text-sm font-semibold py-2 transition ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;