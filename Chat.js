// PostDataComponent.js
import axios from 'axios';
import React, { useState } from 'react';

const Chat = () => {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const sendData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/save-data', { content, name, dob });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending data:', error);
      setMessage('An error occurred while sending data');
    }
  };

  return (
    <div>
      <h2>Send Data to MongoDB</h2>
      <input
        type="text"
        placeholder="Enter content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={sendData}>Send</button>
      <div>{message}</div>
      <input
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter dob..."
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
    </div>
  );
};

export default Chat;
