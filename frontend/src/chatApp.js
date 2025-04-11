import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './chatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      const botReply = res.data.reply;
      setMessages([...newMessages, { role: 'bot', text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'bot', text: '⚠️ Error getting response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <h2 className="chat-title">🤖 Promptly-AI Chatbot</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.role}`}>
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble bot">
              <span><i>Typing...</i></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-send-btn">Send</button>
        </div>
      </div>

      {/* ✅ Footer below the chat container */}
      <p className="powered-by">
        ⚡ Powered by <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer">
          <strong>Gemini API</strong>
        </a> 
      </p>
    </div>
  );
}

export default ChatApp;
