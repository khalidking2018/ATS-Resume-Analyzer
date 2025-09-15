import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ResumeData } from '../../types';
import { parseFile } from '../../utils/parsers';

interface ResumeUploadProps {
  onResumeUpload: (resume: ResumeData) => void;
  currentResume: ResumeData | null;
}

export const ResumeUpload = ({ onResumeUpload, currentResume }: ResumeUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsProcessing(true);
    setError(null);

    try {
      const content = await parseFile(file);
      
      const resumeData: ResumeData = {
        content,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date()
      };

      onResumeUpload(resumeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onResumeUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeResume = () => {
    onResumeUpload(null as any);
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
        {!currentResume ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
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
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                )}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">
                {isProcessing ? 'Processing Resume...' : 'Upload Your Resume'}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {isDragActive
                  ? 'Drop your resume here'
                  : 'Drag & drop your resume here, or click to browse'
                }
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Supports DOCX and TXT files (max 10MB)
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resume-preview"
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
                    {currentResume.fileName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(currentResume.fileSize)} • Uploaded successfully
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={removeResume}
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-2">Resume Preview:</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 max-h-32 overflow-y-auto">
                {currentResume.content.substring(0, 300)}
                {currentResume.content.length > 300 && '...'}
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