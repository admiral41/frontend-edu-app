/**
 * Instructor Hooks
 * Custom React Query hooks for instructor-related operations
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import instructorService from '../services/instructor.service';

// ==================== Dashboard ====================

/**
 * Hook to get instructor dashboard data
 */
export function useInstructorDashboard() {
  return useQuery({
    queryKey: ['instructor', 'dashboard'],
    queryFn: () => instructorService.getDashboard(),
    staleTime: 2 * 60 * 1000,
  });
}

// ==================== Profile ====================

/**
 * Hook to get instructor profile
 */
export function useInstructorProfile() {
  return useQuery({
    queryKey: ['instructor', 'profile'],
    queryFn: () => instructorService.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to update instructor profile
 */
export function useUpdateInstructorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData) => instructorService.updateProfile(profileData),
    onSuccess: (data) => {
      queryClient.setQueryData(['instructor', 'profile'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile.');
    },
  });
}

// ==================== Courses ====================

/**
 * Hook to get instructor's courses
 */
export function useInstructorCourses(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'courses', params],
    queryFn: () => instructorService.getCourses(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to get a single course
 */
export function useInstructorCourse(courseId) {
  return useQuery({
    queryKey: ['instructor', 'courses', courseId],
    queryFn: () => instructorService.getCourse(courseId),
    staleTime: 2 * 60 * 1000,
    enabled: !!courseId,
  });
}

/**
 * Hook to create a course
 */
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData) => instructorService.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'dashboard'] });
      toast.success('Course created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create course.');
    },
  });
}

/**
 * Hook to update a course
 */
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, courseData }) => instructorService.updateCourse(courseId, courseData),
    onSuccess: (data, { courseId }) => {
      queryClient.setQueryData(['instructor', 'courses', courseId], data.course);
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
      toast.success('Course updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update course.');
    },
  });
}

/**
 * Hook to delete a course
 */
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => instructorService.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'dashboard'] });
      toast.success('Course deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete course.');
    },
  });
}

/**
 * Hook to publish a course
 */
export function usePublishCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => instructorService.publishCourse(courseId),
    onSuccess: (data, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses', courseId] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
      toast.success('Course published successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to publish course.');
    },
  });
}

// ==================== Students ====================

/**
 * Hook to get instructor's students
 */
export function useInstructorStudents(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'students', params],
    queryFn: () => instructorService.getStudents(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to get students for a specific course
 */
export function useCourseStudents(courseId, params = {}) {
  return useQuery({
    queryKey: ['instructor', 'courses', courseId, 'students', params],
    queryFn: () => instructorService.getCourseStudents(courseId, params),
    staleTime: 2 * 60 * 1000,
    enabled: !!courseId,
  });
}

// ==================== Live Classes ====================

/**
 * Hook to get instructor's live classes
 */
export function useInstructorLiveClasses(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'live-classes', params],
    queryFn: () => instructorService.getLiveClasses(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to create a live class
 */
export function useCreateLiveClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classData) => instructorService.createLiveClass(classData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'live-classes'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'dashboard'] });
      toast.success('Live class scheduled successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to schedule live class.');
    },
  });
}

/**
 * Hook to update a live class
 */
export function useUpdateLiveClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, classData }) => instructorService.updateLiveClass(classId, classData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'live-classes'] });
      toast.success('Live class updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update live class.');
    },
  });
}

/**
 * Hook to delete a live class
 */
export function useDeleteLiveClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classId) => instructorService.deleteLiveClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'live-classes'] });
      toast.success('Live class deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete live class.');
    },
  });
}

/**
 * Hook to start a live class
 */
export function useStartLiveClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classId) => instructorService.startLiveClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'live-classes'] });
      toast.success('Live class started!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to start live class.');
    },
  });
}

// ==================== Assignments ====================

/**
 * Hook to get instructor's assignments
 */
export function useInstructorAssignments(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'assignments', params],
    queryFn: () => instructorService.getAssignments(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to get assignment details with submissions
 */
export function useAssignment(assignmentId) {
  return useQuery({
    queryKey: ['instructor', 'assignments', assignmentId],
    queryFn: () => instructorService.getAssignment(assignmentId),
    staleTime: 1 * 60 * 1000,
    enabled: !!assignmentId,
  });
}

/**
 * Hook to create an assignment
 */
export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentData) => instructorService.createAssignment(assignmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'assignments'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'dashboard'] });
      toast.success('Assignment created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create assignment.');
    },
  });
}

/**
 * Hook to update an assignment
 */
export function useUpdateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, assignmentData }) =>
      instructorService.updateAssignment(assignmentId, assignmentData),
    onSuccess: (data, { assignmentId }) => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'assignments', assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'assignments'] });
      toast.success('Assignment updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update assignment.');
    },
  });
}

/**
 * Hook to delete an assignment
 */
export function useDeleteAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId) => instructorService.deleteAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'assignments'] });
      toast.success('Assignment deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete assignment.');
    },
  });
}

/**
 * Hook to grade a submission
 */
export function useGradeSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, gradeData }) =>
      instructorService.gradeSubmission(submissionId, gradeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'assignments'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', 'dashboard'] });
      toast.success('Submission graded successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to grade submission.');
    },
  });
}

// ==================== Analytics ====================

/**
 * Hook to get instructor analytics
 */
export function useInstructorAnalytics(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'analytics', params],
    queryFn: () => instructorService.getAnalytics(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to get course analytics
 */
export function useCourseAnalytics(courseId, params = {}) {
  return useQuery({
    queryKey: ['instructor', 'courses', courseId, 'analytics', params],
    queryFn: () => instructorService.getCourseAnalytics(courseId, params),
    staleTime: 5 * 60 * 1000,
    enabled: !!courseId,
  });
}

/**
 * Hook to get revenue stats
 */
export function useRevenueStats(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'revenue', params],
    queryFn: () => instructorService.getRevenueStats(params),
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== Settings ====================

/**
 * Hook to get instructor settings
 */
export function useInstructorSettings() {
  return useQuery({
    queryKey: ['instructor', 'settings'],
    queryFn: () => instructorService.getSettings(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to update instructor settings
 */
export function useUpdateInstructorSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings) => instructorService.updateSettings(settings),
    onSuccess: (data) => {
      queryClient.setQueryData(['instructor', 'settings'], data.settings);
      toast.success('Settings updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update settings.');
    },
  });
}

/**
 * Hook to change password
 */
export function useInstructorChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      instructorService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to change password.');
    },
  });
}

// ==================== Announcements ====================

/**
 * Hook to get instructor's announcements
 */
export function useInstructorAnnouncements(params = {}) {
  return useQuery({
    queryKey: ['instructor', 'announcements', params],
    queryFn: () => instructorService.getAnnouncements(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to create an announcement
 */
export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (announcementData) => instructorService.createAnnouncement(announcementData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'announcements'] });
      toast.success('Announcement created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create announcement.');
    },
  });
}
