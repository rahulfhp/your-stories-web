"use client";

import React, { useState, useEffect, useRef } from "react";

export default function MindfulNestChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatBodyRef = useRef(null);
  const typingTimerRef = useRef(null);

  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const initializeChat = () => {
    const defaultMessage = `Hi! I'm MindfulNest.💡<br />
Think of me as your digital buddy for better mental health and mindful screen habits. Ready to take the first step toward a calmer, more balanced life?
Let's get started! 🚀`;

    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 7);

    const recentMessages = chatHistory.filter(
      (msg) => new Date(msg.timestamp) >= fourteenDaysAgo
    );

    localStorage.setItem("chatHistory", JSON.stringify(recentMessages));

    // Add default message
    const defaultMsg = {
      content: defaultMessage,
      sender: "bot",
      timestamp: new Date().toISOString(),
      isDefault: true,
    };

    setMessages([defaultMsg, ...recentMessages]);
  };

  const formatTimeToAMPM = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    const day = String(messageDate.getDate()).padStart(2, "0");
    const month = String(messageDate.getMonth() + 1).padStart(2, "0");
    const year = messageDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseContent = (content) => {
    const paragraphs = content.split(/\n\n|\n/);
    return paragraphs
      .map((paragraph, index) => {
        const className =
          index === 0 || index === paragraphs.length - 1
            ? "font-medium text-sm leading-[21px] m-0"
            : "font-medium text-sm leading-[21px] m-0 mt-1.5";
        return `<p class="${className}">${paragraph}</p>`;
      })
      .join("\n");
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }, 0);
    }
  };

  const saveMessage = (content, sender) => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ content, sender, timestamp: new Date().toISOString() });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  const handleSendMessage = async () => {
    const userInput = inputValue.trim();
    if (!userInput) return;

    const newMessage = {
      content: userInput,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    saveMessage(userInput, "user");
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://chatbot.mindefy.tech/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      setTimeout(() => {
        const botMessage = {
          content: data.response,
          sender: "bot",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
        saveMessage(data.response, "bot");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        content: "Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    clearTimeout(typingTimerRef.current);
    if (e.target.value.trim()) {
      typingTimerRef.current = setTimeout(() => {
        console.log("User typed:", e.target.value);
      }, 5000);
    }
  };

  const openChatbot = () => {
    setIsChatOpen(true);
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    if (chatHistory.length === 0 && messages.length === 0) {
      initializeChat();
    }
  };

  const closeChatbot = () => {
    setIsChatOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeChatbot();
    }
  };

  const renderMessages = () => {
    let currentDate = null;
    return messages.map((msg, index) => {
      const messageDate = new Date(msg.timestamp);
      const formattedDate = formatTimestamp(msg.timestamp);
      const showDateHeader = currentDate !== formattedDate;
      if (showDateHeader) currentDate = formattedDate;

      return (
        <React.Fragment key={index}>
          {showDateHeader && (
            <div className="flex items-center my-0">
              <hr className="flex-1 border-none border-t border-gray-300 m-0 p-0" />
              <div className="text-center text-gray-500 font-montserrat text-xs font-semibold px-2">
                {formattedDate}
              </div>
              <hr className="flex-1 border-none border-t border-gray-300 m-0 p-0" />
            </div>
          )}
          <div
            className={`flex flex-col my-2 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-xs w-max px-2 py-2 rounded-2xl font-montserrat text-sm font-medium leading-normal ${
                msg.sender === "user"
                  ? "bg-[#21ABE1] text-white rounded-br-sm"
                  : "bg-[rgba(200,200,200,0.35)] text-black rounded-bl-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              }`}
              dangerouslySetInnerHTML={{ __html: parseContent(msg.content) }}
            />
            <div className="font-montserrat text-xs font-medium text-gray-500 pl-2">
              {formatTimeToAMPM(messageDate)}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="fixed bottom-12 right-2 z-[9998]">
        <div className="relative">
          {/* Pulsing Ring Effect */}
          <div className="absolute inset-0 chatbot-icon-pulse">
            <div className="w-full h-full rounded-full bg-[#21ABE1] opacity-20 blur-md"></div>
          </div>

          {/* Main Button with Float Animation */}
          <button
            onClick={openChatbot}
            className="relative cursor-pointer flex items-center gap-1 hover:scale-105 transition-all duration-300 chatbot-icon-float chatbot-icon-wiggle"
          >
            {/* Label with Shine Effect */}
            <span className="relative overflow-hidden bg-[#FFFFFF] border border-[#E2E2E2] rounded-lg transition-all duration-300 py-2 px-3 text-[#000000] font-montserrat font-normal text-base hidden sm:block hover:shadow-lg hover:border-[#21ABE1]">
              <span className="relative z-10">MindfulNest</span>
              <span className="absolute inset-0 chatbot-shine"></span>
            </span>

            {/* Icon Container with Glow */}
            <div className="relative rounded-full flex items-center justify-center">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-[#21ABE1] opacity-0 hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              <img
                src="yourhour-website-img/chatBot-icon.svg"
                alt="chatBot Icon"
                className="relative max-w-full h-auto mx-auto transition-transform duration-300 hover:rotate-45"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {isChatOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
          onClick={handleOverlayClick}
        />
      )}

      {/* Chatbot Overlay */}
      {isChatOpen && (
        <div className="fixed z-[9999] bottom-0 right-0 md:bottom-4 md:right-0 rounded-none md:rounded-2xl w-full md:w-[25rem] md:max-w-[25rem] shadow-[0_4px_24px_rgba(0,0,0,0.3)] h-full md:h-auto">
          <div className="bg-white rounded-none md:rounded-[10px] flex flex-col overflow-hidden h-full md:h-auto">
            {/* Header */}
            <div className="bg-white flex items-center justify-between pt-3 px-3 md:px-4 md:pt-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 bg-[#21ABE11A] rounded-full flex items-center justify-center">
                  <img
                    src="yourhour-website-img/chatBotLogo.svg"
                    alt="chatBot Icon"
                    className="relative max-w-full h-auto mx-auto transition-transform duration-300 hover:rotate-45"
                  />
                </div>
                <span className="text-[#333333] text-center font-semibold text-2xl font-montserrat">
                  MindfulNest
                </span>
              </div>
              <button
                onClick={closeChatbot}
                className="w-10 flex items-center justify-end cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="#333"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="bg-white">
              <div
                ref={chatBodyRef}
                className="h-[72vh] md:h-[64vh] max-h-[70vh] rounded-2xl p-3 md:p-4 overflow-y-auto scrollbar-none scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {renderMessages()}

                {/* Loading Animation */}
                {isLoading && (
                  <div className="flex flex-col items-start my-2">
                    <div className="max-w-xs w-max px-2 py-2 rounded-2xl bg-[rgba(200,200,200,0.35)] text-black rounded-bl-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                      <div className="dots-loading flex justify-center items-center gap-1 h-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Footer */}
            <div className="flex items-center p-3 md:p-4 bg-white">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Send a message..."
                className="flex-1 border border-[#757575] text-black rounded-full px-3 py-2.5 text-sm font-montserrat focus:outline-none focus:border-black"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#21ABE1] text-white cursor-pointer border-none rounded-full w-10 h-10 ml-2.5 flex justify-center items-center text-base font-montserrat hover:bg-[#1a8db5] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
