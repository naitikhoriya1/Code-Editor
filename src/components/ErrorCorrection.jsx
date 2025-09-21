import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { callGeminiAPI, createErrorCorrectionPrompt } from "../utils/api";

const ErrorCorrection = ({ error, code, language }) => {
  const [correctedCode, setCorrectedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fetch corrected code when an error is detected
  useEffect(() => {
    if (error && code) {
      fetchCorrectedCode();
    } else {
      setCorrectedCode("");
    }
  }, [error, code]);

  const fetchCorrectedCode = async () => {
    if (!error) return;

    setIsLoading(true);
    try {
      console.log("Attempting to correct code with error:", error);

      // Create the prompt for error correction
      const prompt = createErrorCorrectionPrompt(code, error, language);

      // Call the Gemini API
      const result = await callGeminiAPI(prompt);
      setCorrectedCode(result);
    } catch (err) {
      console.error("Error fetching corrected code:", err);
      alert(err.message || "Failed to get correction suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  const applyCorrection = () => {
    if (
      window.applyCorrectedCode &&
      typeof window.applyCorrectedCode === "function"
    ) {
      window.applyCorrectedCode(correctedCode);
    }
  };

  if (!error) return null;

  return (
    <div className="mt-4 card w-full">
      <p className="text-red-400 mb-2 font-bold">Code Error Detected</p>
      <p className="text-red-300 mb-3 text-sm">{error}</p>

      {isLoading ? (
        <div className="flex items-center my-3">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Generating correction...</span>
        </div>
      ) : correctedCode ? (
        <>
          <p className="font-bold mb-2 text-green-400">Corrected Code:</p>
          <div className="border border-gray-700 rounded-md mb-3">
            <Editor
              height="200px"
              language={language}
              value={correctedCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
              }}
              theme="vs-dark"
            />
          </div>
          <button className="btn btn-success mr-2" onClick={applyCorrection}>
            Apply Correction
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={fetchCorrectedCode}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorCorrection;
