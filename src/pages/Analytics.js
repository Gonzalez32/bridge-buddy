import React, { useState, useEffect } from 'react';
import analyticsService from '../services/analytics';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Load analytics data
    const data = analyticsService.getAnalytics();
    setAnalytics(data);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num) => {
    return `${num.toFixed(1)}%`;
  };

  const getTimeRangeData = () => {
    if (!analytics) return [];
    
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return analytics.timeSeries.slice(-days);
  };

  if (!analytics) {
    return (
      <div className="container">
        <div className="has-text-centered">
          <div className="loader"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="title is-2 has-text-centered">Misinformation Analytics</h1>
        <p className="subtitle is-5 has-text-centered has-text-grey mb-6">
          Real-time insights into misinformation trends and user behavior
        </p>

        {/* Time Range Selector */}
        <div className="field has-text-centered mb-5">
          <div className="control">
            <div className="buttons has-addons">
              <button 
                className={`button ${timeRange === '7d' ? 'is-primary' : ''}`}
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </button>
              <button 
                className={`button ${timeRange === '30d' ? 'is-primary' : ''}`}
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </button>
              <button 
                className={`button ${timeRange === '90d' ? 'is-primary' : ''}`}
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs is-centered mb-5">
          <ul>
            <li className={activeTab === 'overview' ? 'is-active' : ''}>
              <a onClick={() => setActiveTab('overview')}>Overview</a>
            </li>
            <li className={activeTab === 'trends' ? 'is-active' : ''}>
              <a onClick={() => setActiveTab('trends')}>Trends</a>
            </li>
            <li className={activeTab === 'topics' ? 'is-active' : ''}>
              <a onClick={() => setActiveTab('topics')}>Topics</a>
            </li>
            <li className={activeTab === 'behavior' ? 'is-active' : ''}>
              <a onClick={() => setActiveTab('behavior')}>User Behavior</a>
            </li>
          </ul>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Key Metrics */}
            <div className="columns is-multiline mb-6">
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Total Fact Checks</p>
                    <p className="title is-2 has-text-primary">
                      {formatNumber(analytics.overview.totalFactChecks)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">True Claims</p>
                    <p className="title is-2 has-text-success">
                      {formatNumber(analytics.overview.trueClaims)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">False Claims</p>
                    <p className="title is-2 has-text-danger">
                      {formatNumber(analytics.overview.falseClaims)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Accuracy Rate</p>
                    <p className="title is-2 has-text-info">
                      {formatPercentage(analytics.overview.accuracyRate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact Check Results Chart */}
            <div className="card mb-6">
              <div className="card-content">
                <h3 className="title is-4">Fact Check Results Distribution</h3>
                <div className="columns">
                  <div className="column is-6">
                    <div className="content">
                      <h4>Results Breakdown</h4>
                      <ul>
                        <li>
                          <strong>True Claims:</strong> {analytics.overview.trueClaims} 
                          ({formatPercentage(analytics.overview.trueClaims / analytics.overview.totalFactChecks * 100)})
                        </li>
                        <li>
                          <strong>False Claims:</strong> {analytics.overview.falseClaims}
                          ({formatPercentage(analytics.overview.falseClaims / analytics.overview.totalFactChecks * 100)})
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="content">
                      <h4>Confidence Levels</h4>
                      <ul>
                        <li><strong>Average Confidence:</strong> {analytics.overview.averageConfidence}%</li>
                        <li><strong>High Confidence (90%+):</strong> {analytics.factChecks.confidenceRanges['90-100%']}</li>
                        <li><strong>Medium Confidence (70-89%):</strong> {analytics.factChecks.confidenceRanges['70-79%'] + analytics.factChecks.confidenceRanges['80-89%']}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div>
            <div className="card mb-6">
              <div className="card-content">
                <h3 className="title is-4">Fact Check Activity Over Time</h3>
                <div className="content">
                  <div className="table-container">
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Total Checks</th>
                          <th>True Claims</th>
                          <th>False Claims</th>
                          <th>Accuracy Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTimeRangeData().map((day, index) => (
                          <tr key={index}>
                            <td>{new Date(day.date).toLocaleDateString()}</td>
                            <td>{day.total}</td>
                            <td className="has-text-success">{day.true}</td>
                            <td className="has-text-danger">{day.false}</td>
                            <td>{formatPercentage((day.true / day.total) * 100)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === 'topics' && (
          <div>
            <div className="card mb-6">
              <div className="card-content">
                <h3 className="title is-4">Trending Topics in Fact Checks</h3>
                <div className="content">
                  <div className="columns is-multiline">
                    {analytics.trending.map((topic, index) => (
                      <div key={index} className="column is-4">
                        <div className="box">
                          <h4 className="title is-6">{topic.word}</h4>
                          <p className="has-text-grey">Mentioned {topic.count} times</p>
                          <progress 
                            className="progress is-primary" 
                            value={topic.count} 
                            max={analytics.trending[0].count}
                          ></progress>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="title is-4">Most Checked Claims</h3>
                <div className="content">
                  <ul>
                    {analytics.factChecks.topClaims.map((claim, index) => (
                      <li key={index}>
                        <strong>"{claim.claim}..."</strong> - Checked {claim.count} times
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Behavior Tab */}
        {activeTab === 'behavior' && (
          <div>
            <div className="columns is-multiline mb-6">
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Total Sessions</p>
                    <p className="title is-2 has-text-info">
                      {formatNumber(analytics.overview.totalSessions)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Page Views</p>
                    <p className="title is-2 has-text-warning">
                      {formatNumber(analytics.userBehavior.pageViews)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Fact Check Submissions</p>
                    <p className="title is-2 has-text-success">
                      {formatNumber(analytics.userBehavior.factCheckSubmissions)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Avg Session Duration</p>
                    <p className="title is-2 has-text-primary">
                      {Math.floor(analytics.userBehavior.averageSessionDuration / 60)}m {analytics.userBehavior.averageSessionDuration % 60}s
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="title is-4">Recent Activity</h3>
                <div className="content">
                  <div className="table-container">
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Activity</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.recentActivity.map((activity, index) => (
                          <tr key={index}>
                            <td>{new Date(activity.timestamp).toLocaleString()}</td>
                            <td>
                              <span className={`tag ${activity.type === 'fact_check' ? 'is-success' : 'is-info'}`}>
                                {activity.type === 'fact_check' ? 'Fact Check' : activity.type}
                              </span>
                            </td>
                            <td>{activity.data}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Public Data Export */}
        <div className="card mt-6">
          <div className="card-content">
            <h3 className="title is-4">Public Data Export</h3>
            <p className="subtitle is-6">
              This data is publicly available to help researchers and journalists understand misinformation trends.
            </p>
            <div className="buttons">
              <button 
                className="button is-primary"
                onClick={() => {
                  const publicData = analyticsService.exportPublicData();
                  const blob = new Blob([JSON.stringify(publicData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'bridge-buddy-public-data.json';
                  a.click();
                }}
              >
                Download Public Data (JSON)
              </button>
              <button 
                className="button is-outlined"
                onClick={() => {
                  const publicData = analyticsService.exportPublicData();
                  navigator.clipboard.writeText(JSON.stringify(publicData, null, 2));
                  alert('Data copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

