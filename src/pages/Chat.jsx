import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useGeminiChat } from '../hooks/useGeminiChat';
import ReactMarkdown from 'react-markdown';

const TypingIndicator = () => (
  <div className="flex space-x-1.5 p-4 bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm w-16">
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

const Chat = () => {
  const { selectedCountry } = useAppContext();
  const navigate = useNavigate();
  const { sendMessage, chatHistory, isLoading } = useGeminiChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!selectedCountry) {
      navigate('/');
    }
  }, [selectedCountry, navigate]);

  useEffect(() => {
    if (selectedCountry && chatHistory.length === 0 && !initialized.current) {
      initialized.current = true;
      sendMessage('__INIT__');
    }
  }, [selectedCountry, chatHistory.length, sendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  };

  if (!selectedCountry) return null;

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100dvh-12rem)] min-h-[400px] max-w-4xl mx-auto w-full border border-slate-200 rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Chat Header */}
      <div className="bg-deepBlue p-4 text-white flex items-center shadow-md z-10 relative">
        <span className="text-3xl mr-3">🗳️</span>
        <div>
          <h2 className="font-bold text-lg leading-tight">ElectaGuide AI</h2>
          <p className="text-blue-200 text-xs font-medium">Ready to discuss {selectedCountry} elections</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="flex-shrink-0 mr-3 mt-1 text-2xl drop-shadow-sm h-8 w-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
                🗳️
              </div>
            )}
            
            <div 
              className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 shadow-sm text-[15px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm prose prose-sm max-w-none'
              }`}
            >
              {msg.role === 'ai' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex-shrink-0 mr-3 mt-1 text-2xl h-8 w-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
              🗳️
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 z-10">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about voting..."
            className="flex-1 bg-slate-100 border-none rounded-full px-6 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${
              !inputText.trim() || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
