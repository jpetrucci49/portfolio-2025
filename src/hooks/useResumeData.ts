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
    if (isLoading || hasFetchedRef.current) return;

    try {
      setIsLoading(true);
      const response = await fetch('/resume.json');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch resume data: ${response.status} ${response.statusText}`
        );
      }
      const data: ResumeType = await response.json();
      setResume(data);
      setError(null);
      hasFetchedRef.current = true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchResume();
    }
  }, [fetchResume]);

  const retry = () => {
    setError(null);
    setResume(null);
    hasFetchedRef.current = false;
    fetchResume();
  };

  return { resume, isLoading, error, retry };
};
