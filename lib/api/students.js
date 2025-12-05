// Student-related API calls
import { apiClient } from './client.js';
import { API_ENDPOINTS } from './endpoints.js';

export const studentAPI = {
  // Get student dashboard data
  getDashboard: async () => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.DASHBOARD);
  },

  // Get student profile
  getProfile: async () => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.PROFILE);
  },

  // Update student profile
  updateProfile: async (profileData) => {
    return await apiClient.put(API_ENDPOINTS.STUDENTS.PROFILE, profileData);
  },

  // Get enrolled courses
  getCourses: async () => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.COURSES);
  },

  // Get student progress
  getProgress: async () => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.PROGRESS);
  },

  // Update student settings
  updateSettings: async (settings) => {
    return await apiClient.put(API_ENDPOINTS.STUDENTS.SETTINGS, settings);
  },

  // Enroll in a course
  enrollInCourse: async (courseId) => {
    return await apiClient.post(API_ENDPOINTS.COURSES.ENROLL(courseId));
  },
};