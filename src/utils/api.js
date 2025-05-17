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
      // Clean the response text by removing language markers
      const responseText = data.candidates[0].content.parts[0].text;
      const cleanText = responseText
        .replace(/```\w*\n?/g, "") // Remove opening language markers
        .replace(/```\n?/g, "") // Remove closing markers
        .trim(); // Remove extra whitespace

      return cleanText;
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
  // Remove language markers if present
  const cleanCode = code
    .replace(/```\w*\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return `Fix the following ${language} code that has this error: "${error}"\n\nCode:\n${cleanCode}\n\nProvide ONLY the corrected code without explanations or markdown.`;
};

/**
 * Creates a prompt for optimizing code
 * @param {string} code - The code to optimize
 * @param {string} language - The programming language
 * @returns {string} - The prompt for the API
 */
export const createOptimizationPrompt = (code, language) => {
  // Remove language markers if present
  const cleanCode = code
    .replace(/```\w*\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return `Optimize the following ${language} code with these specific criteria:
1. Maintain the exact same functionality
2. Improve code structure and readability
3. Add helpful comments explaining the code
4. Follow best practices for ${language}
5. If the code is already well-structured, only add comments
6. Keep the same variable names unless they can be made more descriptive
7. Ensure proper error handling and resource management

Code to optimize:
${cleanCode}

Provide ONLY the optimized code without explanations or markdown. If the code is already optimal, return it with added comments.`;
};
