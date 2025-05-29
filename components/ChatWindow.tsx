
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { getGeminiChatResponse } from '../services/geminiService'; 
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
  // No props needed for now, manages its own state
}

const ChatWindow: React.FC<ChatWindowProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null); // Stores the Gemini Chat session


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Initialize chat with a welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-msg',
        text: 'Hello! How can I help you with Thrupthy Dairy Products today?',
        sender: 'bot',
        timestamp: Date.now(),
      },
    ]);
  }, []);


  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      // Pass current chat session and user message text
      const { responseText, updatedSession } = await getGeminiChatResponse(inputText, chatSession);
      
      const newBotMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: responseText,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setChatSession(updatedSession); // Update chat session state

    } catch (err) {
      console.error('Error getting chat response:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't process your request. ${errorMessage}`);
      const errorBotMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        text: `Sorry, I couldn't process your request. Please try again later. (Error: ${errorMessage})`,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prevMessages => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, chatSession]);


  return (
    <div className="flex flex-col h-[calc(100vh-250px)] max-w-2xl mx-auto bg-surface shadow-xl rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-textPrimary text-center">Support Chat</h2>
      </div>
      <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-textPrimary'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="flex justify-start">
             <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow bg-red-100 text-red-700">
               <p className="text-sm">{error}</p>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || inputText.trim() === ''}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
    