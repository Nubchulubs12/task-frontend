import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import TaskList from './components/TaskList';
import './index.css';

function Home({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin({ name: decoded.name, email: decoded.email });
    navigate('/tasks');
  };

  return (
  <div className="layout">
    <div className="sidebar"></div>

   <div className="content">
        <h1 style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginBottom: '1rem'
        }}>
      My Task App</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log('Login Failed')}
      />
    </div>
      <div className="sidebar"></div>

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
     <p style={{
       textAlign: 'center',
       fontWeight: 'bold',
       fontSize: '1.2rem',
       marginBottom: '1rem'
     }}>
       Welcome, {user.name}
     </p>

     <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
       <button
         onClick={handleLogout}
         style={{
           backgroundColor: '#ff4d4d',
           color: '#fff',
           border: 'none',
           padding: '0.5rem 1rem',
           borderRadius: '5px',
           cursor: 'pointer'
         }}
       >
         Sign Out
       </button>
     </div>

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
