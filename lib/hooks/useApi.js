// Custom hooks for API calls
import { useState, useEffect } from 'react';
import { authAPI } from '../api/auth.js';
import { studentAPI } from '../api/students.js';
import { ApiError } from '../api/client.js';

// Generic hook for API calls with loading and error states
export function useApiCall(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook for authentication state
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const profile = await authAPI.getProfile();
        if (isMounted) {
          setUser(profile);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    setIsAuthenticating(true);
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return response;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await authAPI.logout();
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (userData) => {
    setIsAuthenticating(true);
    try {
      const response = await authAPI.register(userData);
      setUser(response.user);
      return response;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return { user, loading, isAuthenticating, login, logout, register };
}

// Hook for student dashboard
export function useStudentDashboard() {
  return useApiCall(studentAPI.getDashboard, []);
}

// Hook for student courses
export function useStudentCourses() {
  return useApiCall(studentAPI.getCourses, []);
}

// Hook for student progress
export function useStudentProgress() {
  return useApiCall(studentAPI.getProgress, []);
}