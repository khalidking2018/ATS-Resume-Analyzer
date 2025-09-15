import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { JobDescription } from '../../types';
import { parseFile } from '../../utils/parsers';

interface JDInputProps {
  onJDInput: (jd: JobDescription) => void;
  currentJD: JobDescription | null;
}

export const JDInput = ({ onJDInput, currentJD }: JDInputProps) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [jdText, setJdText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsProcessing(true);
    setError(null);

    try {
      const content = await parseFile(file);
      
      const jdData: JobDescription = {
        content,
        source: 'upload'
      };

      onJDInput(jdData);
      setInputMethod('file');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onJDInput]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleTextSubmit = () => {
    if (jdText.trim()) {
      const jdData: JobDescription = {
        content: jdText.trim(),
        source: 'paste'
      };
      onJDInput(jdData);
    }
  };

  const removeJD = () => {
    onJDInput(null as any);
    setJdText('');
    setInputMethod('text');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!currentJD ? (
          <motion.div
            key="input-methods"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Method Selection */}
            <div className="flex space-x-4 mb-6">
              <motion.button
                onClick={() => setInputMethod('text')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  inputMethod === 'text'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Paste Text
              </motion.button>
              <motion.button
                onClick={() => setInputMethod('file')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  inputMethod === 'file'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload File
              </motion.button>
            </div>

            {/* Text Input */}
            {inputMethod === 'text' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <motion.button
                  onClick={handleTextSubmit}
                  disabled={!jdText.trim()}
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Analyze Job Description
                </motion.button>
              </motion.div>
            )}

            {/* File Upload */}
            {inputMethod === 'file' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div
                  {...getRootProps()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                  } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <input {...getInputProps()} />
                  
                  <motion.div
                    animate={isProcessing ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
                    className="mx-auto w-16 h-16 mb-4"
                  >
                    {isProcessing ? (
                      <div className="w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    ) : (
                      <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                    )}
                  </motion.div>

                  <h3 className="text-lg font-semibold mb-2">
                    {isProcessing ? 'Processing File...' : 'Upload Job Description'}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {isDragActive
                      ? 'Drop the job description file here'
                      : 'Drag & drop a job description file, or click to browse'
                    }
                  </p>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Supports DOCX and TXT files (max 10MB)
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="jd-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Job Description Loaded
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentJD.source === 'upload' ? 'From file upload' : 'From text input'}
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={removeJD}
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-2">Job Description Preview:</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 max-h-32 overflow-y-auto">
                {currentJD.content.substring(0, 300)}
                {currentJD.content.length > 300 && '...'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};