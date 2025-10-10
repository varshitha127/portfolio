import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Target,
  Lightbulb,
  X,
  Loader2
} from 'lucide-react';
import { useAI } from '../utils/AIContext';
import { useAnalytics } from '../utils/AnalyticsContext';
import { toast } from 'react-toastify';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { analyzeResume } = useAI();
  const { trackInteraction } = useAnalytics();

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    trackInteraction('resume_upload', { 
      fileName: uploadedFile.name, 
      fileSize: uploadedFile.size 
    });
  }, [trackInteraction]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    try {
      trackInteraction('resume_analysis_start', { fileName: file.name });
      const result = await analyzeResume(file);
      setAnalysis(result.analysis);
      toast.success('Resume analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setAnalysis(null);
    trackInteraction('resume_clear', {});
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 6) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <X className="w-5 h-5 text-red-600" />;
  };

  return (
    <>
      <Helmet>
        <title>Resume Analyzer - AI-Powered Feedback</title>
        <meta name="description" content="Upload your resume and get AI-powered feedback, improvement suggestions, and professional insights." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                Resume Analyzer
              </h1>
            </div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Upload your resume and get instant AI-powered feedback, improvement suggestions, 
              and professional insights to make your resume stand out.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-400 hover:bg-secondary-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-lg font-medium text-primary-600">
                      Drop your resume here...
                    </p>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-secondary-600 mb-2">
                        Drag & drop your resume here
                      </p>
                      <p className="text-secondary-600 mb-4">
                        or click to browse files
                      </p>
                      <p className="text-sm text-secondary-400">
                        Supports PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>

                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">{file.name}</p>
                        <p className="text-sm text-green-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleClear}
                      className="p-1 hover:bg-green-200 rounded transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-green-600" />
                    </button>
                  </motion.div>
                )}

                {file && !analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-5 h-5" />
                          <span>Analyze Resume</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Analysis Results */}
            <AnimatePresence>
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Overall Score */}
                  <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-secondary-600 mb-2">
                        Overall Score
                      </h2>
                      <div className="flex items-center justify-center space-x-3">
                        {getScoreIcon(analysis.overallScore)}
                        <span className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                          {analysis.overallScore}/10
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary-600 text-center">
                      {analysis.summary}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-secondary-600">
                        Strengths
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(analysis.strengths ?? []).map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-green-600">{strength}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                      <h2 className="text-2xl font-bold text-secondary-600">
                        Areas for Improvement
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(analysis.weaknesses ?? []).map((weakness, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg"
                        >
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-600">{weakness}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Lightbulb className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-secondary-600">
                        Improvement Suggestions
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {(analysis.suggestions ?? []).map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg"
                        >
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-600">{suggestion}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Elements */}
                  {analysis.missingElements && analysis.missingElements.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-secondary-600">
                          Missing Elements
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(analysis.missingElements ?? []).map((element, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg"
                          >
                            <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-purple-600">{element}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Target,
                  title: 'AI-Powered Analysis',
                  description: 'Advanced AI algorithms analyze your resume for content, structure, and ATS optimization'
                },
                {
                  icon: CheckCircle,
                  title: 'Actionable Feedback',
                  description: 'Get specific, actionable suggestions to improve your resume and increase interview chances'
                },
                {
                  icon: TrendingUp,
                  title: 'Professional Insights',
                  description: 'Industry-standard recommendations based on current hiring trends and best practices'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-secondary-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-600 mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary-600">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeAnalyzer; 