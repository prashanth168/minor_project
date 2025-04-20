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
    // Try resetting if WebChat is available
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'reset' }); // Recommended way to reset
    } else {
      // Retry if not yet loaded
      setTimeout(() => {
        if (window.botpressWebChat) {
          window.botpressWebChat.sendEvent({ type: 'reset' });
        }
      }, 500);
    }

    // Hide and show the bot to visually refresh UI
    setShowBot(false);
    setTimeout(() => {
      setShowBot(true);
      setKey(Date.now());
    }, 300);
  };

  return (
    <div>
      {/* Main Toggle Button */}
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
          title="Reset Chat"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: '1001',
            backgroundColor: '#007bff',
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
          🔄
        </button>
      )}

      {/* Overlay and iframe */}
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
