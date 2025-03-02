import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '@/Services/api';
import { Link, useNavigate } from 'react-router-dom';
import TriangleAlertIcon from '@/Assets/Icons/TriangleAlertIcon';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {

            const response = await api.post('/login',{email:username,password});
            const { token } = response.data;
            
            if (token) {

              const decodedToken = jwtDecode(token);
              const { role , userId } = decodedToken;
        
              localStorage.setItem('token', token);
              localStorage.setItem('role', role);
              localStorage.setItem('userId', userId);
        
              navigate('/booking');
              onLogin();

            } else {
              console.error('Token missing in response');
            }
        } catch (error) {
          console.error(error);
          setError(error.response.data.message);
        }
      };
  return (
    <div className="flex flex-col min-h-[100dvh] bg-firstGradient">
      <form onSubmit={handleSubmit} >
        <div className="bg-muted p-8 flex items-center justify-center">
          <div className="max-w-md w-full space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Enter your email and password to access your account.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                 </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-secondGray rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border secondGray rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                <Link href="#" className="text-sm text-muted-foreground hover:underline">
                    Forgot password?
                  </Link>
                  <div>
                    you dont have an account?
                  <Link to="/signup" className="text-sm text-firstColor text-muted-foreground hover:underline">
                    Sign Up
                  </Link>
                  </div>
              </div>
              <button type="submit" className="w-full bg-firstColor rounded-full text-white py-2 px-4 shadow-md hover:bg-bink-500 disabled:opacity-50">
                Login
              </button>
            </div>
            {error && (
              <div className="flex items-center p-4 mt-4 bg-red-100 text-red-700 rounded-md">
                <TriangleAlertIcon className="mr-2 w-6 h-6" />
                <p className="font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;