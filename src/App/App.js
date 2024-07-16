import React, { useState } from 'react';
import Authorization from '../authorization/authorization';
import Home from '../Home/Home';
import '../authorization/authorization.css';
import '../Home/Home.css';
import '../App/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      alert('Success');
      setIsAuthenticated(true);
    } else {
      alert(`Invalid username or password. You entered:\nUsername: ${username}\nPassword: ${password}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
      <div className="App">
        {isAuthenticated ? (
            <Home onLogout={handleLogout} />
        ) : (
            <Authorization onLogin={handleLogin} />
        )}
      </div>
  );
}

export default App;
