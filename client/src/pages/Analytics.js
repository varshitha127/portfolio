import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  BarChart3,
  Users,
  Eye,
  MousePointer,
  Download,
  TrendingUp
} from 'lucide-react';
import { useAnalytics } from '../utils/AnalyticsContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const { getAnalyticsData, getAnalyticsInsights } = useAnalytics();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, insightsData] = await Promise.all([
          getAnalyticsData(),
          getAnalyticsInsights()
        ]);
        setAnalyticsData(data);
        setInsights(Array.isArray(insightsData) ? insightsData : []);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getAnalyticsData, getAnalyticsInsights]);

  const pageViewsData = {
    labels: ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact', 'AI Chat'],
    datasets: [
      {
        label: 'Page Views',
        data: [150, 89, 120, 95, 67, 45, 78],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const interactionsData = {
    labels: ['Navigation', 'AI Chat', 'Resume Upload', 'Contact Form', 'Downloads', 'Voice Commands'],
    datasets: [
      {
        label: 'Interactions',
        data: [320, 156, 89, 67, 45, 23],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  };

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const stats = [
    {
      title: 'Total Visits',
      value: analyticsData?.totalVisits || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Page Views',
      value: Object.values(analyticsData?.pageViews || {}).reduce((a, b) => a + b, 0),
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Interactions',
      value: analyticsData?.interactions?.length || 0,
      icon: MousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Downloads',
      value: Object.values(analyticsData?.downloads || {}).reduce((a, b) => a + b, 0),
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Portfolio Insights</title>
        <meta name="description" content="View detailed analytics and insights about your portfolio performance and user interactions." />
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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                Analytics Dashboard
              </h1>
            </div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive insights into your portfolio performance, user behavior, 
              and AI feature usage patterns.
            </p>
          </motion.div>

          {/* Time Range Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex justify-center space-x-2">
              {[
                { label: '7 Days', value: '7d' },
                { label: '30 Days', value: '30d' },
                { label: '90 Days', value: '90d' }
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    timeRange === range.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-secondary-600">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Page Views Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-secondary-600 mb-6">Page Views</h3>
              <Line data={pageViewsData} options={chartOptions} />
            </motion.div>

            {/* Interactions Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-secondary-600 mb-6">User Interactions</h3>
              <Bar data={interactionsData} options={chartOptions} />
            </motion.div>
          </div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card mb-12"
          >
            <h3 className="text-xl font-semibold text-secondary-600 mb-6">Device Distribution</h3>
            <div className="max-w-md mx-auto">
              <Doughnut data={deviceData} options={doughnutOptions} />
            </div>
          </motion.div>

          {/* AI Insights */}
          {Array.isArray(insights) && insights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-600">AI-Generated Insights</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-secondary-50 rounded-lg">
                    <h4 className="font-semibold text-secondary-600 mb-2">{insight.title}</h4>
                    <p className="text-secondary-600 text-sm">{insight.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-secondary-600 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {analyticsData?.interactions?.slice(-5).reverse().map((interaction, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-secondary-600">{interaction.type}</p>
                    <p className="text-sm text-secondary-600">{interaction.page}</p>
                  </div>
                  <div className="text-sm text-secondary-400">
                    {new Date(interaction.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Analytics; 