import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLocationDot, faTrophy, faUsers, faHandshake, faUtensils, faDumbbell, faListAlt } from '@fortawesome/free-solid-svg-icons';
import './Partners.css';

const Partners = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for animation control
  const heroRef = useRef(null);
  const partnersGridRef = useRef(null);

  // Partner clubs data
  const partnerClubs = [
    {
      id: 1,
      name: "Al-Ahly SC",
      logo: "/8ac74d0efc671bf60afcb9b080c6dd1e.jpg",
      website: "https://www.alahlyegypt.com/",
      description: "Africa's top club offering elite training facilities for PFT students in Cairo East.",
      location: "Cairo East Zone",
      established: 1907,
      achievements: "43 Egyptian Premier League titles, 10 CAF Champions League trophies"
    },
    {
      id: 2,
      name: "Wadi Degla FC",
      logo: "/28ef27bf7811b20c16832713b9844418.jpg",
      website: "https://wadidegla.com/",
      description: "Premier youth academy providing state-of-the-art training facilities in Cairo West.",
      location: "Cairo West Zone",
      established: 2002,
      achievements: "Renowned youth development system, multiple youth tournament championships"
    },
    {
      id: 3,
      name: "El Gouna FC",
      logo: "/117677.png",
      website: "https://elgounafc.com/",
      description: "Red Sea resort club offering premium training grounds and exposure opportunities.",
      location: "Red Sea Region",
      established: 2003,
      achievements: "Regular Egyptian Premier League participant, youth development focus"
    },
    {
      id: 4,
      name: "ENPPI SC",
      logo: "/images.jpg",
      website: "https://enppiclub.com/",
      description: "Technical development focused club providing expert coaching for PFT's programs.",
      location: "Cairo South Zone",
      established: 1985,
      achievements: "Egyptian Cup winner, known for developing national team players"
    },
    {
      id: 5,
      name: "Pyramids FC",
      logo: "/1de516ae1e464633ea3fb29176b60730.jpg",
      website: "https://pyramidsfc.com/",
      description: "Modern club with elite facilities and scouting opportunities for talented players.",
      location: "Giza Zone",
      established: 2008,
      achievements: "CAF Confederation Cup finalist, rapid rise in Egyptian football"
    },
    {
      id: 6,
      name: "Smouha SC",
      logo: "/download.png",
      website: "https://www.smouhaclub.com/",
      description: "Alexandria-based club providing opportunities in Egypt's second-largest city.",
      location: "Alexandria Region",
      established: 1949,
      achievements: "Egyptian Premier League runner-up, Egyptian Cup finalist"
    },
    {
      id: 7,
      name: "El Shams Club",
      logo: "/0fdb335c3dae2a2a1ec5caea62fe973f.jpg",
      website: "https://www.elshamssportsclub.com/",
      description: "Heliopolis sporting club with excellent youth development facilities.",
      location: "Cairo North Zone",
      established: 1961,
      achievements: "Multiple youth competition titles, community development focus"
    }
  ];

  // Premier partner data
  const premierPartner = {
    id: "premier-1",
    name: "Eat Well",
    logo: "/WhatsApp Image 2025-05-14 at 23.57.05_02505e51.jpg",
    website: "https://eatwell.eg",
    description: "A Cairo-based health-focused food service offering affordable, personalized nutrition for athletes. Features both an app and physical stores with meals at just EGP 40-50.",
    location: "Cairo, Egypt",
    established: 2023,
    achievements: "73% cheaper than competitors, expert nutritionist support",
    benefits: [
      {
        title: "Customized Athlete Meal Plans",
        description: "Personalized nutrition plans for athletes in training"
      },
      {
        title: "Affordable Performance Meals",
        description: "Quality meals at EGP 40-50 vs typical EGP 100-150"
      },
      {
        title: "Expert Nutritional Guidance",
        description: "Professional nutritionist support for optimal performance"
      }
    ]
  };

  // Function to check if element is in viewport
  const isInViewport = (element, offset = 150) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0
    );
  };

  // Handle animations based on scroll position
  const handleScrollAnimations = () => {
    if (partnersGridRef.current && isInViewport(partnersGridRef.current)) {
      partnersGridRef.current.classList.add('in-viewport');
    }
  };

  useEffect(() => {
    // Trigger initial animations after component mounts
    setTimeout(() => {
      // Animation initialization logic
    }, 300);

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check for elements in viewport
    handleScrollAnimations();

    // Force apply in-viewport class initially
    setTimeout(() => {
      if (partnersGridRef.current) {
        partnersGridRef.current.classList.add('in-viewport');
      }
    }, 500);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
      
      // Reset body styles that might have been modified
      document.body.style.overflow = '';
      
      // Clear any in-viewport classes that might persist
      const inViewportElements = document.querySelectorAll('.in-viewport');
      inViewportElements.forEach(element => {
        element.classList.remove('in-viewport');
      });
      
      // Clean up any added particles or animation elements
      const particleContainers = document.querySelectorAll('.particle-container');
      particleContainers.forEach(container => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
      
      // Force a layout recalculation to fix any persisting styles
      window.scrollTo(0, 0);
    };
  }, []);

  // Generate an array of particles for JSX rendering
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 2,
    color: Math.random() > 0.5 ? 'var(--color-greenish-blue)' : 'var(--color-neon-green)',
    delay: `${Math.random() * 5}s`
  }));

  return (
    <div className="partners-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="partners-hero" ref={heroRef}>
        <div className="particle-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle static-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDelay: particle.delay
              }}
            />
          ))}
        </div>
        <div className="partners-hero-content">
          <h1 className="partners-title">Our <span className="text-neon">Partners</span></h1>
          <h2 className="partners-subtitle">Elite Football Clubs Powering Your Development</h2>
          <p className="partners-description">
            Access Egypt's top football clubs with world-class facilities, expert coaching, and professional pathways.
          </p>
        </div>
      </section>
      
      {/* Partners Introduction */}
      <section className="partners-intro">
        <div className="container">
          <div className="section-header">
            <FontAwesomeIcon icon={faHandshake} className="section-icon" />
            <h2 className="section-title">Club <span className="text-neon">Partnerships</span></h2>
          </div>
          <p className="section-description">
            Our network spans Cairo and beyond, providing access to premier training facilities and genuine advancement opportunities.
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">7+</span>
              <span className="stat-label">Partner Clubs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Training Facilities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Professional Coaches</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7</span>
              <span className="stat-label">Coverage Zones</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Premier Partner Section */}
      <section className="premier-partner-section">
        <div className="container">
          <div className="section-header premier-header">
            <FontAwesomeIcon icon={faDumbbell} className="section-icon premier-icon" />
            <h2 className="section-title premier-title">Premier <span className="text-premier">Partner</span></h2>
            <p className="section-description">
              Our nutrition partner providing exceptional support to academy players.
            </p>
          </div>
          
          <div className="premier-partner-card">
            <div className="premier-partner-logo">
              <img src={premierPartner.logo} alt={`${premierPartner.name} logo`} />
            </div>
            <div className="premier-partner-content">
              <div className="premier-badge">Official Nutrition Partner</div>
              <h3 className="premier-partner-name">{premierPartner.name}</h3>
              <p className="premier-partner-description">{premierPartner.description}</p>
              
              {/* Video Canvas Container */}
              <div className="premier-partner-video-container">
                <div className="video-canvas">
                  <video 
                    controls 
                    className="partner-video"
                    src="/WhatsApp Video 2025-05-14 at 20.53.19_cc6d9f9c.mp4" 
                    poster="/eatwell-poster.jpg"
                    preload="metadata"
                    playsInline
                    loading="lazy"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-title">Eat Well: Healthy meals for every athlete</div>
                </div>
              </div>
              
              <div className="premier-benefits">
                {premierPartner.benefits.map((benefit, index) => (
                  <div key={index} className="premier-benefit-item">
                    <FontAwesomeIcon icon={index === 0 ? faListAlt : index === 1 ? faUtensils : faDumbbell} className="benefit-icon" />
                    <div>
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="premier-partner-details">
                <div className="partner-detail">
                  <FontAwesomeIcon icon={faLocationDot} className="detail-icon" />
                  <span>{premierPartner.location}</span>
                </div>
                <div className="partner-detail">
                  <FontAwesomeIcon icon={faTrophy} className="detail-icon" />
                  <span>{premierPartner.achievements}</span>
                </div>
                <div className="partner-detail">
                  <FontAwesomeIcon icon={faUsers} className="detail-icon" />
                  <span>Est. {premierPartner.established}</span>
                </div>
              </div>
              <button 
                className="premier-website-link"
                onClick={() => window.open(premierPartner.website, '_blank', 'noopener,noreferrer')}
              >
                <FontAwesomeIcon icon={faGlobe} /> Visit Official Website
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Grid */}
      <section className="partners-grid-section" ref={partnersGridRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Club <span className="text-neon">Partners</span></h2>
          </div>
          <div className="partners-grid">
            {partnerClubs.map((club) => (
              <div key={club.id} className="partner-card">
                <div className="partner-logo">
                  <img src={club.logo} alt={`${club.name} logo`} />
                </div>
                <div className="partner-content">
                  <h3 className="partner-name">
                    {club.name}
                  </h3>
                  <p className="partner-description">{club.description}</p>
                  <div className="partner-details">
                    <div className="partner-detail">
                      <FontAwesomeIcon icon={faLocationDot} className="detail-icon" />
                      <span>{club.location}</span>
                    </div>
                    <div className="partner-detail">
                      <FontAwesomeIcon icon={faTrophy} className="detail-icon" />
                      <span>{club.achievements}</span>
                    </div>
                    <div className="partner-detail">
                      <FontAwesomeIcon icon={faUsers} className="detail-icon" />
                      <span>Est. {club.established}</span>
                    </div>
                  </div>
                  <button 
                    className="website-link"
                    onClick={() => window.open(club.website, '_blank', 'noopener,noreferrer')}
                  >
                    <FontAwesomeIcon icon={faGlobe} /> Visit Official Website
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partnership Benefits */}
      <section className="partnership-benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Benefits of Our <span className="text-neon">Partnerships</span></h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Premium Training Facilities</h3>
              <p>Access professional-grade training grounds and equipment across Cairo.</p>
            </div>
            <div className="benefit-card">
              <h3>Expert Coaching</h3>
              <p>Learn from coaches with top-tier Egyptian club and national team experience.</p>
            </div>
            <div className="benefit-card">
              <h3>Scouting Opportunities</h3>
              <p>Regular exposure to club scouts during training and showcases.</p>
            </div>
            <div className="benefit-card">
              <h3>Pathway to Professional Football</h3>
              <p>Direct routes to club academies for standout PFT players.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="partners-cta">
        <div className="container">
          <h2>Train with Egypt's Best Clubs</h2>
          <p>Join PFT Academy and access our network of professional club partnerships.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/programs" className="btn btn-secondary">View Programs</Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Partners; 