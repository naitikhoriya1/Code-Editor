import { useState, useRef, useEffect } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="ml-2 mb-4 relative" ref={dropdownRef}>
      <p className="mb-2 text-lg">Language:</p>
      <div className="relative">
        <button
          className="btn btn-secondary flex items-center justify-between w-40"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{language}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-gray-800 rounded-md shadow-lg border border-gray-700">
            {languages.map(([lang, version]) => (
              <button
                key={lang}
                className={`w-full text-left px-4 py-2 text-sm ${
                  lang === language
                    ? "bg-gray-700 text-blue-400"
                    : "text-gray-200 hover:bg-gray-700"
                }`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                {lang}
                <span className="text-gray-400 text-xs ml-1">({version})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
