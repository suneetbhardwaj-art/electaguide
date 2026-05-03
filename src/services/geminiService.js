export const generateContent = async (systemPrompt, chatHistory) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  // Log the full API URL with partially masked key
  console.log(`Calling Gemini API Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.substring(0, 8)}...`);

  const contents = chatHistory.map(msg => ({
    role: msg.role === 'ai' || msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 600
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to communicate with Gemini API.");
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected response structure from Gemini API.");
    }
  } catch (error) {
    // Log the full error object to the browser console for debugging
    console.error("Full Gemini API Error Object:", error);
    throw new Error(error.message || "An error occurred while calling the AI. Please try again.");
  }
};
