import { create } from "zustand";

interface CompanyMatch {
  rank: number;
  company_id: number;
  company_name: string;
  logo: string;
  career_url: string;
  final_match_percentage: number;
  skill_match_score: number;
  overall_semantic_score: number;
  matched_skills: string[];
  missing_skills: string[];
}

interface AppState {
  resumeFileId: string | null;
  overallScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  companyMatches: CompanyMatch[];
  setMatchData: (data: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  resumeFileId: null,
  overallScore: 0,
  matchedSkills: [],
  missingSkills: [],
  companyMatches: [],
  setMatchData: (data) => set({
    resumeFileId: data.resume_file_name,
    companyMatches: data.top_matches || [],
    matchedSkills: data.top_matches?.[0]?.matched_skills || [],
    missingSkills: data.top_matches?.[0]?.missing_skills || [],
    overallScore: data.top_matches?.[0]?.final_match_percentage || 0,
  }),
}));
