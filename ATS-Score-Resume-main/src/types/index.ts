export interface ResumeData {
  content: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: Date;
}

export interface JobDescription {
  content: string;
  title?: string;
  company?: string;
  source: 'upload' | 'paste';
}

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  count: number;
  importance: 'high' | 'medium' | 'low';
}

export interface SkillMatch {
  skill: string;
  resumeCount: number;
  jdCount: number;
  match: boolean;
}

export interface AnalysisResult {
  atsScore: number;
  keywordMatches: KeywordMatch[];
  skillMatches: SkillMatch[];
  suggestions: string[];
  missingKeywords: string[];
  resumeSections: {
    education: string[];
    experience: string[];
    skills: string[];
    contact: string[];
  };
  analysisDate: Date;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

export interface AppState {
  resume: ResumeData | null;
  jobDescription: JobDescription | null;
  analysis: AnalysisState;
  theme: Theme;
  upload: UploadState;
}