'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const createThread = async () => {
    try {
      const apiUrl = "http://localhost:3001/thread";
      const { data } = await axios.get(apiUrl);
      setThreadId(data.threadId);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  useEffect(() => {
    createThread();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !threadId) return;
    setIsLoading(true);
    const userMessage = input;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage, name: "You"},
    ]);
    setInput("");

    try {
      const apiUrl = `http://localhost:3001/message`;
      const requestBody = {
        message: userMessage,
        threadId,
      };

      const { data } = await axios.post(apiUrl, requestBody);
      const botMessages = data.messages.filter(msg => msg.type === "bot");
      const botResponse = botMessages.length > 0 ? botMessages[0].content : "No response from bot";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: botResponse, name: "Dennis"},
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "bot",
          content: "Sorry, there was an error processing your message.",
          name: "Dennis",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-4 right-1 z-[9999] flex flex-col pr-3 items-center">
        <button 
          className="bg-white-800 text-white rounded-full p-4 shadow-lg focus:outline-none hover:bg-gray-700 transition duration-300" 
          onClick={toggleChatbot}>
          <Image
            src="/chaticon.png"
            alt="ChatbotIcon"
            width={30}  // Smaller width for mobile
            height={30} // Smaller height for mobile
            className="md:w-[50px] md:h-[50px]"  // Larger dimensions for medium and larger screens
          />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full md:w-full lg:w-3/4 xl:w-2/3 p-8 rounded shadow-lg relative transform transition-transform duration-300 scale-95">
            <button
              onClick={toggleChatbot}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 text-center font-bold text-gray-800">Ask anything about Dennis</h2>
            <div className="h-96 overflow-y-auto p-4 border-t border-gray-200">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm text-gray-500">{message.name}</p>
                  <p className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-black'}`}>
                    {/* Check if message.content is an array and extract the text value */}
                    {Array.isArray(message.content) 
                      ? message.content.map((item, i) => (
                        <span key={i}>{item.text.value}</span> // Display text value from object
                      ))
                    : message.content // Fallback if it's already a string
                  }
                  </p>
                </div>
              ))}
              {isLoading && <p className="loading w-6 h-6 border-4 border-t-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></p>}
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex">
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage} disabled={isLoading} className="bg-gray-500 text-white p-2 rounded-r-lg hover:bg-gray-700 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
