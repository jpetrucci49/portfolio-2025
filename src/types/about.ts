export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
    pull_request?: { title: string; number: number; state?: string };
    ref?: string;
    action?: string;
  };
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  repo: string;
  date: string;
}
