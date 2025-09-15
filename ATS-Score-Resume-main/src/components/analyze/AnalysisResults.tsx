import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { AnalysisResult } from '../../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="space-y-6">
      {/* Suggestions Section */}
      {result.suggestions && result.suggestions.length > 0 && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Improvement Suggestions
            </h3>
          </div>
          
          <div className="space-y-3">
            {result.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Keyword Matches Section */}
      {result.keywordMatches && result.keywordMatches.length > 0 && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Keyword Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Found Keywords */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Found Keywords ({result.keywordMatches.filter(k => k.found).length})
              </h4>
              <div className="space-y-2">
                {result.keywordMatches
                  .filter(keyword => keyword.found)
                  .slice(0, 10)
                  .map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {keyword.keyword}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {keyword.count}x
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                Missing Keywords ({result.keywordMatches.filter(k => !k.found).length})
              </h4>
              <div className="space-y-2">
                {result.keywordMatches
                  .filter(keyword => !keyword.found)
                  .slice(0, 10)
                  .map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {keyword.keyword}
                      </span>
                      <span className="text-xs text-red-500 dark:text-red-400">
                        Missing
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skill Matches Section */}
      {result.skillMatches && result.skillMatches.length > 0 && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Skill Matches
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {result.skillMatches.slice(0, 12).map((skill, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  skill.match
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {skill.skill}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.match ? '✓ Matched' : 'Not found'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resume Sections Analysis */}
      {result.resumeSections && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Resume Structure Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(result.resumeSections).map(([section, content]) => (
              <div key={section} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 capitalize">
                  {section}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {content.length > 0 ? (
                    <div className="space-y-1">
                      {content.slice(0, 3).map((item, index) => (
                        <div key={index} className="truncate">• {item}</div>
                      ))}
                      {content.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{content.length - 3} more items
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-red-500 dark:text-red-400">Not found</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 