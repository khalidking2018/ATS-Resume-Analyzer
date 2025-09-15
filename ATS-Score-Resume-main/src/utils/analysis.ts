import { KeywordMatch, SkillMatch, AnalysisResult } from '../types';

// Common technical skills and keywords
const TECHNICAL_SKILLS = [
  'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue.js',
  'typescript', 'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql',
  'aws', 'azure', 'docker', 'kubernetes', 'git', 'github', 'agile',
  'scrum', 'jira', 'figma', 'adobe', 'photoshop', 'illustrator',
  'machine learning', 'ai', 'data science', 'statistics', 'excel',
  'powerpoint', 'word', 'outlook', 'salesforce', 'hubspot', 'marketing',
  'seo', 'sem', 'google analytics', 'facebook ads', 'instagram',
  'linkedin', 'twitter', 'content creation', 'copywriting', 'design',
  'ui/ux', 'user experience', 'wireframing', 'prototyping', 'testing',
  'qa', 'quality assurance', 'automation', 'ci/cd', 'devops', 'linux',
  'windows', 'mac', 'mobile development', 'ios', 'android', 'swift',
  'kotlin', 'flutter', 'react native', 'xamarin', 'unity', 'unreal',
  'blender', 'maya', '3d modeling', 'animation', 'video editing',
  'premiere pro', 'after effects', 'final cut pro', 'logic pro',
  'ableton', 'protools', 'sound design', 'music production'
];

// Common soft skills
const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'collaboration', 'problem solving',
  'critical thinking', 'creativity', 'adaptability', 'flexibility', 'time management',
  'organization', 'planning', 'strategic thinking', 'analytical', 'research',
  'presentation', 'public speaking', 'negotiation', 'sales', 'customer service',
  'mentoring', 'training', 'project management', 'budgeting', 'forecasting',
  'risk management', 'quality control', 'compliance', 'regulatory', 'legal',
  'contracts', 'procurement', 'supply chain', 'logistics', 'operations',
  'human resources', 'recruitment', 'onboarding', 'performance management',
  'employee relations', 'benefits', 'compensation', 'payroll', 'accounting',
  'finance', 'bookkeeping', 'tax', 'audit', 'investment', 'trading',
  'banking', 'insurance', 'healthcare', 'nursing', 'pharmacy', 'medical',
  'dental', 'veterinary', 'education', 'teaching', 'curriculum', 'assessment',
  'counseling', 'social work', 'psychology', 'therapy', 'rehabilitation'
];

export const extractKeywords = (text: string): string[] => {
  const normalizedText = text.toLowerCase();
  const keywords = new Set<string>();

  // Extract technical skills
  TECHNICAL_SKILLS.forEach(skill => {
    if (normalizedText.includes(skill)) {
      keywords.add(skill);
    }
  });

  // Extract soft skills
  SOFT_SKILLS.forEach(skill => {
    if (normalizedText.includes(skill)) {
      keywords.add(skill);
    }
  });

  // Extract common job-related terms
  const jobTerms = [
    'experience', 'years', 'senior', 'junior', 'lead', 'manager', 'director',
    'vp', 'ceo', 'cto', 'cfo', 'coo', 'founder', 'co-founder', 'startup',
    'enterprise', 'corporate', 'agency', 'consulting', 'freelance', 'remote',
    'hybrid', 'onsite', 'full-time', 'part-time', 'contract', 'temporary',
    'permanent', 'salary', 'hourly', 'commission', 'bonus', 'equity',
    'benefits', 'health', 'dental', 'vision', '401k', 'pension', 'pto',
    'vacation', 'sick', 'personal', 'maternity', 'paternity', 'flexible',
    'work-life', 'balance', 'growth', 'development', 'training', 'mentorship',
    'promotion', 'advancement', 'career', 'professional', 'certification',
    'degree', 'bachelor', 'master', 'phd', 'diploma', 'certificate',
    'project', 'team', 'client', 'customer', 'user', 'product', 'service',
    'analysis', 'design', 'development', 'testing', 'deployment', 'maintenance',
    'support', 'documentation', 'research', 'planning', 'strategy', 'implementation',
    'optimization', 'improvement', 'innovation', 'collaboration', 'coordination',
    'supervision', 'mentoring', 'coaching', 'presentation', 'communication',
    'problem-solving', 'critical thinking', 'analytical', 'creative', 'innovative',
    'detail-oriented', 'organized', 'efficient', 'productive', 'reliable',
    'adaptable', 'flexible', 'proactive', 'self-motivated', 'results-driven'
  ];

  jobTerms.forEach(term => {
    if (normalizedText.includes(term)) {
      keywords.add(term);
    }
  });

  // Extract industry-specific terms
  const industryTerms = [
    'software', 'web', 'mobile', 'cloud', 'data', 'database', 'api', 'rest',
    'frontend', 'backend', 'fullstack', 'devops', 'agile', 'scrum', 'kanban',
    'waterfall', 'sdlc', 'ci/cd', 'version control', 'git', 'github', 'bitbucket',
    'jira', 'confluence', 'slack', 'teams', 'zoom', 'meet', 'webex',
    'microsoft', 'google', 'amazon', 'apple', 'facebook', 'twitter', 'linkedin',
    'salesforce', 'hubspot', 'marketing', 'seo', 'sem', 'ppc', 'social media',
    'content', 'copywriting', 'design', 'ui', 'ux', 'wireframe', 'prototype',
    'user research', 'usability', 'accessibility', 'responsive', 'cross-platform',
    'native', 'hybrid', 'progressive', 'single page', 'multi-page', 'e-commerce',
    'crm', 'erp', 'cms', 'lms', 'analytics', 'reporting', 'dashboard', 'kpi',
    'roi', 'conversion', 'retention', 'engagement', 'acquisition', 'growth',
    'startup', 'scaleup', 'enterprise', 'sme', 'b2b', 'b2c', 'saas', 'paas',
    'iaas', 'microservices', 'monolith', 'serverless', 'container', 'kubernetes',
    'docker', 'aws', 'azure', 'gcp', 'heroku', 'netlify', 'vercel', 'firebase'
  ];

  industryTerms.forEach(term => {
    if (normalizedText.includes(term)) {
      keywords.add(term);
    }
  });

  return Array.from(keywords);
};

export const calculateATSScore = (
  resumeKeywords: string[],
  jdKeywords: string[]
): number => {
  if (jdKeywords.length === 0) return 0;

  const matchedKeywords = jdKeywords.filter(keyword =>
    resumeKeywords.some(resumeKeyword =>
      resumeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(resumeKeyword.toLowerCase())
    )
  );

  return Math.round((matchedKeywords.length / jdKeywords.length) * 100);
};

export const analyzeKeywordMatches = (
  resumeText: string,
  jdText: string
): KeywordMatch[] => {
  const jdKeywords = extractKeywords(jdText);
  const resumeTextLower = resumeText.toLowerCase();
  
  return jdKeywords.map(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = resumeTextLower.match(regex);
    const count = matches ? matches.length : 0;
    const found = count > 0;
    
    // Determine importance based on keyword frequency in JD
    const jdRegex = new RegExp(keyword, 'gi');
    const jdMatches = jdText.toLowerCase().match(jdRegex);
    const jdCount = jdMatches ? jdMatches.length : 0;
    
    let importance: 'high' | 'medium' | 'low' = 'low';
    if (jdCount >= 3) importance = 'high';
    else if (jdCount >= 2) importance = 'medium';
    
    return {
      keyword,
      found,
      count,
      importance
    };
  });
};

export const analyzeSkillMatches = (
  resumeText: string,
  jdText: string
): SkillMatch[] => {
  const allSkills = [...TECHNICAL_SKILLS, ...SOFT_SKILLS];
  const resumeTextLower = resumeText.toLowerCase();
  const jdTextLower = jdText.toLowerCase();
  
  return allSkills
    .filter(skill => 
      resumeTextLower.includes(skill) || jdTextLower.includes(skill)
    )
    .map(skill => {
      const resumeRegex = new RegExp(skill, 'gi');
      const jdRegex = new RegExp(skill, 'gi');
      
      const resumeMatches = resumeTextLower.match(resumeRegex);
      const jdMatches = jdTextLower.match(jdRegex);
      
      const resumeCount = resumeMatches ? resumeMatches.length : 0;
      const jdCount = jdMatches ? jdMatches.length : 0;
      const match = resumeCount > 0 && jdCount > 0;
      
      return {
        skill,
        resumeCount,
        jdCount,
        match
      };
    })
    .filter(skill => skill.resumeCount > 0 || skill.jdCount > 0)
    .sort((a, b) => (b.resumeCount + b.jdCount) - (a.resumeCount + a.jdCount));
};

export const generateSuggestions = (
  analysis: AnalysisResult,
  resumeText: string
): string[] => {
  const suggestions: string[] = [];
  
  // Score-based suggestions
  if (analysis.atsScore < 30) {
    suggestions.push('Your resume has a very low ATS match score. This indicates significant gaps between your resume and the job requirements.');
  } else if (analysis.atsScore < 50) {
    suggestions.push('Your resume has a low ATS match score. Consider adding more job-specific keywords and skills.');
  } else if (analysis.atsScore < 70) {
    suggestions.push('Your resume has a moderate ATS match score. Try incorporating more relevant keywords to improve your chances.');
  } else if (analysis.atsScore < 90) {
    suggestions.push('Your resume has a good ATS match score. Minor improvements could make it even better.');
  } else {
    suggestions.push('Excellent! Your resume is well-optimized for this position.');
  }
  
  // Missing keywords suggestions
  if (analysis.missingKeywords.length > 0) {
    const topMissing = analysis.missingKeywords.slice(0, 5);
    suggestions.push(`Add these important keywords to your resume: ${topMissing.join(', ')}`);
  }
  
  // Length suggestions
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 150) {
    suggestions.push('Your resume is very short. Add more details about your experience, achievements, and skills.');
  } else if (wordCount < 300) {
    suggestions.push('Your resume could benefit from more detailed descriptions of your work experience and achievements.');
  } else if (wordCount > 800) {
    suggestions.push('Your resume is quite long. Consider condensing it to 1-2 pages for better ATS compatibility.');
  }
  
  // Section suggestions
  const sections = analysis.resumeSections;
  if (sections.skills.length === 0) {
    suggestions.push('Add a dedicated skills section to highlight your technical and soft skills that match the job requirements.');
  }
  
  if (sections.experience.length === 0) {
    suggestions.push('Include detailed work experience with quantifiable achievements and responsibilities.');
  }
  
  if (sections.education.length === 0) {
    suggestions.push('Add your educational background and any relevant certifications or training.');
  }
  
  // Keyword frequency suggestions
  const foundKeywords = analysis.keywordMatches.filter(k => k.found);
  if (foundKeywords.length === 0) {
    suggestions.push('No matching keywords found. Review the job description carefully and add relevant terms to your resume.');
  } else if (foundKeywords.length < 5) {
    suggestions.push('Very few keywords match. Consider adding more job-specific terms and skills to your resume.');
  }
  
  // Skill match suggestions
  const matchedSkills = analysis.skillMatches.filter(s => s.match);
  if (matchedSkills.length === 0) {
    suggestions.push('No matching skills found. Add relevant technical and soft skills that are mentioned in the job description.');
  }
  
  return suggestions;
};

export const extractResumeSections = (resumeText: string) => {
  const sections = {
    education: [] as string[],
    experience: [] as string[],
    skills: [] as string[],
    contact: [] as string[]
  };
  
  const lines = resumeText.split('\n');
  let currentSection = '';
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    
    if (lowerLine.includes('education') || lowerLine.includes('academic')) {
      currentSection = 'education';
    } else if (lowerLine.includes('experience') || lowerLine.includes('work') || lowerLine.includes('employment')) {
      currentSection = 'experience';
    } else if (lowerLine.includes('skills') || lowerLine.includes('competencies')) {
      currentSection = 'skills';
    } else if (lowerLine.includes('contact') || lowerLine.includes('email') || lowerLine.includes('phone')) {
      currentSection = 'contact';
    } else if (line.trim() && currentSection) {
      sections[currentSection as keyof typeof sections].push(line.trim());
    }
  }
  
  return sections;
};