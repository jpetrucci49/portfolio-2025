export interface ResumeType {
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  contact: {
    email: string;
    linkedin: string;
  };
}
