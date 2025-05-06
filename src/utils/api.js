// API key for Gemini
const GEMINI_API_KEY = "AIzaSyDYATl5U8XYV5oxMh7PzZsHnojiyEY-4h8";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Calls the Gemini API to optimize or correct code
 * @param {string} prompt - The prompt to send to the API
 * @returns {Promise<string>} - The response from the API
 */
export const callGeminiAPI = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    // Check for API errors
    if (!response.ok) {
      throw new Error(
        `API returned error: ${data.error?.message || response.statusText}`
      );
    }

    // Check for content safety blocks
    if (data.promptFeedback && data.promptFeedback.blockReason) {
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }

    // Extract the generated content
    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0 &&
      data.candidates[0].content.parts[0].text
    ) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Invalid API response structure:", data);
      throw new Error("API response missing expected data structure");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

/**
 * Creates a prompt for correcting code with an error
 * @param {string} code - The code to correct
 * @param {string} error - The error message
 * @param {string} language - The programming language
 * @returns {string} - The prompt for the API
 */
export const createErrorCorrectionPrompt = (code, error, language) => {
  return `Fix the following ${language} code that has this error: "${error}"\n\nCode:\n${code}\n\nProvide ONLY the corrected code without explanations or markdown.`;
};

/**
 * Creates a prompt for optimizing code
 * @param {string} code - The code to optimize
 * @param {string} language - The programming language
 * @returns {string} - The prompt for the API
 */
export const createOptimizationPrompt = (code, language) => {
  return `Review and optimize the following ${language} code. If there are any errors, fix them. If the code is already correct, improve its efficiency, readability, or add helpful comments.\n\nCode:\n${code}\n\nProvide ONLY the improved code without explanations or markdown.`;
};
