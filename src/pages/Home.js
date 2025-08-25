import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import analyticsService from '../services/analytics';

const Home = () => {
  useEffect(() => {
    // Track page view
    analyticsService.trackEvent('page_view', { page: 'home' });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero hero-gradient is-medium">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h1 className="title is-1 has-text-white">
                  Bridge Buddy
                </h1>
                <h2 className="subtitle is-4 has-text-white">
                  Your trusted companion in the fight against misinformation
                </h2>
                <p className="has-text-white is-size-5 mb-5">
                  In today's world of information overload, it's crucial to have reliable tools 
                  to separate fact from fiction. Bridge Buddy helps you navigate through 
                  misinformation and promotes critical thinking.
                </p>
                            <div className="buttons is-centered">
              <Link to="/fact-checker" className="button is-white is-large">
                <span>Start Fact Checking</span>
              </Link>
              <Link to="/resources" className="button is-outlined is-white is-large">
                <span>Learn More</span>
              </Link>
              <Link to="/analytics" className="button is-outlined is-white is-large">
                <span>View Analytics</span>
              </Link>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h2 className="title is-2">Why Bridge Buddy?</h2>
              <p className="subtitle is-5 has-text-grey">
                We're committed to promoting truth and combating harmful narratives
              </p>
            </div>
          </div>

          <div className="columns is-multiline mt-6">
            <div className="column is-4">
              <div className="card card-hover">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Fact Verification</h3>
                    <p>
                      Get instant fact-checking results for claims and statements you encounter online. 
                      Our AI-powered system helps identify misinformation quickly and accurately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-4">
              <div className="card card-hover">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Educational Resources</h3>
                    <p>
                      Access comprehensive resources on media literacy, critical thinking, 
                      and how to spot misinformation. Learn the tools to become a more informed citizen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-4">
              <div className="card card-hover">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Community Support</h3>
                    <p>
                      Join a community of truth-seekers. Share experiences, discuss current events, 
                      and support each other in the fight against misinformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Mission Statement */}
        <section className="section has-background-light">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h2 className="title is-3">Our Mission</h2>
                <p className="is-size-5">
                  In an era where misinformation spreads faster than truth, Bridge Buddy serves as 
                  your reliable companion in navigating the complex landscape of information. 
                  We believe that an informed citizenry is the foundation of a healthy democracy, 
                  and we're committed to providing the tools and resources needed to combat 
                  harmful narratives and promote critical thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Preview */}
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h2 className="title is-3">Current Misinformation Landscape</h2>
                <p className="subtitle is-5 has-text-grey mb-5">
                  Real-time insights into what people are fact-checking
                </p>
              </div>
            </div>
            
            <div className="columns is-multiline">
              <div className="column is-4">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Fact Checks Today</p>
                    <p className="title is-2 has-text-primary">
                      {analyticsService.getAnalytics().overview.totalFactChecks}
                    </p>
                    <p className="subtitle is-6">Total verifications</p>
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">False Claims Detected</p>
                    <p className="title is-2 has-text-danger">
                      {analyticsService.getAnalytics().overview.falseClaims}
                    </p>
                    <p className="subtitle is-6">Misinformation identified</p>
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="card has-text-centered">
                  <div className="card-content">
                    <p className="heading">Active Users</p>
                    <p className="title is-2 has-text-success">
                      {analyticsService.getAnalytics().overview.totalSessions}
                    </p>
                    <p className="subtitle is-6">People fighting misinformation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="has-text-centered mt-5">
              <Link to="/analytics" className="button is-primary is-medium">
                View Full Analytics Dashboard
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;
