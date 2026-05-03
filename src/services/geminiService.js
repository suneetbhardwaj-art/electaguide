import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateContent = async (systemPrompt, chatHistory) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  try {
    // Initialize the official Google SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Configure the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt 
    });

    // Format chat history for the SDK
    const contents = chatHistory.map(msg => ({
      role: msg.role === 'ai' || msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Generate content using the SDK
    const result = await model.generateContent({
      contents: contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("Full Gemini API Error Object:", error);
    throw new Error(error.message || "An error occurred while calling the AI. Please try again.");
  }
};
