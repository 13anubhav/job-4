import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

require('dotenv').config();

const HolidayChaloAI = () => {
  // State to manage chat visibility
  const [isChatOpen, setChatOpen] = useState(false);
  // State to store chat history
  const [chatHistory, setChatHistory] = useState([]);
  // State to manage "Generating Response" message visibility
  const [isResponseGenerating, setResponseGenerating] = useState(false);
  // Reference for chat output element
  const chatOutputRef = useRef(null);
  // Reference for user input element
  const userInputRef = useRef(null);
  // Next.js router
  const router = useRouter();

  // Effect to scroll to the bottom of the chat window when chatHistory changes
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Function to fetch chat data from the API
  const fetchChatData = async (userInput) => {
    try {
      const apiUrl = '/api/chat';
      const headers = new Headers({
        'Content-Type': 'application/json',
      });

      const data = {
        userInput,
      };

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };

      // Show "Fetching Response" message
      setResponseGenerating(true);

      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();

      // Update chat history with the new response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'user', content: userInput },
        { role: 'ai', content: responseData.response || 'No response available' },
      ]);

      // Hide "Fetching Response" message
      setResponseGenerating(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors if needed
      // Hide "Fetching Response" message on error
      setResponseGenerating(false);
    }
  };

  // Function to update chat output
  const updateChatOutput = (output, isFormResponse = false) => {
    // Update chat history with the new output only if it's not a user message
    if (!isFormResponse) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'ai', content: output },
      ]);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userInput = userInputRef.current.value;
    updateChatOutput(userInput, true);

    // Fetch data from the API
    await fetchChatData(userInput);

    // Clear the user input field after fetching data
    userInputRef.current.value = '';
  };

  // Function to toggle chat visibility
  const toggleChat = () => {
    setChatOpen((prevState) => !prevState);
  };

  // Function to close the chat
  const closeChat = () => {
    setChatOpen(false);
  };

  return (
    <>
      {/* ... (head and other content) */}

      {/* Chat container */}
      <div className="chat-toggle-container">
        {/* Button to toggle chat visibility */}
        <button className="toggle-chat-button" onClick={toggleChat}>
          Open Job AI Chat
        </button>

        {/* Chat popup */}
        {isChatOpen && (
          <div className="popup-chat">
            {/* Chat header */}
            <div className="chat-header">
              <span>Anubhav AI Job Assistant</span>
              {/* Button to close the chat */}
              <button className="close-chat-button" onClick={closeChat}>
                Close
              </button>
            </div>

            {/* Chat content */}
            <div id="chatContainer">
              <div id="chatOutput" ref={chatOutputRef}>
                {/* Display chat history */}
                <p>
                  <strong>Job Search AI:</strong> Hello! I am Anubhav's AI Job Assistant.
                  <br />
                  <p>
                    How can I assist you? You can ask me any question related to Jobs like:
                  </p>
                  <p>Skills required for a software development job.</p>
                  <p>Skills Required For Frontend and Backend Development Job</p>
                </p>

                {/* Display chat history messages */}
                {chatHistory.map((message, index) => (
                  <div key={index} className={message.role === 'user' ? 'formOutput' : ''}>
                    {/* Display user or AI message based on the role */}
                    <strong>{message.role === 'user' ? 'USER:' : 'Job Assistant AI:'}</strong> {message.content}
                     {/* Add a horizontal line only after Job Assistant AI response */}
                     {message.role === 'ai' && index < chatHistory.length - 1 && <hr />}
                  
                  </div>
                ))}

                {/* Display "Fetching Response" message */}
                {isResponseGenerating && (
                  <div className="formOutput">
                    <strong>Job Assistant AI:</strong> Generating Response...
                  </div>
                )}
              </div>

              {/* Chat input form */}
              <form id="chatForm" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  id="userInput"
                  name="userInput"
                  autoComplete="off"
                  placeholder="Type your message..."
                  ref={userInputRef}
                />
                <button type="submit" className="send-button">
                  {isResponseGenerating ? 'Getting Response...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>
        {`
          body {
            font-family: Arial, sans-serif;
          }
          .header {
            text-align: center;
            padding: 20px;
          }
          h1 {
            margin: 0;
          }
          .content {
            text-align: center;
            margin: 20px;
          }
          .chat-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
          }
          .popup-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            border-radius: 8px;
          }
          // ... (remaining styles)
        `}
      </style>

      <style jsx>
        {`
          .chat-header {
            background-color: #f0f0f0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
          .chat-header span {
            font-weight: bold;
          }
          .close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          // ... (existing styles)
        `}
      </style>

      <style jsx>
        {`
          #chatContainer {
            max-width: 400px;
            margin: 0;
            padding: 20px;
          }
          #chatOutput {
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
          }
          form {
            margin-top: 10px;
            display: flex;
          }
          input[type='text'] {
            flex: 1;
            padding: 10px;
          }
          button[type='submit'] {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }
          .send-button {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }
          .send-button:hover {
            background-color: #005a9e; /* Darker background on hover */
          }
          .formOutput {
            margin-top: 10px;
            font-weight: bold;
            color: #000000;
          }
          .toggle-chat-button {
            display: block;
            margin: 10px auto;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }
        `}
      </style>

      <style jsx>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .header {
            text-align: center;
            padding: 20px;
            background-color: #0078d4;
            color: #fff;
          }
          h1 {
            margin: 0;
            font-size: 32px;
          }
          a {
            color: #0078d4;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
          .content {
            text-align: center;
            margin: 20px;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .chat-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
          }
          .popup-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            border-radius: 8px;
          }
          // ... (remaining styles)
        `}
      </style>

      <style jsx>
        {`
          .chat-header {
            background-color: #f0f0f0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
          .chat-header span {
            font-weight: bold;
            font-size: 20px;
          }
          .close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          // ... (existing styles)
        `}
      </style>

      <style jsx>
        {`
          button.toggle-chat-button {
            background-color: #0078d4;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
          }
          button.toggle-chat-button:hover {
            background-color: #005a9e;
          }
          button.close-chat-button {
            background-color: #e0e0e0;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          button.close-chat-button:hover {
            background-color: #c7c7c7;
          }
          .chat-toggle-container {
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default HolidayChaloAI;

