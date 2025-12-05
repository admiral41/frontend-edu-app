// Authentication API calls
import { apiClient } from './client.js';
import { API_ENDPOINTS } from './endpoints.js';

export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

    // Store auth token if returned
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }

    return response;
  },

  // Register new user
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);

    // Store auth token if returned
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }

    return response;
  },

  // Logout user
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always remove token locally
      apiClient.setAuthToken(null);
    }
  },

  // Get user profile
  getProfile: async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
  },

  // Refresh auth token
  refreshToken: async () => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);

    if (response.token) {
      apiClient.setAuthToken(response.token);
    }

    return response;
  },
};