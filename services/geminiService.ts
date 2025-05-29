
import { GoogleGenAI, Chat } from '@google/genai';
import { GEMINI_CHAT_MODEL, GEMINI_SYSTEM_INSTRUCTION_CHAT } from '../constants';

// Ensure API_KEY is available in the environment.
// In a real Vite/Create React App setup, this would be process.env.VITE_API_KEY or process.env.REACT_APP_API_KEY
// For this specific environment, we assume process.env.API_KEY is directly available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // alert("Gemini API Key is not configured. Chat functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as we handle the check above

interface GeminiChatResponse {
  responseText: string;
  updatedSession: Chat | null;
}

export const getGeminiChatResponse = async (
  userMessage: string,
  currentSession: Chat | null
): Promise<GeminiChatResponse> => {
  if (!API_KEY) {
    return { 
        responseText: "Chat service is currently unavailable due to a configuration issue. Please contact support.",
        updatedSession: currentSession 
    };
  }

  let chat = currentSession;

  try {
    if (!chat) {
      // Start a new chat session if one doesn't exist
      chat = ai.chats.create({
        model: GEMINI_CHAT_MODEL,
        config: {
          systemInstruction: GEMINI_SYSTEM_INSTRUCTION_CHAT,
        },
      });
    }

    // Send the user's message to the existing or new chat session
    const result = await chat.sendMessage({ message: userMessage });
    const responseText = result.text;
    
    return { responseText, updatedSession: chat };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    let errorMessage = 'An unexpected error occurred while contacting the AI. Please try again later.';
    if (error instanceof Error) {
        // Basic error classification (can be more sophisticated)
        if (error.message.includes('API key not valid')) {
            errorMessage = 'The chat service API key is invalid. Please contact support.';
        } else if (error.message.includes('quota')) {
            errorMessage = 'The chat service has reached its usage limit. Please try again later.';
        } else if (error.message.toLowerCase().includes('network error') || error.message.toLowerCase().includes('failed to fetch')) {
            errorMessage = 'A network error occurred. Please check your connection and try again.';
        }
    }
    // Return the error message and the current session (which might be null if it failed to initialize)
    return { responseText: errorMessage, updatedSession: chat };
  }
};
    