import React, { useState } from 'react';

function Authorization({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div>
                    <h3>Username:</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Password:</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="Submit">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Authorization;
