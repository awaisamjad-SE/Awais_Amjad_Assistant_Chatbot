import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "Hello! I'm Awais Amjad Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  const n8nWebhookUrl = "https://n8n.awaisamjad.me/webhook/softsincs";

  // scroll to bottom only for user messages, not AI replies
  useEffect(() => {
    // Only auto-scroll if the last message is from the user
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isUser) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  // health check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`${n8nWebhookUrl}?message=Hello&userId=test`);
        setIsConnected(res.ok);
      } catch {
        setIsConnected(false);
      }
    };
    checkConnection();
  }, []);

  const getUserId = () => {
    let userId = localStorage.getItem('chatbot_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatbot_user_id', userId);
    }
    return userId;
  };



  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Check if input exceeds 100 characters
    if (inputText.trim().length > 200) {
      alert('Message too long! Please keep your message under 100 characters.');
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Increment message count
    const newMessageCount = messageCount + 1;

    try {
      const userId = getUserId();
      const url = `${n8nWebhookUrl}?message=${encodeURIComponent(userMessage.text)}&userId=${userId}`;
      console.log("Sending GET request to:", url); // Debug log
      const response = await fetch(url);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      // Check if response has content
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      if (!responseText || responseText.trim() === '') {
        console.log("Empty response - N8N workflow executed but didn't return data");
        // Handle empty response gracefully - N8N executed successfully but returned no data
        data = { 
          output: "I received your message and processed it successfully, but I don't have a specific response for you right now. Please try asking something else!" 
        };
      } else {
        try {
          data = JSON.parse(responseText);
          console.log("Parsed response:", data);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Response was not valid JSON:", responseText);
          // Try to use the raw text as the response
          data = { output: responseText };
        }
      }

      let reply = "";

      // Handle response format (matching working HTML version)
      if (Array.isArray(data) && data.length > 0 && data[0].output) {
        reply = data[0].output;
      } else if (data.output) {
        reply = data.output;
      } else if (data.reply) {
        reply = data.reply;
      } else if (data.answer) {
        reply = data.answer;
      } else if (data.message) {
        reply = data.message;
      } else if (data.response) {
        reply = data.response;
      } else {
        reply = "⚠ No response from AI";
      }

      const botMessage = {
        id: crypto.randomUUID(),
        text: reply,
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsConnected(true);
      
      // Update message count and check for auto-reload
      setMessageCount(newMessageCount);
      if (newMessageCount >= 10) {
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reload after 2 seconds to let user see the response
      }

    } catch (error) {
      console.error("Error sending message:", error);
      
      let errorMessage = "I'm having trouble connecting to the server. ";
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage += "Please check your internet connection.";
      } else if (error.message.includes('404')) {
        errorMessage += "The chat service endpoint was not found.";
      } else if (error.message.includes('500')) {
        errorMessage += "There's a server issue. Please try again later.";
      } else {
        errorMessage += "Please try again in a moment.";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: errorMessage,
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setIsConnected(false);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // If Shift+Enter, let the default behavior happen (new line)
  };

  const handleQuickAction = (text) => {
    setInputText(text);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Chat Header */}
      <div className="bg-primary text-white py-3 px-4" style={{ background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)' }}>
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="rounded-circle bg-light bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          <div className="col">
            <h4 className="mb-0 fw-bold">Awais Amjad Assistant</h4>
            <small className="text-light opacity-75">
              Your Personal AI Helper {messageCount > 0 && `• ${10 - messageCount} messages left`}
            </small>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <div 
                className={`rounded-circle me-2 ${isConnected ? 'bg-success' : 'bg-danger'}`} 
                style={{ width: '8px', height: '8px', animation: isConnected ? 'pulse 2s infinite' : 'none' }}
              ></div>
              <small>{isConnected ? 'Online' : 'Offline'}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow-1 overflow-auto p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="d-flex align-items-start mb-3">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)' }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="bg-white rounded-3 p-3 shadow-sm">
                  <div className="d-flex">
                    <div className="bg-secondary rounded-circle me-1" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite' }}></div>
                    <div className="bg-secondary rounded-circle me-1" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite', animationDelay: '0.1s' }}></div>
                    <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite', animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-top p-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="d-flex align-items-end gap-3">
              <div className="flex-grow-1 position-relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message to Awais Amjad Assistant... (max 100 chars)"
                  className="form-control border-2"
                  disabled={isLoading}
                  maxLength={100}
                  rows={inputText.split('\n').length || 1}
                  style={{ 
                    borderColor: '#007bff',
                    fontSize: '16px',
                    resize: 'none',
                    minHeight: '50px',
                    maxHeight: '150px',
                    borderRadius: '25px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    paddingLeft: '20px',
                    paddingRight: inputText.length > 80 ? '80px' : '20px'
                  }}
                />
                {inputText.length > 80 && (
                  <span className="position-absolute end-0 bottom-0 me-3 mb-2 text-muted small">
                    {inputText.length}/100
                  </span>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '50px', 
                  height: '50px',
                  background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
                  border: 'none',
                  flexShrink: 0
                }}
              >
                <Send size={20} />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <button 
                onClick={() => handleQuickAction('👋 Hello Awais')}
                className="btn btn-outline-secondary btn-sm rounded-pill"
              >
                👋 Hello Awais
              </button>
              <button 
                onClick={() => handleQuickAction('❓ What can you help me with?')}
                className="btn btn-outline-secondary btn-sm rounded-pill"
              >
                ❓ What can you help me with?
              </button>
              <button 
                onClick={() => handleQuickAction('💡 Give me some ideas')}
                className="btn btn-outline-secondary btn-sm rounded-pill"
              >
                💡 Give me some ideas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
