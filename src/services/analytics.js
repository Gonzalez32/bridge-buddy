// Analytics service for tracking user behavior and misinformation trends
class AnalyticsService {
  constructor() {
    this.events = [];
    this.factChecks = [];
    this.userSessions = [];
    this.trendingTopics = new Map();
    this.loadFromStorage();
  }

  // Track user events
  trackEvent(eventType, data = {}) {
    const event = {
      id: Date.now() + Math.random(),
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    
    this.events.push(event);
    this.saveToStorage();
    return event;
  }

  // Track fact-check submissions
  trackFactCheck(claim, result, confidence) {
    const factCheck = {
      id: Date.now() + Math.random(),
      claim: claim,
      result: result,
      confidence: confidence,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    
    this.factChecks.push(factCheck);
    this.updateTrendingTopics(claim);
    this.saveToStorage();
    return factCheck;
  }

  // Track user sessions
  trackSession() {
    const session = {
      id: this.getSessionId(),
      startTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    this.userSessions.push(session);
    this.saveToStorage();
    return session;
  }

  // Update trending topics based on fact-check claims
  updateTrendingTopics(claim) {
    const words = claim.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 3);
    
    words.forEach(word => {
      const count = this.trendingTopics.get(word) || 0;
      this.trendingTopics.set(word, count + 1);
    });
  }

  // Get analytics data
  getAnalytics() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      overview: this.getOverviewStats(),
      factChecks: this.getFactCheckStats(),
      trending: this.getTrendingTopics(),
      timeSeries: this.getTimeSeriesData(),
      userBehavior: this.getUserBehaviorStats(),
      recentActivity: this.getRecentActivity()
    };
  }

  // Get overview statistics
  getOverviewStats() {
    const totalFactChecks = this.factChecks.length;
    const totalSessions = this.userSessions.length;
    const totalEvents = this.events.length;
    
    const trueClaims = this.factChecks.filter(fc => fc.result === 'true').length;
    const falseClaims = this.factChecks.filter(fc => fc.result === 'false').length;
    const accuracyRate = totalFactChecks > 0 ? (trueClaims / totalFactChecks * 100).toFixed(1) : 0;

    return {
      totalFactChecks,
      totalSessions,
      totalEvents,
      trueClaims,
      falseClaims,
      accuracyRate: parseFloat(accuracyRate),
      averageConfidence: this.getAverageConfidence()
    };
  }

  // Get fact-check statistics
  getFactCheckStats() {
    const results = this.factChecks.reduce((acc, fc) => {
      acc[fc.result] = (acc[fc.result] || 0) + 1;
      return acc;
    }, {});

    const confidenceRanges = {
      '90-100%': 0,
      '80-89%': 0,
      '70-79%': 0,
      '60-69%': 0,
      '50-59%': 0
    };

    this.factChecks.forEach(fc => {
      if (fc.confidence >= 90) confidenceRanges['90-100%']++;
      else if (fc.confidence >= 80) confidenceRanges['80-89%']++;
      else if (fc.confidence >= 70) confidenceRanges['70-79%']++;
      else if (fc.confidence >= 60) confidenceRanges['60-69%']++;
      else confidenceRanges['50-59%']++;
    });

    return {
      results,
      confidenceRanges,
      topClaims: this.getTopClaims()
    };
  }

  // Get trending topics
  getTrendingTopics() {
    return Array.from(this.trendingTopics.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  // Get time series data
  getTimeSeriesData() {
    const dailyStats = {};
    
    this.factChecks.forEach(fc => {
      const date = fc.timestamp.split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { total: 0, true: 0, false: 0 };
      }
      dailyStats[date].total++;
      dailyStats[date][fc.result]++;
    });

    return Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        total: stats.total,
        true: stats.true,
        false: stats.false
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Get user behavior statistics
  getUserBehaviorStats() {
    const pageViews = this.events.filter(e => e.type === 'page_view').length;
    const factCheckSubmissions = this.events.filter(e => e.type === 'fact_check_submit').length;
    const resourceClicks = this.events.filter(e => e.type === 'resource_click').length;

    return {
      pageViews,
      factCheckSubmissions,
      resourceClicks,
      averageSessionDuration: this.calculateAverageSessionDuration()
    };
  }

  // Get recent activity
  getRecentActivity() {
    const recent = [...this.factChecks, ...this.events]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    return recent.map(item => ({
      type: item.type || 'fact_check',
      timestamp: item.timestamp,
      data: item.claim || item.data
    }));
  }

  // Helper methods
  getSessionId() {
    let sessionId = localStorage.getItem('bridge_buddy_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('bridge_buddy_session_id', sessionId);
    }
    return sessionId;
  }

  getAverageConfidence() {
    if (this.factChecks.length === 0) return 0;
    const total = this.factChecks.reduce((sum, fc) => sum + fc.confidence, 0);
    return Math.round(total / this.factChecks.length);
  }

  getTopClaims() {
    const claimCounts = {};
    this.factChecks.forEach(fc => {
      const key = fc.claim.toLowerCase().substring(0, 50);
      claimCounts[key] = (claimCounts[key] || 0) + 1;
    });

    return Object.entries(claimCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([claim, count]) => ({ claim, count }));
  }

  calculateAverageSessionDuration() {
    // Simplified calculation - in real app would track session end times
    return Math.round(Math.random() * 300 + 120); // 2-7 minutes
  }

  // Storage methods
  saveToStorage() {
    try {
      localStorage.setItem('bridge_buddy_analytics', JSON.stringify({
        events: this.events.slice(-1000), // Keep last 1000 events
        factChecks: this.factChecks.slice(-500), // Keep last 500 fact checks
        userSessions: this.userSessions.slice(-100), // Keep last 100 sessions
        trendingTopics: Array.from(this.trendingTopics.entries())
      }));
    } catch (error) {
      console.warn('Failed to save analytics to localStorage:', error);
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem('bridge_buddy_analytics');
      if (data) {
        const parsed = JSON.parse(data);
        this.events = parsed.events || [];
        this.factChecks = parsed.factChecks || [];
        this.userSessions = parsed.userSessions || [];
        this.trendingTopics = new Map(parsed.trendingTopics || []);
      }
    } catch (error) {
      console.warn('Failed to load analytics from localStorage:', error);
    }
  }

  // Export data for public sharing
  exportPublicData() {
    const analytics = this.getAnalytics();
    return {
      lastUpdated: new Date().toISOString(),
      overview: analytics.overview,
      trending: analytics.trending,
      timeSeries: analytics.timeSeries.slice(-30), // Last 30 days
      factCheckStats: analytics.factChecks
    };
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

// Initialize session tracking
analyticsService.trackSession();

export default analyticsService;

