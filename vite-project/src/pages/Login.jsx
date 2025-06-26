import React, { useState } from 'react';
import './event.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for authentication logic
    if (!email || !password) {
      setError('Please enter both email and password.');
    } else {
      setError('');
      alert('Logged in! (Demo)');
    }
  };

  return (
    <div className="event-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="controls button">Login</button>
      </form>
      <p style={{ marginTop: '16px' }}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login; 