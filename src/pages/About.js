import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Bridge Buddy</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Bridge Buddy is dedicated to promoting critical thinking and media literacy 
            in the digital age. We believe that everyone deserves access to reliable 
            information and the tools to evaluate the credibility of what they read, 
            see, and hear online.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Fact Checking</h3>
              <p>
                Our AI-powered fact checker helps you verify claims and statements 
                by cross-referencing information with reliable sources.
              </p>
            </div>
            <div className="feature-card">
              <h3>Media Literacy Resources</h3>
              <p>
                Access educational materials, guides, and tools to improve your 
                ability to critically evaluate information.
              </p>
            </div>
            <div className="feature-card">
              <h3>Analytics & Insights</h3>
              <p>
                Track your fact-checking habits and gain insights into your 
                information consumption patterns.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Approach</h2>
          <p>
            We combine cutting-edge artificial intelligence with human expertise 
            to provide accurate, unbiased fact-checking services. Our platform 
            is designed to be user-friendly while maintaining the highest standards 
            of accuracy and reliability.
          </p>
        </section>

        <section className="about-section">
          <h2>Get Involved</h2>
          <p>
            Whether you're a student, educator, journalist, or concerned citizen, 
            Bridge Buddy provides the tools you need to navigate the complex 
            information landscape. Start fact-checking today and help build a 
            more informed society.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or want to collaborate? We'd love to 
            hear from you. Reach out to us at{' '}
            <a href="mailto:contact@bridgebuddy.com" className="contact-link">
              contact@bridgebuddy.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
