import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { ResumeUpload } from './components/upload/ResumeUpload';
import { JDInput } from './components/upload/JDInput';
import { ScoreCard } from './components/analyze/ScoreCard';
import { AnalysisResults } from './components/analyze/AnalysisResults';
import { useAnalysis } from './hooks/useAnalysis';
import { ResumeData, JobDescription } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const { analysisState, analyzeResume, resetAnalysis } = useAnalysis();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'analyze') {
      resetAnalysis();
    }
  };

  const handleResumeUpload = (resumeData: ResumeData | null) => {
    setResume(resumeData);
    if (resumeData && jobDescription) {
      analyzeResume(resumeData, jobDescription);
    }
  };

  const handleJDInput = (jdData: JobDescription | null) => {
    setJobDescription(jdData);
    if (jdData && resume) {
      analyzeResume(resume, jdData);
    }
  };

  const handleAnalyze = async () => {
    if (resume && jobDescription) {
      await analyzeResume(resume, jobDescription);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'analyze':
        return (
          <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Resume Analysis
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Upload your resume and job description to get started
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Upload Resume
                  </h2>
                  <ResumeUpload
                    onResumeUpload={handleResumeUpload}
                    currentResume={resume}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Job Description
                  </h2>
                  <JDInput
                    onJDInput={handleJDInput}
                    currentJD={jobDescription}
                  />
                </motion.div>
              </div>

              {resume && jobDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center mb-8"
                >
                  <motion.button
                    onClick={handleAnalyze}
                    disabled={analysisState.isAnalyzing}
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {analysisState.isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </motion.button>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {analysisState.result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <ScoreCard score={analysisState.result.atsScore} />
                    <AnalysisResults result={analysisState.result} />
                  </motion.div>
                )}
              </AnimatePresence>

              {analysisState.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-700 dark:text-red-400">{analysisState.error}</p>
                </motion.div>
              )}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  About ATS Resume Analyzer
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Helping job seekers optimize their resumes for Applicant Tracking Systems
                </p>
              </motion.div>

              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>
                  Our ATS Resume Analyzer is designed to help job seekers understand how well their resumes match job requirements. 
                  We use advanced text analysis and keyword matching to provide you with actionable insights to improve your resume.
                </p>
                
                <h2>How It Works</h2>
                <ol>
                  <li>Upload your resume in DOCX or TXT format</li>
                  <li>Paste or upload the job description</li>
                  <li>Get instant analysis with detailed insights</li>
                  <li>Review suggestions to improve your resume</li>
                </ol>

                <h2>Features</h2>
                <ul>
                  <li>Multi-format file support</li>
                  <li>Advanced keyword analysis</li>
                  <li>Skill matching visualization</li>
                  <li>Actionable improvement suggestions</li>
                  <li>Beautiful, responsive design</li>
                </ul>

                <h2>Privacy</h2>
                <p>
                  Your data is processed entirely in your browser. We don't store your resume or job descriptions on our servers, 
                  ensuring your privacy and data security.
                </p>
              </motion.div>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;