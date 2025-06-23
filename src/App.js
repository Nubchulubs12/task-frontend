import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import TaskList from './components/TaskList';

function Home({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin({ name: decoded.name, email: decoded.email });
    navigate('/tasks');
  };

  return (
    <div>
      <h1>My Task App</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
}

function Tasks({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={handleLogout}>Sign Out</button>
      <TaskList userEmail={user.email} />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="171264390342-6kgr5e8c7j90ra2sotusm18gg34edli4.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Home onLogin={setUser} />} />
          {user && (
            <Route path="/tasks" element={<Tasks user={user} onLogout={() => setUser(null)} />} />
          )}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
