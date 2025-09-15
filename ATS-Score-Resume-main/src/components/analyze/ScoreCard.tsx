import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  previousScore?: number;
}

export const ScoreCard = ({ score, previousScore }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent Match!';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Your resume is well-optimized for this position.';
    if (score >= 60) return 'Your resume has good alignment with the job requirements.';
    if (score >= 40) return 'Consider adding more relevant keywords to improve your score.';
    return 'Significant improvements needed to match job requirements.';
  };

  const chartData = [
    { name: 'Score', value: score, color: getScoreColor(score) },
    { name: 'Remaining', value: 100 - score, color: '#e5e7eb' }
  ];

  const scoreChange = previousScore ? score - previousScore : null;

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ATS Score
        </h2>
        {scoreChange !== null && (
          <motion.div
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
              scoreChange > 0
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : scoreChange < 0
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {scoreChange > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : scoreChange < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
            <span>{Math.abs(scoreChange)}%</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          <p className="text-sm font-medium">
                            {payload[0].name}: {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Score */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="text-3xl font-bold" style={{ color: getScoreColor(score) }}>
                  {score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Match
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Score Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {getScoreMessage(score)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {getScoreDescription(score)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Score Range</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {score}/100
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${score}%`,
                  backgroundColor: getScoreColor(score)
                }}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                <span className="text-gray-600 dark:text-gray-400">Poor</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                <span className="text-gray-600 dark:text-gray-400">Fair</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                <span className="text-gray-600 dark:text-gray-400">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};