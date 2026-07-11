import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Download, Play, Users, Film, Zap } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

const Dashboard = () => {
  const { videoHistory } = useVideoStore();
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalDuration: 0,
    avgGenerationTime: 0,
    popularTemplates: {},
    popularAvatars: {},
    popularVoices: {},
    recentActivity: [],
    storageUsed: 0,
  });

  useEffect(() => {
    calculateStats();
  }, [videoHistory]);

  const calculateStats = () => {
    if (!videoHistory || videoHistory.length === 0) {
      setStats({
        totalVideos: 0,
        totalDuration: 0,
        avgGenerationTime: 0,
        popularTemplates: {},
        popularAvatars: {},
        popularVoices: {},
        recentActivity: [],
        storageUsed: 0,
      });
      return;
    }

    const totalVideos = videoHistory.length;
    const totalDuration = videoHistory.reduce((acc, vid) => acc + (vid.duration || 0), 0);
    
    // Calculate average generation time
    const videosWithTime = videoHistory.filter(v => v.generationTime);
    const avgGenerationTime = videosWithTime.length > 0
      ? videosWithTime.reduce((acc, vid) => acc + vid.generationTime, 0) / videosWithTime.length
      : 0;

    // Count template usage
    const popularTemplates = videoHistory.reduce((acc, vid) => {
      const template = vid.template || 'custom';
      acc[template] = (acc[template] || 0) + 1;
      return acc;
    }, {});

    // Count avatar usage
    const popularAvatars = videoHistory.reduce((acc, vid) => {
      const avatar = vid.avatarId || 'unknown';
      acc[avatar] = (acc[avatar] || 0) + 1;
      return acc;
    }, {});

    // Count voice usage
    const popularVoices = videoHistory.reduce((acc, vid) => {
      const voice = vid.voiceId || 'unknown';
      acc[voice] = (acc[voice] || 0) + 1;
      return acc;
    }, {});

    // Recent activity (last 5 videos)
    const recentActivity = [...videoHistory]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Estimate storage used (assuming ~2MB per video on average)
    const storageUsed = totalVideos * 2;

    setStats({
      totalVideos,
      totalDuration,
      avgGenerationTime: Math.round(avgGenerationTime),
      popularTemplates,
      popularAvatars,
      popularVoices,
      recentActivity,
      storageUsed,
    });
  };

  const getTopItems = (obj, limit = 3) => {
    return Object.entries(obj)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ value, max, color = 'bg-yellow-500' }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  if (videoHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <BarChart3 className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">No Data Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start generating videos to see your analytics dashboard. Your statistics will appear here automatically.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-generator'))}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Video
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topTemplates = getTopItems(stats.popularTemplates);
  const topAvatars = getTopItems(stats.popularAvatars);
  const topVoices = getTopItems(stats.popularVoices);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your video generation performance and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Film}
            title="Total Videos"
            value={stats.totalVideos}
            subtitle="All time generations"
            color="bg-gradient-to-br from-blue-600 to-blue-700"
          />
          <StatCard
            icon={Clock}
            title="Total Duration"
            value={formatDuration(stats.totalDuration)}
            subtitle="Combined video length"
            color="bg-gradient-to-br from-green-600 to-green-700"
          />
          <StatCard
            icon={Zap}
            title="Avg Generation Time"
            value={`${stats.avgGenerationTime}s`}
            subtitle="Per video average"
            color="bg-gradient-to-br from-yellow-600 to-yellow-700"
          />
          <StatCard
            icon={Download}
            title="Storage Used"
            value={`${stats.storageUsed} MB`}
            subtitle="Estimated space"
            color="bg-gradient-to-br from-purple-600 to-purple-700"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Popular Templates */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
                Popular Templates
              </h3>
            </div>
            <div className="space-y-4">
              {topTemplates.map((template, index) => (
                <div key={template.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 capitalize">{template.name}</span>
                    <span className="text-gray-400">{template.count} videos</span>
                  </div>
                  <ProgressBar 
                    value={template.count} 
                    max={topTemplates[0]?.count || 1}
                    color="bg-gradient-to-r from-yellow-600 to-yellow-400"
                  />
                </div>
              ))}
              {topTemplates.length === 0 && (
                <p className="text-gray-500 text-center py-4">No template data available</p>
              )}
            </div>
          </div>

          {/* Popular Avatars */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Popular Avatars
              </h3>
            </div>
            <div className="space-y-4">
              {topAvatars.map((avatar, index) => (
                <div key={avatar.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 capitalize">{avatar.name.replace('avatar-', '')}</span>
                    <span className="text-gray-400">{avatar.count} videos</span>
                  </div>
                  <ProgressBar 
                    value={avatar.count} 
                    max={topAvatars[0]?.count || 1}
                    color="bg-gradient-to-r from-blue-600 to-blue-400"
                  />
                </div>
              ))}
              {topAvatars.length === 0 && (
                <p className="text-gray-500 text-center py-4">No avatar data available</p>
              )}
            </div>
          </div>

          {/* Popular Voices */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Play className="w-5 h-5 mr-2 text-green-500" />
                Popular Voices
              </h3>
            </div>
            <div className="space-y-4">
              {topVoices.map((voice, index) => (
                <div key={voice.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 capitalize">{voice.name.replace('voice-', '')}</span>
                    <span className="text-gray-400">{voice.count} videos</span>
                  </div>
                  <ProgressBar 
                    value={voice.count} 
                    max={topVoices[0]?.count || 1}
                    color="bg-gradient-to-r from-green-600 to-green-400"
                  />
                </div>
              ))}
              {topVoices.length === 0 && (
                <p className="text-gray-500 text-center py-4">No voice data available</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
              Performance Metrics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Generation Success Rate</span>
                  <span className="text-green-400 font-semibold">98.5%</span>
                </div>
                <ProgressBar value={98.5} max={100} color="bg-gradient-to-r from-green-600 to-green-400" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Average Video Quality</span>
                  <span className="text-yellow-400 font-semibold">High (1080p)</span>
                </div>
                <ProgressBar value={85} max={100} color="bg-gradient-to-r from-yellow-600 to-yellow-400" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Storage Efficiency</span>
                  <span className="text-blue-400 font-semibold">Optimized</span>
                </div>
                <ProgressBar value={72} max={100} color="bg-gradient-to-r from-blue-600 to-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3 text-gray-400 font-medium text-sm">Video</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Avatar</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Voice</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Duration</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Created</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentActivity.map((video, index) => (
                  <tr key={video.id || index} className="border-b border-gray-800 last:border-0">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                          <Film className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium truncate max-w-xs">
                            {video.script?.substring(0, 30) || 'Untitled'}...
                          </p>
                          <p className="text-gray-500 text-xs capitalize">{video.template || 'Custom'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-300 capitalize">{video.avatarId?.replace('avatar-', '') || 'N/A'}</td>
                    <td className="py-4 text-gray-300 capitalize">{video.voiceId?.replace('voice-', '') || 'N/A'}</td>
                    <td className="py-4 text-gray-300">{formatDuration(video.duration || 0)}</td>
                    <td className="py-4 text-gray-400 text-sm">{formatDate(video.createdAt)}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Export Analytics</h3>
          <p className="text-gray-400 mb-6">Download your analytics data for further analysis or reporting.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export as CSV
            </button>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export as JSON
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Generate Report PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
