'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  isAuthenticated:  boolean;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{message: string, user: any}>;
  register: (name: string, email: string, password: string) => Promise<{ message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);


  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await fetch(`http://localhost:3001/api/profile`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.userByID);
          setIsAuthenticated(true);
          setIsAdmin(data.userByID.isAdmin)
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(`Error fetching profile: ${err}`);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Ensure loading is set to false after the async call finishes
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false); // Set loading to false if no token exists
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data
  };

  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }
    return data
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);