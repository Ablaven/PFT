import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Landing.css';

const Landing = () => {
  console.log('Landing component rendering'); // Debug log
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const programsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const swiperRef = useRef(null);
  
  // Function to check if element is in viewport
  const isInViewport = (element, offset = 150) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0
    );
  };

  // Handle animations based on scroll position - simplified to only handle section animations
  const handleScrollAnimations = () => {
    // Check if sections are in viewport and add animation classes
    [featuresRef, programsRef, testimonialsRef, ctaRef].forEach(ref => {
      if (ref.current && isInViewport(ref.current)) {
        ref.current.classList.add('in-viewport');
      }
    });
  };
  
  // Handle mouse move for 3D effect on hero section
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    
    try {
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const heroTitle = heroRef.current.querySelector('.hero-title');
      if (heroTitle) {
        // Reduce the intensity of the effect
        heroTitle.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 20px) rotateX(${y * 5}deg) rotateY(${-x * 5}deg)`;
      }
    } catch (error) {
      console.error("Error in mouse move handler:", error);
    }
  };

  useEffect(() => {
    console.log('Landing useEffect running'); // Debug log
    try {
      // Trigger initial animations after component mounts
      setTimeout(() => {
        console.log('Setting animation loaded to true'); // Debug log
        setAnimationLoaded(true);
      }, 300); // Increased delay for better reliability

      // Add scroll and mouse move event listeners
      window.addEventListener('scroll', handleScrollAnimations);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Initial check for elements in viewport
      handleScrollAnimations();

      // Create static particles in the hero section only - but with fewer particles
      if (heroRef.current) {
        console.log('Creating particles'); // Debug log
        const heroSection = heroRef.current;
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        
        // Reduce number of particles to improve performance
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle static-particle';
          
          // Randomly set blue or green color
          if (Math.random() > 0.5) {
            particle.style.backgroundColor = 'var(--color-greenish-blue)';
          }
          
          particle.style.width = `${Math.random() * 8 + 2}px`;
          particle.style.height = particle.style.width;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.animationDelay = `${Math.random() * 5}s`;
          particleContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particleContainer);
      }

      // Force apply in-viewport class to all sections for initial state
      setTimeout(() => {
        console.log('Forcing in-viewport classes'); // Debug log
        [featuresRef, programsRef, testimonialsRef, ctaRef].forEach(ref => {
          if (ref.current) {
            ref.current.classList.add('in-viewport');
          }
        });
      }, 500);

      // Initialize Swiper for the programs slider
      setTimeout(() => {
        try {
          console.log('Initializing Swiper'); // Debug log
          
          if (typeof window.Swiper !== 'undefined') {
            swiperRef.current = new window.Swiper('.programs-swiper', {
              effect: 'coverflow',
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: 'auto',
              initialSlide: 1, // Start with the second slide (index 1)
              speed: 700, // Transition speed in ms
              coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                // Disable autoplay to prevent random order changes
                enabled: false
              },
              loop: false, // Disable loop to maintain program order
              keyboard: {
                enabled: true,
                onlyInViewport: true,
              },
              mousewheel: {
                invert: false,
              },
              // Ensure programs appear in sequential order
              on: {
                init: function() {
                  console.log('Swiper initialized in sequential order');
                }
              }
            });
          }
        } catch (error) {
          console.error("Error initializing Swiper:", error);
        }
      }, 1500);

      // Clean up
      return () => {
        window.removeEventListener('scroll', handleScrollAnimations);
        window.removeEventListener('mousemove', handleMouseMove);
        
        // Clean up all particles when component unmounts
        const containers = document.querySelectorAll('.particle-container');
        containers.forEach(container => {
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        });
        
        // Clean up any transform styles on hero title
        const heroTitles = document.querySelectorAll('.hero-title');
        heroTitles.forEach(title => {
          title.style.transform = '';
        });
        
        // Reset any animation classes
        const animationElements = document.querySelectorAll('.in-viewport');
        animationElements.forEach(el => {
          el.classList.remove('in-viewport');
        });
        
        // Destroy Swiper instance to prevent memory leaks
        if (swiperRef.current) {
          try {
            swiperRef.current.destroy(true, true);
            swiperRef.current = null;
          } catch (e) {
            console.error('Error destroying Swiper:', e);
          }
        }
        
        // Reset body styles
        document.body.style.overflow = '';
        
        // Force scroll to top
        window.scrollTo(0, 0);
      };
    } catch (error) {
      console.error("Error in Landing component useEffect:", error);
    }
  }, []);

  // Text reveal animation component
  const AnimatedText = ({ text, className, delay = 0 }) => {
    return (
      <span className={`animated-text ${className || ''}`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="animated-char"
            style={{ animationDelay: `${delay + index * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="landing-container">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div 
          className={`hero-content ${animationLoaded ? 'animate-fade-in' : ''}`}
        >
          <h1 className="hero-title">
            <AnimatedText
              text="PATH TO"
              className="text-white"
              delay={0.3}
            />
            <br />
            <span className="nowrap">
              <AnimatedText
                text="FOOTBALL TRAINING"
                className="text-neon"
                delay={0.8}
              />
            </span>
          </h1>
          <h2 className="hero-subtitle">
            <AnimatedText
              text="Level up your football skills and get noticed"
              delay={1.5}
            />
          </h2>
          <p className="hero-description">
            Affordable training programs with human trainers for players aged 12-21.
            Showcase your talent to scouts and clubs through our platform.
          </p>
          <div className="hero-cta-buttons">
            <Link to="/register" className="btn btn-primary animate-pulse">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          {/* Hero image placeholder */}
          <div className="hero-image-placeholder">
            <img 
              src="https://via.placeholder.com/1200x800?text=Football+Training+Hero+Image" 
              alt="Football player in action" 
              className="hero-placeholder-img"
            />
          </div>
          {/* Static particles will be added via JavaScript */}
        </div>
        
        <div className="scroll-indicator animate-bounce">
          <span>Scroll</span>
          <i className="bi bi-chevron-down"></i>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section">
        <h2 className="section-title">
          What Makes Us <span className="text-neon">Unique</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon">
              <i className="bi bi-layers-fill"></i>
            </div>
            <h3>Leveled Training</h3>
            <p>5 structured levels for systematic skill development</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon">
              <i className="bi bi-camera-video-fill"></i>
            </div>
            <h3>Video Showcase</h3>
            <p>Highlight your talent to scouts and clubs</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon">
              <i className="bi bi-bar-chart-fill"></i>
            </div>
            <h3>Stats Tracking</h3>
            <p>Measure progress with data-driven metrics</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div className="feature-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <h3>Location-Based</h3>
            <p>Find training zones near you</p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="programs-section">
        <div className="programs-overlay"></div>
        <h2 className="section-title">
          Training <span className="text-neon">Programs</span>
        </h2>
        <div className="swiper programs-swiper">
          <div className="swiper-wrapper">
            {/* Fixed program order to ensure sequential display */}
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="swiper-slide" data-level={level}>
                <div className={`program-card level-${level}`}>
                  <div className="program-header">
                    <div className="program-level-badge">LEVEL {level}</div>
                    <h3>Level {level}</h3>
                    <span className="program-age">
                      {level === 1 ? 'Ages 12-14' : 
                       level === 2 ? 'Ages 14-16' : 
                       level === 3 ? 'Ages 16-18' : 
                       level === 4 ? 'Ages 18-20' : 'Ages 20-21'}
                    </span>
                  </div>
                  <div className="program-summary">
                    <p>
                      {level === 1 ? 'Basic football skills for beginners (12-14): ball control, passing, shooting, and introduction to dribbling.' : 
                       level === 2 ? 'Enhanced skills and game awareness (14-16): positioning, advanced passing, and tactical development.' : 
                       level === 3 ? 'Position specialization (16-18): role-specific techniques, personalized drills, and tactical awareness.' : 
                       level === 4 ? 'Advanced specialization (18-20): competitive conditioning, leadership skills, and professional tactics.' : 
                       'Elite performance prep (20-21): pro-level tactical training, injury prevention, and scout trials.'}
                    </p>
                  </div>
                  <div className="program-content">
                    <div className="program-price">
                      <span className="price-value">EGP 650</span>
                      <span className="price-period">/month</span>
                    </div>
                  </div>
                  <Link to="/register" className="program-cta">Join Now</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="testimonials-section">
        <div className="testimonials-overlay"></div>
        <h2 className="section-title">
          Player <span className="text-neon">Success Stories</span>
        </h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-badge">PRO PLAYER</div>
            <div className="testimonial-avatar">
              <img src="/177620.jpg" alt="Ahmed" className="testimonial-img" />
            </div>
            <div className="testimonial-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <blockquote>
              "PFT helped me improve my skills and get noticed by scouts. Now I'm playing for a club I always dreamed of!"
            </blockquote>
            <div className="testimonial-meta">
              <cite>Ahmed, 19</cite>
              <span className="testimonial-location">Cairo FC</span>
            </div>
            <div className="testimonial-footer">
              <span className="testimonial-stat">Joined PFT: 2023</span>
              <span className="testimonial-icon"><i className="bi bi-trophy-fill"></i></span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-badge">ACADEMY PLAYER</div>
            <div className="testimonial-avatar">
              <img src="/41_2023-638329780756760865-676.jpg" alt="Mohamed" className="testimonial-img" />
            </div>
            <div className="testimonial-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
            </div>
            <blockquote>
              "The structured training programs helped me develop step by step. I've improved more in 6 months than in 2 years."
            </blockquote>
            <div className="testimonial-meta">
              <cite>Mohamed, 16</cite>
              <span className="testimonial-location">Alexandria Academy</span>
            </div>
            <div className="testimonial-footer">
              <span className="testimonial-stat">Joined PFT: 2022</span>
              <span className="testimonial-icon"><i className="bi bi-graph-up-arrow"></i></span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-badge">SCHOLARSHIP WINNER</div>
            <div className="testimonial-avatar">
              <img src="download.jpg" alt="Omar" className="testimonial-img" />
            </div>
            <div className="testimonial-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <blockquote>
              "I love how I can showcase my skills to scouts through the platform. The video analysis feature helped improve my technique."
            </blockquote>
            <div className="testimonial-meta">
              <cite>Omar, 17</cite>
              <span className="testimonial-location">Giza United</span>
            </div>
            <div className="testimonial-footer">
              <span className="testimonial-stat">Joined PFT: 2023</span>
              <span className="testimonial-icon"><i className="bi bi-award-fill"></i></span>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section ref={ctaRef} className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to <span className="text-neon animate-pulse">Level Up</span> Your Game?
          </h2>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large animate-pulse">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing; 