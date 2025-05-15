import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const founderRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [statValues, setStatValues] = useState({
    players: 0,
    team: 0,
    success: 0,
    centers: 0
  });
  const heroRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    // Initialize stats with final values if the section is already visible on page load
    if (statsRef.current) {
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setStatsVisible(true);
        setStatValues({
          players: 200000,
          team: 14,
          success: 65,
          centers: 5
        });
      }
    }
    
    const handleScroll = () => {
      // Check if stats section is visible
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !statsVisible) {
          setStatsVisible(true);
          
          // Immediately set non-zero values
          setStatValues({
            players: 1,
            team: 1,
            success: 1,
            centers: 1
          });
          
          // Animate stat values
          const duration = 2000; // 2 seconds
          const interval = 20; // update every 20ms
          const steps = duration / interval;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setStatValues({
              players: Math.floor(progress * 200000),
              team: Math.floor(progress * 14),
              success: Math.floor(progress * 65),
              centers: Math.floor(progress * 5)
            });
            
            if (step >= steps) {
              clearInterval(timer);
              setStatValues({
                players: 200000,
                team: 14,
                success: 65,
                centers: 5
              });
            }
          }, interval);
        }
      }
    };

    // Initial check on component mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsVisible]);

  // Handle tab changes and scrolling
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    let ref;
    switch(tab) {
      case 'mission':
        ref = missionRef;
        break;
      case 'story':
        ref = storyRef;
        break;
      case 'founder':
        ref = founderRef;
        break;
      case 'team':
        ref = teamRef;
        break;
      default:
        ref = missionRef;
    }
    
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Create ripple effect on button click
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };

  return (
    <div className="about-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero-content">
          <h1 className="about-title">About <span className="text-neon">PFT</span></h1>
          <h2 className="about-subtitle">Your Path to Pro Football</h2>
          <p className="about-description">
            PFT delivers affordable training and digital exposure for talented young players aged 12-21
            through structured programs, digital tools, and location-based training zones across Egypt.
          </p>
        </div>
        <div className="scroll-indicator" onClick={() => missionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <div className="mouse"></div>
          <span className="text">Scroll</span>
        </div>
        <div className="hero-particles">
          {Array(60).fill().map((_, i) => {
            // Distribute particles more at the bottom
            const randomY = Math.random() * 100;
            const size = (Math.random() * 2) + 1; // Random size between 1-3px
            
            return (
              <div 
                key={i} 
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${100 - (randomY * 0.8)}%`,  // More concentrated at bottom
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: size > 2 ? 0.8 : 0.5,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                  animationName: 'particle-float',
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-out'
                }}
              />
            );
          })}
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <div className="about-tabs">
        <button 
          className={`about-tab ${activeTab === 'mission' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleTabClick('mission');
          }}
        >
          Mission & Vision
        </button>
        <button 
          className={`about-tab ${activeTab === 'story' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleTabClick('story');
          }}
        >
          Our Story
        </button>
        <button 
          className={`about-tab ${activeTab === 'founder' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleTabClick('founder');
          }}
        >
          From the Founder
        </button>
        <button 
          className={`about-tab ${activeTab === 'team' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleTabClick('team');
          }}
        >
          Our Team
        </button>
      </div>
      
      {/* Content Sections */}
      <div className="about-content">
        {/* Mission & Vision */}
        <section 
          ref={missionRef}
          className={`about-section ${activeTab === 'mission' ? 'active' : ''}`}
        >
          <h2>Mission & Vision</h2>
          <div className="mission-container">
            <div className="mission-box">
              <div className="mission-icon">
                <span className="icon-lightbulb">★</span>
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide affordable training programs (Levels 1–5) for players aged 12–21, combining 
                quality coaching with digital tools that showcase talented players to scouts through 
                videos, stats, and digital CVs.
              </p>
            </div>
            
            <div className="mission-box">
              <div className="mission-icon">
                <span className="icon-eye">👁️</span>
              </div>
              <h3>Our Vision</h3>
              <p>
                A football ecosystem where every talented young player has access to affordable, 
                professional-level training and genuine exposure opportunities through our platform 
                across Egypt and beyond.
              </p>
            </div>
            
            <div className="mission-box">
              <div className="mission-icon">
                <span className="icon-trophy">🏆</span>
              </div>
              <h3>Our Values</h3>
              <ul className="values-list">
                <li><span>Accessibility:</span> Quality training at EGP 650/month (65-83% savings)</li>
                <li><span>Excellence:</span> Structured training with professional coaches</li>
                <li><span>Opportunity:</span> Pathways to club discovery and scouting</li>
                <li><span>Innovation:</span> Tech-enabled training and exposure</li>
                <li><span>Community:</span> Supportive ecosystem for young footballers</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section 
          ref={storyRef}
          className={`about-section ${activeTab === 'story' ? 'active' : ''}`}
        >
          <h2>Our Story</h2>
          <div className="story-container">
            <p>
              PFT addresses two key challenges in Egyptian football: expensive training (EGP 2,000-4,000 monthly) 
              and limited exposure channels for talented players to reach scouts and clubs.
            </p>
            
            <div className="story-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2021</div>
                <div className="timeline-content">
                  <h3>The Idea Takes Shape</h3>
                  <p>
                    Adham Ashraf and team conceptualize PFT as a solution to high training costs and 
                    limited exposure opportunities.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2024</div>
                <div className="timeline-content">
                  <h3>Development Phase</h3>
                  <p>
                    Development begins on the PFT website, app, and structured training programs 
                    with location-based features.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Q3 2025</div>
                <div className="timeline-content">
                  <h3>Official Launch</h3>
                  <p>
                    Launch of PFT with Levels 1-5 programs, player marketing features, 
                    and training zones across Cairo.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2026</div>
                <div className="timeline-content">
                  <h3>PFT Girls</h3>
                  <p>
                    Expansion to include structured training and exposure for female footballers 
                    aged 12-21.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2027-2028</div>
                <div className="timeline-content">
                  <h3>Further Expansion</h3>
                  <p>
                    Planned growth with PFT Kids for under-12s and expansion to North Africa 
                    with AI-powered training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* From the Founder */}
        <section 
          ref={founderRef}
          className={`about-section ${activeTab === 'founder' ? 'active' : ''}`}
        >
          <h2>From the Founder</h2>
          <div className="founder-container">
            <div className="founder-image">
              <img src="https://placehold.co/400x500/121212/39ff14?text=Adham+Ashraf" alt="Adham Ashraf - Founder" />
            </div>
            
            <div className="founder-message">
              <h3>A Message from Adham Ashraf</h3>
              <h4>Founder & Director</h4>
              
              <div className="founder-quote">
                <p>
                  "Growing up in Egypt, I saw incredible football talent hindered by expensive training 
                  (EGP 2,000-4,000 monthly) and lack of exposure to scouts and clubs.
                </p>
                <p>
                  PFT offers affordable training (EGP 650/month) with 5 structured levels for ages 12-21, 
                  each focusing on age-appropriate skills from basic techniques to advanced tactics.
                </p>
                <p>
                  We go beyond training by helping players market themselves through videos, stats, 
                  and digital CVs, while making training accessible via our location-based system.
                </p>
                <p>
                  With my team—Mazen, Marwan, and Omar—we're democratizing football opportunities 
                  in Egypt with plans to expand to girls' programs and across North Africa. 
                  Join us in ensuring talent has a path to success regardless of finances."
                </p>
                <div className="founder-signature">Adham Ashraf</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section 
          ref={teamRef}
          className={`about-section ${activeTab === 'team' ? 'active' : ''}`}
        >
          <h2>Our Team</h2>
          <div className="team-container">
            <p className="team-intro">
              Our team combines expertise in football coaching, technology, design, and business 
              to create an integrated player development platform.
            </p>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">
                  <img src="/WhatsApp Image 2025-05-14 at 23.13.19_83853c0a.jpg" alt="Adham" />
                </div>
                <h4>Adham</h4>
                <h5>Founder & Director</h5>
                <p>Visionary with expertise in football development and sports management.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <img src="WhatsApp Image 2025-05-15 at 08.43.59_241b4598.jpg" alt="Mazen" />
                </div>
                <h4>Mazen</h4>
                <h5>Developer, Designer, and Researcher</h5>
                <p>Leads technical development, design, and research for PFT.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <img src="/WhatsApp Image 2025-05-14 at 23.38.00_9c5da482.jpg" alt="Marwan" />
                </div>
                <h4>Marwan</h4>
                <h5>Helper & Co-founder</h5>
                <p>Assists with platform development and partnership maintenance.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <img src="/WhatsApp Image 2025-05-14 at 21.32.21_dd8dd64a.jpg" alt="Omar" />
                </div>
                <h4>Omar</h4>
                <h5>Co-founder</h5>
                <p>Supports strategic vision and ecosystem development.</p>
              </div>
            </div>
            
            <div className="team-breakdown">
              <h3>Our Growing Team</h3>
              <div className="team-breakdown-grid">
                <div className="team-category">
                  <div className="category-icon"><span className="icon-people">👥</span></div>
                  <h4>5 Coaches</h4>
                  <p>Developing structured training programs for all levels</p>
                </div>
                
                <div className="team-category">
                  <div className="category-icon"><span className="icon-education">🎓</span></div>
                  <h4>3 Sales Members</h4>
                  <p>Building partnerships with clubs and sponsors</p>
                </div>
                
                <div className="team-category">
                  <div className="category-icon"><span className="icon-football">⚽</span></div>
                  <h4>4 Programmers</h4>
                  <p>Creating our app and website with location features</p>
                </div>
                
                <div className="team-category">
                  <div className="category-icon"><span className="icon-globe">🌐</span></div>
                  <h4>2 Designers</h4>
                  <p>Crafting our UI with matt black and neon green theme</p>
                </div>
              </div>
            </div>
            
            <div className="team-cta">
              <h3>Join Our Team</h3>
              <p>We're expanding to 20 trainers by launch across Cairo's zones.</p>
              <Link to="/careers" className="btn btn-primary">View Opportunities</Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* Stats Section */}
      <div className="about-stats" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item">
            <div className={`stat-number count-up ${statsVisible ? 'active' : ''}`}>
              {statValues.players > 0 ? statValues.players.toLocaleString() : '90,000'}+
            </div>
            <div className="stat-label">Target Market</div>
          </div>
          
          <div className="stat-item">
            <div className={`stat-number count-up ${statsVisible ? 'active' : ''}`}>
              {statValues.success > 0 ? statValues.success : '65'}%
            </div>
            <div className="stat-label">Cost Savings</div>
          </div>
          
          <div className="stat-item">
            <div className={`stat-number count-up ${statsVisible ? 'active' : ''}`}>
              {statValues.team > 0 ? statValues.team : '14'}
            </div>
            <div className="stat-label">Team Members</div>
          </div>
          
          <div className="stat-item">
            <div className={`stat-number count-up ${statsVisible ? 'active' : ''}`}>
              {statValues.centers > 0 ? statValues.centers : '5'}
            </div>
            <div className="stat-label">Training Levels</div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 