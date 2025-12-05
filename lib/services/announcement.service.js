/**
 * Announcement Service
 * Handles announcements and notifications
 */

import apiClient from '../api/client';

class AnnouncementService {
  /**
   * Get all announcements for student
   * @param {Object} params - Query params (type, read, page, limit)
   * @returns {Promise<{announcements: Array, total: number, unreadCount: number}>}
   */
  async getAnnouncements(params = {}) {
    return await apiClient.get('/announcements', { params });
  }

  /**
   * Get announcement by ID
   * @param {string} announcementId - Announcement ID
   * @returns {Promise<Object>}
   */
  async getAnnouncementById(announcementId) {
    return await apiClient.get(`/announcements/${announcementId}`);
  }

  /**
   * Mark announcement as read
   * @param {string} announcementId - Announcement ID
   * @returns {Promise<{message: string}>}
   */
  async markAsRead(announcementId) {
    return await apiClient.put(`/announcements/${announcementId}/read`);
  }

  /**
   * Mark all announcements as read
   * @returns {Promise<{message: string}>}
   */
  async markAllAsRead() {
    return await apiClient.put('/announcements/read-all');
  }

  /**
   * Get recent announcements
   * @param {number} limit - Number of announcements to fetch
   * @returns {Promise<Array>}
   */
  async getRecentAnnouncements(limit = 5) {
    return await apiClient.get('/announcements/recent', { params: { limit } });
  }

  /**
   * Get unread announcements count
   * @returns {Promise<{count: number}>}
   */
  async getUnreadCount() {
    return await apiClient.get('/announcements/unread/count');
  }

  /**
   * Get announcements by type
   * @param {string} type - Type ('general'|'course'|'system'|'urgent')
   * @param {Object} params - Additional params
   * @returns {Promise<Array>}
   */
  async getAnnouncementsByType(type, params = {}) {
    return await apiClient.get(`/announcements/type/${type}`, { params });
  }

  /**
   * Delete announcement (remove from student's view)
   * @param {string} announcementId - Announcement ID
   * @returns {Promise<{message: string}>}
   */
  async deleteAnnouncement(announcementId) {
    return await apiClient.delete(`/announcements/${announcementId}`);
  }

  /**
   * Get course-specific announcements
   * @param {string} courseId - Course ID
   * @returns {Promise<Array>}
   */
  async getCourseAnnouncements(courseId) {
    return await apiClient.get(`/announcements/course/${courseId}`);
  }
}

// Export singleton instance
export default new AnnouncementService();
