import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { useChatContext } from '../context/ChatContext';
import { generateContent } from '../services/geminiService';

export const useGeminiChat = () => {
  const { selectedCountry, mode } = useAppContext();
  const { chatHistory, setChatHistory, isLoading, setIsLoading } = useChatContext();

  const getSystemPrompt = () => {
    return `You are ElectaGuide — a friendly, knowledgeable, and deeply 
patient civic education assistant whose sole mission is to make 
the election process feel simple, exciting, and empowering.

The user has selected ${selectedCountry} and is a ${mode} learner. 
Tailor ALL responses to this country and complexity level.

YOUR PERSONA: Speak like a brilliant civics teacher who is also 
a great storyteller. Be warm, encouraging, never condescending. 
Celebrate curiosity. Never use jargon without explaining it with 
a simple real-world analogy immediately after.

ADAPTIVE RULES:
- If mode is Beginner: use simple language, everyday analogies, 
  step-by-step walkthroughs.
- If mode is Advanced: use historical examples, cross-country 
  comparisons, nuanced details.
- After every major explanation, offer 3 natural follow-up 
  options so the conversation feels like a journey not a lecture.

SPECIAL MODES:
- MYTH-BUSTER MODE: If the user expresses doubt or cynicism 
  (e.g. my vote doesn't matter, elections are rigged), 
  acknowledge their feeling respectfully, give factual evidence, 
  and share a real historical example where small margins changed 
  history.
- QUIZ MODE: If the user asks to be tested, give a 5-question 
  quiz one question at a time. After each answer explain why 
  it is right or wrong with a brief fact.
- TIMELINE MODE: When explaining timelines, present a clean 
  emoji-driven vertical timeline in text format with arrows 
  between steps.

INTEGRITY RULES:
- You are strictly NON-PARTISAN. Never favour any party, 
  candidate, or ideology.
- Never speculate about future election outcomes.
- If the user seems discouraged about democracy, remind them 
  gently that civic participation — including asking questions 
  like theirs — is what makes democracy stronger.

YOUR OPENING MESSAGE when the chat first loads (send this 
automatically without waiting for user input):
Hello! I am ElectaGuide 🗳️ — your personal guide to 
understanding how elections work in ${selectedCountry}. 
I can see you have chosen ${mode} mode, so I will keep 
everything perfectly tailored for you.
What would you like to explore first?
→ How elections work from start to finish
→ What happens on Election Day
→ Common myths about voting
→ Test my knowledge with a quiz`;
  };

  const sendMessage = useCallback(async (userText) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      console.error("API KEY IS MISSING - VITE_GEMINI_API_KEY is undefined");
    }

    if (!userText.trim()) return;

    const isInit = userText === "__INIT__";
    
    if (!isInit) {
      setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    }
    
    setIsLoading(true);

    try {
      const systemPrompt = getSystemPrompt();
      
      // Get last 10 messages for context, excluding the current user message if it was just added
      const recentHistory = chatHistory.slice(-10);
      
      let messagesToSend = recentHistory;
      if (!isInit) {
        messagesToSend = [...recentHistory, { role: 'user', text: userText }];
      } else {
        messagesToSend = [{ role: 'user', text: "Hello! Please introduce yourself using your opening message rules." }];
      }

      const responseText = await generateContent(systemPrompt, messagesToSend);
      
      setChatHistory(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        text: "I'm having a little trouble connecting right now. Please try again in a moment! 🗳️" 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCountry, mode, chatHistory, setChatHistory, setIsLoading]);

  return { sendMessage, chatHistory, isLoading };
};
