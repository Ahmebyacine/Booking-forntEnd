import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '@/Services/api';
import TriangleAlertIcon from '@/Assets/Icons/TriangleAlertIcon';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Added navigate for redirect

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    api.post('/signup', formData)
      .then((response) => {
        console.log('Signup successful:', response.data);
        setSubmitted(true);
        setLoading(false);

        const { token } = response.data;

        if (token) {
          const decodedToken = jwtDecode(token);
          const { role, userId } = decodedToken;

          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', userId);

          navigate('/booking');
          onLogin();
        }
      })
      .catch((error) => {
        console.error('There was an error during signup!', error);
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="bg-firstGradient p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Enter your details to get started.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="555-1234"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
              Password Confirm
            </label>
            <input
              id="passwordConfirm"
              type="password"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
            do you have alerdy account?
            <Link to="/login" className="text-sm text-firstColor text-muted-foreground hover:underline">
             Login
            </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-firstColor rounded-full text-white py-2 px-4 shadow-md hover:bg-bink-500 disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {error && (
          <div className="flex items-center p-4 mt-4 bg-red-100 text-red-700 rounded-md">
            <TriangleAlertIcon className="mr-2 w-6 h-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}
        {submitted && !error && <div className="text-green-600">Signup successful!</div>}
      </div>
    </div>
  );
};

export default Signup;