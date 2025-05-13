// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, Children } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ Children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // to load initial state from local storage
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('isAuthenticated', isAuthenticated);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [isAuthenticated, currentUser, users, isLoading]);

  const signup = (username, password) => {

    if (users.find(user => user.username === username)) {
      alert('Username already exists. Please choose another username.');
      return false;
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    alert('Signup successful!');
    return true;
  };

  const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    alert('Invalid username or password. Please try again.');
    isAuthenticated(false);
    setCurrentUser(null);
    return false;

  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    signup,
    login,
    logout,
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
}