/**
 * Announcement Hooks
 * Custom React Query hooks for announcements
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { announcementService } from '../services';

/**
 * Hook to get announcements
 */
export function useAnnouncements(params = {}) {
  return useQuery({
    queryKey: ['announcements', params],
    queryFn: () => announcementService.getAnnouncements(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to get recent announcements
 */
export function useRecentAnnouncements(limit = 5) {
  return useQuery({
    queryKey: ['announcements', 'recent', limit],
    queryFn: () => announcementService.getRecentAnnouncements(limit),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to get unread count
 */
export function useUnreadAnnouncementsCount() {
  return useQuery({
    queryKey: ['announcements', 'unread', 'count'],
    queryFn: () => announcementService.getUnreadCount(),
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Hook to mark announcement as read
 */
export function useMarkAnnouncementRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (announcementId) => announcementService.markAsRead(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}
