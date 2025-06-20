import React, { useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  setTimeout(() => {
    setIsLoggedIn(true); // Set to true for testing purposes
  }, 10000); // Simulate a delay for testing purposes
  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;