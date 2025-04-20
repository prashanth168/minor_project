import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [showBot, setShowBot] = useState(false);
  const [key, setKey] = useState(Date.now()); // Track changes to force iframe reload

  const toggleBot = () => {
    setShowBot(!showBot);
    if (!showBot) {
      setKey(Date.now()); // Reset the bot when it is shown again
    }
  };

  const resetBot = () => {
    // First, check if Botpress WebChat exists and reset the chat
    if (window.botpressWebChat) {
      window.botpressWebChat.reset(); // Reset conversation
    }

    // Hide bot momentarily and then show it to simulate reset
    setShowBot(false);
    setTimeout(() => {
      setShowBot(true); // Show bot again
      setKey(Date.now()); // Change key to reset iframe
    }, 300); // Delay for smooth hiding
  };

  return (
    <div>
      <button 
        style={{
          position: 'fixed',
          bottom: '10px',
          right: showBot ? '370px' : '20px',
          zIndex: '1000',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          padding: '16px',
          borderRadius: '70px',
          width: '90px',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }} 
        onClick={toggleBot}
      >
        {showBot ? 'X' : 'ChatBot'}
      </button>

      {/* Reset Button */}
      {showBot && (
        <button
          onClick={resetBot}
          style={{
            position: 'fixed',
            bottom: '80px', // Slightly above the main button
            right: '20px',
            zIndex: '1001',
            backgroundColor: '#007bff', // Blue color
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
          }}
        >
          R
        </button>
      )}

      {showBot && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(4px)',
              zIndex: '998',
            }}
          />
          <iframe
            key={key} // Force iframe reload when key changes
            title="chatbot"
            src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/20/03/20250420032859-9VEM68XR.json"
            style={{
              position: 'fixed',
              bottom: '0px',
              right: '0px',
              height: '100vh',
              width: '350px',
              border: 'none',
              zIndex: '999',
              boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
              borderRadius: '10px 10px 0 0',
              transition: 'all 0.3s ease',
              backgroundColor: '#000000',
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chatbot;
