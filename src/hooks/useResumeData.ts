import { useState, useEffect, useCallback, useRef } from 'react';
import type { ResumeType } from '../types/resume';

interface UseResumeDataResult {
  resume: ResumeType | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useResumeData = (): UseResumeDataResult => {
  const [resume, setResume] = useState<ResumeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef<boolean>(false);

  const fetchResume = useCallback(async () => {
    if (isLoading || hasFetchedRef.current) {
      if (import.meta.env.DEV) {
        console.log('Skipping fetch: already loading or fetched');
      }
      return;
    }

    try {
      setIsLoading(true);
      if (import.meta.env.DEV) {
        console.log('Starting fetch for resume data from /resume.json');
      }
      const response = await fetch('/resume.json');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch resume data: ${response.status} ${response.statusText}`
        );
      }
      const data: ResumeType = await response.json();
      if (import.meta.env.DEV) {
        console.log('Fetched resume data:', data);
      }

      setResume(data);
      setError(null);
      hasFetchedRef.current = true;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching resume data:', err);
      }
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
      if (import.meta.env.DEV) {
        console.log('Fetch complete. State:', {
          isLoading: false,
          resume,
          error,
        });
      }
    }
  }, [isLoading, resume, error]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      if (import.meta.env.DEV) {
        console.log('Initiating resume data fetch');
      }
      fetchResume();
    }
  }, [fetchResume]);

  const retry = () => {
    if (import.meta.env.DEV) {
      console.log('Retrying fetch for resume data');
    }
    setError(null);
    setResume(null);
    hasFetchedRef.current = false;
    fetchResume();
  };

  return { resume, isLoading, error, retry };
};
