/**
 * Authentication Hooks
 * Custom React Query hooks for authentication operations
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '../services';

/**
 * Hook to get current user
 */
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ phone, password, rememberMe }) =>
      authService.login(phone, password, rememberMe),
    onSuccess: (data) => {
      // Update user cache
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful!');
      router.push('/student-dashboard');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });
}

/**
 * Hook for student registration mutation
 */
export function useRegisterStudent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentData) => authService.registerStudent(studentData),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Registration successful! Welcome aboard!');
      router.push('/student-dashboard');
    },
    onError: (error) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });
}

/**
 * Hook for instructor application mutation
 */
export function useApplyInstructor() {
  return useMutation({
    mutationFn: (instructorData) => authService.applyAsInstructor(instructorData),
    onSuccess: () => {
      toast.success(
        'Application submitted successfully! We will review and contact you soon.'
      );
    },
    onError: (error) => {
      toast.error(error.message || 'Application submission failed. Please try again.');
    },
  });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    },
  });
}

/**
 * Hook for forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (phone) => authService.forgotPassword(phone),
    onSuccess: () => {
      toast.success('OTP sent to your phone!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    },
  });
}

/**
 * Hook for password reset mutation
 */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ phone, otp, newPassword }) =>
      authService.resetPassword(phone, otp, newPassword),
    onSuccess: () => {
      toast.success('Password reset successful! Please login with your new password.');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message || 'Password reset failed. Please try again.');
    },
  });
}
