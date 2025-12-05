// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Students
  STUDENTS: {
    BASE: '/students',
    PROFILE: '/students/profile',
    DASHBOARD: '/students/dashboard',
    COURSES: '/students/courses',
    PROGRESS: '/students/progress',
    SETTINGS: '/students/settings',
  },
  
  // Courses
  COURSES: {
    BASE: '/courses',
    DETAIL: (id) => `/courses/${id}`,
    LESSONS: (id) => `/courses/${id}/lessons`,
    QUIZZES: (id) => `/courses/${id}/quizzes`,
    ENROLL: (id) => `/courses/${id}/enroll`,
  },
  
  // Lessons
  LESSONS: {
    BASE: '/lessons',
    DETAIL: (id) => `/lessons/${id}`,
    COMPLETE: (id) => `/lessons/${id}/complete`,
  },
  
  // Quizzes
  QUIZZES: {
    BASE: '/quizzes',
    DETAIL: (id) => `/quizzes/${id}`,
    SUBMIT: (id) => `/quizzes/${id}/submit`,
  },
  
  // Live Classes
  LIVE_CLASSES: {
    BASE: '/live-classes',
    SCHEDULE: '/live-classes/schedule',
    JOIN: (id) => `/live-classes/${id}/join`,
  },
  
  // Instructors
  INSTRUCTORS: {
    BASE: '/instructors',
    PROFILE: '/instructors/profile',
    APPLICATION: '/instructors/application',
  },
  
  // General
  ANNOUNCEMENTS: '/announcements',
  ASSIGNMENTS: '/assignments',
  NOTIFICATIONS: '/notifications',
};