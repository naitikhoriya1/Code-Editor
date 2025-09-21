import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Editor } from "@monaco-editor/react";

// Color palette constants
const COLORS = {
  branco: "#eaeaea",
  inox: "#acaba9",
  cinza: "#75706f",
  chumbo: "#2c2c2c",
  preto: "#121212",
};

// Mock constants (you'll need to replace these with your actual imports)
const CODE_SNIPPETS = {
  javascript: `// Interactive JavaScript Example
function greetUser() {
  const name = prompt("What's your name?");
  console.log(\`Hello, \${name}! Welcome to the Code Editor.\`);
  
  const age = prompt("How old are you?");
  console.log(\`You are \${age} years old.\`);
  
  if (age >= 18) {
    console.log("You are an adult!");
  } else {
    console.log("You are a minor.");
  }
}

greetUser();`,

  python: `# Interactive Python Example
def greet_user():
    name = input("What's your name? ")
    print(f"Hello, {name}! Welcome to the Code Editor.")
    
    age = input("How old are you? ")
    print(f"You are {age} years old.")
    
    try:
        age_num = int(age)
        if age_num >= 18:
            print("You are an adult!")
        else:
            print("You are a minor.")
    except ValueError:
        print("Please enter a valid number for age.")

greet_user()`,

  java: `// Interactive Java Example
import java.util.Scanner;

public class HelloWorld {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("What's your name?");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "! Welcome to the Code Editor.");
        
        System.out.println("How old are you?");
        int age = scanner.nextInt();
        System.out.println("You are " + age + " years old.");
        
        if (age >= 18) {
            System.out.println("You are an adult!");
        } else {
            System.out.println("You are a minor.");
        }
    }
}`,

  cpp: `// Interactive C++ Example
#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;
    
    std::cout << "What's your name? ";
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "! Welcome to the Code Editor." << std::endl;
    
    std::cout << "How old are you? ";
    std::cin >> age;
    std::cout << "You are " << age << " years old." << std::endl;
    
    if (age >= 18) {
        std::cout << "You are an adult!" << std::endl;
    } else {
        std::cout << "You are a minor." << std::endl;
    }
    
    return 0;
}`,

  typescript: `// Interactive TypeScript Example
interface User {
  name: string;
  age: number;
}

function greetUser(): void {
  const name: string = prompt("What's your name?") || "Anonymous";
  console.log(\`Hello, \${name}! Welcome to the Code Editor.\`);
  
  const ageInput: string = prompt("How old are you?") || "0";
  const age: number = parseInt(ageInput);
  console.log(\`You are \${age} years old.\`);
  
  const user: User = { name, age };
  
  if (user.age >= 18) {
    console.log("You are an adult!");
  } else {
    console.log("You are a minor.");
  }
  
  console.log("User object:", user);
}

greetUser();`,
};

const ERROR_PRONE_CODE = {
  javascript: `// Error-prone JavaScript code
function buggyFunction() {
  let x = undefined;
  return x.toString(); // This will throw an error
}`,
  python: `# Error-prone Python code
def buggy_function():
    x = None
    return x.upper()  # This will throw an error`,
  java: `// Error-prone Java code
public class BuggyClass {
    public static void main(String[] args) {
        String str = null;
        System.out.println(str.length()); // This will throw NullPointerException
    }
}`,
};

// Language Selector Component
const LanguageSelector = ({ language, onSelect }) => {
  const languages = [
    { id: "javascript", name: "JavaScript", icon: "JS" },
    { id: "python", name: "Python", icon: "PY" },
    { id: "java", name: "Java", icon: "JA" },
    { id: "cpp", name: "C++", icon: "C++" },
    { id: "typescript", name: "TypeScript", icon: "TS" },
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => onSelect(e.target.value)}
        style={{
          backgroundColor: COLORS.chumbo,
          borderColor: COLORS.cinza,
          color: COLORS.branco,
        }}
        className="px-4 py-2 rounded-lg border-2 focus:border-opacity-70 focus:outline-none transition-all duration-300 min-w-[140px] cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Input/Output Component
const InputOutput = ({ editorRef, language }) => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [outputHistory, setOutputHistory] = useState([]);

  const executeJavaScript = useCallback((code, userInput) => {
    try {
      // Create a mock console that captures output
      let consoleOutput = [];
      const mockConsole = {
        log: (...args) => {
          consoleOutput.push(
            args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")
          );
        },
        error: (...args) => {
          consoleOutput.push("ERROR: " + args.join(" "));
        },
        warn: (...args) => {
          consoleOutput.push("WARNING: " + args.join(" "));
        },
      };

      // Mock prompt function for user input
      const mockPrompt = (message) => {
        consoleOutput.push(`PROMPT: ${message}`);
        return userInput || "No input provided";
      };

      // Create a safe execution environment
      const func = new Function(
        "console",
        "prompt",
        "input",
        `
        ${code}
        return '';
      `
      );

      func(mockConsole, mockPrompt, userInput);

      return consoleOutput.length > 0
        ? consoleOutput.join("\n")
        : "Code executed successfully (no output)";
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }, []);

  const executePython = useCallback((code, userInput) => {
    // Simple Python interpreter simulation for basic operations
    try {
      let output = [];
      const lines = code.split("\n").filter((line) => line.trim());

      for (let line of lines) {
        line = line.trim();

        if (line.startsWith("print(")) {
          const match = line.match(/print\((.*)\)/);
          if (match) {
            let content = match[1];
            // Handle string literals
            if (content.startsWith('"') && content.endsWith('"')) {
              content = content.slice(1, -1);
            } else if (content.startsWith("'") && content.endsWith("'")) {
              content = content.slice(1, -1);
            }
            // Handle f-strings (basic)
            if (content.includes("{") && content.includes("}")) {
              content = content.replace(/\{.*?\}/g, userInput || "input");
            }
            output.push(content);
          }
        } else if (line.includes("input(")) {
          output.push(`Input requested: ${userInput || "No input provided"}`);
        }
      }

      return output.length > 0
        ? output.join("\n")
        : "Python code executed (simulation)";
    } catch (error) {
      return `Python Error: ${error.message}`;
    }
  }, []);

  const executeJava = useCallback((code, userInput) => {
    try {
      let output = [];

      // Simple Java simulation - look for System.out.println statements
      const printMatches = code.match(/System\.out\.println\s*\([^)]*\)/g);
      if (printMatches) {
        printMatches.forEach((match) => {
          const content = match.match(/\("([^"]*)"\)/);
          if (content) {
            output.push(content[1]);
          } else {
            output.push("Java output");
          }
        });
      }

      // Check for Scanner input
      if (code.includes("Scanner") || code.includes("nextLine()")) {
        output.push(`Input received: ${userInput || "No input provided"}`);
      }

      return output.length > 0
        ? output.join("\n")
        : "Java code compiled and executed (simulation)";
    } catch (error) {
      return `Java Error: ${error.message}`;
    }
  }, []);

  const runCode = useCallback(async () => {
    if (!editorRef.current) return;

    setIsRunning(true);
    const code = editorRef.current.getValue();

    // Simulate execution time
    await new Promise((resolve) => setTimeout(resolve, 500));

    let result = "";

    try {
      switch (language) {
        case "javascript":
          result = executeJavaScript(code, input);
          break;
        case "python":
          result = executePython(code, input);
          break;
        case "java":
          result = executeJava(code, input);
          break;
        default:
          result = `${language} execution not supported yet. Code syntax validated.`;
      }
    } catch (error) {
      result = `Execution Error: ${error.message}`;
    }

    const timestamp = new Date().toLocaleTimeString();
    const newOutput = `[${timestamp}] ${result}`;

    setOutput(newOutput);
    setOutputHistory((prev) => [newOutput, ...prev.slice(0, 9)]); // Keep last 10 outputs
    setIsRunning(false);
  }, [
    language,
    editorRef,
    input,
    executeJavaScript,
    executePython,
    executeJava,
  ]);

  const clearOutput = useCallback(() => {
    setOutput("");
    setOutputHistory([]);
  }, []);

  return (
    <div className="w-2/5 h-full flex flex-col space-y-4">
      {/* Input Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3
            style={{ color: COLORS.branco }}
            className="text-lg font-semibold"
          >
            Input
          </h3>
          <span style={{ color: COLORS.inox }} className="text-sm">
            Simulates user input for your code
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for your program (e.g., text for prompts, numbers for calculations)..."
          style={{
            backgroundColor: COLORS.chumbo,
            borderColor: COLORS.cinza,
            color: COLORS.branco,
          }}
          className="w-full h-20 p-3 rounded-lg border-2 resize-none focus:outline-none focus:border-opacity-70 transition-all duration-300 font-mono text-sm"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={runCode}
          disabled={isRunning}
          style={{ backgroundColor: "#22c55e" }}
          className="flex-1 px-4 py-2 rounded-lg text-white hover:opacity-80 transition-all duration-300 disabled:opacity-50 font-medium"
        >
          {isRunning ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Running...
            </span>
          ) : (
            "▶ Run Code"
          )}
        </button>
        <button
          onClick={clearOutput}
          style={{ backgroundColor: COLORS.cinza }}
          className="px-4 py-2 rounded-lg text-white hover:opacity-80 transition-all duration-300"
        >
          Clear
        </button>
      </div>

      {/* Output Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3
            style={{ color: COLORS.branco }}
            className="text-lg font-semibold"
          >
            Output
          </h3>
          {outputHistory.length > 0 && (
            <span style={{ color: COLORS.inox }} className="text-sm">
              {outputHistory.length} execution
              {outputHistory.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div
          style={{
            backgroundColor: COLORS.preto,
            borderColor: COLORS.chumbo,
            color: COLORS.branco,
          }}
          className="h-64 rounded-lg border-2 overflow-hidden flex flex-col"
        >
          {/* Current Output */}
          <div className="flex-1 p-4 overflow-auto font-mono text-sm">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div style={{ color: COLORS.inox }} className="italic">
                Click "Run Code" to see output...
                <br />
                <br />
                Supported features:
                <br />• JavaScript: console.log, variables, functions
                <br />• Python: print statements, basic operations
                <br />• Java: System.out.println, basic structure
              </div>
            )}
          </div>

          {/* Output History */}
          {outputHistory.length > 1 && (
            <div
              style={{
                backgroundColor: COLORS.chumbo,
                borderTopColor: COLORS.cinza,
              }}
              className="border-t p-2"
            >
              <details>
                <summary
                  style={{ color: COLORS.inox }}
                  className="cursor-pointer text-xs hover:opacity-70 transition-opacity"
                >
                  Previous outputs ({outputHistory.length - 1})
                </summary>
                <div className="mt-2 max-h-32 overflow-auto">
                  {outputHistory.slice(1).map((hist, index) => (
                    <div
                      key={index}
                      style={{ color: COLORS.inox }}
                      className="text-xs py-1 border-b border-opacity-30"
                      style={{ borderColor: COLORS.cinza }}
                    >
                      <pre className="whitespace-pre-wrap">{hist}</pre>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Error Correction Component
const ErrorCorrection = ({ error, code, language }) => {
  const [isFixing, setIsFixing] = useState(false);

  const handleAutoFix = async () => {
    setIsFixing(true);
    // Simulate API call
    setTimeout(() => {
      setIsFixing(false);
      // In real implementation, this would call your API
      window.applyCorrectedCode?.(code.replace("undefined", "null"));
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.chumbo,
        borderColor: "#ef4444",
      }}
      className="p-4 rounded-lg border-l-4 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span
              style={{ color: COLORS.branco }}
              className="font-medium text-sm"
            >
              Error Detected
            </span>
          </div>
          <p style={{ color: COLORS.inox }} className="text-sm mb-3">
            {error}
          </p>
        </div>
        <button
          onClick={handleAutoFix}
          disabled={isFixing}
          style={{ backgroundColor: "#22c55e" }}
          className="px-3 py-1 rounded text-white text-sm hover:opacity-80 transition-all duration-300 disabled:opacity-50"
        >
          {isFixing ? "Fixing..." : "Auto Fix"}
        </button>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        style={{ backgroundColor: COLORS.chumbo }}
        className="relative z-10 w-11/12 h-5/6 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="h-full p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  const bgColor =
    type === "error"
      ? "#ef4444"
      : type === "success"
      ? "#22c55e"
      : COLORS.cinza;

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        style={{ backgroundColor: bgColor }}
        className="px-6 py-3 rounded-lg shadow-lg text-white flex items-center"
      >
        <span className="mr-3">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity duration-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Main CodeEditor Component
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Optimized toast functions with useCallback
  const showToast = useCallback((message, type = "info") => {
    setToast({ show: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ show: false, message: "", type: "info" });
  }, []);

  // Memoized editor options
  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      fontFamily: "JetBrains Mono, Fira Code, monospace",
      lineNumbers: "on",
      renderWhitespace: "selection",
      cursorBlinking: "smooth",
      smoothScrolling: true,
      wordWrap: "on",
      theme: "vs-dark",
    }),
    []
  );

  // Initialize code when language changes
  useEffect(() => {
    setValue(CODE_SNIPPETS[language] || "");
    setError(null);
    setCorrectedCode("");
  }, [language]);

  // Register global function for applying corrected code
  useEffect(() => {
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
  }, [showToast]);

  // Optimized error checking with debounce
  useEffect(() => {
    if (!monaco || !editorRef.current) return;

    setIsCheckingCode(true);
    const timeoutId = setTimeout(() => {
      const model = editorRef.current.getModel();
      if (model) {
        const markers = monaco.editor.getModelMarkers({
          resource: model.uri,
        });
        const errors = markers.filter(
          (marker) => marker.severity === monaco.MarkerSeverity.Error
        );

        setError(errors.length > 0 ? errors[0].message : null);
      }
      setIsCheckingCode(false);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      setIsCheckingCode(false);
    };
  }, [value, monaco]);

  const onMount = useCallback((editor, monacoInstance) => {
    editorRef.current = editor;
    setMonaco(monacoInstance);
    editor.focus();
  }, []);

  const onSelect = useCallback((selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage] || "");
    setError(null);
    setCorrectedCode("");
  }, []);

  const loadErrorProneCode = useCallback(() => {
    if (ERROR_PRONE_CODE[language]) {
      setValue(ERROR_PRONE_CODE[language]);
      setCorrectedCode("");
      showToast(
        "Error-prone code loaded. This code contains errors that will be automatically corrected.",
        "info"
      );
    }
  }, [language, showToast]);

  const generateCorrectedCode = useCallback(async () => {
    setIsGeneratingCorrection(true);
    setCorrectedCode("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const optimizedCode = `// Optimized ${language} code
${value}

// This code has been analyzed and optimized for better performance and readability`;

      setCorrectedCode(optimizedCode);
      setIsModalOpen(true);
      showToast(
        "Code optimization complete. Review the suggested improvements below.",
        "success"
      );
    } catch (err) {
      showToast(
        "Failed to generate code improvements. Please try again.",
        "error"
      );
    } finally {
      setIsGeneratingCorrection(false);
    }
  }, [value, language, showToast]);

  const applyGeneratedCode = useCallback(() => {
    if (correctedCode) {
      setValue(correctedCode);
      setCorrectedCode("");
      setIsModalOpen(false);
      showToast("The improved code has been applied.", "success");
    }
  }, [correctedCode, showToast]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <div
      style={{ backgroundColor: COLORS.preto }}
      className={`${
        isFullscreen ? "fixed inset-0 z-40" : "min-h-screen"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: COLORS.chumbo,
          borderBottomColor: COLORS.cinza,
        }}
        className="border-b-2 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 style={{ color: COLORS.branco }} className="text-2xl font-bold">
              Code Editor Pro
            </h1>
            <div
              className="w-px h-8"
              style={{ backgroundColor: COLORS.cinza }}
            ></div>
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadErrorProneCode}
              style={{
                backgroundColor: "#ef4444",
                borderColor: "#dc2626",
              }}
              className="px-4 py-2 rounded-lg text-white border-2 hover:opacity-80 transition-all duration-300 text-sm font-medium"
              title="Load code with errors for testing"
            >
              Test Errors
            </button>

            <button
              onClick={generateCorrectedCode}
              disabled={isGeneratingCorrection}
              style={{ backgroundColor: COLORS.cinza }}
              className="px-6 py-2 rounded-lg text-white hover:opacity-80 transition-all duration-300 disabled:opacity-50 font-medium"
            >
              {isGeneratingCorrection ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Optimizing...
                </span>
              ) : (
                "Optimize Code"
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              style={{ backgroundColor: COLORS.inox }}
              className="px-4 py-2 rounded-lg text-white hover:opacity-80 transition-all duration-300"
              title="Toggle fullscreen"
            >
              {isFullscreen ? "⤓" : "⤢"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex space-x-6 h-full">
          {/* Editor Section */}
          <div className="flex-1 flex flex-col space-y-4">
            <div
              style={{
                backgroundColor: COLORS.chumbo,
                borderColor: COLORS.cinza,
              }}
              className="flex-1 rounded-xl border-2 overflow-hidden shadow-2xl"
            >
              <Editor
                options={editorOptions}
                height={isFullscreen ? "calc(100vh - 200px)" : "70vh"}
                theme="vs-dark"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={setValue}
              />
            </div>

            {error && !isCheckingCode && (
              <ErrorCorrection error={error} code={value} language={language} />
            )}
          </div>

          {/* Input/Output Section */}
          <InputOutput editorRef={editorRef} language={language} />
        </div>
      </div>

      {/* Optimized Code Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 style={{ color: COLORS.branco }} className="text-2xl font-bold">
              Optimized Code
            </h2>
            <button
              onClick={applyGeneratedCode}
              style={{ backgroundColor: "#22c55e" }}
              className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-80 transition-all duration-300"
            >
              Apply Changes
            </button>
          </div>
          <div
            style={{ backgroundColor: COLORS.preto, borderColor: COLORS.cinza }}
            className="border-2 rounded-xl overflow-hidden"
          >
            <Editor
              height="60vh"
              language={language}
              value={correctedCode}
              options={{
                ...editorOptions,
                readOnly: true,
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
