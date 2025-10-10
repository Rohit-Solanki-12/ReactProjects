import React, { useState, useEffect } from 'react';

const App = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(user));
    alert('User data saved to localStorage!');
  };

  const handleClear = () => {
    localStorage.removeItem('userData');
    setUser({ name: '', email: '' });
    alert('User data cleared!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <center><h1>Localbox Miner</h1>
      <h2>Your Local Storage Manager</h2></center>
      <p>Enter your details below:</p>

      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter Name"
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Enter Email"
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleSave} style={{ padding: '10px', marginRight: '10px' }}>
        Save
      </button>
      <button onClick={handleClear} style={{ padding: '10px' }}>
        Clear
      </button>

      <div style={{ marginTop: '20px' }}>
        <strong>Stored Data Preview : </strong>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
