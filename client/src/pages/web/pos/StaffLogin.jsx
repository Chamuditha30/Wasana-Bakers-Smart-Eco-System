import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/pos/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center font-sans p-4">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <img 
          src="/src/images/logo.webp" 
          alt="Wasana Bakers Logo" 
          className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-md"
        />
        <h2 className="text-white text-2xl font-bold tracking-tight">
          Wasana Bakers
        </h2>
        <p className="text-gray-300 text-xs mt-1">
          POS & Management System
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-white/10">
        <h3 className="text-lg font-bold text-secondary mb-5">
          Staff Login
        </h3>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1.5">
              Username
            </label>
            <input 
              type="text" 
              placeholder="wasana" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:opacity-90 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-opacity shadow-md cursor-pointer mt-2"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-xs text-muted hover:text-secondary transition-colors">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}