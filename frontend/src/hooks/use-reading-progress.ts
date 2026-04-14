import { useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { debounce } from 'lodash-es';

interface ProgressData {
  storyId: string;
  progress: number;
  timestamp?: number;
}

export const useReadingProgress = () => {
  const updateProgressMutation = useMutation({
    mutationFn: async (data: ProgressData) => {
      const response = await api.post('/progress/update', {
        storyId: data.storyId,
        progress: data.progress,
        timestamp: data.timestamp || Date.now(),
      });
      return response.data;
    },
  });

  const debouncedUpdate = useCallback(
    debounce((data: ProgressData) => {
      updateProgressMutation.mutate(data);
    }, 2000), // 2 second debounce
    []
  );

  const updateProgress = useCallback((data: ProgressData) => {
    debouncedUpdate(data);
  }, [debouncedUpdate]);

  return {
    updateProgress,
    isUpdating: updateProgressMutation.isLoading,
    error: updateProgressMutation.error,
  };
};