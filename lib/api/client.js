// API configuration and base setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Base API client with common functionality
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status
        );

        // Handle 401 Unauthorized - try to refresh token
        if (response.status === 401 && endpoint !== '/auth/refresh' && endpoint !== '/auth/login') {
          return this.handleTokenRefresh(endpoint, options);
        }

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 0);
    }
  }

  async handleTokenRefresh(endpoint, options) {
    if (this.isRefreshing) {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      }).then(() => {
        return this.request(endpoint, options);
      });
    }

    this.isRefreshing = true;

    try {
      // Try to refresh the token
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new ApiError('Token refresh failed', response.status);
      }

      const data = await response.json();

      if (data.token) {
        this.setAuthToken(data.token);
        this.processQueue(null, data.token);

        // Retry the original request with new token
        return this.request(endpoint, options);
      } else {
        throw new ApiError('No token in refresh response', 401);
      }
    } catch (error) {
      this.processQueue(error, null);
      this.setAuthToken(null);
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setAuthToken(token) {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }

  // HTTP methods
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();
export { ApiError };