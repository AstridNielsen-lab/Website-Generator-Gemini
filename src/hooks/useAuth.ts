import { useState, useEffect } from 'react';
import type { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { userStorage } from '../utils/storage';

const AUTH_KEY = 'auth_user';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: {
      id: '1',
      email: 'juliolikelooksolutions@gmail.com',
      name: 'Julio Campos Machado',
      createdAt: new Date().toISOString()
    },
    isLoading: false,
    error: null
  });

  // Load saved auth state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);
    if (savedUser) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(savedUser),
        isLoading: false
      }));
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await userStorage.login(credentials);
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await userStorage.register(credentials);
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_KEY);
    setState(prev => ({ ...prev, user: null }));
  };

  return {
    ...state,
    login,
    register,
    logout
  };
}