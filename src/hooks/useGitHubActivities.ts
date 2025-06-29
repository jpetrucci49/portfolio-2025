import { useState, useEffect, useCallback, useRef } from 'react';
import type { Activity, GitHubEvent } from '../types/about';

interface UseGitHubActivitiesResult {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useGitHubActivities = (): UseGitHubActivitiesResult => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef<boolean>(false);
  const fetchIndexRef = useRef<number>(0);
  const pageRef = useRef<number>(1);

  const summarizeDescription = useCallback(
    (type: string, event: GitHubEvent) => {
      const repoShortName = event.repo.name.replace('jpetrucci49/', '');
      const text =
        type === 'PullRequest'
          ? event.payload.pull_request?.title || 'Contributed to project'
          : event.payload.commits?.[0]?.message || 'Code enhancements';
      const branch = event.payload.ref?.split('refs/heads/')[1] || 'main';
      const prNumber = event.payload.pull_request?.number;
      const prState =
        event.payload.action || event.payload.pull_request?.state || 'opened';
      const commitCount = event.payload.commits?.length || 1;
      const lowerText = text.toLowerCase();
      let action = 'Updated';
      if (lowerText.includes('fix') || lowerText.includes('bug'))
        action = 'Fixed issues in';
      else if (lowerText.includes('add') || lowerText.includes('feature'))
        action = 'Added features to';
      else if (lowerText.includes('improve') || lowerText.includes('enhance'))
        action = 'Improved';
      else if (lowerText.includes('ui') || lowerText.includes('interface'))
        action = 'Enhanced UI for';
      else if (
        lowerText.includes('optimize') ||
        lowerText.includes('performance')
      )
        action = 'Optimized';
      else if (lowerText.includes('refactor')) action = 'Refactored code in';
      const summary = text.split('\n')[0].slice(0, 150);
      if (type === 'PullRequest') {
        const stateVerb =
          prState === 'merged'
            ? 'Merged'
            : prState === 'closed'
            ? 'Closed'
            : 'Opened';
        return `${stateVerb} PR #${prNumber}: ${summary}${
          summary.length >= 150 ? '...' : ''
        } in ${repoShortName}`;
      }
      return `${action} ${commitCount} commit${
        commitCount > 1 ? 's' : ''
      }: ${summary}${
        summary.length >= 150 ? '...' : ''
      } on ${branch} in ${repoShortName}`;
    },
    []
  );

  const getEventWeight = useCallback((event: GitHubEvent): number => {
    if (event.type === 'PullRequestEvent') {
      return event.payload.action === 'merged' ||
        event.payload.pull_request?.state === 'merged'
        ? 3
        : 2;
    }
    if (event.type === 'PushEvent') {
      return (event.payload.commits?.length || 1) > 1 ? 2 : 1;
    }
    return 1;
  }, []);

  const fetchActivities = useCallback(
    async (page: number, accumulatedEvents: GitHubEvent[] = []) => {
      if (isLoading || hasFetchedRef.current) {
        return accumulatedEvents;
      }

      if (!import.meta.env.VITE_GITHUB_TOKEN) {
        console.error('GitHub token missing in environment variables');
        setError(
          'GitHub token missing. Please configure VITE_GITHUB_TOKEN in your environment.'
        );
        setIsLoading(false);
        return accumulatedEvents;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.github.com/users/jpetrucci49/events?page=${page}&per_page=30`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              'GitHub API rate limit exceeded. Please try again later or check your token.'
            );
          } else if (response.status === 401) {
            throw new Error(
              'Invalid GitHub token. Please verify your VITE_GITHUB_TOKEN.'
            );
          }
          throw new Error(
            `Failed to fetch GitHub events: ${response.status} ${response.statusText}`
          );
        }
        const data: GitHubEvent[] = await response.json();
        const filteredEvents = data.filter(
          event =>
            (event.type === 'PushEvent' || event.type === 'PullRequestEvent') &&
            !(
              event.payload.commits?.[0]?.message
                .toLowerCase()
                .includes('readme') ||
              event.payload.pull_request?.title
                ?.toLowerCase()
                .includes('readme')
            )
        );
        const newAccumulatedEvents = [...accumulatedEvents, ...filteredEvents]
          .sort((a, b) => {
            const weightA = getEventWeight(a);
            const weightB = getEventWeight(b);
            if (weightA !== weightB) return weightB - weightA;
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .slice(0, 6);

        if (newAccumulatedEvents.length < 6 && page < 3 && data.length > 0) {
          pageRef.current = page + 1;
          return await fetchActivities(page + 1, newAccumulatedEvents);
        }

        const formattedActivities = newAccumulatedEvents
          .map(event => {
            const uniqueId = `${event.id}-${event.repo.name}-${
              event.created_at
            }-${event.type}-${
              event.payload.commits?.[0]?.sha ||
              event.payload.pull_request?.number ||
              fetchIndexRef.current++
            }`;
            return {
              id: uniqueId,
              type: event.type.replace('Event', ''),
              description: summarizeDescription(
                event.type.replace('Event', ''),
                event
              ),
              repo: event.repo.name,
              date: new Date(event.created_at).toLocaleDateString(),
            };
          })
          .filter(
            (activity, index, self) =>
              index ===
              self.findIndex(
                a =>
                  a.id === activity.id &&
                  a.repo === activity.repo &&
                  a.description === activity.description &&
                  a.type === activity.type &&
                  a.date === activity.date
              )
          );

        setActivities(formattedActivities);
        setError(null);
        hasFetchedRef.current = true;
        return newAccumulatedEvents;
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching GitHub events:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error fetching GitHub events:', err);
          setError('An unexpected error occurred. Please try again later.');
        }
        return accumulatedEvents;
      } finally {
        setIsLoading(false);
      }
    },
    [summarizeDescription, isLoading, getEventWeight]
  );

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchActivities(1);
    }
  }, [fetchActivities]);

  const retry = () => {
    setError(null);
    setActivities([]);
    hasFetchedRef.current = false;
    pageRef.current = 1;
    fetchActivities(1);
  };

  return { activities, isLoading, error, retry };
};
