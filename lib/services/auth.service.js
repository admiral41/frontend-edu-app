/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

import apiClient from '../api/client';

class AuthService {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{data: Object, token: {token: string, refreshToken: string}}>}
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    // Store tokens and user data
    if (response.token?.token) {
      this.setAuthData(response.token.token, response.token.refreshToken, response.data);
    }

    return response;
  }

  /**
   * Register new learner (student)
   * @param {Object} learnerData - Learner registration data
   * @returns {Promise<{data: Object, token: {token: string, refreshToken: string}}>}
   */
  async registerLearner(learnerData) {
    const response = await apiClient.post('/auth/learner/signup', learnerData);

    // Store tokens after registration (user needs to verify email before login)
    if (response.token?.token) {
      this.setAuthData(response.token.token, response.token.refreshToken, response.data);
    }

    return response;
  }

  /**
   * Register as lecturer (instructor)
   * @param {FormData} lecturerData - Lecturer registration data with CV file
   * @returns {Promise<{data: Object, token: {token: string, refreshToken: string}}>}
   */
  async registerLecturer(lecturerData) {
    const response = await apiClient.post('/auth/lecturer/signup', lecturerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Store tokens after registration
    if (response.token?.token) {
      this.setAuthData(response.token.token, response.token.refreshToken, response.data?.user || response.data);
    }

    return response;
  }

  /**
   * Verify email with verification code
   * @param {string} id - User ID
   * @param {string} code - Verification code
   * @returns {Promise<{success: boolean, msg: string}>}
   */
  async verifyEmail(id, code) {
    return await apiClient.get(`/auth/verify-email/${id}/${code}`);
  }

  /**
   * Get authenticated user's profile
   * @returns {Promise<{data: Object}>}
   */
  async getProfile() {
    const response = await apiClient.get('/auth/profile');

    // Update stored user data
    if (response.data) {
      const currentUser = this.getUser();
      if (currentUser) {
        this.setAuthData(this.getAccessToken(), this.getRefreshToken(), response.data);
      }
    }

    return response;
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   * @returns {Promise<{data: {accessToken: string}}>}
   */
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh-token', {
      refreshToken: refreshToken,
    });

    if (response.data?.accessToken) {
      // Update access token in storage and cookie
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.data.accessToken);
        document.cookie = `access_token=${response.data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
      }
    }

    return response;
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<{success: boolean, msg: string}>}
   */
  async forgotPassword(email) {
    return await apiClient.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token from email
   * @param {string} newPassword - New password
   * @returns {Promise<{success: boolean, msg: string}>}
   */
  async resetPassword(token, newPassword) {
    return await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  /**
   * Get lecturer application data for current user
   * @returns {Promise<{data: {user: Object, lecturerApplication: Object}}>}
   */
  async getLecturerApplication() {
    return await apiClient.get('/auth/lecturer/application');
  }

  /**
   * Reapply as lecturer (for rejected applicants)
   * @param {FormData} applicationData - Updated application data with optional new CV
   * @returns {Promise<{data: Object}>}
   */
  async reapplyLecturer(applicationData) {
    return await apiClient.patch('/auth/lecturer/reapply', applicationData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  /**
   * Get access token from localStorage
   * @returns {string|null}
   */
  getAccessToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  /**
   * Get refresh token from localStorage
   * @returns {string|null}
   */
  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  /**
   * Get stored user data
   * @returns {Object|null}
   */
  getUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      try {
        return userStr ? JSON.parse(userStr) : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Store authentication data in localStorage and cookie
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - JWT refresh token
   * @param {Object} user - User data object
   */
  setAuthData(accessToken, refreshToken, user) {
    if (typeof window !== 'undefined') {
      // Store in localStorage
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Also set cookie for middleware SSR checks
      document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
    }
  }

  /**
   * Clear all authentication data from localStorage and cookies
   */
  clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      // Clear cookie
      document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict';
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
