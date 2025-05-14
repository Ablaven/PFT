import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faChartLine, faIdCard, faUsers, faTrophy, faEdit, faCamera, faShareAlt, faChartBar, faListAlt, faFutbol, faPlay, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './Marketing.css';

const Marketing = () => {
  // Scroll to top on page load
  useEffect(() => {
    console.log("Marketing component mounted");
    window.scrollTo(0, 0);
    
    // Clean up when component unmounts
    return () => {
      console.log("Marketing component unmounting");
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Player showcase state
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [activePosition, setActivePosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample player data with correct football positions
  const players = [
    {
      id: 1,
      name: "Ahmed Hassan",
      age: 19,
      position: "ST",
      club: "Cairo FC Youth",
      image: "/asfag.avif",
      stats: {
        pace: 87,
        shooting: 82,
        passing: 75,
        dribbling: 84,
        defense: 45,
        physical: 78
      }
    },
    {
      id: 2,
      name: "Omar Mahmoud",
      age: 20,
      position: "CM",
      club: "Alexandria United",
      image: "/FkQhvBMWAAcq7V3.jpg",
      stats: {
        pace: 79,
        shooting: 72,
        passing: 88,
        dribbling: 86,
        defense: 68,
        physical: 74
      }
    },
    {
      id: 3,
      name: "Malik Ibrahim",
      age: 18,
      position: "RW",
      club: "Cairo Eagles",
      image: "/E-dJ0YKXEAEt6DA-453x680.jpg",
      stats: {
        pace: 92,
        shooting: 77,
        passing: 81,
        dribbling: 89,
        defense: 52,
        physical: 71
      }
    },
    {
      id: 4,
      name: "Karim Salah",
      age: 21,
      position: "CB",
      club: "Delta SC",
      image: "/Amar-Hamdi.jpg",
      stats: {
        pace: 75,
        shooting: 45,
        passing: 74,
        dribbling: 68,
        defense: 87,
        physical: 86
      }
    },
    {
      id: 5,
      name: "Hamza Mahmoud",
      age: 19,
      position: "GK",
      club: "Mansoura FC Academy",
      image: "/e1b57e9481ffc3c3fdbacb3d78af89fb90efbca7f53bce00111115a731054b8d-560-320.jpg",
      stats: {
        pace: 67,
        shooting: 32,
        passing: 70,
        dribbling: 43,
        defense: 82,
        physical: 88
      }
    },
    {
      id: 6,
      name: "Tarek Farid",
      age: 20,
      position: "CAM",
      club: "Red Sea Stars",
      image: "401838334_378650857850547_8807736372159614968_n-e1703422698160-680x659.jpg",
      stats: {
        pace: 83,
        shooting: 85,
        passing: 87,
        dribbling: 86,
        defense: 58,
        physical: 73
      }
    },
    {
      id: 7,
      name: "Ali Mustafa",
      age: 19,
      position: "LB",
      club: "Alexandria Warriors",
      image: "511767.jpg",
      stats: {
        pace: 84,
        shooting: 65,
        passing: 79,
        dribbling: 75,
        defense: 83,
        physical: 78
      }
    },
    {
      id: 8,
      name: "Ziad Ibrahim",
      age: 19,
      position: "CDM",
      club: "Upper Egypt FC",
      image: "xzoiszyL7A6NSDN83NXT.png",
      stats: {
        pace: 73,
        shooting: 42,
        passing: 71,
        dribbling: 58,
        defense: 89,
        physical: 87
      }
    }
  ];

  // Filter players based on position and search query
  useEffect(() => {
    let result = [...players];
    
    // Filter by position
    if (activePosition !== 'all') {
      result = result.filter(player => 
        player.position.toLowerCase() === activePosition.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.club.toLowerCase().includes(query) ||
        player.position.toLowerCase().includes(query)
      );
    }
    
    setFilteredPlayers(result);
  }, [activePosition, searchQuery]);

  // Initialize filtered players on component mount
  useEffect(() => {
    setFilteredPlayers(players);
  }, []);

  // Handle position filter click
  const handlePositionFilter = (position) => {
    setActivePosition(position);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle view profile button click
  const handleViewProfile = (playerId) => {
    console.log(`View profile for player ${playerId}`);
    // Add navigation logic here
  };

  // Handle scout button click
  const handleScoutPlayer = (playerId) => {
    console.log(`Scout player ${playerId}`);
    // Add scout logic here
  };

  return (
    <div>
      <Navbar />
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="marketing-hero">
          <div className="hero-content">
            <h1 className="hero-title">Showcase Your <span className="text-neon">Talent</span></h1>
            <p className="hero-subtitle">Connect with scouts and advance your football career</p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="#features" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
        
        {/* Marketing Intro Section */}
        <section className="marketing-intro">
          <div className="container">
            <h2 className="section-title">Your Path to Pro Football</h2>
            <div className="intro-grid">
              <div className="intro-text">
                <p>PFT Academy connects talented players with professional opportunities.</p>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Partner Clubs</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">200+</span>
                    <span className="stat-label">Active Scouts</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">80%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Success Stories</span>
                  </div>
                </div>
              </div>
              <div className="intro-image">
                <img src="/72afe5ea45a9a68c3c84d54b8c489e4a.jpg" alt="Football Success" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Player Showcase Section */}
        <section className="player-showcase">
          <div className="container">
            <h2 className="section-title">Discover <span className="text-neon">Talent</span></h2>
            
            <div className="showcase-intro">
              <p>Browse top players and see how profiles appear to scouts.</p>
              
              {/* Filter Controls */}
              <div className="player-filter-bar">
                <div className="filter-toggles">
                  <button 
                    className={`filter-toggle ${activePosition === 'all' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('all')}
                  >
                    All Positions
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'st' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('st')}
                  >
                    Striker (ST)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'cam' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('cam')}
                  >
                    Attacking Mid (CAM)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'cm' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('cm')}
                  >
                    Central Mid (CM)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'cdm' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('cdm')}
                  >
                    Defensive Mid (CDM)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'cb' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('cb')}
                  >
                    Center Back (CB)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'lb' || activePosition === 'rb' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('lb')}
                  >
                    Full Back (LB/RB)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'gk' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('gk')}
                  >
                    Goalkeeper (GK)
                  </button>
                  <button 
                    className={`filter-toggle ${activePosition === 'rw' || activePosition === 'lw' ? 'active' : ''}`}
                    onClick={() => handlePositionFilter('rw')}
                  >
                    Winger (RW/LW)
                  </button>
                </div>
                
                <div className="search-filter">
                  <input 
                    type="text" 
                    placeholder="Search players" 
                    className="player-search" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
              </div>
            </div>
            
            {filteredPlayers.length === 0 ? (
              <div className="no-results">
                <p>No players match your search. Try different filters.</p>
                <button 
                  className="reset-filters-btn" 
                  onClick={() => {
                    setActivePosition('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="player-cards-grid">
                {filteredPlayers.map(player => (
                  <div key={player.id} className="player-card-flat">
                    <div className="player-card-header">
                      <div className="player-image">
                        <img src={player.image} alt={player.name} />
                        <div className="player-position-tag">{player.position}</div>
                      </div>
                    </div>
                    
                    <div className="player-card-body">
                      <h3>{player.name}</h3>
                      <div className="player-info-row">
                        <span className="player-age">{player.age} yrs</span>
                        <span className="player-club">{player.club}</span>
                      </div>
                      
                      <div className="player-stats-preview">
                        <div className="stats-overview">
                          <div className="stats-radar-container">
                            <div className="stats-radar">
                              <div className="radar-background">
                                <svg viewBox="0 0 200 200" className="radar-chart-bg">
                                  {/* Hexagon background layers */}
                                  <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                  <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                  <polygon points="100,60 130,80 130,120 100,140 70,120 70,80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <polygon points="100,80 110,90 110,110 100,120 90,110 90,90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                  
                                  {/* Attribute lines */}
                                  <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <line x1="30" y1="60" x2="170" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <line x1="30" y1="140" x2="170" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                </svg>
                                
                                {/* Repositioned labels to be directly on the hexagon corners */}
                                <div className="radar-label" style={{ 
                                  bottom: '0', 
                                  left: '50%', 
                                  transform: 'translateX(-50%)', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>PACE</div>
                                <div className="radar-label" style={{ 
                                  bottom: '25%', 
                                  left: '0', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>SHOOT</div>
                                <div className="radar-label" style={{ 
                                  top: '25%', 
                                  left: '0', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>PASS</div>
                                <div className="radar-label" style={{ 
                                  top: '0', 
                                  left: '50%', 
                                  transform: 'translateX(-50%)', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>DRIB</div>
                                <div className="radar-label" style={{ 
                                  top: '25%', 
                                  right: '0', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>DEF</div>
                                <div className="radar-label" style={{ 
                                  bottom: '25%', 
                                  right: '0', 
                                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                                  fontWeight: '600'
                                }}>PHYS</div>
                              </div>
                              
                              {/* Player stats radar shape */}
                              <svg viewBox="0 0 200 200" className="radar-chart-stats">
                                <defs>
                                  <linearGradient id={`stats-gradient-${player.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#04e762" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#00d5c0" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="#0bffed" stopOpacity="0.8" />
                                  </linearGradient>
                                  <filter id={`glow-${player.id}`}>
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                  </filter>
                                </defs>
                                
                                {/* Stats polygon calculated based on stats */}
                                {(() => {
                                  // Calculate points for radar chart based on stats
                                  const centerX = 100;
                                  const centerY = 100;
                                  const maxRadius = 80;
                                  
                                  // Convert stats to percentages of radius
                                  const paceRadius = (player.stats.pace / 100) * maxRadius;
                                  const shootingRadius = (player.stats.shooting / 100) * maxRadius;
                                  const passingRadius = (player.stats.passing / 100) * maxRadius;
                                  const dribblingRadius = (player.stats.dribbling / 100) * maxRadius;
                                  const defenseRadius = (player.stats.defense / 100) * maxRadius;
                                  const physicalRadius = (player.stats.physical / 100) * maxRadius;
                                  
                                  // Calculate points on hexagon (6 points at 60° intervals)
                                  const pacePoint = `${centerX},${centerY + paceRadius}`;
                                  const shootingPoint = `${centerX - shootingRadius * 0.866},${centerY + shootingRadius * 0.5}`;
                                  const passingPoint = `${centerX - passingRadius * 0.866},${centerY - passingRadius * 0.5}`;
                                  const dribblingPoint = `${centerX},${centerY - dribblingRadius}`;
                                  const defensePoint = `${centerX + defenseRadius * 0.866},${centerY - defenseRadius * 0.5}`;
                                  const physicalPoint = `${centerX + physicalRadius * 0.866},${centerY + physicalRadius * 0.5}`;
                                  
                                  const points = `${pacePoint} ${shootingPoint} ${passingPoint} ${dribblingPoint} ${defensePoint} ${physicalPoint}`;
                                  
                                  return (
                                    <polygon 
                                      points={points}
                                      fill={`url(#stats-gradient-${player.id})`}
                                      stroke="#04e762"
                                      strokeWidth="1.5"
                                      strokeLinejoin="round"
                                      filter={`url(#glow-${player.id})`}
                                    />
                                  );
                                })()}
                              </svg>
                              
                              {/* Overall rating in the center */}
                              <div className="radar-rating">
                                <div className="rating-value">
                                  {Math.round((player.stats.pace + player.stats.shooting + player.stats.passing + 
                                    player.stats.dribbling + player.stats.defense + player.stats.physical) / 6)}
                                </div>
                                <div className="rating-label">OVR</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Move stats bars to be below the radar chart instead of beside it */}
                        <div className="stats-bars">
                          {/* Pace */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.pace}</div>
                              <div className="stat-label">PACE</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.pace}%`,
                                  transitionDelay: '0.1s'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Shooting */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.shooting}</div>
                              <div className="stat-label">SHOOT</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.shooting}%`,
                                  transitionDelay: '0.2s'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Passing */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.passing}</div>
                              <div className="stat-label">PASS</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.passing}%`,
                                  transitionDelay: '0.3s'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Dribbling */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.dribbling}</div>
                              <div className="stat-label">DRIB</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.dribbling}%`,
                                  transitionDelay: '0.4s'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Defense */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.defense}</div>
                              <div className="stat-label">DEF</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.defense}%`,
                                  transitionDelay: '0.5s'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Physical */}
                          <div className="stat-bar">
                            <div className="stat-label-value">
                              <div className="stat-value">{player.stats.physical}</div>
                              <div className="stat-label">PHYS</div>
                            </div>
                            <div className="stat-progress">
                              <div className="stat-track"></div>
                              <div 
                                className="stat-fill" 
                                style={{ 
                                  width: `${player.stats.physical}%`,
                                  transitionDelay: '0.6s'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="player-card-actions">
                      <button 
                        className="view-profile-btn"
                        onClick={() => handleViewProfile(player.id)}
                      >
                        <FontAwesomeIcon icon={faUser} /> View Profile
                      </button>
                      <button 
                        className="scout-player-btn"
                        onClick={() => handleScoutPlayer(player.id)}
                      >
                        <FontAwesomeIcon icon={faFutbol} /> Scout
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="showcase-cta">
              <p>Want to be featured among top players?</p>
              <Link to="/register" className="btn btn-primary">Join PFT Academy</Link>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="marketing-features">
          <div className="container">
            <h2 className="section-title">Marketing <span className="text-neon">Features</span></h2>
            
            <div className="features-wrapper">
              <div className="features-intro">
                <p>Tools to showcase your talent and connect with pro opportunities.</p>
              </div>
              
              <div className="feature-grid">
                {/* Feature 1 */}
                <div className="feature-card">
                  <div className="feature-card-inner">
                    <div className="feature-header">
                      <div className="feature-icon-container">
                        <FontAwesomeIcon icon={faIdCard} className="feature-icon" />
                      </div>
                      <h3>Player Profile</h3>
                    </div>
                    
                    <div className="feature-body">
                      <p>Build a digital CV showcasing your skills and style to scouts worldwide.</p>
                      
                      <ul className="feature-list">
                        <li><span className="check-icon">✓</span> Personal details & achievements</li>
                        <li><span className="check-icon">✓</span> Position specialties</li>
                        <li><span className="check-icon">✓</span> Technical assessment</li>
                      </ul>
                    </div>
                    
                    <div className="feature-footer">
                      <button className="feature-btn">Learn More</button>
                    </div>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="feature-card">
                  <div className="feature-card-inner">
                    <div className="feature-header">
                      <div className="feature-icon-container">
                        <FontAwesomeIcon icon={faVideo} className="feature-icon" />
                      </div>
                      <h3>Video Showcase</h3>
                    </div>
                    
                    <div className="feature-body">
                      <p>Share performance videos to demonstrate your technical abilities.</p>
                      
                      <ul className="feature-list">
                        <li><span className="check-icon">✓</span> Match highlights</li>
                        <li><span className="check-icon">✓</span> Editing tools</li>
                        <li><span className="check-icon">✓</span> Video library</li>
                      </ul>
                    </div>
                    
                    <div className="feature-footer">
                      <button className="feature-btn">Learn More</button>
                    </div>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="feature-card">
                  <div className="feature-card-inner">
                    <div className="feature-header">
                      <div className="feature-icon-container">
                        <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
                      </div>
                      <h3>Performance Stats</h3>
                    </div>
                    
                    <div className="feature-body">
                      <p>Track metrics to identify strengths and areas for improvement.</p>
                      
                      <ul className="feature-list">
                        <li><span className="check-icon">✓</span> Speed & agility data</li>
                        <li><span className="check-icon">✓</span> Technical metrics</li>
                        <li><span className="check-icon">✓</span> Match analytics</li>
                      </ul>
                    </div>
                    
                    <div className="feature-footer">
                      <button className="feature-btn">Learn More</button>
                    </div>
                  </div>
                </div>
                
                {/* Feature 4 */}
                <div className="feature-card">
                  <div className="feature-card-inner">
                    <div className="feature-header">
                      <div className="feature-icon-container">
                        <FontAwesomeIcon icon={faUsers} className="feature-icon" />
                      </div>
                      <h3>Scout Network</h3>
                    </div>
                    
                    <div className="feature-body">
                      <p>Connect directly with scouts and clubs seeking your specific talents.</p>
                      
                      <ul className="feature-list">
                        <li><span className="check-icon">✓</span> Scout notifications</li>
                        <li><span className="check-icon">✓</span> Direct messaging</li>
                        <li><span className="check-icon">✓</span> Event invitations</li>
                      </ul>
                    </div>
                    
                    <div className="feature-footer">
                      <button className="feature-btn">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="container">
            <h2 className="section-title">How It <span className="text-neon">Works</span></h2>
            
            <div className="process-flow">
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faIdCard} />
                  </div>
                  <div className="step-number">1</div>
                </div>
                <div className="process-content">
                  <h3>Create Profile</h3>
                  <p>Build your player profile with key information.</p>
                </div>
                <div className="process-connector">
                  <svg width="100%" height="20">
                    <line x1="0" y1="10" x2="100%" y2="10" stroke="#04e762" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faVideo} />
                  </div>
                  <div className="step-number">2</div>
                </div>
                <div className="process-content">
                  <h3>Upload Content</h3>
                  <p>Add videos and stats to showcase your abilities.</p>
                </div>
                <div className="process-connector">
                  <svg width="100%" height="20">
                    <line x1="0" y1="10" x2="100%" y2="10" stroke="#04e762" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <div className="step-number">3</div>
                </div>
                <div className="process-content">
                  <h3>Get Discovered</h3>
                  <p>Scouts find talent matching their recruitment needs.</p>
                </div>
                <div className="process-connector">
                  <svg width="100%" height="20">
                    <line x1="0" y1="10" x2="100%" y2="10" stroke="#04e762" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div className="step-number">4</div>
                </div>
                <div className="process-content">
                  <h3>Get Opportunities</h3>
                  <p>Receive trials and contract opportunities from clubs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tools Section */}
        <section className="marketing-tools">
          <div className="container">
            <h2 className="section-title">Professional <span className="text-neon">Tools</span></h2>
            
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faEdit} className="tool-icon" />
                  </div>
                  <h3>Profile Builder</h3>
                  <p>Create your professional player profile with ease.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> CV builder</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Templates</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Timeline</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faCamera} className="tool-icon" />
                  </div>
                  <h3>Video Editor</h3>
                  <p>Create highlight reels to impress scouts.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> Clip extraction</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Effects</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Auto-highlights</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faChartBar} className="tool-icon" />
                  </div>
                  <h3>Stats Dashboard</h3>
                  <p>Visualize metrics with interactive charts.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> Performance trends</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Comparisons</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Custom metrics</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faShareAlt} className="tool-icon" />
                  </div>
                  <h3>Share Hub</h3>
                  <p>Share your profile with scouts and on social media.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> One-click sharing</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Access control</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Notifications</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faListAlt} className="tool-icon" />
                  </div>
                  <h3>Opportunity Tracker</h3>
                  <p>Track all communications with scouts and clubs.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> Message history</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Calendar</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Priority sorting</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-card-inner">
                  <div className="tool-icon-wrapper">
                    <FontAwesomeIcon icon={faTrophy} className="tool-icon" />
                  </div>
                  <h3>Achievement Logger</h3>
                  <p>Document career milestones to impress scouts.</p>
                  <div className="tool-card-overlay">
                    <div className="tool-features">
                      <ul>
                        <li><FontAwesomeIcon icon={faFutbol} /> Achievement badges</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Timelines</li>
                        <li><FontAwesomeIcon icon={faFutbol} /> Media gallery</li>
                      </ul>
                    </div>
                    <button className="try-tool-btn">Try It Now</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tools-cta">
              <p>Access all tools with your PFT Academy membership</p>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="marketing-cta">
          <div className="container">
            <h2>Ready to Launch Your Football Career?</h2>
            <p>Join PFT Academy and showcase your talent to scouts worldwide.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">Create Profile</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default Marketing; 
