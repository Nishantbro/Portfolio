// Typewriter Class
class TypeWriter {
    constructor(element, words, waitTime = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.waitTime = waitTime;
        this.isDeleting = false;
        this.type();
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        const fullWord = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullWord.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullWord.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial typing speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // Check if word is complete
        if (!this.isDeleting && this.txt === fullWord) {
            // Pause at end
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animation Function
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-in');
        } else {
            element.classList.remove('animate-in');
        }
    });
}

// Scroll Progress Indicator
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Scroll to Top Button
function createScrollTopButton() {
    const scrollUpButton = document.createElement('button');
    scrollUpButton.id = 'scroll-up';
    scrollUpButton.innerHTML = '↑';
    document.body.appendChild(scrollUpButton);

    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollUpButton.style.display = 'block';
            scrollUpButton.classList.add('show');
        } else {
            scrollUpButton.classList.remove('show');
        }
    });
}

// Active Navigation Indicator
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize Everything When DOM is Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter
    const typeWriter = new TypeWriter(
        document.querySelector('.highlight'),
        ['Programming', 'Developing', 'Creating', 'Building', 'Innovating'],
        2000
    );

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Create scroll progress bar
    createScrollProgressBar();

    // Create scroll to top button
    createScrollTopButton();

    // Initialize active navigation
    updateActiveNavigation();

    // Initialize lazy loading
    initLazyLoading();

    // Optional: Add a loading animation
    document.body.classList.add('loaded');
});

// Handle Resize Events
window.addEventListener('resize', () => {
    animateOnScroll();
});

// Optional: Add Dark Mode Toggle
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.innerHTML = '🌓';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode toggle
createDarkModeToggle();

// more effect//

// Parallax Effect for Background
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            section.style.backgroundPosition = `center ${rate}px`;
        });
    });
}

// Skill Progress Animation
class SkillProgressAnimation {
    constructor() {
        this.skills = document.querySelectorAll('#skills li');
        this.init();
    }

    init() {
        this.skills.forEach(skill => {
            // Add progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'skill-progress';
            progressBar.style.width = '0%';
            skill.appendChild(progressBar);

            // Random progress value between 75-95 for demo
            const progress = Math.floor(Math.random() * (95 - 75 + 1)) + 75;
            
            // Animate when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        progressBar.style.width = `${progress}%`;
                        progressBar.style.transition = 'width 1s ease-in-out';
                    }
                });
            });

            observer.observe(skill);
        });
    }
}

// Project Cards Hover Effect
function initProjectCards() {
    const projects = document.querySelectorAll('.project-box');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', (e) => {
            const details = project.querySelector('.project-details');
            details.style.transform = 'translateY(-10px)';
            details.style.transition = 'transform 0.3s ease';
            
            // Add floating effect
            project.style.transform = 'translateY(-5px)';
            project.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            project.style.transition = 'all 0.3s ease';
        });

        project.addEventListener('mouseleave', (e) => {
            const details = project.querySelector('.project-details');
            details.style.transform = 'translateY(0)';
            
            project.style.transform = 'translateY(0)';
            project.style.boxShadow = 'none';
        });
    });
}

// Interactive Navigation Menu
class InteractiveNav {
    constructor() {
        this.nav = document.querySelector('nav');
        this.init();
    }

    init() {
        // Add hover effect
        const navItems = this.nav.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', this.createRipple.bind(this));
            item.addEventListener('mouseleave', this.removeRipple.bind(this));
        });

        // Shrink nav on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                this.nav.style.transform = 'translateY(-100%)';
            } else {
                this.nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    createRipple(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('nav-ripple');
        e.target.appendChild(ripple);
        
        const rect = e.target.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
    }

    removeRipple(e) {
        const ripple = e.target.querySelector('.nav-ripple');
        if (ripple) ripple.remove();
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        document.body.prepend(this.canvas);
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Previous initializations...
    
    // Initialize new features
    initParallaxEffect();
    new SkillProgressAnimation();
    initProjectCards();
    new InteractiveNav();
    new ParticleBackground();
    
    // Add custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});
// Certificate Cards Animation Class
class CertificateCardsAnimation {
    constructor() {
        this.certificates = document.querySelectorAll('.certificate-box');
        this.init();
    }

    init() {
        this.certificates.forEach(certificate => {
            // Add hover effects
            certificate.addEventListener('mouseenter', (e) => {
                const details = certificate.querySelector('.certificate-details');
                const image = certificate.querySelector('.certificate-image');
                
                // Animate details
                details.style.transform = 'translateY(-10px)';
                details.style.transition = 'all 0.3s ease';
                
                // Animate image
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'all 0.3s ease';
                
                // Add glow effect
                certificate.style.boxShadow = '0 10px 20px rgba(0,180,219,0.2)';
                certificate.style.transform = 'translateY(-5px)';
                certificate.style.transition = 'all 0.3s ease';
            });

            certificate.addEventListener('mouseleave', (e) => {
                const details = certificate.querySelector('.certificate-details');
                const image = certificate.querySelector('.certificate-image');
                
                // Reset animations
                details.style.transform = 'translateY(0)';
                image.style.transform = 'scale(1)';
                certificate.style.boxShadow = 'none';
                certificate.style.transform = 'translateY(0)';
            });

            // Add click to expand functionality
            certificate.addEventListener('click', () => this.expandCertificate(certificate));
        });
    }

    expandCertificate(certificate) {
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'certificate-modal-content';
        
        // Clone the certificate content
        const contentClone = certificate.cloneNode(true);
        modalContent.appendChild(contentClone);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'modal-close';
        modalContent.appendChild(closeBtn);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Animation
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close modal functionality
        closeBtn.onclick = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };
        
        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        };
    }
}

// Certificate Progress Bar
class CertificateProgress {
    constructor() {
        this.certificates = document.querySelectorAll('.certificate-box');
        this.addProgressBars();
    }

    addProgressBars() {
        this.certificates.forEach(cert => {
            const progressBar = document.createElement('div');
            progressBar.className = 'certificate-progress';
            
            const progress = document.createElement('div');
            progress.className = 'progress-fill';
            
            // Random progress for demo (replace with actual progress data)
            const progressValue = Math.floor(Math.random() * (100 - 70) + 70);
            progress.style.width = '0%';
            
            progressBar.appendChild(progress);
            cert.appendChild(progressBar);
            
            // Animate progress when certificate is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        progress.style.width = `${progressValue}%`;
                        progress.style.transition = 'width 1s ease-in-out';
                    }
                });
            });
            
            observer.observe(cert);
        });
    }
}

// Initialize certificate features
document.addEventListener('DOMContentLoaded', () => {
    new CertificateCardsAnimation();
    new CertificateProgress();
});

// skill section//

// Skills Animation and Interactivity Class
class SkillsAnimation {
    constructor() {
        this.skillItems = document.querySelectorAll('#skills li');
        this.init();
    }

    init() {
        this.addProgressBars();
        this.addHoverEffects();
        this.initializeIntersectionObserver();
    }

    addProgressBars() {

        const skillProficiencies = {
            'HTML': 95,
            'CSS': 95,
            'JavaScript': 80,
            'Python': 75,
            'SQL': 80,
            'Git': 70,
            'GitHub': 75,
            'Node.js': 80,
            'React': 85,
            'Figma': 70,
            'Photoshop': 90,
            'Blender': 60
        };
        this.skillItems.forEach(skill => {
            // Create progress bar container
            const skillName = skill.textContent.trim();
            const progressBar = document.createElement('div');
            progressBar.className = 'skill-progress-bar';
            
            // Create progress fill element
            const progressFill = document.createElement('div');
            progressFill.className = 'skill-progress-fill';
            
            // Get skill proficiency from data attribute or set a default
            const proficiency = skill.getAttribute('data-proficiency') || 
                Math.floor(Math.random() * (95 - 75) + 75); // Random value between 75-95 for demo
            
            // Create percentage text
            const percentageText = document.createElement('span');
            percentageText.className = 'skill-percentage';
            percentageText.textContent = `${proficiency}%`;
            
            // Append elements
            progressBar.appendChild(progressFill);
            skill.appendChild(progressBar);
            skill.appendChild(percentageText);
            
            // Store the target width for animation
            progressFill.setAttribute('data-width', `${proficiency}%`);
            progressFill.style.width = '0';
        });
    }

    addHoverEffects() {
        this.skillItems.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                // Scale up effect
                skill.style.transform = 'scale(1.05)';
                skill.style.transition = 'all 0.3s ease';
                
                // Add glow effect
                skill.style.boxShadow = '0 5px 15px rgba(0,180,219,0.3)';
                
                // Animate skill icon
                const icon = skill.querySelector('img');
                if (icon) {
                    icon.style.transform = 'rotate(360deg)';
                    icon.style.transition = 'transform 0.8s ease';
                }
            });

            skill.addEventListener('mouseleave', () => {
                // Reset effects
                skill.style.transform = 'scale(1)';
                skill.style.boxShadow = 'none';
                
                const icon = skill.querySelector('img');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });

            // Add click effect for more information
            skill.addEventListener('click', () => this.showSkillDetails(skill));
        });
    }

    initializeIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target;
                    const progressFill = skill.querySelector('.skill-progress-fill');
                    const targetWidth = progressFill.getAttribute('data-width');
                    
                    // Animate progress bar
                    progressFill.style.width = targetWidth;
                    progressFill.style.transition = 'width 1s ease-in-out';
                    
                    // Add fade-in effect
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2
        });

        this.skillItems.forEach(skill => {
            // Set initial state
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            observer.observe(skill);
        });
    }

    showSkillDetails(skill) {
        // Create modal for skill details
        
        const modal = document.createElement('div');
        modal.className = 'skill-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'skill-modal-content';
        
        // Get skill name
        const skillName = skill.textContent.trim();
        
        // Skill details content
        const content = `
            <h3>${skillName}</h3>
            <div class="skill-details">
                <div class="skill-info">
                    <p><strong>Experience Level:</strong> ${this.getExperienceLevel(skill)}</p>
                    <p><strong>Last Used:</strong> Recently</p>
                    <p><strong>Projects:</strong> ${this.getRandomProjectCount()}</p>
                </div>
                <div class="skill-description">
                    ${this.getSkillDescription(skillName)}
                </div>
            </div>
            <button class="modal-close">×</button>
        `;
        
        modalContent.innerHTML = content;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add show class after a brief delay for animation
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.onclick = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };
        
        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        };
    }

    

    getExperienceLevel(skill) {
        const proficiency = parseInt(skill.querySelector('.skill-percentage').textContent);
        if (proficiency >= 90) return 'Expert';
        if (proficiency >= 80) return 'Advanced';
        if (proficiency >= 70) return 'Intermediate';
        return 'Beginner';
    }

    getRandomProjectCount() {
        return Math.floor(Math.random() * (15 - 5) + 5);
    }

    getSkillDescription(skillName) {
        // Add custom descriptions for each skill
        const descriptions = {
            'HTML': 'Proficient in writing semantic HTML5, creating accessible and SEO-friendly web structures.',
            'CSS': 'Expert in modern CSS3, including Flexbox, Grid, and animations.',
            'JavaScript': 'Strong knowledge of ES6+, async programming, and DOM manipulation.',
            'Python': 'Experience with data analysis, web scraping, and backend development.',
            'SQL': 'Skilled in database design, optimization, and complex queries.',
            'Git': 'Versed in version control, branching strategies, and collaborative development.',
            'GitHub': 'Experienced in project management, code review, and CI/CD workflows.',
            'Node.js': 'Proficient in building scalable backend services and REST APIs.',
            'React': 'Expert in component-based architecture and state management.',
            'Figma': 'Skilled in UI/UX design and prototype creation.',
            'Photoshop': 'Experience in image editing and graphic design.',
            'Blender': 'Knowledge of 3D modeling and animation.'
        };
        
        return descriptions[skillName] || 'Skilled in utilizing this technology for various projects and applications.';
    }
}

// Initialize skills animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsAnimation();
});

// about me // 

class AboutMeTextAnimation {
    constructor() {
        this.aboutContent = document.querySelector('.about-content p[about]');
        this.init();
    }

    init() {
        this.animateText();
    }

    animateText() {
        const originalText = this.aboutContent.textContent;
        this.aboutContent.innerHTML = ''; // Clear the existing text

        // Split text into spans for individual letter animation
        [...originalText].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            this.aboutContent.appendChild(span);

            // Use setTimeout to delay each letter's animation
            setTimeout(() => {
                span.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 70); // Adjust timing as needed
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AboutMeTextAnimation();

    // ... other initializations
});


// why me and contact section 


document.addEventListener('DOMContentLoaded', function() {
    const whyMeCard = document.querySelector('.why-me-card');
    const contactCard = document.querySelector('.contact-me-card');
    const video = whyMeCard ? whyMeCard.querySelector('video') : null;
    const contactLinks = contactCard ? contactCard.querySelectorAll('.contact-link') : [];

    // Video Effects
    if (whyMeCard && video) {
        video.classList.add('why-me-video'); // Add class for CSS effects
        video.muted = true; 
        video.setAttribute('playsinline', '');
        video.autoplay = true;
        video.loop = true;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(error => {
                        // Autoplay was prevented. Show a "Click to Play" button
                        const playButton = document.createElement('button');
                        playButton.textContent = 'Play Video';
                        playButton.style.position = 'absolute';
                        playButton.style.top = '50%';
                        playButton.style.left = '50%';
                        playButton.style.transform = 'translate(-50%, -50%)';
                        playButton.style.zIndex = '100';
                        playButton.style.background = 'rgba(0,0,0,0.5)';
                        playButton.style.color = 'white';
                        playButton.style.border = 'none';
                        playButton.style.padding = '10px 20px';
                        playButton.style.cursor = 'pointer';
                        playButton.addEventListener('click', () => {
                            video.play();
                            playButton.remove();
                        });
                        video.parentElement.appendChild(playButton);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(video);
    }

    // Contact Link Effects - Added tooltip
    if (contactCard && contactLinks.length > 0) {
        contactLinks.forEach(link => {
            const tooltip = document.createElement('div');
            tooltip.className = 'contact-tooltip';
            tooltip.textContent = link.querySelector('span').textContent;
            tooltip.style.opacity = '0';
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.transition = 'opacity 0.3s ease';
            tooltip.style.zIndex = '1000';
            tooltip.style.top = '-30px'; // Adjust based on where you want the tooltip
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            link.appendChild(tooltip);

            link.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                link.style.transform = 'translateX(-5px) scale(1.02)';
                link.style.transition = 'transform 0.3s ease';
            });

            link.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                link.style.transform = 'translateX(0) scale(1)';
            });
        });
    }

    // Scroll animations - Keep this if you like it
    function animateCardsOnScroll() {
        const windowHeight = window.innerHeight;

        if (whyMeCard) {
            const whyMeCardTop = whyMeCard.getBoundingClientRect().top;
            if (whyMeCardTop < windowHeight - 150) {
                whyMeCard.classList.add('fade-in-from-right');
            } else {
                whyMeCard.classList.remove('fade-in-from-right');
            }
        }

        if (contactCard) {
            const contactCardTop = contactCard.getBoundingClientRect().top;
            if (contactCardTop < windowHeight - 150) {
                contactCard.classList.add('fade-in-from-left');
            } else {
                contactCard.classList.remove('fade-in-from-left');
            }
        }
    }

    window.addEventListener('scroll', animateCardsOnScroll);
    animateCardsOnScroll(); // Initial check if they're already in view
});


document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('#whyMeVideo');
    const muteButton = document.querySelector('#muteToggle');

    // Ensure video starts muted
    video.muted = true;

    // Function to toggle mute
    function toggleMute() {
        if (video.muted) {
            video.muted = false;
            muteButton.textContent = 'Mute';
        } else {
            video.muted = true;
            muteButton.textContent = 'Unmute';
        }
    }

    // Add click event to the mute button
    muteButton.addEventListener('click', toggleMute);

    // If you want to mute/unmute on video click as well (optional)
    video.addEventListener('click', toggleMute);

    // Existing video Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(error => {
                    // Autoplay was prevented. 
                    muteButton.style.display = 'block'; // Show mute button if autoplay fails
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    observer.observe(video);
});


document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: [0] });

    document.querySelectorAll('.why-me-card, .contact-me-card').forEach(card => {
        observer.observe(card);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Add a slight bounce on scroll into view
                entry.target.style.animation = 'bounceIn 0.5s forwards';
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: [0] });

    document.querySelectorAll('.why-me-card, .contact-me-card').forEach(card => {
        observer.observe(card);
    });
});

// Simple bounce animation keyframes for 3D effect