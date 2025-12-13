/**
 * Instructor Service
 * Handles instructor-specific operations (dashboard, courses, students, analytics)
 */

import apiClient from '../api/client';

class InstructorService {
  /**
   * Get instructor dashboard data
   * @returns {Promise<{stats: Object, courses: Array, recentEnrollments: Array, upcomingClasses: Array, pendingAssignments: Array}>}
   */
  async getDashboard() {
    return await apiClient.get('/instructor/dashboard');
  }

  /**
   * Get instructor profile
   * @returns {Promise<Object>}
   */
  async getProfile() {
    return await apiClient.get('/instructor/profile');
  }

  /**
   * Update instructor profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<{user: Object, message: string}>}
   */
  async updateProfile(profileData) {
    return await apiClient.put('/instructor/profile', profileData);
  }

  /**
   * Update profile picture
   * @param {File} file - Image file
   * @returns {Promise<{profile_picture_url: string, message: string}>}
   */
  async updateProfilePicture(file) {
    const formData = new FormData();
    formData.append('profile_picture', file);

    return await apiClient.post('/instructor/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // ==================== Courses ====================

  /**
   * Get instructor's courses
   * @param {Object} params - Query params (status, page, limit)
   * @returns {Promise<{courses: Array, total: number}>}
   */
  async getCourses(params = {}) {
    return await apiClient.get('/instructor/courses', { params });
  }

  /**
   * Get a single course by ID
   * @param {string} courseId - Course ID
   * @returns {Promise<Object>}
   */
  async getCourse(courseId) {
    return await apiClient.get(`/instructor/courses/${courseId}`);
  }

  /**
   * Create a new course
   * @param {Object} courseData - Course data
   * @returns {Promise<{course: Object, message: string}>}
   */
  async createCourse(courseData) {
    return await apiClient.post('/instructor/courses', courseData);
  }

  /**
   * Update a course
   * @param {string} courseId - Course ID
   * @param {Object} courseData - Course data to update
   * @returns {Promise<{course: Object, message: string}>}
   */
  async updateCourse(courseId, courseData) {
    return await apiClient.put(`/instructor/courses/${courseId}`, courseData);
  }

  /**
   * Delete a course
   * @param {string} courseId - Course ID
   * @returns {Promise<{message: string}>}
   */
  async deleteCourse(courseId) {
    return await apiClient.delete(`/instructor/courses/${courseId}`);
  }

  /**
   * Publish a course
   * @param {string} courseId - Course ID
   * @returns {Promise<{course: Object, message: string}>}
   */
  async publishCourse(courseId) {
    return await apiClient.post(`/instructor/courses/${courseId}/publish`);
  }

  /**
   * Unpublish a course
   * @param {string} courseId - Course ID
   * @returns {Promise<{course: Object, message: string}>}
   */
  async unpublishCourse(courseId) {
    return await apiClient.post(`/instructor/courses/${courseId}/unpublish`);
  }

  /**
   * Upload course thumbnail
   * @param {string} courseId - Course ID
   * @param {File} file - Image file
   * @returns {Promise<{thumbnail_url: string, message: string}>}
   */
  async uploadCourseThumbnail(courseId, file) {
    const formData = new FormData();
    formData.append('thumbnail', file);

    return await apiClient.post(`/instructor/courses/${courseId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // ==================== Curriculum ====================

  /**
   * Get course curriculum
   * @param {string} courseId - Course ID
   * @returns {Promise<{sections: Array}>}
   */
  async getCourseCurriculum(courseId) {
    return await apiClient.get(`/instructor/courses/${courseId}/curriculum`);
  }

  /**
   * Add section to course
   * @param {string} courseId - Course ID
   * @param {Object} sectionData - Section data
   * @returns {Promise<{section: Object, message: string}>}
   */
  async addSection(courseId, sectionData) {
    return await apiClient.post(`/instructor/courses/${courseId}/sections`, sectionData);
  }

  /**
   * Update section
   * @param {string} courseId - Course ID
   * @param {string} sectionId - Section ID
   * @param {Object} sectionData - Section data
   * @returns {Promise<{section: Object, message: string}>}
   */
  async updateSection(courseId, sectionId, sectionData) {
    return await apiClient.put(`/instructor/courses/${courseId}/sections/${sectionId}`, sectionData);
  }

  /**
   * Delete section
   * @param {string} courseId - Course ID
   * @param {string} sectionId - Section ID
   * @returns {Promise<{message: string}>}
   */
  async deleteSection(courseId, sectionId) {
    return await apiClient.delete(`/instructor/courses/${courseId}/sections/${sectionId}`);
  }

  /**
   * Add lesson to section
   * @param {string} courseId - Course ID
   * @param {string} sectionId - Section ID
   * @param {Object} lessonData - Lesson data
   * @returns {Promise<{lesson: Object, message: string}>}
   */
  async addLesson(courseId, sectionId, lessonData) {
    return await apiClient.post(`/instructor/courses/${courseId}/sections/${sectionId}/lessons`, lessonData);
  }

  /**
   * Update lesson
   * @param {string} lessonId - Lesson ID
   * @param {Object} lessonData - Lesson data
   * @returns {Promise<{lesson: Object, message: string}>}
   */
  async updateLesson(lessonId, lessonData) {
    return await apiClient.put(`/instructor/lessons/${lessonId}`, lessonData);
  }

  /**
   * Delete lesson
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<{message: string}>}
   */
  async deleteLesson(lessonId) {
    return await apiClient.delete(`/instructor/lessons/${lessonId}`);
  }

  /**
   * Upload lesson video
   * @param {string} lessonId - Lesson ID
   * @param {File} file - Video file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<{video_url: string, message: string}>}
   */
  async uploadLessonVideo(lessonId, file, onProgress) {
    const formData = new FormData();
    formData.append('video', file);

    return await apiClient.post(`/instructor/lessons/${lessonId}/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(percentCompleted);
      },
    });
  }

  // ==================== Students ====================

  /**
   * Get students enrolled in instructor's courses
   * @param {Object} params - Query params (courseId, page, limit, search)
   * @returns {Promise<{students: Array, total: number}>}
   */
  async getStudents(params = {}) {
    return await apiClient.get('/instructor/students', { params });
  }

  /**
   * Get students for a specific course
   * @param {string} courseId - Course ID
   * @param {Object} params - Query params
   * @returns {Promise<{students: Array, total: number}>}
   */
  async getCourseStudents(courseId, params = {}) {
    return await apiClient.get(`/instructor/courses/${courseId}/students`, { params });
  }

  /**
   * Get student details
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>}
   */
  async getStudentDetails(studentId) {
    return await apiClient.get(`/instructor/students/${studentId}`);
  }

  // ==================== Live Classes ====================

  /**
   * Get instructor's live classes
   * @param {Object} params - Query params (status, page, limit)
   * @returns {Promise<{liveClasses: Array, total: number}>}
   */
  async getLiveClasses(params = {}) {
    return await apiClient.get('/instructor/live-classes', { params });
  }

  /**
   * Create a live class
   * @param {Object} classData - Live class data
   * @returns {Promise<{liveClass: Object, message: string}>}
   */
  async createLiveClass(classData) {
    return await apiClient.post('/instructor/live-classes', classData);
  }

  /**
   * Update a live class
   * @param {string} classId - Live class ID
   * @param {Object} classData - Live class data
   * @returns {Promise<{liveClass: Object, message: string}>}
   */
  async updateLiveClass(classId, classData) {
    return await apiClient.put(`/instructor/live-classes/${classId}`, classData);
  }

  /**
   * Delete a live class
   * @param {string} classId - Live class ID
   * @returns {Promise<{message: string}>}
   */
  async deleteLiveClass(classId) {
    return await apiClient.delete(`/instructor/live-classes/${classId}`);
  }

  /**
   * Start a live class
   * @param {string} classId - Live class ID
   * @returns {Promise<{meetingUrl: string, message: string}>}
   */
  async startLiveClass(classId) {
    return await apiClient.post(`/instructor/live-classes/${classId}/start`);
  }

  /**
   * End a live class
   * @param {string} classId - Live class ID
   * @returns {Promise<{message: string}>}
   */
  async endLiveClass(classId) {
    return await apiClient.post(`/instructor/live-classes/${classId}/end`);
  }

  // ==================== Assignments ====================

  /**
   * Get instructor's assignments
   * @param {Object} params - Query params (courseId, status, page, limit)
   * @returns {Promise<{assignments: Array, total: number}>}
   */
  async getAssignments(params = {}) {
    return await apiClient.get('/instructor/assignments', { params });
  }

  /**
   * Get assignment details with submissions
   * @param {string} assignmentId - Assignment ID
   * @returns {Promise<{assignment: Object, submissions: Array}>}
   */
  async getAssignment(assignmentId) {
    return await apiClient.get(`/instructor/assignments/${assignmentId}`);
  }

  /**
   * Create an assignment
   * @param {Object} assignmentData - Assignment data
   * @returns {Promise<{assignment: Object, message: string}>}
   */
  async createAssignment(assignmentData) {
    return await apiClient.post('/instructor/assignments', assignmentData);
  }

  /**
   * Update an assignment
   * @param {string} assignmentId - Assignment ID
   * @param {Object} assignmentData - Assignment data
   * @returns {Promise<{assignment: Object, message: string}>}
   */
  async updateAssignment(assignmentId, assignmentData) {
    return await apiClient.put(`/instructor/assignments/${assignmentId}`, assignmentData);
  }

  /**
   * Delete an assignment
   * @param {string} assignmentId - Assignment ID
   * @returns {Promise<{message: string}>}
   */
  async deleteAssignment(assignmentId) {
    return await apiClient.delete(`/instructor/assignments/${assignmentId}`);
  }

  /**
   * Grade a submission
   * @param {string} submissionId - Submission ID
   * @param {Object} gradeData - Grade data (grade, feedback)
   * @returns {Promise<{submission: Object, message: string}>}
   */
  async gradeSubmission(submissionId, gradeData) {
    return await apiClient.post(`/instructor/submissions/${submissionId}/grade`, gradeData);
  }

  // ==================== Analytics ====================

  /**
   * Get instructor analytics
   * @param {Object} params - Query params (period)
   * @returns {Promise<Object>}
   */
  async getAnalytics(params = {}) {
    return await apiClient.get('/instructor/analytics', { params });
  }

  /**
   * Get course analytics
   * @param {string} courseId - Course ID
   * @param {Object} params - Query params
   * @returns {Promise<Object>}
   */
  async getCourseAnalytics(courseId, params = {}) {
    return await apiClient.get(`/instructor/courses/${courseId}/analytics`, { params });
  }

  /**
   * Get revenue statistics
   * @param {Object} params - Query params (period)
   * @returns {Promise<{revenue: number, breakdown: Array}>}
   */
  async getRevenueStats(params = {}) {
    return await apiClient.get('/instructor/revenue', { params });
  }

  // ==================== Settings ====================

  /**
   * Get instructor settings
   * @returns {Promise<Object>}
   */
  async getSettings() {
    return await apiClient.get('/instructor/settings');
  }

  /**
   * Update instructor settings
   * @param {Object} settings - Settings to update
   * @returns {Promise<{settings: Object, message: string}>}
   */
  async updateSettings(settings) {
    return await apiClient.put('/instructor/settings', settings);
  }

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<{message: string}>}
   */
  async changePassword(currentPassword, newPassword) {
    return await apiClient.post('/instructor/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  // ==================== Announcements ====================

  /**
   * Get announcements created by instructor
   * @param {Object} params - Query params
   * @returns {Promise<{announcements: Array, total: number}>}
   */
  async getAnnouncements(params = {}) {
    return await apiClient.get('/instructor/announcements', { params });
  }

  /**
   * Create an announcement
   * @param {Object} announcementData - Announcement data
   * @returns {Promise<{announcement: Object, message: string}>}
   */
  async createAnnouncement(announcementData) {
    return await apiClient.post('/instructor/announcements', announcementData);
  }

  /**
   * Update an announcement
   * @param {string} announcementId - Announcement ID
   * @param {Object} announcementData - Announcement data
   * @returns {Promise<{announcement: Object, message: string}>}
   */
  async updateAnnouncement(announcementId, announcementData) {
    return await apiClient.put(`/instructor/announcements/${announcementId}`, announcementData);
  }

  /**
   * Delete an announcement
   * @param {string} announcementId - Announcement ID
   * @returns {Promise<{message: string}>}
   */
  async deleteAnnouncement(announcementId) {
    return await apiClient.delete(`/instructor/announcements/${announcementId}`);
  }
}

// Export singleton instance
export default new InstructorService();
