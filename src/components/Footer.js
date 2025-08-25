import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer has-background-link">
      <div className="container">
        <div className="columns">
          {/* Brand Section */}
          <div className="column is-3">
            <div className="footer-brand">
              <h3 className="title is-4 has-text-white">Bridge Buddy</h3>
              <p className="has-text-white-ter">
                Promoting critical thinking and media literacy in the digital age. 
                Your trusted companion for fact-checking, information verification, 
                and connecting people with reliable support resources.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="column is-2">
            <h4 className="title is-5 has-text-white">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="has-text-white-ter">Home</Link>
              </li>
              <li>
                <Link to="/fact-checker" className="has-text-white-ter">Fact Checker</Link>
              </li>
              <li>
                <Link to="/resources" className="has-text-white-ter">Resources</Link>
              </li>
              <li>
                <Link to="/analytics" className="has-text-white-ter">Analytics</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="column is-3">
            <h4 className="title is-5 has-text-white">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="has-text-white-ter">Media Literacy Guide</a>
              </li>
              <li>
                <a href="#" className="has-text-white-ter">Fact-Checking Tips</a>
              </li>
              <li>
                <a href="#" className="has-text-white-ter">Educational Materials</a>
              </li>
              <li>
                <a href="#" className="has-text-white-ter">API Documentation</a>
              </li>
            </ul>
          </div>

          {/* Support & Mental Health */}
          <div className="column is-3">
            <h4 className="title is-5 has-text-white">Support & Mental Health</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.veteranscrisisline.net/" target="_blank" rel="noopener noreferrer" className="has-text-white-ter">
                  <i className="fas fa-heart"></i> Veterans Crisis Line
                </a>
              </li>
              <li>
                <a href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer" className="has-text-white-ter">
                  <i className="fas fa-phone"></i> 988 Suicide & Crisis Lifeline
                </a>
              </li>
              <li>
                <a href="https://www.nami.org/help" target="_blank" rel="noopener noreferrer" className="has-text-white-ter">
                  <i className="fas fa-hands-helping"></i> NAMI HelpLine
                </a>
              </li>
              <li>
                <a href="https://www.va.gov/health-care/health-needs-conditions/mental-health/" target="_blank" rel="noopener noreferrer" className="has-text-white-ter">
                  <i className="fas fa-shield-alt"></i> VA Mental Health
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="column is-3">
            <h4 className="title is-5 has-text-white">Contact & Support</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@bridgebuddy.com" className="has-text-white-ter">
                  <i className="fas fa-envelope"></i> contact@bridgebuddy.com
                </a>
              </li>
              <li>
                <a href="#" className="has-text-white-ter">
                  <i className="fas fa-question-circle"></i> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="has-text-white-ter">
                  <i className="fas fa-bug"></i> Report Issues
                </a>
              </li>
              <li>
                <Link to="/about" className="has-text-white-ter">
                  <i className="fas fa-info-circle"></i> About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="columns is-mobile is-vcentered">
            <div className="column">
              <p className="has-text-white-ter">
                © {currentYear} Bridge Buddy. All rights reserved.
              </p>
            </div>
            <div className="column">
              <div className="footer-legal">
                <a href="#" className="has-text-white-ter">Privacy Policy</a>
                <span className="separator">•</span>
                <a href="#" className="has-text-white-ter">Terms of Service</a>
                <span className="separator">•</span>
                <a href="#" className="has-text-white-ter">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
