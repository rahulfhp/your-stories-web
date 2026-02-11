"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  trackWebsiteChatbotOpened,
  trackWebsiteChatbotClosed,
  trackWebsiteChatbotQuerySubmitted,
  trackWebsiteChatbotTokensUsed,
} from "@/lib/website-analytics";

export default function MindfulNestChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMounted, setIsChatMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatBodyRef = useRef(null);
  const typingTimerRef = useRef(null);
  const autoCloseTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const hasUserInteractedRef = useRef(false);
  const CHAT_ANIMATION_MS = 300;
  const CHATBOT_AUTOOPEN_KEY = "mindfulnest_chatbot_auto_opened";

  const scheduleAutoClose = (delayMs) => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    autoCloseTimerRef.current = setTimeout(() => {
      if (!hasUserInteractedRef.current) {
        closeChatbot();
      }
    }, delayMs);
  };

  const getAutoOpenFlag = () => {
    try {
      if (localStorage.getItem(CHATBOT_AUTOOPEN_KEY) === "true") {
        return true;
      }
    } catch (error) {
      console.error("Error reading auto-open flag:", error);
    }
    if (typeof document !== "undefined") {
      return document.cookie
        .split("; ")
        .some((row) => row.startsWith(`${CHATBOT_AUTOOPEN_KEY}=true`));
    }
    return false;
  };

  const setAutoOpenFlag = () => {
    try {
      localStorage.setItem(CHATBOT_AUTOOPEN_KEY, "true");
    } catch (error) {
      console.error("Error setting auto-open flag:", error);
    }
    if (typeof document !== "undefined") {
      document.cookie = `${CHATBOT_AUTOOPEN_KEY}=true; Max-Age=31536000; Path=/; SameSite=Lax`;
    }
  };

  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
    if (typeof window !== "undefined") {
      const hasAutoOpened = getAutoOpenFlag();
      const isLanding =
        window.location.pathname === "/" ||
        window.location.pathname === "/test" ||
        window.location.pathname === "/home";
      if (!hasAutoOpened && isLanding) {
        setAutoOpenFlag();
        openChatbot(false, 2500);
      }
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
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
    // Check if content contains numbered list pattern (e.g., "1. ", "2. ", etc.)
    const hasNumberedList = /\n\n\d+\.\s/.test(content);

    if (hasNumberedList) {
      // Split by double newline to get sections
      const sections = content.split(/\n\n/);

      return sections
        .map((section, index) => {
          // Check if this section is a numbered item
          if (/^\d+\.\s/.test(section.trim())) {
            const className =
              "font-medium text-sm leading-[21px] m-0 mt-1.5 ml-4";
            return `<li class="${className}">${section.replace(
              /^\d+\.\s/,
              ""
            )}</li>`;
          } else {
            // Regular paragraph
            const className =
              index === 0
                ? "font-medium text-sm leading-[21px] m-0"
                : "font-medium text-sm leading-[21px] m-0 mt-1.5";
            return `<p class="${className}">${section}</p>`;
          }
        })
        .join("\n");
    } else {
      // Original behavior for non-list content
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
    }
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const chatBody = chatBodyRef.current;
      if (!chatBody) return;

      const last = chatBody.lastElementChild;
      if (last && last.scrollIntoView) {
        last.scrollIntoView({ behavior: "auto", block: "end" });
      } else {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });
  };

  const saveMessage = (content, sender) => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ content, sender, timestamp: new Date().toISOString() });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  const handleSendMessage = async () => {
    const userInput = inputValue.trim();
    if (!userInput) return;
    hasUserInteractedRef.current = true;
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    // Track query submission event with 150-character limit
    const truncated =
      userInput.length > 150 ? userInput.slice(0, 150) : userInput;
    trackWebsiteChatbotQuerySubmitted(truncated);

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
      const response = await fetch(
        "https://portfolio-backend.mindefy.tech/mindfulnest/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        }
      );

      const data = await response.json();

      // Track tokens used if available, and logged tokens_used in the mixpanel analytics
      if (data.tokens_used) {
        trackWebsiteChatbotTokensUsed(data.tokens_used, userInput);
      }

      setTimeout(() => {
        const botMessage = {
          content: data.answer || data.response,
          sender: "bot",
          timestamp: new Date().toISOString(),
          tokensUsed: data.tokens_used,
        };
        setMessages((prev) => [...prev, botMessage]);
        saveMessage(data.answer || data.response, "bot");
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
    if (e.target.value.trim()) {
      hasUserInteractedRef.current = true;
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    }

    clearTimeout(typingTimerRef.current);
    if (e.target.value.trim()) {
      typingTimerRef.current = setTimeout(() => {
        console.log("User typed:", e.target.value);
      }, 2500);
    }
  };

  const openChatbot = (markInteracted = true, autoCloseMs = null) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setIsChatMounted(true);
    requestAnimationFrame(() => setIsChatOpen(true));
    trackWebsiteChatbotOpened();
    if (markInteracted) {
      hasUserInteractedRef.current = true;
    }
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    if (autoCloseMs) {
      scheduleAutoClose(autoCloseMs);
    }
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    if (chatHistory.length === 0 && messages.length === 0) {
      initializeChat();
    }
  };

  const closeChatbot = () => {
    setIsChatOpen(false);
    trackWebsiteChatbotClosed();
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsChatMounted(false);
    }, CHAT_ANIMATION_MS);
  };

  const handleResetChat = async () => {
    try {
      await fetch("https://portfolio-backend.mindefy.tech/mindfulnest/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error resetting chat:", error);
    } finally {
      localStorage.removeItem("chatHistory");
      initializeChat();
    }
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
              <hr className="flex-1 border-none border-t border-gray-600 m-0 p-0" />
              <div className="text-center text-gray-400 font-montserrat text-xs font-semibold px-2">
                {formattedDate}
              </div>
              <hr className="flex-1 border-none border-t border-gray-600 m-0 p-0" />
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
                  ? "bg-[#21ABE1] text-white rounded-br-sm shadow-lg"
                  : "bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] text-gray-100 rounded-bl-sm shadow-xl border border-gray-700/50"
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
      <div className="fixed bottom-12 right-0.5 z-[9998]">
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
            {/* Label with Shine Effect - Dark Mode */}
            <span className="relative overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-gray-700 rounded-lg transition-all duration-300 py-2 px-3 text-[#21ABE1] font-montserrat font-normal text-base hidden sm:block hover:shadow-lg hover:shadow-[#21ABE1]/20 hover:border-[#21ABE1]">
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
                loading="lazy"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {isChatMounted && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black/40 z-[999] transition-opacity duration-300 ${
            isChatOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleOverlayClick}
        />
      )}

      {/* Chatbot Overlay */}
      {isChatMounted && (
        <div
          className={`fixed z-[9999] bottom-0 right-0 md:bottom-4 md:right-0 rounded-none md:rounded-2xl w-full md:w-[25rem] md:max-w-[25rem] shadow-[0_8px_32px_rgba(0,0,0,0.6)] h-full md:h-auto transition-all duration-300 ease-out ${
            isChatOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-[0.98] pointer-events-none"
          }`}
        >
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-none md:rounded-[10px] flex flex-col overflow-hidden h-full md:h-auto border border-gray-800/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] flex items-center justify-between pt-3 px-3 md:px-4 md:pt-4 border-b border-gray-800/50 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#21ABE1]/20 to-[#21ABE1]/10 rounded-full flex items-center justify-center border border-[#21ABE1]/30 shadow-lg shadow-[#21ABE1]/20">
                  <img
                    src="yourhour-website-img/chatBotLogo.svg"
                    alt="chatBot Icon"
                    className="relative max-w-full h-auto mx-auto transition-transform duration-300 hover:rotate-45"
                    loading="lazy"
                  />
                </div>
                <span className="text-gray-100 text-center font-semibold text-2xl font-montserrat">
                  MindfulNest
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetChat}
                  className="text-xs font-semibold text-gray-300 hover:text-[#21ABE1] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={closeChatbot}
                  className="w-10 flex items-center justify-end cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="#E5E5E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="bg-gradient-to-b from-[#141414] to-[#0a0a0a]">
              <div
                ref={chatBodyRef}
                className="h-[72vh] md:h-[64vh] max-h-[70vh] rounded-2xl p-3 md:p-4 overflow-y-auto scrollbar-none scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {renderMessages()}

                {/* Loading Animation */}
                {isLoading && (
                  <div className="flex flex-col items-start my-2">
                    <div className="max-w-xs w-max px-2 py-2 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] text-gray-100 rounded-bl-lg shadow-xl border border-gray-700/50">
                      <div className="dots-loading flex justify-center items-center gap-1 h-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#21ABE1]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#21ABE1]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#21ABE1]"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Footer */}
            <div className="flex items-center p-3 md:p-4 bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border-t border-gray-800/50">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Send a message..."
                className="flex-1 border border-gray-700 bg-[#1a1a1a] text-gray-100 placeholder-gray-500 rounded-full px-3 py-2.5 text-sm font-montserrat focus:outline-none focus:border-[#21ABE1] focus:ring-1 focus:ring-[#21ABE1] transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-[#21ABE1] to-[#1a8db5] text-white cursor-pointer border-none rounded-full w-10 h-10 ml-2.5 flex justify-center items-center text-base font-montserrat hover:shadow-lg hover:shadow-[#21ABE1]/50 transition-all duration-300 hover:scale-105"
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
