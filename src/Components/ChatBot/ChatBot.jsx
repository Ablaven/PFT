import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  const welcomeMessage = { 
    sender: 'bot', 
    text: 'Hi there! I\'m PFT Assistant. How can I help you today? Try asking about training, programs, prices, or type "help" to see what I can assist with.'
  };

  // Suggested questions for quick access

  // Predefined responses based on keywords
  const keywordResponses = {
    'training': 'We offer various training programs for all skill levels. Check out our Programs section for more information!',
    'program': 'Our programs include beginner, intermediate, and advanced training modules. Each is customized to player needs.',
    'register': 'You can register for our programs by clicking on the "Register" button on the program page!',
    'price': 'Our program prices vary based on level and duration. Basic programs start at $99/month.',
    'schedule': 'Training schedules are flexible. You can view available slots in your dashboard after registration.',
    'coach': 'All our coaches are certified professionals with years of experience in football training.',
    'equipment': 'You\'ll need basic sports equipment: comfortable clothes, football boots, and a water bottle.',
    'location': 'We have training facilities across the city. Your closest location will be shown during registration.',
    'refund': 'We offer full refunds if canceled within 7 days of purchase, and partial refunds within 30 days.',
    'contact': 'You can reach us at support@pft.com or call us at (555) 123-4567.',
    'help': 'I can help with information about our programs, registration, pricing, schedules, coaches, equipment needs, locations, refund policy, or contact details. Just ask!',
  };

  // Load messages from localStorage on first render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([welcomeMessage]);
    }
    
    // Check for chat visibility
    const chatOpen = localStorage.getItem('chatbotOpen') === 'true';
    setIsOpen(chatOpen);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save chat visibility state
  useEffect(() => {
    localStorage.setItem('chatbotOpen', isOpen.toString());
  }, [isOpen]);

  // Handle sending a message
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response based on keywords with a delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5 seconds

    setInputValue('');
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSend({ preventDefault: () => {} });
  };

  // Generate response based on message content
  const generateResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(keywordResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default response if no keywords match
    return "I'm not sure I understand. Try asking about our training programs, pricing, schedule, coaches, equipment, locations, or registration process. Type 'help' for more options.";
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([welcomeMessage]);
    localStorage.removeItem('chatbotMessages');
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chatbot-container">
      {/* Chat toggle button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>
      
      {/* Chat window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>PFT Assistant</h3>
          <div className="chatbot-actions">
            <button 
              className="clear-button"
              onClick={clearChat}
              aria-label="Clear chat history"
              title="Clear chat history"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="message bot typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input" onSubmit={handleSend}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            aria-label="Message input"
          />
          <button type="submit" aria-label="Send message">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot; 