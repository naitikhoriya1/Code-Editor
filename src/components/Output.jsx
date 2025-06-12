import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userInput, setUserInput] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(
        language,
        sourceCode,
        userInput
      );
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // Show error toast
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <p className="mb-2 text-lg">Output</p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          User Input (stdin)
        </label>
        <textarea
          className="input w-full h-24 resize-none"
          placeholder="Enter input for your program here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <button
        className={`btn ${
          isLoading ? "opacity-50 cursor-not-allowed" : "btn-success"
        } mb-4`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
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
            Running...
          </span>
        ) : (
          "Run Code"
        )}
      </button>
      <div
        className={`h-[60vh] p-2 border rounded-md overflow-y-auto ${
          isError ? "border-red-500 text-red-400" : "border-editor-border"
        } bg-editor-bg`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
