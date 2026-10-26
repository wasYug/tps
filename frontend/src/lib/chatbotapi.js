const RAW_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "";

/**
 * Sends a user query to the Takshashila Public School RAG chatbot API.
 * @param {string} question - The user's question.
 * @returns {Promise<{ answer: string, sources: Array<{ title: string, source: string }> }>}
 */
export async function sendChatMessage(question) {
  const trimmed = typeof question === "string" ? question.trim() : "";
  if (!trimmed) {
    throw new Error("Question cannot be empty.");
  }

  const baseUrl = (RAW_BASE_URL || "").replace(/\/$/, "");
  if (!baseUrl) {
    throw new Error("Chatbot API URL is not configured. Please set VITE_API_BASE_URL or VITE_API_URL.");
  }

  // Support both /chatbot/ (FastAPI direct router prefix) and /api/chatbot/
  const endpoint = `${baseUrl}/chatbot/`;

  let lastError = null;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!response.ok) {
        let errMessage = `Request failed (${response.status})`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMessage = typeof errData.detail === "string" ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch {
          // Keep default error message
        }
        throw new Error(errMessage);
      }

      const data = await response.json();
      if (!data || typeof data.answer !== "string") {
        throw new Error("Invalid response from chatbot API.");
      }

      return {
        answer: data.answer,
        images: data.images,
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
    } catch (err) {
      lastError = err;
    }

  throw lastError || new Error("Failed to contact chatbot API.");
}
