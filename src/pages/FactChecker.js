import React, { useState } from 'react';
import analyticsService from '../services/analytics';

const FactChecker = () => {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setIsLoading(true);
    
    // Track the fact check submission
    analyticsService.trackEvent('fact_check_submit', { claim: claim });
    
    // Simulate API call - in a real app, this would call a fact-checking API
    setTimeout(() => {
      const verdict = Math.random() > 0.5 ? 'true' : 'false';
      const confidence = Math.floor(Math.random() * 30) + 70;
      
      const mockResult = {
        claim: claim,
        verdict: verdict,
        confidence: confidence,
        explanation: 'This is a simulated fact-check result. In a real implementation, this would contain detailed analysis from reliable sources.',
        sources: [
          'https://example.com/source1',
          'https://example.com/source2'
        ]
      };
      
      // Track the fact check result
      analyticsService.trackFactCheck(claim, verdict, confidence);
      
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  const getVerdictClass = (verdict) => {
    switch (verdict) {
      case 'true':
        return 'is-success';
      case 'false':
        return 'is-danger';
      default:
        return 'is-warning';
    }
  };

  const getVerdictText = (verdict) => {
    switch (verdict) {
      case 'true':
        return 'TRUE';
      case 'false':
        return 'FALSE';
      default:
        return 'UNVERIFIED';
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="content">
            <h1 className="title is-2 has-text-centered">Fact Checker</h1>
            <p className="subtitle is-5 has-text-centered has-text-grey">
              Submit a claim or statement to verify its accuracy
            </p>

            {/* Fact Check Form */}
            <div className="card">
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Claim to Fact Check</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Enter the claim or statement you want to verify..."
                        value={claim}
                        onChange={(e) => setClaim(e.target.value)}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="field">
                    <div className="control">
                      <button 
                        className={`button is-primary is-fullwidth ${isLoading ? 'is-loading' : ''}`}
                        type="submit"
                        disabled={isLoading || !claim.trim()}
                      >
                        {isLoading ? 'Checking...' : 'Check Fact'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="card mt-5">
                <div className="card-content">
                  <h3 className="title is-4">Fact Check Result</h3>
                  
                  <div className="field">
                    <label className="label">Original Claim</label>
                    <p className="has-text-grey">{result.claim}</p>
                  </div>

                  <div className="field">
                    <label className="label">Verdict</label>
                    <span className={`tag is-large ${getVerdictClass(result.verdict)}`}>
                      {getVerdictText(result.verdict)}
                    </span>
                    <span className="ml-3 has-text-grey">
                      Confidence: {result.confidence}%
                    </span>
                  </div>

                  <div className="field">
                    <label className="label">Explanation</label>
                    <p>{result.explanation}</p>
                  </div>

                  {result.sources && result.sources.length > 0 && (
                    <div className="field">
                      <label className="label">Sources</label>
                      <ul>
                        {result.sources.map((source, index) => (
                          <li key={index}>
                            <a href={source} target="_blank" rel="noopener noreferrer">
                              {source}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="card mt-5">
              <div className="card-content">
                <h3 className="title is-4">Tips for Spotting Misinformation</h3>
                <div className="content">
                  <ul>
                    <li><strong>Check the source:</strong> Verify the credibility of the website or author</li>
                    <li><strong>Read beyond the headline:</strong> Headlines can be misleading</li>
                    <li><strong>Check the author:</strong> Look up the author's credentials and background</li>
                    <li><strong>Check the date:</strong> Old news can be shared as current</li>
                    <li><strong>Check your biases:</strong> Be aware of your own confirmation bias</li>
                    <li><strong>Check supporting sources:</strong> Look for links to credible sources</li>
                    <li><strong>Check if it's a joke:</strong> Satire can be mistaken for real news</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactChecker;
