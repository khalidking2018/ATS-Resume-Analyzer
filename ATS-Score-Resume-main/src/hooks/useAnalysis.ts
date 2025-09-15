import { useState } from 'react';
import { ResumeData, JobDescription, AnalysisResult, AnalysisState } from '../types';
import { 
  calculateATSScore, 
  analyzeKeywordMatches, 
  analyzeSkillMatches, 
  generateSuggestions, 
  extractKeywords,
  extractResumeSections 
} from '../utils/analysis';

export const useAnalysis = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isAnalyzing: false,
    result: null,
    error: null
  });

  const analyzeResume = async (resume: ResumeData, jd: JobDescription) => {
    setAnalysisState(prev => ({
      ...prev,
      isAnalyzing: true,
      error: null
    }));

    try {
      // Extract keywords from both resume and JD
      const resumeKeywords = extractKeywords(resume.content);
      const jdKeywords = extractKeywords(jd.content);

      // Calculate ATS score
      const atsScore = calculateATSScore(resumeKeywords, jdKeywords);

      // Analyze keyword matches
      const keywordMatches = analyzeKeywordMatches(resume.content, jd.content);

      // Analyze skill matches
      const skillMatches = analyzeSkillMatches(resume.content, jd.content);

      // Extract resume sections
      const resumeSections = extractResumeSections(resume.content);

      // Find missing keywords
      const missingKeywords = jdKeywords.filter(keyword =>
        !resumeKeywords.some(resumeKeyword =>
          resumeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(resumeKeyword.toLowerCase())
        )
      );

      // Create analysis result
      const result: AnalysisResult = {
        atsScore,
        keywordMatches,
        skillMatches,
        suggestions: [],
        missingKeywords,
        resumeSections,
        analysisDate: new Date()
      };

      // Generate suggestions
      result.suggestions = generateSuggestions(result, resume.content);

      setAnalysisState({
        isAnalyzing: false,
        result,
        error: null
      });

      return result;
    } catch (error) {
      setAnalysisState({
        isAnalyzing: false,
        result: null,
        error: error instanceof Error ? error.message : 'Analysis failed'
      });
      throw error;
    }
  };

  const resetAnalysis = () => {
    setAnalysisState({
      isAnalyzing: false,
      result: null,
      error: null
    });
  };

  return {
    analysisState,
    analyzeResume,
    resetAnalysis
  };
};