import { useState, useEffect, useCallback, useRef } from 'react';
import type { Activity, GitHubEvent } from '../types/about';

interface UseGitHubActivitiesResult {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  fetchMore: () => void;
  retry: () => void;
  hasMore: boolean;
}

export const useGitHubActivities = (): UseGitHubActivitiesResult => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedInitialRef = useRef<boolean>(false);
  const nextPageRef = useRef<number>(1);
  const fetchIndexRef = useRef<number>(0);
  const hasMoreRef = useRef<boolean>(true);
  const cachedEventsRef = useRef<Map<number, GitHubEvent[]>>(new Map());

  const summarizeDescription = useCallback(
    (type: string, event: GitHubEvent) => {
      const repoShortName = event.repo.name.replace('jpetrucci49/', '');
      const text =
        type === 'PullRequest'
          ? event.payload.pull_request?.title || 'Contributed to project'
          : event.payload.commits?.[0]?.message || 'Code enhancements';
      const lowerText = text.toLowerCase();
      const branch = event.payload.ref?.split('refs/heads/')[1] || 'main';
      const prNumber = event.payload.pull_request?.number;
      const prState =
        event.payload.action || event.payload.pull_request?.state || 'opened';
      const commitCount = event.payload.commits?.length || 1;
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

  const fetchActivities = useCallback(
    async (pageNum: number) => {
      if (
        isLoading ||
        !hasMoreRef.current ||
        activities.length >= 6 ||
        pageNum > 3
      ) {
        if (import.meta.env.DEV) {
          console.log('Fetch skipped:', {
            isLoading,
            hasMore: hasMoreRef.current,
            activitiesLength: activities.length,
            pageNum,
          });
        }
        return [];
      }

      // Check cache first
      if (cachedEventsRef.current.has(pageNum)) {
        if (import.meta.env.DEV) {
          console.log('Using cached events for page:', pageNum);
        }
        return cachedEventsRef.current.get(pageNum)!;
      }

      if (!import.meta.env.VITE_GITHUB_TOKEN) {
        console.error('GitHub token missing in environment variables');
        setError(
          'GitHub token missing. Please configure VITE_GITHUB_TOKEN in your environment.'
        );
        setIsLoading(false);
        hasMoreRef.current = false;
        return [];
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.github.com/users/jpetrucci49/events?page=${pageNum}&per_page=10`,
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
        if (import.meta.env.DEV) {
          console.log('Fetched events:', data.length, 'for page:', pageNum);
        }

        const filteredEvents = data
          .filter(
            event =>
              (event.type === 'PushEvent' ||
                event.type === 'PullRequestEvent') &&
              !(
                event.payload.commits?.[0]?.message
                  .toLowerCase()
                  .includes('readme') ||
                event.payload.pull_request?.title
                  ?.toLowerCase()
                  .includes('readme')
              )
          )
          .slice(0, 3);
        if (import.meta.env.DEV) {
          console.log(
            'Filtered events:',
            filteredEvents.length,
            'for page:',
            pageNum
          );
        }

        const formattedActivities = filteredEvents
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
        if (import.meta.env.DEV) {
          console.log(
            'Formatted activities:',
            formattedActivities.length,
            'for page:',
            pageNum
          );
        }

        setActivities(prevActivities => {
          const newActivities =
            pageNum === 1
              ? formattedActivities
              : [...prevActivities, ...formattedActivities].slice(0, 6);
          hasMoreRef.current = pageNum < 3 && newActivities.length < 6;
          if (import.meta.env.DEV) {
            console.log(
              'Updated activities:',
              newActivities.length,
              'hasMore:',
              hasMoreRef.current,
              'pageNum:',
              pageNum
            );
          }
          return newActivities;
        });
        setError(null);
        cachedEventsRef.current.set(pageNum, filteredEvents);
        return filteredEvents;
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching GitHub events:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error fetching GitHub events:', err);
          setError('An unexpected error occurred. Please try again later.');
        }
        hasMoreRef.current = false;
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [summarizeDescription, isLoading, activities.length]
  );

  useEffect(() => {
    if (!hasFetchedInitialRef.current) {
      if (import.meta.env.DEV) {
        console.log('Triggering initial fetch for page 1');
      }
      fetchActivities(1);
      hasFetchedInitialRef.current = true;
    }
  }, [fetchActivities]);

  const fetchMore = () => {
    if (nextPageRef.current === 1) {
      if (import.meta.env.DEV) {
        console.log('Load More clicked, fetching page 2');
      }
      fetchActivities(2);
      nextPageRef.current = 2;
    } else if (nextPageRef.current === 2) {
      if (import.meta.env.DEV) {
        console.log('Load More clicked, fetching page 3');
      }
      fetchActivities(3);
      nextPageRef.current = 3;
    }
  };

  const retry = () => {
    if (import.meta.env.DEV) {
      console.log('Retry triggered, resetting state');
    }
    setError(null);
    hasMoreRef.current = true;
    nextPageRef.current = 1;
    cachedEventsRef.current.clear();
    fetchActivities(1);
  };

  return {
    activities,
    isLoading,
    error,
    fetchMore,
    retry,
    hasMore: hasMoreRef.current,
  };
};
