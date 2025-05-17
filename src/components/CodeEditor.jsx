import { useRef, useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Button,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, ERROR_PRONE_CODE } from "../constants";
import Output from "./Output";
import ErrorCorrection from "./ErrorCorrection";
import { callGeminiAPI, createOptimizationPrompt } from "../utils/api";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const toast = useToast();
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [isGeneratingCorrection, setIsGeneratingCorrection] = useState(false);
  const [correctedCode, setCorrectedCode] = useState("");

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
      toast({
        title: "Code corrected",
        description: "The code has been automatically fixed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    return () => {
      delete window.applyCorrectedCode;
    };
  }, [toast]);

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
      toast({
        title: "Error-prone code loaded",
        description:
          "This code contains errors that will be automatically corrected.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
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
        toast({
          title: "Code already optimized",
          description:
            "The code is already well-structured. Only comments were added.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }

      setCorrectedCode(improvedCode);
      toast({
        title: "Code optimization complete",
        description: "Review the suggested improvements below.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error during code optimization:", err);
      toast({
        title: "Error optimizing code",
        description:
          err.message ||
          "Failed to generate code improvements. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsGeneratingCorrection(false);
    }
  };

  const applyGeneratedCode = () => {
    if (correctedCode) {
      setValue(correctedCode);
      setCorrectedCode("");
      toast({
        title: "Code applied",
        description: "The improved code has been applied.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box shadow="md">
      <HStack spacing={4} alignItems="flex-start">
        <VStack w="60%" alignItems="flex-start" spacing={4}>
          <HStack spacing={4} w="100%">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Button
              size="sm"
              colorScheme="red"
              onClick={loadErrorProneCode}
              title="Load code with errors for testing"
            >
              Test Error Correction
            </Button>
            <Tooltip label="Generate improved version of your code">
              <Button
                size="sm"
                colorScheme="teal"
                onClick={generateCorrectedCode}
                isLoading={isGeneratingCorrection}
                loadingText="Generating"
              >
                Optimize Code
              </Button>
            </Tooltip>
          </HStack>
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
          {correctedCode && !error && (
            <Box
              mt={4}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="gray.800"
              color="white"
              w="100%"
            >
              <HStack justifyContent="space-between" mb={2}>
                <Box fontWeight="bold" color="teal.300">
                  Optimized Code:
                </Box>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={applyGeneratedCode}
                >
                  Apply Changes
                </Button>
              </HStack>
              <Box borderWidth="1px" borderRadius="md">
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
              </Box>
            </Box>
          )}
        </VStack>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
