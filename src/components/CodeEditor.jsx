import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, ERROR_PRONE_CODE } from "../constants";
import Output from "./Output";
import ErrorCorrection from "./ErrorCorrection";
import Modal from "./Modal";
import Toast from "./Toast";
import { callGeminiAPI, createOptimizationPrompt } from "../utils/api";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [isGeneratingCorrection, setIsGeneratingCorrection] = useState(false);
  const [correctedCode, setCorrectedCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };

  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
    setError(null);
    setCorrectedCode("");
  }, [language]);

  useEffect(() => {
    // Register function to apply corrected code
    window.applyCorrectedCode = (correctedCode) => {
      setValue(correctedCode);
      setError(null);
      setCorrectedCode("");
      setIsModalOpen(false);
      showToast("Code has been automatically fixed.", "success");
    };

    return () => {
      delete window.applyCorrectedCode;
    };
  }, []);

  // Check for errors whenever code changes, but with a debounce
  useEffect(() => {
    if (monaco && editorRef.current) {
      setIsCheckingCode(true);
      const checkForErrors = setTimeout(() => {
        const model = editorRef.current.getModel();
        if (model) {
          const markers = monaco.editor.getModelMarkers({
            resource: model.uri,
          });
          const errors = markers.filter(
            (marker) => marker.severity === monaco.MarkerSeverity.Error
          );

          if (errors.length > 0) {
            const firstError = errors[0];
            setError(firstError.message);
          } else {
            setError(null);
          }
        }
        setIsCheckingCode(false);
      }, 800); // Longer delay to allow for typing pauses

      return () => {
        clearTimeout(checkForErrors);
        setIsCheckingCode(true);
      };
    }
  }, [value, monaco]);

  const onMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    setMonaco(monacoInstance);
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    setError(null);
    setCorrectedCode("");
  };

  const loadErrorProneCode = () => {
    if (ERROR_PRONE_CODE[language]) {
      setValue(ERROR_PRONE_CODE[language]);
      setCorrectedCode("");
      showToast(
        "Error-prone code loaded. This code contains errors that will be automatically corrected.",
        "info"
      );
    }
  };

  const generateCorrectedCode = async () => {
    setIsGeneratingCorrection(true);
    setCorrectedCode("");

    try {
      console.log("Starting code optimization for language:", language);
      console.log("Original code:", value);

      // Create the prompt for code optimization
      const prompt = createOptimizationPrompt(value, language);
      console.log("Generated optimization prompt:", prompt);

      // Call the Gemini API
      const improvedCode = await callGeminiAPI(prompt);
      console.log("Received optimized code:", improvedCode);

      if (!improvedCode || improvedCode.trim() === "") {
        throw new Error("Received empty response from optimization API");
      }

      // Check if the optimized code is significantly different
      if (improvedCode.trim() === value.trim()) {
        console.log(
          "Optimized code is identical to original - adding comments only"
        );
        showToast(
          "The code is already well-structured. Only comments were added.",
          "info"
        );
      }

      setCorrectedCode(improvedCode);
      setIsModalOpen(true);
      showToast(
        "Code optimization complete. Review the suggested improvements below.",
        "success"
      );
    } catch (err) {
      console.error("Error during code optimization:", err);
      showToast(
        err.message ||
          "Failed to generate code improvements. Please try again.",
        "error"
      );
    } finally {
      setIsGeneratingCorrection(false);
    }
  };

  const applyGeneratedCode = () => {
    if (correctedCode) {
      setValue(correctedCode);
      setCorrectedCode("");
      setIsModalOpen(false);
      showToast("The improved code has been applied.", "success");
    }
  };

  return (
    <div className="shadow-md">
      <div className="flex items-start space-x-4">
        <div className="w-3/5 flex flex-col space-y-4">
          <div className="flex space-x-4 w-full">
            <LanguageSelector language={language} onSelect={onSelect} />
            <button
              className="btn btn-danger"
              onClick={loadErrorProneCode}
              title="Load code with errors for testing"
            >
              Test Error Correction
            </button>
            <div className="relative group">
              <button
                className="btn btn-primary"
                onClick={generateCorrectedCode}
                disabled={isGeneratingCorrection}
              >
                {isGeneratingCorrection ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Generating...
                  </span>
                ) : (
                  "Optimize Code"
                )}
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Generate improved version of your code
              </div>
            </div>
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
            height="55vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
          {error && !isCheckingCode && (
            <ErrorCorrection error={error} code={value} language={language} />
          )}
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>

      {/* Optimized Code Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-teal-400">Optimized Code</h2>
            <button className="btn btn-success" onClick={applyGeneratedCode}>
              Apply Changes
            </button>
          </div>
          <div className="border border-gray-700 rounded-md">
            <Editor
              height="60vh"
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
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
};

export default CodeEditor;
