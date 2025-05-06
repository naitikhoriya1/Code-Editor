import { useState, useEffect } from "react";
import { Box, Text, Button, Spinner, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { callGeminiAPI, createErrorCorrectionPrompt } from "../utils/api";

const ErrorCorrection = ({ error, code, language }) => {
  const [correctedCode, setCorrectedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
      toast({
        title: "Error",
        description: err.message || "Failed to get correction suggestions",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
    <Box
      mt={4}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="gray.800"
      color="white"
      w="100%"
    >
      <Text color="red.300" mb={2} fontWeight="bold">
        Code Error Detected
      </Text>
      <Text color="red.200" mb={3} fontSize="sm">
        {error}
      </Text>

      {isLoading ? (
        <Box display="flex" alignItems="center" my={3}>
          <Spinner size="sm" mr={2} />
          <Text>Generating correction...</Text>
        </Box>
      ) : correctedCode ? (
        <>
          <Text fontWeight="bold" mb={2} color="green.300">
            Corrected Code:
          </Text>
          <Box borderWidth="1px" borderRadius="md" mb={3}>
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
          <Button
            colorScheme="green"
            size="sm"
            onClick={applyCorrection}
            mr={2}
          >
            Apply Correction
          </Button>
        </>
      ) : (
        <Button colorScheme="blue" size="sm" onClick={fetchCorrectedCode}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorCorrection;
