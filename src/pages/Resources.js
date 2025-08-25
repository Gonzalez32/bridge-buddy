import React from 'react';

const Resources = () => {
  const resources = [
    {
      category: 'Media Literacy',
      items: [
        {
          title: 'How to Spot Fake News',
          description: 'A comprehensive guide to identifying misinformation online',
          link: 'https://www.factcheck.org/2016/11/how-to-spot-fake-news/',
          type: 'Guide'
        },
        {
          title: 'Media Literacy Fundamentals',
          description: 'Learn the basics of media literacy and critical thinking',
          link: 'https://medialiteracynow.org/',
          type: 'Educational'
        },
        {
          title: 'Fact-Checking Tools',
          description: 'Essential tools and websites for verifying information',
          link: 'https://www.poynter.org/fact-checking/',
          type: 'Tools'
        }
      ]
    },
    {
      category: 'Critical Thinking',
      items: [
        {
          title: 'Logical Fallacies',
          description: 'Learn to identify common logical fallacies in arguments',
          link: 'https://yourlogicalfallacyis.com/',
          type: 'Educational'
        },
        {
          title: 'Cognitive Biases',
          description: 'Understanding how our brains can deceive us',
          link: 'https://en.wikipedia.org/wiki/List_of_cognitive_biases',
          type: 'Reference'
        },
        {
          title: 'Scientific Method',
          description: 'How to evaluate scientific claims and research',
          link: 'https://undsci.berkeley.edu/',
          type: 'Educational'
        }
      ]
    },
    {
      category: 'Combatting Misinformation',
      items: [
        {
          title: 'Debunking Handbook',
          description: 'Evidence-based strategies for correcting misinformation',
          link: 'https://sks.to/debunk',
          type: 'Guide'
        },
        {
          title: 'Prebunking Techniques',
          description: 'How to inoculate people against misinformation',
          link: 'https://www.cambridge.org/core/journals/ps-political-science-and-politics/article/abs/prebunking-interventions/',
          type: 'Research'
        },
        {
          title: 'Digital Citizenship',
          description: 'Being a responsible digital citizen in the information age',
          link: 'https://www.commonsense.org/education/digital-citizenship',
          type: 'Educational'
        }
      ]
    },
    {
      category: 'Reliable News Sources',
      items: [
        {
          title: 'AP Fact Check',
          description: 'Fact-checking from the Associated Press',
          link: 'https://apnews.com/hub/fact-checking',
          type: 'News'
        },
        {
          title: 'Reuters Fact Check',
          description: 'Fact-checking from Reuters news agency',
          link: 'https://www.reuters.com/fact-check/',
          type: 'News'
        },
        {
          title: 'Snopes',
          description: 'One of the oldest and most respected fact-checking websites',
          link: 'https://www.snopes.com/',
          type: 'Fact-Checking'
        }
      ]
    }
  ];

  return (
    <div className="container">
      <div className="content">
        <h1 className="title is-2 has-text-centered">Educational Resources</h1>
        <p className="subtitle is-5 has-text-centered has-text-grey mb-6">
          Build your media literacy skills and learn to combat misinformation
        </p>

        {resources.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            <h2 className="title is-3">{category.category}</h2>
            <div className="columns is-multiline">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="column is-4">
                  <div className="card resource-card card-hover">
                    <div className="card-content">
                      <div className="content">
                        <div className="tags mb-2">
                          <span className="tag is-info is-light">{item.type}</span>
                        </div>
                        <h3 className="title is-5">{item.title}</h3>
                        <p className="has-text-grey">{item.description}</p>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="button is-small is-outlined is-primary"
                        >
                          Visit Resource
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Additional Tips Section */}
        <div className="card mt-6">
          <div className="card-content">
            <h2 className="title is-3">Quick Tips for Daily Use</h2>
            <div className="columns is-multiline">
              <div className="column is-6">
                <h3 className="title is-5">Before Sharing</h3>
                <ul>
                  <li>Read the entire article, not just the headline</li>
                  <li>Check the publication date</li>
                  <li>Verify the author's credentials</li>
                  <li>Look for supporting sources</li>
                  <li>Check if it's satire or parody</li>
                </ul>
              </div>
              <div className="column is-6">
                <h3 className="title is-5">When Debunking</h3>
                <ul>
                  <li>Lead with the facts, not the myth</li>
                  <li>Use simple, clear language</li>
                  <li>Provide credible sources</li>
                  <li>Use graphics when possible</li>
                  <li>Be respectful and patient</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="has-text-centered mt-6">
          <h2 className="title is-4">Ready to Make a Difference?</h2>
          <p className="subtitle is-6 has-text-grey">
            Start by fact-checking claims you encounter and sharing reliable information with your network.
          </p>
          <a href="/fact-checker" className="button is-primary is-medium">
            Start Fact Checking
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;

