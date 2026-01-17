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
                gradientMesh.style.transform = `translateY(calc(-50% + ${rate}px))`;
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
        modalDetails.innerHTML = service.details.map(detail => `
            <div class="service-detail">
                <h4>${detail.title}</h4>
                <p>${detail.content}</p>
            </div>
        `).join('');

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

    // Form submission (placeholder for Formspree integration)
    const contactForm = document.getElementById('service-contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.form-submit');
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoading = submitButton.querySelector('.submit-loading');
        
        // Show loading state
        submitButton.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        
        // Simulate form submission (replace with actual Formspree integration)
        setTimeout(() => {
            alert('Thank you for your interest! I\'ll get back to you within 24 hours.\n\nNote: This is a demo form. Formspree integration will be added when you get your API key.');
            
            // Reset form
            this.reset();
            closeModal();
            
            // Reset button state
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }, 2000);
        
        // Track form submission
        // analytics.track('service_form_submitted', { 
        //     service: serviceTypeInput.value,
        //     email: this.email.value 
        // });
    });
});