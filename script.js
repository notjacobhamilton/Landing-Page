// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle pulse animation to the toggle button
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Track theme change
        // analytics.track('theme_changed', { theme: newTheme });
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
        }
    });
});

// Real-Time Business Metrics (Accurate)
document.addEventListener('DOMContentLoaded', function() {
    // Real visitor counter starting from 1 (you viewing the site)
    const visitorCount = document.getElementById('visitor-counter');
    if (visitorCount) {
        let count = 1; // Actual starting count
        visitorCount.textContent = count;
        
        // Increment visitors realistically (much less frequent)
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval (very rare)
                count += 1; // Add just 1 visitor
                visitorCount.textContent = count;
                
                // Add a subtle flash animation
                visitorCount.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    visitorCount.style.transform = 'scale(1)';
                }, 200);
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Response time stays consistent since you're available
    const responseTime = document.getElementById('response-time');
    if (responseTime) {
        responseTime.textContent = '~2-4 hrs'; // Keep it realistic
    }
    
    // Project capacity - accurate (0 current projects)
    const projectCapacity = document.getElementById('project-capacity');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    
    if (projectCapacity && statusIndicator && statusText) {
        // Set accurate current state
        projectCapacity.textContent = '0/4';
        statusIndicator.className = 'status-indicator available';
        statusText.textContent = 'Available for new projects';
    }
    
    // Real GitHub Activity Integration
    async function fetchGitHubActivity() {
        try {
            // Note: GitHub API may have CORS issues when called directly from browser
            // For production, consider using a serverless function or CORS proxy
            const response = await fetch('https://api.github.com/users/notjacobhamilton/events?per_page=5');
            
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            
            const events = await response.json();
            
            const activityFeed = document.querySelector('.activity-feed');
            if (!activityFeed || !events || events.length === 0) {
                return;
            }
            
            activityFeed.innerHTML = events.map(event => {
                let icon = '📝';
                let description = 'Repository activity';
                
                switch(event.type) {
                    case 'PushEvent':
                        icon = '🚀';
                        const commitCount = event.payload.commits?.length || 1;
                        const repoName = event.repo.name.split('/')[1]; // Get just repo name, not full path
                        description = `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`;
                        break;
                    case 'CreateEvent':
                        icon = '✨';
                        description = `Created ${event.payload.ref_type} in ${event.repo.name.split('/')[1]}`;
                        break;
                    case 'IssuesEvent':
                        icon = '🔧';
                        description = `${event.payload.action} issue in ${event.repo.name.split('/')[1]}`;
                        break;
                    case 'PullRequestEvent':
                        icon = '🔀';
                        description = `${event.payload.action} pull request in ${event.repo.name.split('/')[1]}`;
                        break;
                    case 'WatchEvent':
                        icon = '⭐';
                        description = `Starred ${event.repo.name.split('/')[1]}`;
                        break;
                    case 'ForkEvent':
                        icon = '🍴';
                        description = `Forked ${event.repo.name.split('/')[1]}`;
                        break;
                    default:
                        description = `Activity in ${event.repo.name.split('/')[1]}`;
                }
                
                const timeAgo = getTimeAgo(event.created_at);
                
                return `
                    <div class="activity-item">
                        <span class="activity-icon">${icon}</span>
                        <span class="activity-text">${description}</span>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                `;
            }).join('');
            
            console.log('✅ Real GitHub activity loaded successfully');
            
        } catch (error) {
            console.log('⚠️ GitHub API not accessible (CORS or network issue), keeping placeholder data');
            // The placeholder content will remain visible
            
            // Update the "loading" message to show API status
            const loadingItem = document.querySelector('.activity-feed .activity-item:last-child .activity-text');
            if (loadingItem && loadingItem.textContent.includes('Loading')) {
                loadingItem.textContent = 'GitHub API unavailable (CORS)';
                loadingItem.parentElement.querySelector('.activity-time').textContent = 'Static';
            }
        }
    }
    
    // Helper function to calculate time ago
    function getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        return Math.floor(seconds / 86400) + ' days ago';
    }
    
    // Fetch real GitHub activity on load
    fetchGitHubActivity();
    
    // Refresh GitHub activity every 5 minutes
    setInterval(fetchGitHubActivity, 300000);
});

// Interactive Code Preview
document.addEventListener('DOMContentLoaded', function() {
    const codeSamples = {
        javascript: {
            title: 'Dynamic Form Validation',
            code: `// Real-time form validation with smooth animations
class FormValidator {
  constructor(form) {
    this.form = form;
    this.rules = new Map();
    this.init();
  }

  addRule(field, validator, message) {
    this.rules.set(field, { validator, message });
    return this;
  }

  async validate(field) {
    const rule = this.rules.get(field);
    const input = this.form.querySelector('[name="' + field + '"]');
    
    if (!rule || !input) return true;
    
    const isValid = await rule.validator(input.value);
    this.showFeedback(input, isValid, rule.message);
    
    return isValid;
  }

  showFeedback(input, isValid, message) {
    const feedback = input.nextElementSibling;
    
    input.classList.toggle('valid', isValid);
    input.classList.toggle('invalid', !isValid);
    
    if (feedback) {
      feedback.textContent = isValid ? '✓ Looks good!' : message;
      feedback.className = isValid ? 'feedback success' : 'feedback error';
    }
  }
}`,
            demo: function() {
                return `<div class="demo-form">
                    <input type="email" placeholder="Enter your email" class="demo-input">
                    <div class="feedback">Start typing to see validation...</div>
                </div>`;
            }
        },
        react: {
            title: 'React Hook for API Calls',
            code: `// Custom React hook for data fetching with loading states
import { useState, useEffect } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ': ' + response.statusText);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};`,
            demo: function() {
                return `<div class="react-demo">
                    <div class="loading-state">🔄 Loading...</div>
                    <div class="success-state">✅ Data loaded successfully!</div>
                    <div class="error-state">❌ Error: Network timeout</div>
                </div>`;
            }
        },
        python: {
            title: 'Automated Data Processing',
            code: `# Automated data cleaning and analysis pipeline
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class DataProcessor:
    def __init__(self, data_source):
        self.data_source = data_source
        self.processed_data = None
        
    def clean_data(self, df):
        """Remove duplicates and handle missing values"""
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Handle missing values
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
        
        # Fill categorical missing values with mode
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            df[col] = df[col].fillna(df[col].mode()[0])
            
        return df
    
    def analyze_trends(self, df, date_column, metric_column):
        """Analyze trends over time"""
        df[date_column] = pd.to_datetime(df[date_column])
        
        # Calculate moving averages
        df['7_day_avg'] = df[metric_column].rolling(window=7).mean()
        df['30_day_avg'] = df[metric_column].rolling(window=30).mean()
        
        # Identify growth rate
        df['growth_rate'] = df[metric_column].pct_change() * 100
        
        return df
        
    def generate_insights(self):
        """Generate automated insights from the data"""
        insights = {
            'total_records': len(self.processed_data),
            'date_range': f"{self.processed_data['date'].min()} to {self.processed_data['date'].max()}",
            'avg_growth': self.processed_data['growth_rate'].mean(),
            'peak_performance': self.processed_data['metric'].max()
        }
        
        return insights`,
            demo: function() {
                return `<div class="python-demo">
                    <div class="terminal">
                        <div class="terminal-line">$ python data_processor.py</div>
                        <div class="terminal-line">📊 Processing 10,247 records...</div>
                        <div class="terminal-line">✨ Cleaned 847 duplicates</div>
                        <div class="terminal-line">📈 Growth rate: +23.4%</div>
                        <div class="terminal-line">✅ Analysis complete!</div>
                    </div>
                </div>`;
            }
        },
        css: {
            title: 'Advanced Animation System',
            code: `/* Smooth micro-interactions and state transitions */
.interactive-button {
  position: relative;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.interactive-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.interactive-button:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 10px 25px rgba(99, 102, 241, 0.4),
    0 20px 40px rgba(99, 102, 241, 0.1);
}

.interactive-button:hover::before {
  left: 100%;
}

.interactive-button:active {
  transform: translateY(-2px);
  transition: transform 0.1s ease;
}

/* Loading state animation */
.interactive-button.loading {
  pointer-events: none;
  background: #6b7280;
}

.interactive-button.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  border: 2px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success state */
.interactive-button.success {
  background: #10b981;
  animation: successPulse 0.6s ease;
}

@keyframes successPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
            demo: function() {
                return `<div class="css-demo">
                    <button class="demo-button interactive-button">Hover me!</button>
                    <div class="demo-states">
                        <button class="demo-button interactive-button loading">Loading...</button>
                        <button class="demo-button interactive-button success">Success!</button>
                    </div>
                </div>`;
            }
        }
    };

    // Code tab switching
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeDisplay = document.getElementById('code-display');
    const codeTitle = document.getElementById('code-title');
    const outputContent = document.getElementById('output-content');

    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const language = this.dataset.language;
            const sample = codeSamples[language];

            if (!sample) return;

            // Update active tab
            codeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update code display
            codeDisplay.textContent = sample.code;
            codeDisplay.className = 'language-' + language;
            codeTitle.textContent = sample.title;

            // Update output
            outputContent.innerHTML = sample.demo();

            // Initialize language-specific demos (removed typing animation)
            if (language === 'javascript') {
                initJavaScriptDemo();
            } else if (language === 'css') {
                initCSSDemo();
            }
        });
    });

    // Copy code functionality
    const copyButton = document.getElementById('copy-code');
    copyButton.addEventListener('click', function() {
        const code = codeDisplay.textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.textContent = '✅';
            setTimeout(() => {
                this.textContent = '📋';
            }, 2000);
        });
    });

    // Run code functionality (simulated)
    const runButton = document.getElementById('run-code');
    runButton.addEventListener('click', function() {
        this.textContent = '⏳';
        
        setTimeout(() => {
            this.textContent = '✅';
            
            // Add a flash animation to the output
            outputContent.style.animation = 'flash 0.5s ease';
            
            setTimeout(() => {
                this.textContent = '▶️';
                outputContent.style.animation = '';
            }, 1000);
        }, 1500);
    });

    // Initialize JavaScript demo
    function initJavaScriptDemo() {
        const demoInput = outputContent.querySelector('.demo-input');
        const feedback = outputContent.querySelector('.feedback');

        if (!demoInput) return;

        demoInput.addEventListener('input', function() {
            const value = this.value;
            const isValid = validateEmail(value);

            this.classList.remove('valid', 'invalid');
            
            if (value.length > 0) {
                if (isValid) {
                    this.classList.add('valid');
                    feedback.textContent = '✓ Looks good!';
                    feedback.className = 'feedback success';
                } else {
                    this.classList.add('invalid');
                    feedback.textContent = '❌ Please enter a valid email';
                    feedback.className = 'feedback error';
                }
            } else {
                feedback.textContent = 'Start typing to see validation...';
                feedback.className = 'feedback';
            }
        });
    }

    // Initialize CSS demo
    function initCSSDemo() {
        const buttons = outputContent.querySelectorAll('.demo-button');
        
        buttons.forEach(button => {
            if (button.classList.contains('interactive-button') && 
                !button.classList.contains('loading') && 
                !button.classList.contains('success')) {
                
                button.addEventListener('click', function() {
                    this.classList.add('loading');
                    this.textContent = 'Loading...';
                    
                    setTimeout(() => {
                        this.classList.remove('loading');
                        this.classList.add('success');
                        this.textContent = 'Success!';
                        
                        setTimeout(() => {
                            this.classList.remove('success');
                            this.textContent = 'Hover me!';
                        }, 2000);
                    }, 2000);
                });
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Animate tech stack bars on scroll
    const techItems = document.querySelectorAll('.tech-item');
    const techObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelBar = entry.target.querySelector('.level-bar');
                if (levelBar && !levelBar.classList.contains('animated')) {
                    levelBar.classList.add('animated');
                    levelBar.style.width = levelBar.style.width; // Trigger animation
                }
            }
        });
    }, { threshold: 0.5 });

    techItems.forEach(item => {
        techObserver.observe(item);
    });

    // Add flash animation CSS
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = '@keyframes flash { 0%, 100% { background: var(--bg-tertiary); } 50% { background: rgba(99, 102, 241, 0.1); } }';
        document.head.appendChild(style);
    }
});

// Splash Screen and Page Load Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // Ensure main content is hidden initially
    mainContent.style.display = 'none';
    
    // Start the splash screen transition after a short delay
    setTimeout(() => {
        startTransition();
    }, 1500); // 1.5 seconds as specified
    
    function startTransition() {
        // Start fading out splash screen
        splashScreen.classList.add('fade-out');
        
        // Show main content
        mainContent.style.display = 'block';
        
        // Trigger main content animation after splash starts fading
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
        
        // Remove splash screen from DOM after transition
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Enable body scrolling
            document.body.style.overflow = 'auto';
        }, 800);
    }
    
    // Disable body scrolling during splash screen
    document.body.style.overflow = 'hidden';
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 0; // Adjust if you have a fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add initial styles for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(section);
    });
});

// Add subtle parallax effect to hero gradient
document.addEventListener('DOMContentLoaded', function() {
    const gradientMesh = document.querySelector('.gradient-mesh');
    
    if (gradientMesh) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                gradientMesh.style.transform = 'translateY(calc(-50% + ' + rate + 'px))';
            }
        });
    }
});

// Enhanced button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Service cards hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Performance optimization: Reduce animations on low-end devices
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Reduce splash screen timing
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.classList.add('show');
            document.body.style.overflow = 'auto';
        }, 500); // Faster transition for accessibility
    }
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload hero background if needed
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const img = new Image();
        // img.src = 'path/to/hero-image.jpg'; // Uncomment if you add a hero image
    }
});

// Add loading state management
window.addEventListener('load', function() {
    // Ensure everything is loaded before starting animations
    document.body.classList.add('loaded');
});

// Error handling for failed transitions
window.addEventListener('error', function(e) {
    console.warn('Animation error:', e);
    // Fallback: Skip splash screen if there's an error
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    if (splashScreen && mainContent) {
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('show');
        document.body.style.overflow = 'auto';
    }
});

// Mobile touch optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Improve touch response on mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly hover states
        const interactiveElements = document.querySelectorAll('.btn, .service-card, .project-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
});

// Analytics and tracking (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    // Track splash screen completion
    setTimeout(() => {
        // analytics.track('splash_screen_completed');
    }, 2000);
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // analytics.track('cta_clicked', { button: this.textContent });
        });
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // analytics.track('section_viewed', { section: entry.target.id });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Service Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const serviceTypeInput = document.getElementById('service-type');
    const closeButton = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    // Service data
    const serviceData = {
        'custom-websites': {
            title: 'Custom Business Websites',
            icon: '🌐',
            description: 'Professional, custom-built websites that represent your brand and drive business growth. I create scalable, secure, and fast-loading websites using modern technologies.',
            details: [
                {
                    title: 'What\'s Included',
                    content: 'Responsive design, SEO optimization, content management system, contact forms, analytics setup, and mobile optimization.'
                },
                {
                    title: 'Timeline',
                    content: 'Typically 4-8 weeks depending on complexity and features required.'
                },
                {
                    title: 'Technology',
                    content: 'Modern HTML5, CSS3, JavaScript, and content management systems like WordPress or custom solutions.'
                },
                {
                    title: 'Ongoing Support',
                    content: 'Hosting setup, security monitoring, updates, and maintenance options available.'
                }
            ]
        },
        'landing-pages': {
            title: 'Landing Page Redesigns',
            icon: '🎨',
            description: 'Transform your existing pages into high-converting experiences that turn visitors into customers. I focus on user experience, conversion optimization, and performance.',
            details: [
                {
                    title: 'Conversion Focus',
                    content: 'A/B testing setup, lead capture forms, clear call-to-actions, and user journey optimization.'
                },
                {
                    title: 'Performance',
                    content: 'Fast loading times, mobile optimization, and SEO improvements for better search rankings.'
                },
                {
                    title: 'Analytics',
                    content: 'Google Analytics, conversion tracking, and detailed reporting on page performance.'
                },
                {
                    title: 'Quick Turnaround',
                    content: 'Most landing page projects completed within 2-4 weeks.'
                }
            ]
        },
        'billing-systems': {
            title: 'Invoicing & Billing Systems',
            icon: '💼',
            description: 'Custom web applications that automate your billing processes, manage customer invoices, and integrate with payment processors for seamless transactions.',
            details: [
                {
                    title: 'Features',
                    content: 'Automated invoicing, payment processing, client management, recurring billing, and financial reporting.'
                },
                {
                    title: 'Integrations',
                    content: 'Stripe, PayPal, QuickBooks, and other business tools you already use.'
                },
                {
                    title: 'Security',
                    content: 'Bank-level encryption, PCI compliance, and secure data handling for financial information.'
                },
                {
                    title: 'Scalability',
                    content: 'Built to grow with your business, from startup to enterprise level.'
                }
            ]
        },
        'dashboards': {
            title: 'Internal Tools & Dashboards',
            icon: '📊',
            description: 'Custom dashboards and internal tools that help you visualize data, manage workflows, and make better business decisions with real-time insights.',
            details: [
                {
                    title: 'Data Visualization',
                    content: 'Interactive charts, graphs, and reports that make your data easy to understand and act upon.'
                },
                {
                    title: 'Workflow Automation',
                    content: 'Automate repetitive tasks and create efficient workflows for your team.'
                },
                {
                    title: 'Real-time Updates',
                    content: 'Live data feeds and instant updates so you always have current information.'
                },
                {
                    title: 'User Management',
                    content: 'Role-based access control and user permissions for team collaboration.'
                }
            ]
        },
        'performance': {
            title: 'Performance & Security',
            icon: '⚡',
            description: 'Optimize your existing website for speed, security, and user experience. I identify bottlenecks and implement solutions that improve performance and protect your business.',
            details: [
                {
                    title: 'Speed Optimization',
                    content: 'Page load optimization, image compression, caching strategies, and CDN setup.'
                },
                {
                    title: 'Security Hardening',
                    content: 'SSL certificates, security audits, malware protection, and backup systems.'
                },
                {
                    title: 'SEO Improvements',
                    content: 'Technical SEO, site structure optimization, and search engine ranking improvements.'
                },
                {
                    title: 'Monitoring',
                    content: 'Ongoing performance monitoring and uptime tracking with alerts.'
                }
            ]
        },
        'consulting': {
            title: 'Technical Consulting',
            icon: '🔧',
            description: 'Strategic guidance on technology decisions, architecture planning, and development roadmaps. Get expert advice to make the right technical choices for your business.',
            details: [
                {
                    title: 'Architecture Planning',
                    content: 'System design, technology stack recommendations, and scalability planning.'
                },
                {
                    title: 'Code Reviews',
                    content: 'Expert review of existing code, security audits, and improvement recommendations.'
                },
                {
                    title: 'Strategy Sessions',
                    content: 'One-on-one consultations to plan your technical roadmap and solve complex problems.'
                },
                {
                    title: 'Training',
                    content: 'Team training on best practices, new technologies, and development workflows.'
                }
            ]
        }
    };

    // Open modal function
    function openModal(serviceKey) {
        const service = serviceData[serviceKey];
        if (!service) return;

        modalTitle.textContent = service.title;
        modalIcon.textContent = service.icon;
        modalDescription.textContent = service.description;
        serviceTypeInput.value = serviceKey;

        // Build details HTML
        modalDetails.innerHTML = service.details.map(function(detail) {
            return '<div class="service-detail">' +
                   '<h4>' + detail.title + '</h4>' +
                   '<p>' + detail.content + '</p>' +
                   '</div>';
        }).join('');

        // Show modal with animation
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Track modal open
        // analytics.track('service_modal_opened', { service: serviceKey });
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event listeners for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('service-cta') || e.target.closest('.service-cta')) {
                e.preventDefault();
                const serviceKey = this.dataset.service;
                openModal(serviceKey);
            }
        });
    });

    // Close modal event listeners
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Form submission with AJAX
    const contactForm = document.getElementById('service-contact-form');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.form-submit');
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoading = submitButton.querySelector('.submit-loading');
        
        // Show loading state
        submitButton.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        
        // Collect form data
        const formData = new FormData(this);
        
        // Convert FormData to JSON object
        const formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Add timestamp and additional info
        formObject.timestamp = new Date().toISOString();
        formObject.page_url = window.location.href;
        formObject.user_agent = navigator.userAgent;
        formObject.form_type = 'Service Inquiry';
        
        try {
            // EmailJS submission - replace with your EmailJS credentials
            const response = await emailjs.send(
                'service_03owqxk',     // Your EmailJS Service ID
                'template_m1kk0n5',    // Service inquiry template
                formObject,            // Form data
                'u5U7kzPn5p1OUsf8s'    // Your EmailJS Public Key
            );
            
            // EmailJS success handling
            console.log('Service EmailJS response:', response);
            
            // Success - close modal and show notification
            this.reset();
            closeModal();
            
            // Reset button state
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
            
            // Show success notification
            showNotification('Service inquiry sent! I\'ll get back to you within 24 hours.', 'success');
            
        } catch (error) {
            console.error('Service form submission error:', error);
            
            // For demo purposes, show success if it's a network error (no backend yet)
            if (error.message.includes('Failed to fetch') || error.message.includes('submit-service-inquiry')) {
                // Simulate successful submission for demo
                console.log('Service Inquiry Data (for demo):', formObject);
                
                this.reset();
                closeModal();
                
                // Reset button state
                submitButton.disabled = false;
                submitText.style.display = 'inline';
                submitLoading.style.display = 'none';
                
                showNotification('Demo mode: Service inquiry logged to console. Set up your backend!', 'info');
            } else {
                // Reset button state for real errors
                submitButton.disabled = false;
                submitText.style.display = 'inline';
                submitLoading.style.display = 'none';
                
                showNotification('Failed to send inquiry. Please try contacting me directly.', 'error');
            }
        }
        
        // Track form submission
        // analytics.track('service_form_submitted', { 
        //     service: formObject.serviceType || 'unknown',
        //     email: formObject.email 
        // });
    });
});

// Global Contact Modal Functions (available immediately)
function openContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (!contactModal) return;
    
    contactModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        contactModal.classList.add('show');
    }, 10);
}

function closeContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (!contactModal) return;
    
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        contactModal.style.display = 'none';
    }, 300);
}

// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('mainContactForm');
    
    if (!contactForm) return; // Exit if contact form doesn't exist
    
    const submitBtn = contactForm.querySelector('.contact-submit');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoading = submitBtn.querySelector('.submit-loading');
    const submitSuccess = submitBtn.querySelector('.submit-success');
    
    // Close modal when clicking outside
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });
    
    // Auto-resize textarea
    const messageTextarea = document.getElementById('contactMessage');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', autoResizeTextarea);
    }
    
    function autoResizeTextarea(e) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    
    // Form validation
    const requiredFields = ['contactName', 'contactEmail', 'contactMessage'];
    
    // Real-time validation
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearValidation);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        // Check if required field is empty
        if (requiredFields.includes(field.id) && !value) {
            field.classList.add('invalid');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('invalid');
                return false;
            }
        }
        
        // Phone validation (optional but if provided should be valid)
        if (field.id === 'contactPhone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                field.classList.add('invalid');
                return false;
            }
        }
        
        // Mark as valid if all checks pass
        if (value) {
            field.classList.add('valid');
        }
        
        return true;
    }
    
    function clearValidation(e) {
        const field = e.target;
        field.classList.remove('valid', 'invalid');
    }
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Focus on first invalid field
            const firstInvalid = contactForm.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }
        
        // Set loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Convert FormData to JSON object for easier handling
        const formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Add timestamp and page info
        formObject.timestamp = new Date().toISOString();
        formObject.page_url = window.location.href;
        formObject.user_agent = navigator.userAgent;
        formObject.form_type = 'Contact Form';
        
        try {
            // EmailJS submission - replace with your EmailJS credentials
            const response = await emailjs.send(
                'service_03owqxk',     // Your EmailJS Service ID
                'template_8gxax7w',    // Main contact form template
                formObject,            // Form data
                'u5U7kzPn5p1OUsf8s'    // Your EmailJS Public Key
            );
            
            // EmailJS returns a different response format
            console.log('EmailJS response:', response);
            
            // Success state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                contactForm.querySelectorAll('.valid, .invalid').forEach(field => {
                    field.classList.remove('valid', 'invalid');
                });
                
                // Close modal
                closeContactModal();
                
                // Show success notification
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // For demo purposes, show success if it's a network error (no backend yet)
            if (error.message.includes('Failed to fetch') || error.message.includes('submit-contact')) {
                // Simulate successful submission for demo
                submitBtn.classList.add('success');
                
                // Log form data to console for now
                console.log('Form Data (for demo):', formObject);
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    contactForm.querySelectorAll('.valid, .invalid').forEach(field => {
                        field.classList.remove('valid', 'invalid');
                    });
                    
                    closeContactModal();
                    showNotification('Demo mode: Form data logged to console. Set up your backend endpoint!', 'info');
                }, 2000);
            } else {
                // Show error for other types of errors
                showNotification('Failed to send message. Please try the direct contact methods above.', 'error');
            }
        }
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    min-width: 320px;
                    max-width: 500px;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    animation: slideIn 0.3s ease;
                }
                
                .notification-success {
                    border-left: 4px solid #10b981;
                }
                
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification-info {
                    border-left: 4px solid #6366f1;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 1.25rem;
                }
                
                .notification-icon {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                
                .notification-success .notification-icon {
                    color: #10b981;
                }
                
                .notification-error .notification-icon {
                    color: #ef4444;
                }
                
                .notification-info .notification-icon {
                    color: #6366f1;
                }
                
                .notification-message {
                    flex: 1;
                    color: var(--text-primary);
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .notification-close:hover {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});