import React, { useState } from 'react';
import './event.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      alert('Account created! (Demo)');
    }
  };

  return (
    <div className="event-container">
      <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="controls button">Sign Up</button>
      </form>
      <p style={{ marginTop: '16px' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup; 