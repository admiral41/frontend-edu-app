/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

import apiClient from '../api/client';

class AuthService {
  /**
   * Login with phone and password
   * @param {string} phone - User phone number
   * @param {string} password - User password
   * @param {boolean} rememberMe - Remember user session
   * @returns {Promise<{user: Object, access_token: string, refresh_token: string}>}
   */
  async login(phone, password, rememberMe = false) {
    const response = await apiClient.post('/auth/login', {
      phone,
      password,
      remember_me: rememberMe,
    });

    // Store tokens and user data
    if (response.access_token) {
      this.setAuthData(response.access_token, response.refresh_token, response.user);
    }

    return response;
  }

  /**
   * Register new student
   * @param {Object} studentData - Student registration data
   * @returns {Promise<{user: Object, access_token: string, refresh_token: string}>}
   */
  async registerStudent(studentData) {
    const response = await apiClient.post('/auth/register/student', studentData);

    // Auto-login after registration
    if (response.access_token) {
      this.setAuthData(response.access_token, response.refresh_token, response.user);
    }

    return response;
  }

  /**
   * Submit instructor application
   * @param {FormData} instructorData - Instructor application data (includes CV file)
   * @returns {Promise<{message: string, application_id: string}>}
   */
  async applyAsInstructor(instructorData) {
    const response = await apiClient.post('/auth/apply/instructor', instructorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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
   * @returns {Promise<{access_token: string}>}
   */
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh', {
      refresh_token: refreshToken,
    });

    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }

    return response;
  }

  /**
   * Request password reset
   * @param {string} phone - User phone number
   * @returns {Promise<{message: string}>}
   */
  async forgotPassword(phone) {
    return await apiClient.post('/auth/forgot-password', { phone });
  }

  /**
   * Reset password with OTP
   * @param {string} phone - User phone number
   * @param {string} otp - OTP code
   * @param {string} newPassword - New password
   * @returns {Promise<{message: string}>}
   */
  async resetPassword(phone, otp, newPassword) {
    return await apiClient.post('/auth/reset-password', {
      phone,
      otp,
      new_password: newPassword,
    });
  }

  /**
   * Verify OTP
   * @param {string} phone - User phone number
   * @param {string} otp - OTP code
   * @returns {Promise<{message: string, verified: boolean}>}
   */
  async verifyOTP(phone, otp) {
    return await apiClient.post('/auth/verify-otp', { phone, otp });
  }

  /**
   * Get current authenticated user
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    return await apiClient.get('/auth/me');
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
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  /**
   * Store authentication data
   * @private
   */
  setAuthData(accessToken, refreshToken, user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  }

  /**
   * Clear all authentication data
   * @private
   */
  clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }
}

// Export singleton instance
export default new AuthService();
