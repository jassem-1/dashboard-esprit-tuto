import React, { useState } from 'react';

const UsernameInput = ({ setUsername, setJoined }) => {
  const [inputUsername, setInputUsername] = useState('');

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim() !== '') {
      setUsername(inputUsername);
      setJoined(true);
    }
  };

  return (
    <div className="username-container">
      <h2>Welcome to the Chatroom</h2>
      <form onSubmit={handleUsernameSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
};

export default UsernameInput;
