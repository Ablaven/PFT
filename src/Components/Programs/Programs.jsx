import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye, 
  faFutbol,
  faExchange, 
  faRocket, 
  faHeartbeat, 
  faRandom,
  faMapMarker,
  faHand,
  faTrophy,
  faUsers,
  faChartLine,
  faBrain,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import './Programs.css';
import { AuthContext } from '../../App';

// Football Field Component
const FootballField = ({ activePosition, onPositionClick }) => {
  // State for additional visual effects
  const [hoverPosition, setHoverPosition] = useState(null);
  const [ballPosition, setBallPosition] = useState({ left: '50%', top: '50%' });
  const [isMovingBall, setIsMovingBall] = useState(false);
  const fieldRef = useRef(null);
  
  // Get position coordinates helper function
  const getPositionCoordinates = (pos) => {
    switch (pos) {
      case 'cb':
        return { left: '15%', top: '50%' };
      case 'fb':
        return { left: '15%', top: '20%' };
      case 'cdm':
        return { left: '30%', top: '50%' };
      case 'cm':
        return { left: '50%', top: '35%' };
      case 'cam':
        return { left: '70%', top: '50%' };
      case 'st':
        return { left: '85%', top: '50%' };
      case 'w':
        return { left: '75%', top: '20%' };
      default:
        return { left: '50%', top: '50%' };
    }
  };
  
  // Move ball to position when a marker is clicked
  useEffect(() => {
    if (activePosition) {
      // Get position coordinates for the ball movement
      const coordinates = getPositionCoordinates(activePosition);
      
      // Add a small delay before moving the ball
      setTimeout(() => {
        setIsMovingBall(true);
        setBallPosition(coordinates);
        
        // Reset moving state after animation completes
        setTimeout(() => {
          setIsMovingBall(false);
        }, 600);
      }, 200);
    }
  }, [activePosition]);
  
  // Create connection lines between related positions
  const showConnectionsFor = (position) => {
    // Define position connections based on active position
    const connections = [];
    
    if (position === 'cb') {
      connections.push({ from: 'cb', to: 'cdm' });
      connections.push({ from: 'cb', to: 'fb' });
    } else if (position === 'fb') {
      connections.push({ from: 'fb', to: 'cb' });
      connections.push({ from: 'fb', to: 'w' });
    } else if (position === 'cdm') {
      connections.push({ from: 'cdm', to: 'cb' });
      connections.push({ from: 'cdm', to: 'cm' });
    } else if (position === 'cm') {
      connections.push({ from: 'cm', to: 'cdm' });
      connections.push({ from: 'cm', to: 'cam' });
    } else if (position === 'cam') {
      connections.push({ from: 'cam', to: 'cm' });
      connections.push({ from: 'cam', to: 'st' });
      connections.push({ from: 'cam', to: 'w' });
    } else if (position === 'w') {
      connections.push({ from: 'w', to: 'fb' });
      connections.push({ from: 'w', to: 'cam' });
      connections.push({ from: 'w', to: 'st' });
    } else if (position === 'st') {
      connections.push({ from: 'st', to: 'w' });
      connections.push({ from: 'st', to: 'cam' });
    }
    
    return connections;
  };
  
  // Calculate line positions for connections
  const calculateLine = (fromPos, toPos) => {
    const fromCoords = getPositionCoordinates(fromPos);
    const toCoords = getPositionCoordinates(toPos);
    
    // Convert percentage to numeric
    const fromLeft = parseFloat(fromCoords.left);
    const fromTop = parseFloat(fromCoords.top);
    const toLeft = parseFloat(toCoords.left);
    const toTop = parseFloat(toCoords.top);
    
    // Calculate distance and angle
    const dx = toLeft - fromLeft;
    const dy = toTop - fromTop;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    const style = {
      left: `${fromLeft}%`,
      top: `${fromTop}%`,
      width: `${distance}%`,
      transform: `rotate(${angle}deg)`,
    };
    
    return style;
  };
  
  // Generate connections
  const connections = activePosition ? showConnectionsFor(activePosition) : [];
  const hoverConnections = hoverPosition && hoverPosition !== activePosition ? showConnectionsFor(hoverPosition) : [];

  // Handle field click for interactive effects
  const handleFieldClick = (e) => {
    if (!fieldRef.current) return;
    
    // Get click position relative to field
    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Move ball to clicked position with animation
    setIsMovingBall(true);
    setBallPosition({ left: `${x}%`, top: `${y}%` });
    
    // Create ripple effect at click position
    const ripple = document.createElement('div');
    ripple.className = 'field-ripple';
    ripple.style.left = `${x}%`;
    ripple.style.top = `${y}%`;
    fieldRef.current.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
      setIsMovingBall(false);
    }, 1000);
  };

  // Handle click on position marker with visual effect
  const handlePositionClick = (position) => {
    // Create ripple effect on click
    const marker = document.querySelector(`.position-marker.marker-${position}`);
    if (marker) {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.background = 'rgba(57, 255, 20, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.zIndex = '1';
      ripple.style.animation = 'markerPulse 0.6s ease-out forwards';
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes markerPulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      
      marker.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
        style.remove();
      }, 600);
    }
    
    // Call the original click handler
    onPositionClick(position);
  };

  return (
    <div className={`football-field-container ${activePosition ? 'visible' : ''}`}>
      <div className="field-title">Position on the Field</div>
      <div 
        className="football-field" 
        ref={fieldRef}
        onClick={handleFieldClick}
      >
        {/* Field markings */}
        <div className="center-line"></div>
        <div className="center-circle"></div>
        <div className="goal-area-left"></div>
        <div className="goal-area-right"></div>
        <div className="penalty-area-left"></div>
        <div className="penalty-area-right"></div>
        <div className="penalty-spot-left"></div>
        <div className="penalty-spot-right"></div>
        <div className="corner-arc top-left"></div>
        <div className="corner-arc top-right"></div>
        <div className="corner-arc bottom-left"></div>
        <div className="corner-arc bottom-right"></div>
        
        {/* Football that moves around */}
        <div 
          className={`football ${isMovingBall ? 'moving' : ''}`} 
          style={{
            left: ballPosition.left,
            top: ballPosition.top
          }}
        >
          <div className="football-shadow"></div>
        </div>
        
        {/* Connection lines for active position */}
        {connections.map((connection, index) => (
          <div
            key={`connection-${index}`}
            className={`position-connection connection-${connection.from}-${connection.to} connection-visible`}
            style={calculateLine(connection.from, connection.to)}
          ></div>
        ))}
        
        {/* Connection lines for hover position */}
        {hoverConnections.map((connection, index) => (
          <div
            key={`hover-connection-${index}`}
            className={`position-connection hover-connection-${connection.from}-${connection.to}`}
            style={{
              ...calculateLine(connection.from, connection.to),
              opacity: 0.3,
              backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }}
          ></div>
        ))}
        
        {/* Position markers */}
        <div 
          className={`position-marker marker-cb ${activePosition === 'cb' ? 'active' : ''}`}
          onClick={() => handlePositionClick('cb')}
          onMouseEnter={() => setHoverPosition('cb')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Center Back"
        >
          CB
        </div>
        <div 
          className={`position-marker marker-fb left ${activePosition === 'fb' ? 'active' : ''}`}
          onClick={() => handlePositionClick('fb')}
          onMouseEnter={() => setHoverPosition('fb')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Left-Back"
        >
          LB
        </div>
        <div 
          className={`position-marker marker-fb right ${activePosition === 'fb' ? 'active' : ''}`}
          onClick={() => handlePositionClick('fb')}
          onMouseEnter={() => setHoverPosition('fb')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Right-Back"
        >
          RB
        </div>
        <div 
          className={`position-marker marker-cdm ${activePosition === 'cdm' ? 'active' : ''}`}
          onClick={() => handlePositionClick('cdm')}
          onMouseEnter={() => setHoverPosition('cdm')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Central Defensive Midfielder"
        >
          CDM
        </div>
        <div 
          className={`position-marker marker-cm left ${activePosition === 'cm' ? 'active' : ''}`}
          onClick={() => handlePositionClick('cm')}
          onMouseEnter={() => setHoverPosition('cm')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Central Midfielder"
        >
          CM
        </div>
        <div 
          className={`position-marker marker-cm right ${activePosition === 'cm' ? 'active' : ''}`}
          onClick={() => handlePositionClick('cm')}
          onMouseEnter={() => setHoverPosition('cm')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Central Midfielder"
        >
          CM
        </div>
        <div 
          className={`position-marker marker-cam ${activePosition === 'cam' ? 'active' : ''}`}
          onClick={() => handlePositionClick('cam')}
          onMouseEnter={() => setHoverPosition('cam')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Attacking Midfielder"
        >
          CAM
        </div>
        <div 
          className={`position-marker marker-st ${activePosition === 'st' ? 'active' : ''}`}
          onClick={() => handlePositionClick('st')}
          onMouseEnter={() => setHoverPosition('st')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Striker"
        >
          ST
        </div>
        <div 
          className={`position-marker marker-w left ${activePosition === 'w' ? 'active' : ''}`}
          onClick={() => handlePositionClick('w')}
          onMouseEnter={() => setHoverPosition('w')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Left Winger"
        >
          LW
        </div>
        <div 
          className={`position-marker marker-w right ${activePosition === 'w' ? 'active' : ''}`}
          onClick={() => handlePositionClick('w')}
          onMouseEnter={() => setHoverPosition('w')}
          onMouseLeave={() => setHoverPosition(null)}
          title="Right Winger"
        >
          RW
        </div>
        
        {/* Add positional heat spots for active position */}
        {activePosition && (
          <div className={`position-heat-map heat-${activePosition}`}></div>
        )}
      </div>
      
      <div className="field-stat">
        <span className="stat-label">Preferred Position:</span>
        <span className="stat-value">{activePosition ? activePosition.toUpperCase() : 'Select a position'}</span>
      </div>
    </div>
  );
};

const Programs = () => {
  const { programType } = useParams();
  const [activeLevel, setActiveLevel] = useState(null);
  const [activePosition, setActivePosition] = useState(null);
  const [activeFocus, setActiveFocus] = useState(null);
  const [videoClicked, setVideoClicked] = useState(null);
  const heroRef = useRef(null);
  const level1Ref = useRef(null);
  const level2Ref = useRef(null);
  const level3Ref = useRef(null);
  const level4Ref = useRef(null);
  const level5Ref = useRef(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Create a ref map for focus sections
  const focusRefs = useRef({});

  // Initialize based on URL parameter
  useEffect(() => {
    if (programType) {
      switch (programType) {
        case 'level1':
          setActiveLevel('level1');
          setTimeout(() => {
            level1Ref.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          break;
        case 'level2':
          setActiveLevel('level2');
          setTimeout(() => {
            level2Ref.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          break;
        case 'level3':
          setActiveLevel('level3');
          setTimeout(() => {
            level3Ref.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          break;
        case 'level4':
          setActiveLevel('level4');
          setTimeout(() => {
            level4Ref.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          break;
        case 'level5':
          setActiveLevel('level5');
          setTimeout(() => {
            level5Ref.current?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          break;
        default:
          setActiveLevel('level1');
      }
    } else {
      setActiveLevel('level1');
    }
  }, [programType]);

  const handleLevelClick = (level) => {
    setActiveLevel(level);
    setActivePosition(null);
    
    let ref;
    switch(level) {
      case 'level1':
        ref = level1Ref;
        break;
      case 'level2':
        ref = level2Ref;
        break;
      case 'level3':
        ref = level3Ref;
        break;
      case 'level4':
        ref = level4Ref;
        break;
      case 'level5':
        ref = level5Ref;
        break;
      default:
        ref = level1Ref;
    }
    
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handlePositionClick = (position) => {
    setActivePosition(position === activePosition ? null : position);
    setActiveFocus(null); // Reset active focus when changing position
  };

  const handleFocusClick = (focus, positionPrefix = '') => {
    // Convert the focus title to a format usable as an id (lowercase, replace spaces with dashes)
    const focusId = focus.toLowerCase().replace(/\s+/g, '-');
    
    // Set the active focus state, preserving any position prefix if provided
    const newActiveFocus = positionPrefix ? `${positionPrefix}-${focusId}` : focusId;
    setActiveFocus(newActiveFocus);
    
    console.log("Setting active focus:", newActiveFocus);
    
    // First, remove active-focus class from all training categories
    const allTrainingCategories = document.querySelectorAll('.training-category');
    allTrainingCategories.forEach(cat => {
      cat.classList.remove('active-focus');
    });
    
    // Construct the ID of the element to scroll to
    const elementId = `training-${newActiveFocus}`;
    console.log("Looking for element with ID:", elementId);
    
    // Get the element
    let element = document.getElementById(elementId);
    
    // If the element is not found, try alternative ID formats or fallback to querySelector
    if (!element) {
      console.log("Element not found with ID, trying alternative selectors");
      
      // Try different ID formats
      const alternativeIds = [
        `training-${focusId}`,
        `training-${positionPrefix}-${focus.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        `training-${positionPrefix}-${focusId.replace(/&/g, '')}`
      ];
      
      for (const altId of alternativeIds) {
        element = document.getElementById(altId);
        if (element) {
          console.log("Found element with alternative ID:", altId);
          break;
        }
      }
      
      // If still not found, try finding a div that contains the focus text
      if (!element) {
        console.log("Trying to find element by text content");
        const focusText = focus.toLowerCase();
        
        for (const category of allTrainingCategories) {
          const headingEl = category.querySelector('h4, h5');
          if (headingEl && headingEl.textContent.toLowerCase().includes(focusText)) {
            element = category;
            console.log("Found element by heading text:", headingEl.textContent);
            break;
          }
        }
      }
    }
    
    if (element) {
      // Mark this element as active focus
      element.classList.add('active-focus');
      
      // Add pre-animation highlight to the clicked item
      const allFocusItems = document.querySelectorAll('.focus-item, .focus-tag');
      allFocusItems.forEach(item => {
        if (item.classList.contains('active-focus')) {
          item.style.transition = 'all 0.5s ease';
          item.classList.remove('active-focus');
        }
      });
      
      // Find and flash the corresponding position on the field if applicable
      if (positionPrefix) {
        const positionMarker = document.querySelector(`.position-marker.marker-${positionPrefix.split('-')[0]}`);
        if (positionMarker) {
          positionMarker.classList.add('active');
          setTimeout(() => {
            if (activePosition !== positionPrefix.split('-')[0]) {
              positionMarker.classList.remove('active');
            }
          }, 1500);
        }
      }
      
      // Scroll to the element - be sure it's visible in the viewport
      console.log("Attempting to scroll to element:", element);
      setTimeout(() => {
        scrollToElement(element, window.innerHeight * 0.15);
      }, 100); // Small delay to ensure DOM is updated
      
      // Add visual feedback with highlighting
      setTimeout(() => {
        console.log("Adding highlight to element");
        
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'var(--color-neon-green)';
        ripple.style.borderRadius = '50%';
        ripple.style.opacity = '0.8';
        ripple.style.zIndex = '1000';
        ripple.style.animation = 'rippleEffect 1s ease-out forwards';
        
        // Add custom keyframes for ripple effect
        const style = document.createElement('style');
        style.textContent = `
          @keyframes rippleEffect {
            0% { width: 10px; height: 10px; opacity: 0.8; }
            100% { width: 300px; height: 300px; opacity: 0; }
          }
        `;
        document.head.appendChild(style);
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        element.classList.add('active-focus-highlight');
        
        setTimeout(() => {
          element.classList.remove('active-focus-highlight');
          ripple.remove();
          style.remove();
        }, 2000);
      }, 800); // Wait for scrolling to almost finish
    } else {
      console.error(`Could not find training detail element for focus: ${focus}`);
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

  // Helper function for scrolling to an element with offset and better visualization
  const scrollToElement = (element, offset = 100) => {
    if (!element) return;
    
    console.log("Scrolling to element:", element);
    
    // Use the more reliable scrollIntoView method
    try {
      // First, scroll the element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add the highlight effect
      element.classList.add('active-focus-highlight');
      
      // Store original styles
      const originalZIndex = element.style.zIndex;
      const originalPosition = element.style.position;
      
      // Apply highlight styles
      element.style.position = 'relative';
      element.style.zIndex = '100';
      
      // Reset styles after animation completes
      setTimeout(() => {
        element.classList.remove('active-focus-highlight');
        element.style.zIndex = originalZIndex || '';
        if (originalPosition) {
          element.style.position = originalPosition;
        }
      }, 2000);
    } catch (error) {
      console.error("Error scrolling to element:", error);
      
      // Fallback scrolling method
      const rect = element.getBoundingClientRect();
      const absoluteElementTop = rect.top + window.scrollY;
      const middle = absoluteElementTop - (window.innerHeight / 2);
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      });
    }
  };

  // Handle registration button clicks - redirects to login if not authenticated
  const handleRegisterClick = (level) => {
    if (isLoggedIn) {
      navigate(`/register/${level}`);
    } else {
      // Store the intended registration page in localStorage
      localStorage.setItem('registrationRedirect', `/register/${level}`);
      // Redirect to login page
      navigate('/login');
      // You could also add a toast notification here if the project uses a toast library
    }
  };

  // Handle video click - this would normally load a video or open a video modal
  const handleVideoClick = (level) => {
    setVideoClicked(level);
    // Display an alert for now - in a real implementation, this would open a video modal
    alert(`Video for ${level} would play here. You can replace this placeholder with your actual video content.`);
    setTimeout(() => {
      setVideoClicked(null);
    }, 300);
  };

  return (
    <div className="programs-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="programs-hero" ref={heroRef}>
        <div className="programs-hero-content">
          <h1 className="programs-title">Football <span className="text-neon">Training</span> Programs</h1>
          <h2 className="programs-subtitle">Progressive Training for All Levels</h2>
          <p className="programs-description">
            Our football training programs progress through five levels, each designed to build upon the previous one. 
            Levels 1 and 2 develop fundamental skills for all players, while Levels 3 to 5 introduce specialized training 
            tailored to specific positions.
          </p>
        </div>
        <div className="hero-particles">
          {Array(60).fill().map((_, i) => {
            const randomY = Math.random() * 100;
            const size = (Math.random() * 2) + 1;
            
            return (
              <div 
                key={i} 
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${100 - (randomY * 0.8)}%`,
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
      <div className="programs-tabs">
        <button 
          className={`program-tab ${activeLevel === 'level1' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleLevelClick('level1');
          }}
        >
          Level 1: Foundation
        </button>
        <button 
          className={`program-tab ${activeLevel === 'level2' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleLevelClick('level2');
          }}
        >
          Level 2: Development
        </button>
        <button 
          className={`program-tab ${activeLevel === 'level3' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleLevelClick('level3');
          }}
        >
          Level 3: Position Specialization
        </button>
        <button 
          className={`program-tab ${activeLevel === 'level4' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleLevelClick('level4');
          }}
        >
          Level 4: Advanced Specialization
        </button>
        <button 
          className={`program-tab ${activeLevel === 'level5' ? 'active' : ''}`}
          onClick={(e) => {
            createRipple(e);
            handleLevelClick('level5');
          }}
        >
          Level 5: Elite Performance
        </button>
      </div>

      {/* Main Content */}
      <div className="programs-content">
        {/* Level 1: Foundation */}
        <section 
          ref={level1Ref} 
          className={`program-section ${activeLevel === 'level1' ? 'active' : ''}`}
          id="level1"
        >
          <div className="level-header">
            <div className="level-info">
              <h2>Level 1: Foundation</h2>
              <div className="level-meta">
                <span className="level-duration">Duration: 1.5 months</span>
                <span className="level-difficulty">Beginner</span>
              </div>
              <p className="level-objective">Establish basic football skills for beginners.</p>
            </div>
          </div>
          
          <div className="focus-areas">
            <h3>Main Focus Areas</h3>
            <div className="focus-grid">
              <div className={`focus-item ${activeFocus === 'ball-control' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Ball Control')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faBullseye} /></div>
                <span>Ball Control</span>
              </div>
              <div className={`focus-item ${activeFocus === 'football-basics' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Football Basics')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faFutbol} /></div>
                <span>Football Basics</span>
              </div>
              <div className={`focus-item ${activeFocus === 'simple-passing-and-receiving' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Simple Passing and Receiving')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faExchange} /></div>
                <span>Simple Passing and Receiving</span>
              </div>
              <div className={`focus-item ${activeFocus === 'simple-shooting' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Simple Shooting')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faRocket} /></div>
                <span>Simple Shooting</span>
              </div>
              <div className={`focus-item ${activeFocus === 'light-fitness' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Light Fitness')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faHeartbeat} /></div>
                <span>Light Fitness</span>
              </div>
              <div className={`focus-item ${activeFocus === 'introduction-to-dribbling' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Introduction to Dribbling')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faRandom} /></div>
                <span>Introduction to Dribbling</span>
              </div>
            </div>
          </div>
          
          <div className="training-details">
            <h3>Training Details</h3>
            
            <div id="training-ball-control" className={`training-category ${activeFocus === 'ball-control' ? 'active-focus' : ''}`}>
              <h4>Ball Control</h4>
              <ul className="training-list">
                <li>Sole control</li>
                <li>Inside & outside touch control</li>
                <li>Ball rolls</li>
                <li>Juggling basics</li>
              </ul>
            </div>
            
            <div id="training-football-basics" className={`training-category ${activeFocus === 'football-basics' ? 'active-focus' : ''}`}>
              <h4>Football Basics</h4>
              <ul className="training-list">
                <li>Football rules and regulations</li>
                <li>Game awareness</li>
                <li>Basic positioning</li>
                <li>Understanding roles on the field</li>
              </ul>
            </div>
            
            <div id="training-introduction-to-dribbling" className={`training-category ${activeFocus === 'introduction-to-dribbling' ? 'active-focus' : ''}`}>
              <h4>Dribbling</h4>
              <ul className="training-list">
                <li>Dribbling in straight lines</li>
                <li>Cones zigzag basic</li>
                <li>Dribbling with head up</li>
                <li>Change of direction slowly</li>
              </ul>
            </div>
            
            <div id="training-simple-passing-and-receiving" className={`training-category ${activeFocus === 'simple-passing-and-receiving' ? 'active-focus' : ''}`}>
              <h4>Passing</h4>
              <ul className="training-list">
                <li>Short passes</li>
                <li>Stationary passing</li>
                <li>Passing against a wall</li>
                <li>Accuracy drills (targets)</li>
              </ul>
            </div>
            
            <div id="training-simple-passing-and-receiving-first-touch" className={`training-category ${activeFocus === 'simple-passing-and-receiving' ? 'active-focus' : ''}`}>
              <h4>Receiving / First Touch</h4>
              <ul className="training-list">
                <li>Simple control after pass</li>
                <li>First touch with inside foot</li>
                <li>Stop & go control</li>
                <li>Cushion control</li>
              </ul>
            </div>
            
            <div id="training-simple-shooting" className={`training-category ${activeFocus === 'simple-shooting' ? 'active-focus' : ''}`}>
              <h4>Shooting</h4>
              <ul className="training-list">
                <li>Inside foot shot</li>
                <li>Instep shot</li>
                <li>Static ball shooting</li>
              </ul>
            </div>
            
            <div id="training-light-fitness" className={`training-category ${activeFocus === 'light-fitness' ? 'active-focus' : ''}`}>
              <h4>Fitness</h4>
              <ul className="training-list">
                <li>Light agility drills</li>
                <li>Basic core strength</li>
                <li>Introductory endurance exercises</li>
              </ul>
            </div>
          </div>
          
          <div className="level-cta">
            <button onClick={() => handleRegisterClick('level1')} className="btn btn-primary">Register for Level 1 - 650 EGP/month</button>
          </div>
        </section>
        
        {/* Level 2: Development */}
        <section 
          ref={level2Ref} 
          className={`program-section ${activeLevel === 'level2' ? 'active' : ''}`}
          id="level2"
        >
          <div className="level-header">
            <div className="level-info">
              <h2>Level 2: Development</h2>
              <div className="level-meta">
                <span className="level-duration">Duration: 2 months</span>
                <span className="level-difficulty">Intermediate</span>
              </div>
              <p className="level-objective">Enhance foundational skills and introduce game awareness.</p>
            </div>
          </div>
          
          <div className="focus-areas">
            <h3>Main Focus Areas</h3>
            <div className="focus-grid">
              <div className={`focus-item ${activeFocus === 'positioning' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Positioning')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faMapMarker} /></div>
                <span>Positioning</span>
              </div>
              <div className={`focus-item ${activeFocus === 'advanced-passing' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Advanced Passing')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faExchange} /></div>
                <span>Advanced Passing</span>
              </div>
              <div className={`focus-item ${activeFocus === 'dribbling-development' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Dribbling Development')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faRandom} /></div>
                <span>Dribbling Development</span>
              </div>
              <div className={`focus-item ${activeFocus === 'improving-fitness' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Improving Fitness')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faHeartbeat} /></div>
                <span>Improving Fitness</span>
              </div>
              <div className={`focus-item ${activeFocus === 'dynamic-ball-control' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Dynamic Ball Control')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faBullseye} /></div>
                <span>Dynamic Ball Control</span>
              </div>
              <div className={`focus-item ${activeFocus === 'enhanced-first-touch' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Enhanced First Touch')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faHand} /></div>
                <span>Enhanced First Touch</span>
              </div>
              <div className={`focus-item ${activeFocus === 'progressive-shooting' ? 'active-focus' : ''}`} onClick={() => handleFocusClick('Progressive Shooting')}>
                <div className="focus-icon"><FontAwesomeIcon icon={faRocket} /></div>
                <span>Progressive Shooting</span>
              </div>
            </div>
          </div>
          
          <div className="training-details">
            <h3>Training Details</h3>
            
            <div id="training-positioning" className={`training-category ${activeFocus === 'positioning' ? 'active-focus' : ''}`}>
              <h4>Positioning</h4>
              <ul className="training-list">
                <li>Understanding space on the field</li>
                <li>Moving into passing lanes</li>
                <li>Supporting teammates without the ball</li>
                <li>Timing runs into space</li>
                <li>Defensive positioning basics</li>
              </ul>
            </div>
            
            <div id="training-advanced-passing" className={`training-category ${activeFocus === 'advanced-passing' ? 'active-focus' : ''}`}>
              <h4>Advanced Passing</h4>
              <ul className="training-list">
                <li>Moving short passes</li>
                <li>Passing after control</li>
                <li>One-two wall pass</li>
                <li>Low driven passes</li>
              </ul>
            </div>
            
            <div id="training-dribbling-development" className={`training-category ${activeFocus === 'dribbling-development' ? 'active-focus' : ''}`}>
              <h4>Dribbling Development</h4>
              <ul className="training-list">
                <li>Zigzag with speed</li>
                <li>Shielding while dribbling</li>
                <li>Dribbling with both feet</li>
                <li>Simple feints</li>
              </ul>
            </div>
            
            <div id="training-dynamic-ball-control" className={`training-category ${activeFocus === 'dynamic-ball-control' ? 'active-focus' : ''}`}>
              <h4>Ball Control</h4>
              <ul className="training-list">
                <li>Dynamic control while moving</li>
                <li>Sole & outside control mix</li>
                <li>Control and turn drills</li>
                <li>Ball manipulation in small space</li>
              </ul>
            </div>
            
            <div id="training-enhanced-first-touch" className={`training-category ${activeFocus === 'enhanced-first-touch' ? 'active-focus' : ''}`}>
              <h4>Receiving / First Touch</h4>
              <ul className="training-list">
                <li>First touch under light pressure</li>
                <li>Directional first touch</li>
                <li>Control from bouncing ball</li>
                <li>First touch into space</li>
              </ul>
            </div>
            
            <div id="training-progressive-shooting" className={`training-category ${activeFocus === 'progressive-shooting' ? 'active-focus' : ''}`}>
              <h4>Shooting</h4>
              <ul className="training-list">
                <li>Shooting while jogging</li>
                <li>One-touch shooting</li>
                <li>Low-driven shot</li>
                <li>Shooting after a pass</li>
              </ul>
            </div>
            
            <div id="training-improving-fitness" className={`training-category ${activeFocus === 'improving-fitness' ? 'active-focus' : ''}`}>
              <h4>Improving Fitness</h4>
              <ul className="training-list">
                <li>Basic stamina building (running drills)</li>
                <li>Ladder & cone agility exercises</li>
                <li>Coordination drills</li>
                <li>Core strength & balance workouts</li>
              </ul>
            </div>
          </div>
          
          <div className="level-cta">
            <button onClick={() => handleRegisterClick('level2')} className="btn btn-primary">Register for Level 2 - 650 EGP/month</button>
          </div>
        </section>
        
        {/* Level 3: Position Specialization */}
        <section 
          ref={level3Ref} 
          className={`program-section ${activeLevel === 'level3' ? 'active' : ''}`}
          id="level3"
        >
          <div className="level-header">
            <div className="level-info">
              <h2>Level 3: Position Specialization</h2>
              <div className="level-meta">
                <span className="level-duration">Duration: 2.5 months</span>
                <span className="level-difficulty">Intermediate-Advanced</span>
              </div>
              <p className="level-objective">Begin specializing by position with tailored training.</p>
            </div>
          </div>
          
          <div className="positions-grid">
            <h3>Positions</h3>
            <div className="position-buttons">
              <button 
                className={`position-btn ${activePosition === 'cb' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cb')}
              >
                Center Back (CB)
              </button>
              <button 
                className={`position-btn ${activePosition === 'fb' ? 'active' : ''}`}
                onClick={() => handlePositionClick('fb')}
              >
                Full-Back (RB, LB)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cdm' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cdm')}
              >
                Central Defensive Midfielder (CDM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cm' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cm')}
              >
                Central Midfielder (CM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cam' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cam')}
              >
                Attacking Midfielder (CAM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'st' ? 'active' : ''}`}
                onClick={() => handlePositionClick('st')}
              >
                Striker (ST)
              </button>
              <button 
                className={`position-btn ${activePosition === 'w' ? 'active' : ''}`}
                onClick={() => handlePositionClick('w')}
              >
                Winger (RW / LW)
              </button>
            </div>
            
            {/* Football Field Visualization */}
            <FootballField activePosition={activePosition} onPositionClick={handlePositionClick} />
          </div>
          
          {/* Position-specific content */}
          <div className="position-details">
            {activePosition === 'cb' && (
              <div className="position-content">
                <h3>Center Back (CB)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-tackling' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Tackling', 'cb')}
                    >
                      Tackling
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-heading' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Heading', 'cb')}
                    >
                      Heading
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-positioning' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Positioning', 'cb')}
                    >
                      Positioning
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-shooting' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Shooting', 'cb')}
                    >
                      Shooting
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-receiving' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Receiving', 'cb')}
                    >
                      Receiving
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-passing' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Passing', 'cb')}
                    >
                      Passing
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-dribbling' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Dribbling', 'cb')}
                    >
                      Dribbling
                    </span>
                    <span 
                      className={`focus-tag ${activeFocus === 'cb-ball-control' ? 'active-tag' : ''}`} 
                      onClick={() => handleFocusClick('Ball Control', 'cb')}
                    >
                      Ball Control
                    </span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cb-tackling" className={`training-category ${activeFocus === 'cb-tackling' ? 'active-focus' : ''}`}>
                    <h5>Tackling</h5>
                    <ul className="training-list">
                      <li>One-on-one tackles with controlled timing</li>
                      <li>Clearances under pressure</li>
                      <li>Blocking shots and passing lanes</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-heading" className={`training-category ${activeFocus === 'cb-heading' ? 'active-focus' : ''}`}>
                    <h5>Heading</h5>
                    <ul className="training-list">
                      <li>Heading to clear dangerous balls</li>
                      <li>Defensive headers during corners and crosses</li>
                      <li>Timing headers to win aerial duels</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-positioning" className={`training-category ${activeFocus === 'cb-positioning' ? 'active-focus' : ''}`}>
                    <h5>Positioning</h5>
                    <ul className="training-list">
                      <li>Reading the game and anticipating through balls</li>
                      <li>Maintaining shape during defensive transitions</li>
                      <li>Covering space behind the full-back during overlaps</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-shooting" className={`training-category ${activeFocus === 'cb-shooting' ? 'active-focus' : ''}`}>
                    <h5>Shooting</h5>
                    <ul className="training-list">
                      <li>Limited focus, headers during set pieces</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-receiving" className={`training-category ${activeFocus === 'cb-receiving' ? 'active-focus' : ''}`}>
                    <h5>Receiving</h5>
                    <ul className="training-list">
                      <li>Control under pressure in tight spaces</li>
                      <li>Receiving balls from goalkeepers or defenders with a clean touch</li>
                      <li>First touch into space</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-passing" className={`training-category ${activeFocus === 'cb-passing' ? 'active-focus' : ''}`}>
                    <h5>Passing</h5>
                    <ul className="training-list">
                      <li>Long diagonal passes under pressure</li>
                      <li>Short, safe passes to midfielders or full-backs</li>
                      <li>Playing out from the back</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-dribbling" className={`training-category ${activeFocus === 'cb-dribbling' ? 'active-focus' : ''}`}>
                    <h5>Dribbling</h5>
                    <ul className="training-list">
                      <li>Dribble out of defense under pressure</li>
                      <li>Protect the ball and pass to nearest teammate</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-ball-control" className={`training-category ${activeFocus === 'cb-ball-control' ? 'active-focus' : ''}`}>
                    <h5>Ball Control</h5>
                    <ul className="training-list">
                      <li>Control from aerial balls</li>
                      <li>Body control with movement</li>
                      <li>Quick recovery and passing under pressure</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'fb' && (
              <div className="position-content">
                <h3>Full-Back (RB, LB)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Tackling', 'fb')}>Tackling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Heading', 'fb')}>Heading</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Positioning', 'fb')}>Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Shooting', 'fb')}>Shooting</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Receiving', 'fb')}>Receiving</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Passing', 'fb')}>Passing</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Dribbling', 'fb')}>Dribbling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Control', 'fb')}>Ball Control</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-fb-tackling" className={`training-category ${activeFocus === 'fb-tackling' ? 'active-focus' : ''}`}>
                    <h5>Tackling</h5>
                    <ul className="training-list">
                      <li>Tackle wide players on the wings</li>
                      <li>Block crosses from wingers</li>
                      <li>Defend in 1v1 situations against wingers</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-heading" className={`training-category ${activeFocus === 'fb-heading' ? 'active-focus' : ''}`}>
                    <h5>Heading</h5>
                    <ul className="training-list">
                      <li>Defensive headers during crosses and set pieces</li>
                      <li>Heading to clear the ball from wide areas</li>
                      <li>Timing headers to intercept crosses</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-positioning" className={`training-category ${activeFocus === 'fb-positioning' ? 'active-focus' : ''}`}>
                    <h5>Positioning</h5>
                    <ul className="training-list">
                      <li>Tracking wingers during attacking runs</li>
                      <li>Positioning for overlapping runs</li>
                      <li>Getting back into position quickly after attacking runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-shooting" className={`training-category ${activeFocus === 'fb-shooting' ? 'active-focus' : ''}`}>
                    <h5>Shooting</h5>
                    <ul className="training-list">
                      <li>Shooting from wide areas after overlap</li>
                      <li>Shooting from outside the box</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-receiving" className={`training-category ${activeFocus === 'fb-receiving' ? 'active-focus' : ''}`}>
                    <h5>Receiving</h5>
                    <ul className="training-list">
                      <li>Receiving balls from wide positions</li>
                      <li>First touch when receiving long passes</li>
                      <li>Receiving and controlling crosses</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-passing" className={`training-category ${activeFocus === 'fb-passing' ? 'active-focus' : ''}`}>
                    <h5>Passing</h5>
                    <ul className="training-list">
                      <li>Early crosses into the box</li>
                      <li>Short passing to maintain possession</li>
                      <li>Switching the play with diagonal passes</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-dribbling" className={`training-category ${activeFocus === 'fb-dribbling' ? 'active-focus' : ''}`}>
                    <h5>Dribbling</h5>
                    <ul className="training-list">
                      <li>Dribbling past wingers</li>
                      <li>Quick direction changes while dribbling</li>
                      <li>Dribbling into space during overlapping runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-ball-control" className={`training-category ${activeFocus === 'fb-ball-control' ? 'active-focus' : ''}`}>
                    <h5>Ball Control</h5>
                    <ul className="training-list">
                      <li>Control while sprinting down the wing</li>
                      <li>Control when receiving passes from defenders</li>
                      <li>Ball manipulation in tight spaces</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cdm' && (
              <div className="position-content">
                <h3>Central Defensive Midfielder (CDM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Tackling', 'cdm')}>Tackling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Heading', 'cdm')}>Heading</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Positioning', 'cdm')}>Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Shooting', 'cdm')}>Shooting</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Receiving', 'cdm')}>Receiving</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Passing', 'cdm')}>Passing</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Dribbling', 'cdm')}>Dribbling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Control', 'cdm')}>Ball Control</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cdm-tackling" className={`training-category ${activeFocus === 'cdm-tackling' ? 'active-focus' : ''}`}>
                    <h5>Tackling</h5>
                    <ul className="training-list">
                      <li>Slide tackles to break up attacks</li>
                      <li>Intercept passes in midfield</li>
                      <li>Recover possession by tracking attacking runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-heading" className={`training-category ${activeFocus === 'cdm-heading' ? 'active-focus' : ''}`}>
                    <h5>Heading</h5>
                    <ul className="training-list">
                      <li>Heading to win aerial duels in midfield</li>
                      <li>Defensive headers to clear danger from long balls</li>
                      <li>Timing headers to disrupt the opposition's attack</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-positioning" className={`training-category ${activeFocus === 'cdm-positioning' ? 'active-focus' : ''}`}>
                    <h5>Positioning</h5>
                    <ul className="training-list">
                      <li>Positioning in front of the defensive line</li>
                      <li>Covering space for center-backs during counter-attacks</li>
                      <li>Positioning to receive passes from defenders</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-shooting" className={`training-category ${activeFocus === 'cdm-shooting' ? 'active-focus' : ''}`}>
                    <h5>Shooting</h5>
                    <ul className="training-list">
                      <li>Limited focus, occasional long-range shots</li>
                      <li>Shooting from deep positions after recovering the ball</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-receiving" className={`training-category ${activeFocus === 'cdm-receiving' ? 'active-focus' : ''}`}>
                    <h5>Receiving</h5>
                    <ul className="training-list">
                      <li>Receiving under pressure in tight spaces</li>
                      <li>Receiving passes from defenders and transitioning to attack</li>
                      <li>Receiving and playing quick one-touch passes</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-passing" className={`training-category ${activeFocus === 'cdm-passing' ? 'active-focus' : ''}`}>
                    <h5>Passing</h5>
                    <ul className="training-list">
                      <li>Short passes to maintain possession</li>
                      <li>Long passes to switch play and create space</li>
                      <li>Passing through the opposition's midfield to attack</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-dribbling" className={`training-category ${activeFocus === 'cdm-dribbling' ? 'active-focus' : ''}`}>
                    <h5>Dribbling</h5>
                    <ul className="training-list">
                      <li>Dribbling out of tight situations in midfield</li>
                      <li>Shielding the ball from opposition tackles</li>
                      <li>Dribbling to break opposition's press</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-ball-control" className={`training-category ${activeFocus === 'cdm-ball-control' ? 'active-focus' : ''}`}>
                    <h5>Ball Control</h5>
                    <ul className="training-list">
                      <li>Control under pressure in midfield</li>
                      <li>Control from aerial balls</li>
                      <li>Maintaining possession under pressure</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cm' && (
              <div className="position-content">
                <h3>Central Midfielder (CM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Box-to-Box Movement', 'cm')}>Box-to-Box Movement</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Progression', 'cm')}>Ball Progression</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Short & Long Passing Mix', 'cm')}>Short & Long Passing Mix</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Defensive Recovery', 'cm')}>Defensive Recovery</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Vision & Decision Making', 'cm')}>Vision & Decision Making</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Game Tempo Control', 'cm')}>Game Tempo Control</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Press Resistance', 'cm')}>Press Resistance</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Midfield Positioning', 'cm')}>Midfield Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Control on the Move', 'cm')}>Ball Control on the Move</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cm-box-to-box-movement" className={`training-category ${activeFocus === 'box-to-box-movement' ? 'active-focus' : ''}`}>
                    <h5>Box-to-Box Movement</h5>
                    <ul className="training-list">
                      <li>Late runs into box</li>
                      <li>Recovery runs after attacking</li>
                      <li>Supporting both defense and attack</li>
                      <li>Tracking runners from midfield</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-ball-progression" className={`training-category ${activeFocus === 'ball-progression' ? 'active-focus' : ''}`}>
                    <h5>Ball Progression</h5>
                    <ul className="training-list">
                      <li>Driving with ball from deep</li>
                      <li>Combination passing in buildup</li>
                      <li>2v1 overloads</li>
                      <li>Beating first press line</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-short-&-long-passing-mix" className={`training-category ${activeFocus === 'short-&-long-passing-mix' ? 'active-focus' : ''}`}>
                    <h5>Short & Long Passing Mix</h5>
                    <ul className="training-list">
                      <li>Switches under pressure</li>
                      <li>Split passes in tight areas</li>
                      <li>Bounce passes</li>
                      <li>Pass and move drills</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-defensive-recovery" className={`training-category ${activeFocus === 'defensive-recovery' ? 'active-focus' : ''}`}>
                    <h5>Defensive Recovery</h5>
                    <ul className="training-list">
                      <li>Sprint recoveries into defensive line</li>
                      <li>Recovery tackling</li>
                      <li>Cutting off counters</li>
                      <li>Last-ditch pressure</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-vision-&-decision-making" className={`training-category ${activeFocus === 'vision-&-decision-making' ? 'active-focus' : ''}`}>
                    <h5>Vision & Decision Making</h5>
                    <ul className="training-list">
                      <li>Situational pass selection</li>
                      <li>Awareness of striker and winger runs</li>
                      <li>Using decoys</li>
                      <li>Quick release decision drills</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-game-tempo-control" className={`training-category ${activeFocus === 'game-tempo-control' ? 'active-focus' : ''}`}>
                    <h5>Game Tempo Control</h5>
                    <ul className="training-list">
                      <li>Slowing down fast games</li>
                      <li>Switching rhythm mid-play</li>
                      <li>Triggering fast breaks</li>
                      <li>Playing safe in winning moments</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-press-resistance" className={`training-category ${activeFocus === 'press-resistance' ? 'active-focus' : ''}`}>
                    <h5>Press Resistance</h5>
                    <ul className="training-list">
                      <li>Turning with a man behind</li>
                      <li>Shielding with side passes</li>
                      <li>Lateral movement under press</li>
                      <li>Outlet options usage</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-midfield-positioning" className={`training-category ${activeFocus === 'midfield-positioning' ? 'active-focus' : ''}`}>
                    <h5>Midfield Positioning</h5>
                    <ul className="training-list">
                      <li>Covering fullback space</li>
                      <li>Staggered line movements</li>
                      <li>Vertical compactness</li>
                      <li>Positioning to dictate tempo</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-ball-control-on-the-move" className={`training-category ${activeFocus === 'ball-control-on-the-move' ? 'active-focus' : ''}`}>
                    <h5>Ball Control on the Move</h5>
                    <ul className="training-list">
                      <li>Receiving while running</li>
                      <li>Controlling with opposite foot</li>
                      <li>Ground ball take-ins</li>
                      <li>Handling miscontrolled balls</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cam' && (
              <div className="position-content">
                <h3>Attacking Midfielder (CAM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Through Balls', 'cam')}>Through Balls</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Final Third Decision Making', 'cam')}>Final Third Decision Making</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Movement Between Lines', 'cam')}>Movement Between Lines</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Close Control in Tight Spaces', 'cam')}>Close Control in Tight Spaces</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Long Shots', 'cam')}>Long Shots</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Quick Combination Play', 'cam')}>Quick Combination Play</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('One-Touch Creativity', 'cam')}>One-Touch Creativity</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Vision & Scanning', 'cam')}>Vision & Scanning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Pressing High Up', 'cam')}>Pressing High Up</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cam-through-balls" className={`training-category ${activeFocus === 'through-balls' ? 'active-focus' : ''}`}>
                    <h5>Through Balls</h5>
                    <ul className="training-list">
                      <li>Timed through passes</li>
                      <li>Reverse through balls</li>
                      <li>Vertical threading</li>
                      <li>Split-line passing</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-final-third-decision-making" className={`training-category ${activeFocus === 'final-third-decision-making' ? 'active-focus' : ''}`}>
                    <h5>Final Third Decision Making</h5>
                    <ul className="training-list">
                      <li>Shot vs pass decisions</li>
                      <li>Awareness of striker positions</li>
                      <li>Final pass under pressure</li>
                      <li>Situational improvisation</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-movement-between-lines" className={`training-category ${activeFocus === 'movement-between-lines' ? 'active-focus' : ''}`}>
                    <h5>Movement Between Lines</h5>
                    <ul className="training-list">
                      <li>Ghosting behind midfield</li>
                      <li>Timing runs behind defenders</li>
                      <li>Staying in pockets</li>
                      <li>Reacting to striker movement</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-close-control-in-tight-spaces" className={`training-category ${activeFocus === 'close-control-in-tight-spaces' ? 'active-focus' : ''}`}>
                    <h5>Close Control in Tight Spaces</h5>
                    <ul className="training-list">
                      <li>Small space dribbles</li>
                      <li>Shielding with 2 defenders near</li>
                      <li>One-foot feints</li>
                      <li>Body control under contact</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-long-shots" className={`training-category ${activeFocus === 'long-shots' ? 'active-focus' : ''}`}>
                    <h5>Long Shots</h5>
                    <ul className="training-list">
                      <li>Long-range power shots</li>
                      <li>Shots from bouncing balls</li>
                      <li>Placement from edge of box</li>
                      <li>Fakes before shooting</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-quick-combination-play" className={`training-category ${activeFocus === 'quick-combination-play' ? 'active-focus' : ''}`}>
                    <h5>Quick Combination Play</h5>
                    <ul className="training-list">
                      <li>One-two in the box</li>
                      <li>Triangle plays</li>
                      <li>Flicks and layoffs</li>
                      <li>Dummy runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-one-touch-creativity" className={`training-category ${activeFocus === 'one-touch-creativity' ? 'active-focus' : ''}`}>
                    <h5>One-Touch Creativity</h5>
                    <ul className="training-list">
                      <li>One-touch through balls</li>
                      <li>One-touch passes under pressure</li>
                      <li>One-touch shots</li>
                      <li>Redirection plays</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-vision-&-scanning" className={`training-category ${activeFocus === 'vision-&-scanning' ? 'active-focus' : ''}`}>
                    <h5>Vision & Scanning</h5>
                    <ul className="training-list">
                      <li>Peripheral passing drills</li>
                      <li>Scanning in final third</li>
                      <li>Identifying blind-side runs</li>
                      <li>Decision-making off the ball</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-pressing-high-up" className={`training-category ${activeFocus === 'pressing-high-up' ? 'active-focus' : ''}`}>
                    <h5>Pressing High Up</h5>
                    <ul className="training-list">
                      <li>First line press drills</li>
                      <li>Angle pressing on CBs</li>
                      <li>Triggered team pressing</li>
                      <li>Blocking vertical passes</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'st' && (
              <div className="position-content">
                <h3>Striker (ST)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className={`focus-tag ${activeFocus === 'st-finishing-variety' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Finishing Variety', 'st')}>Finishing Variety</span>
                    <span className={`focus-tag ${activeFocus === 'st-movement-in-the-box' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Movement in the Box', 'st')}>Movement in the Box</span>
                    <span className={`focus-tag ${activeFocus === 'st-aerial-threat' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Aerial Threat', 'st')}>Aerial Threat</span>
                    <span className={`focus-tag ${activeFocus === 'st-first-touch-to-shoot' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('First Touch to Shoot', 'st')}>First Touch to Shoot</span>
                    <span className={`focus-tag ${activeFocus === 'st-link-up-play' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Link-Up Play', 'st')}>Link-Up Play</span>
                    <span className={`focus-tag ${activeFocus === 'st-attacking-positioning' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Attacking Positioning', 'st')}>Attacking Positioning</span>
                    <span className={`focus-tag ${activeFocus === 'st-one-touch-finishing' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('One-Touch Finishing', 'st')}>One-Touch Finishing</span>
                    <span className={`focus-tag ${activeFocus === 'st-timing-of-runs' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Timing of Runs', 'st')}>Timing of Runs</span>
                    <span className={`focus-tag ${activeFocus === 'st-pressing-from-the-front' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Pressing from the Front', 'st')}>Pressing from the Front</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-st-finishing-variety" className={`training-category ${activeFocus === 'st-finishing-variety' ? 'active-focus' : ''}`}>
                    <h5>Finishing Variety</h5>
                    <ul className="training-list">
                      <li>Near post finishes</li>
                      <li>Outside foot finishes</li>
                      <li>First-time volleys</li>
                      <li>Driven shots low</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Movement in the Box</h5>
                    <ul className="training-list">
                      <li>Fake and run movements</li>
                      <li>Delayed box entries</li>
                      <li>Blind side positioning</li>
                      <li>Rebounds anticipation</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Aerial Threat</h5>
                    <ul className="training-list">
                      <li>Heading from crosses</li>
                      <li>Jump timing drills</li>
                      <li>Headers under contact</li>
                      <li>Redirecting aerial balls</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>First Touch to Shoot</h5>
                    <ul className="training-list">
                      <li>Setup touch before shot</li>
                      <li>Controlling bouncing balls</li>
                      <li>Shift-and-shoot drills</li>
                      <li>Quick setup from passes</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Link-Up Play</h5>
                    <ul className="training-list">
                      <li>Wall passes with CAM</li>
                      <li>Layoffs to wings</li>
                      <li>Shielding and turning</li>
                      <li>Drag defenders wide</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Attacking Positioning</h5>
                    <ul className="training-list">
                      <li>Positioning for cutbacks</li>
                      <li>Staying onside on last man</li>
                      <li>Finding space in box</li>
                      <li>Reacting to crosses</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>One-Touch Finishing</h5>
                    <ul className="training-list">
                      <li>Rebound finishes</li>
                      <li>Flicks from close range</li>
                      <li>Fast ball-to-shot actions</li>
                      <li>Redirecting low crosses</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Timing of Runs</h5>
                    <ul className="training-list">
                      <li>Curved runs behind line</li>
                      <li>Beating offside trap</li>
                      <li>Coordinating with CAM</li>
                      <li>Double movements</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Pressing from the Front</h5>
                    <ul className="training-list">
                      <li>Triggered pressing from goal kicks</li>
                      <li>Closing CB passing lanes</li>
                      <li>Team press initiation</li>
                      <li>Angled press for forced error</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'w' && (
              <div className="position-content">
                <h3>Winger (RW / LW)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className={`focus-tag ${activeFocus === 'w-1v1-dribbling' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('1v1 Dribbling', 'w')}>1v1 Dribbling</span>
                    <span className={`focus-tag ${activeFocus === 'w-crossing-under-pressure' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Crossing Under Pressure', 'w')}>Crossing Under Pressure</span>
                    <span className={`focus-tag ${activeFocus === 'w-diagonal-runs' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Diagonal Runs', 'w')}>Diagonal Runs</span>
                    <span className={`focus-tag ${activeFocus === 'w-shooting-from-wide-angles' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Shooting from Wide Angles', 'w')}>Shooting from Wide Angles</span>
                    <span className={`focus-tag ${activeFocus === 'w-receiving-on-the-move' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Receiving on the Move', 'w')}>Receiving on the Move</span>
                    <span className={`focus-tag ${activeFocus === 'w-isolation-play' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Isolation Play', 'w')}>Isolation Play</span>
                    <span className={`focus-tag ${activeFocus === 'w-tracking-back-&-pressing' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Tracking Back & Pressing', 'w')}>Tracking Back & Pressing</span>
                    <span className={`focus-tag ${activeFocus === 'w-link-up-with-fullback' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Link-Up with Fullback', 'w')}>Link-Up with Fullback</span>
                    <span className={`focus-tag ${activeFocus === 'w-acceleration-&-agility' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Acceleration & Agility', 'w')}>Acceleration & Agility</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-w-1v1-dribbling" className={`training-category ${activeFocus === 'w-1v1-dribbling' ? 'active-focus' : ''}`}>
                    <h5>1v1 Dribbling</h5>
                    <ul className="training-list">
                      <li>Beating fullbacks with both feet</li>
                      <li>Body feints at speed</li>
                      <li>Stop-and-go moves</li>
                      <li>Cutbacks in final third</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-crossing-under-pressure" className={`training-category ${activeFocus === 'w-crossing-under-pressure' ? 'active-focus' : ''}`}>
                    <h5>Crossing Under Pressure</h5>
                    <ul className="training-list">
                      <li>Crosses while sprinting</li>
                      <li>Low driven crosses</li>
                      <li>Cutbacks from byline</li>
                      <li>Switching crossing foot</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-diagonal-runs" className={`training-category ${activeFocus === 'w-diagonal-runs' ? 'active-focus' : ''}`}>
                    <h5>Diagonal Runs</h5>
                    <ul className="training-list">
                      <li>Inside runs behind CB</li>
                      <li>Outside-to-inside sprints</li>
                      <li>Timing with CAM passes</li>
                      <li>Staying onside diagonally</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-shooting-from-wide-angles" className={`training-category ${activeFocus === 'w-shooting-from-wide-angles' ? 'active-focus' : ''}`}>
                    <h5>Shooting from Wide Angles</h5>
                    <ul className="training-list">
                      <li>Curved shots to far post</li>
                      <li>Power shots near post</li>
                      <li>Tight-angle volleys</li>
                      <li>First-touch shots after cut-in</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-receiving-on-the-move" className={`training-category ${activeFocus === 'w-receiving-on-the-move' ? 'active-focus' : ''}`}>
                    <h5>Receiving on the Move</h5>
                    <ul className="training-list">
                      <li>Receiving at top speed</li>
                      <li>Cushioning high passes</li>
                      <li>Controlling long switches</li>
                      <li>Back foot receiving</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-isolation-play" className={`training-category ${activeFocus === 'w-isolation-play' ? 'active-focus' : ''}`}>
                    <h5>Isolation Play</h5>
                    <ul className="training-list">
                      <li>Creating 1v1s</li>
                      <li>Holding defender wide</li>
                      <li>Beating man then crossing</li>
                      <li>Resetting and retrying</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-tracking-back-&-pressing" className={`training-category ${activeFocus === 'w-tracking-back-&-pressing' ? 'active-focus' : ''}`}>
                    <h5>Tracking Back & Pressing</h5>
                    <ul className="training-list">
                      <li>Recovering on opposition fullbacks</li>
                      <li>Coordinated press with CAM</li>
                      <li>Delaying counters</li>
                      <li>Pressing high from the wing</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-link-up-with-fullback" className={`training-category ${activeFocus === 'w-link-up-with-fullback' ? 'active-focus' : ''}`}>
                    <h5>Link-Up with Fullback</h5>
                    <ul className="training-list">
                      <li>Overlap and underlap setups</li>
                      <li>Quick give-and-go</li>
                      <li>Switching roles in attack</li>
                      <li>Pulling defenders for space</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-acceleration-&-agility" className={`training-category ${activeFocus === 'w-acceleration-&-agility' ? 'active-focus' : ''}`}>
                    <h5>Acceleration & Agility</h5>
                    <ul className="training-list">
                      <li>Quick burst starts</li>
                      <li>Stop-and-turn speed</li>
                      <li>Short sprint repeats</li>
                      <li>Agility with direction change</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {!activePosition && (
              <div className="position-prompt">
                <p>Select a position above to view specialized training details.</p>
              </div>
            )}
          </div>
          
          <div className="level-cta">
            <button onClick={() => handleRegisterClick('level3')} className="btn btn-primary">Register for Level 3 - 650 EGP/month</button>
          </div>
        </section>
        
        {/* Level 4: Advanced Specialization */}
        <section 
          ref={level4Ref} 
          className={`program-section ${activeLevel === 'level4' ? 'active' : ''}`}
          id="level4"
        >
          <div className="level-header">
            <div className="level-info">
              <h2>Level 4: Advanced Specialization</h2>
              <div className="level-meta">
                <span className="level-duration">Duration: 3 months</span>
                <span className="level-difficulty">Advanced</span>
              </div>
              <p className="level-objective">Advanced position-specific training focused on competitive play.</p>
            </div>
          </div>
          
          <div className="level-overview">
            <p>This advanced program builds on Level 3 specialization with more complex techniques and higher intensity. Each position receives dedicated training focused on developing elite-level skills required for competitive play.</p>
          </div>
          
          <div className="positions-grid">
            <h3>Positions</h3>
            <div className="position-buttons">
              <button 
                className={`position-btn ${activePosition === 'cb' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cb')}
              >
                Center Back (CB)
              </button>
              <button 
                className={`position-btn ${activePosition === 'fb' ? 'active' : ''}`}
                onClick={() => handlePositionClick('fb')}
              >
                Full-Back (RB, LB)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cdm' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cdm')}
              >
                Central Defensive Midfielder (CDM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cm' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cm')}
              >
                Central Midfielder (CM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'cam' ? 'active' : ''}`}
                onClick={() => handlePositionClick('cam')}
              >
                Attacking Midfielder (CAM)
              </button>
              <button 
                className={`position-btn ${activePosition === 'st' ? 'active' : ''}`}
                onClick={() => handlePositionClick('st')}
              >
                Striker (ST)
              </button>
              <button 
                className={`position-btn ${activePosition === 'w' ? 'active' : ''}`}
                onClick={() => handlePositionClick('w')}
              >
                Winger (RW / LW)
              </button>
            </div>
            
            {/* Football Field Visualization */}
            <FootballField activePosition={activePosition} onPositionClick={handlePositionClick} />
          </div>
          
          {/* Position-specific content */}
          <div className="position-details">
            {activePosition === 'cb' && (
              <div className="position-content">
                <h3>Center Back (CB)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className={`focus-tag ${activeFocus === 'cb-l4-tackling' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Tackling', 'cb-l4')}>Tackling</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-heading' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Heading', 'cb-l4')}>Heading</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-positioning' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Positioning', 'cb-l4')}>Positioning</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-long-passing' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Long Passing', 'cb-l4')}>Long Passing</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-dribbling-under-pressure' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Dribbling Under Pressure', 'cb-l4')}>Dribbling Under Pressure</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-ball-control' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Ball Control', 'cb-l4')}>Ball Control</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-leadership-&-communication' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Leadership & Communication', 'cb-l4')}>Leadership & Communication</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-defensive-transitions' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Defensive Transitions', 'cb-l4')}>Defensive Transitions</span>
                    <span className={`focus-tag ${activeFocus === 'cb-l4-aerial-dominance' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Aerial Dominance', 'cb-l4')}>Aerial Dominance</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cb-l4-tackling" className={`training-category ${activeFocus === 'cb-l4-tackling' ? 'active-focus' : ''}`}>
                    <h5>Tackling</h5>
                    <ul className="training-list">
                      <li>Tackles while covering for teammates</li>
                      <li>Slide tackles in the penalty box with accuracy</li>
                      <li>Delayed tackling against tricky forwards</li>
                      <li>Front-foot tackles to intercept early</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-heading" className={`training-category ${activeFocus === 'cb-l4-heading' ? 'active-focus' : ''}`}>
                    <h5>Heading</h5>
                    <ul className="training-list">
                      <li>Heading in high-pressure aerial duels</li>
                      <li>Clearing headers aimed at teammates</li>
                      <li>Timed jumps against taller strikers</li>
                      <li>Directing headers during defensive set pieces</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-positioning" className={`training-category ${activeFocus === 'cb-l4-positioning' ? 'active-focus' : ''}`}>
                    <h5>Positioning</h5>
                    <ul className="training-list">
                      <li>Adjusting line position based on midfield pressure</li>
                      <li>Recovery positioning after losing duels</li>
                      <li>Tracking late runs from deep midfielders</li>
                      <li>Positioning during quick defensive rotations</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-long-passing" className={`training-category ${activeFocus === 'cb-l4-long-passing' ? 'active-focus' : ''}`}>
                    <h5>Long Passing</h5>
                    <ul className="training-list">
                      <li>Diagonal switches to wide players</li>
                      <li>Long balls behind opposition defense</li>
                      <li>Breaking lines with accurate lofted passes</li>
                      <li>Fast release long passes under pressing</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-dribbling-under-pressure" className={`training-category ${activeFocus === 'cb-l4-dribbling-under-pressure' ? 'active-focus' : ''}`}>
                    <h5>Dribbling Under Pressure</h5>
                    <ul className="training-list">
                      <li>Close control to escape pressing attackers</li>
                      <li>Dribbling into midfield space</li>
                      <li>Quick ball movement under contact</li>
                      <li>Shielding while dribbling backwards</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-ball-control" className={`training-category ${activeFocus === 'cb-l4-ball-control' ? 'active-focus' : ''}`}>
                    <h5>Ball Control</h5>
                    <ul className="training-list">
                      <li>Instant control of fast ground passes</li>
                      <li>Chest control under high pressure</li>
                      <li>Receiving awkward bounces or spins</li>
                      <li>Controlling loose balls in the box</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-leadership-&-communication" className={`training-category ${activeFocus === 'cb-l4-leadership-&-communication' ? 'active-focus' : ''}`}>
                    <h5>Leadership & Communication</h5>
                    <ul className="training-list">
                      <li>Commanding the backline vocally</li>
                      <li>Coordinating the offside trap</li>
                      <li>Communicating with midfielders during press</li>
                      <li>Taking initiative in high-pressure moments</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-defensive-transitions" className={`training-category ${activeFocus === 'cb-l4-defensive-transitions' ? 'active-focus' : ''}`}>
                    <h5>Defensive Transitions</h5>
                    <ul className="training-list">
                      <li>Shifting shape quickly after turnovers</li>
                      <li>Recovery runs from advanced positions</li>
                      <li>Reading opponent's counters early</li>
                      <li>Resetting the line under disorganization</li>
                    </ul>
                  </div>
                  
                  <div id="training-cb-l4-aerial-dominance" className={`training-category ${activeFocus === 'cb-l4-aerial-dominance' ? 'active-focus' : ''}`}>
                    <h5>Aerial Dominance</h5>
                    <ul className="training-list">
                      <li>Outjumping opponents consistently</li>
                      <li>Heading with purpose (not just clearance)</li>
                      <li>Maintaining balance mid-air</li>
                      <li>Winning 2nd balls after aerial duels</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'fb' && (
              <div className="position-content">
                <h3>Full-Back (RB, LB)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('1v1 Defending', 'fb-l4')}>1v1 Defending</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Crossing', 'fb-l4')}>Crossing</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Overlapping Runs', 'fb-l4')}>Overlapping Runs</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Recovery Speed', 'fb-l4')}>Recovery Speed</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Defensive Positioning', 'fb-l4')}>Defensive Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Crossing Under Pressure', 'fb-l4')}>Crossing Under Pressure</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Dribbling at Speed', 'fb-l4')}>Dribbling at Speed</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Weak Foot Development', 'fb-l4')}>Weak Foot Development</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Transition Play', 'fb-l4')}>Transition Play</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-fb-l4-1v1-defending" className={`training-category ${activeFocus === 'fb-l4-1v1-defending' ? 'active-focus' : ''}`}>
                    <h5>1v1 Defending</h5>
                    <ul className="training-list">
                      <li>Show attacker outside drills</li>
                      <li>Tackling in wide areas</li>
                      <li>Jockeying & body feint reading</li>
                      <li>Forcing play into weak foot</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-crossing" className={`training-category ${activeFocus === 'fb-l4-crossing' ? 'active-focus' : ''}`}>
                    <h5>Crossing</h5>
                    <ul className="training-list">
                      <li>Low crosses near the box</li>
                      <li>Deep crosses to far post</li>
                      <li>Whipped crosses on the run</li>
                      <li>One-touch crosses after overlap</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-overlapping-runs" className={`training-category ${activeFocus === 'fb-l4-overlapping-runs' ? 'active-focus' : ''}`}>
                    <h5>Overlapping Runs</h5>
                    <ul className="training-list">
                      <li>Timed overlaps from deep</li>
                      <li>Blindside runs behind wide midfielders</li>
                      <li>Link-up plays with winger</li>
                      <li>Underlap drills in narrow situations</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-recovery-speed" className={`training-category ${activeFocus === 'fb-l4-recovery-speed' ? 'active-focus' : ''}`}>
                    <h5>Recovery Speed</h5>
                    <ul className="training-list">
                      <li>Sprint recoveries from high position</li>
                      <li>Angled recovery runs</li>
                      <li>Sprint-turn-sprint transitions</li>
                      <li>Delayed press then recover drills</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-defensive-positioning" className={`training-category ${activeFocus === 'fb-l4-defensive-positioning' ? 'active-focus' : ''}`}>
                    <h5>Defensive Positioning</h5>
                    <ul className="training-list">
                      <li>Body shape when defending diagonals</li>
                      <li>Narrowing when ball is on opposite side</li>
                      <li>Covering CB when dragged wide</li>
                      <li>Delaying play vs fast wingers</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-crossing-under-pressure" className={`training-category ${activeFocus === 'fb-l4-crossing-under-pressure' ? 'active-focus' : ''}`}>
                    <h5>Crossing Under Pressure</h5>
                    <ul className="training-list">
                      <li>Deliveries with defender closing down</li>
                      <li>Early crosses before contact</li>
                      <li>Fake cross then cut back and deliver</li>
                      <li>Crosses from poor angles</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-dribbling-at-speed" className={`training-category ${activeFocus === 'fb-l4-dribbling-at-speed' ? 'active-focus' : ''}`}>
                    <h5>Dribbling at Speed</h5>
                    <ul className="training-list">
                      <li>Dribbling while sprinting on flank</li>
                      <li>First touch into space under pressure</li>
                      <li>Explosive acceleration with ball</li>
                      <li>Handling pressure near sideline</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-weak-foot-development" className={`training-category ${activeFocus === 'fb-l4-weak-foot-development' ? 'active-focus' : ''}`}>
                    <h5>Weak Foot Development</h5>
                    <ul className="training-list">
                      <li>Weak foot driven crosses</li>
                      <li>Clearance with weak foot</li>
                      <li>Short passes under pressure</li>
                      <li>Control and release with weak side</li>
                    </ul>
                  </div>
                  
                  <div id="training-fb-l4-transition-play" className={`training-category ${activeFocus === 'fb-l4-transition-play' ? 'active-focus' : ''}`}>
                    <h5>Transition Play</h5>
                    <ul className="training-list">
                      <li>Attacking to defensive transition drills</li>
                      <li>Reacting fast after lost ball</li>
                      <li>Shifting shape with midfield line</li>
                      <li>Coordinating with winger on switch</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cdm' && (
              <div className="position-content">
                <h3>Central Defensive Midfielder (CDM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Tackling', 'cdm')}>Tackling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Heading', 'cdm')}>Heading</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Positioning', 'cdm')}>Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Shooting', 'cdm')}>Shooting</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Receiving', 'cdm')}>Receiving</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Passing', 'cdm')}>Passing</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Dribbling', 'cdm')}>Dribbling</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Control', 'cdm')}>Ball Control</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cdm-tackling" className={`training-category ${activeFocus === 'cdm-tackling' ? 'active-focus' : ''}`}>
                    <h5>Tackling</h5>
                    <ul className="training-list">
                      <li>Slide tackles to break up attacks</li>
                      <li>Intercept passes in midfield</li>
                      <li>Recover possession by tracking attacking runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-heading" className={`training-category ${activeFocus === 'cdm-heading' ? 'active-focus' : ''}`}>
                    <h5>Heading</h5>
                    <ul className="training-list">
                      <li>Heading to win aerial duels in midfield</li>
                      <li>Defensive headers to clear danger from long balls</li>
                      <li>Timing headers to disrupt the opposition's attack</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-positioning" className={`training-category ${activeFocus === 'cdm-positioning' ? 'active-focus' : ''}`}>
                    <h5>Positioning</h5>
                    <ul className="training-list">
                      <li>Positioning in front of the defensive line</li>
                      <li>Covering space for center-backs during counter-attacks</li>
                      <li>Positioning to receive passes from defenders</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-shooting" className={`training-category ${activeFocus === 'cdm-shooting' ? 'active-focus' : ''}`}>
                    <h5>Shooting</h5>
                    <ul className="training-list">
                      <li>Limited focus, occasional long-range shots</li>
                      <li>Shooting from deep positions after recovering the ball</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-receiving" className={`training-category ${activeFocus === 'cdm-receiving' ? 'active-focus' : ''}`}>
                    <h5>Receiving</h5>
                    <ul className="training-list">
                      <li>Receiving under pressure in tight spaces</li>
                      <li>Receiving passes from defenders and transitioning to attack</li>
                      <li>Receiving and playing quick one-touch passes</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-passing" className={`training-category ${activeFocus === 'cdm-passing' ? 'active-focus' : ''}`}>
                    <h5>Passing</h5>
                    <ul className="training-list">
                      <li>Short passes to maintain possession</li>
                      <li>Long passes to switch play and create space</li>
                      <li>Passing through the opposition's midfield to attack</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-dribbling" className={`training-category ${activeFocus === 'cdm-dribbling' ? 'active-focus' : ''}`}>
                    <h5>Dribbling</h5>
                    <ul className="training-list">
                      <li>Dribbling out of tight situations in midfield</li>
                      <li>Shielding the ball from opposition tackles</li>
                      <li>Dribbling to break opposition's press</li>
                    </ul>
                  </div>
                  
                  <div id="training-cdm-ball-control" className={`training-category ${activeFocus === 'cdm-ball-control' ? 'active-focus' : ''}`}>
                    <h5>Ball Control</h5>
                    <ul className="training-list">
                      <li>Control under pressure in midfield</li>
                      <li>Control from aerial balls</li>
                      <li>Maintaining possession under pressure</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cm' && (
              <div className="position-content">
                <h3>Central Midfielder (CM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Box-to-Box Movement', 'cm')}>Box-to-Box Movement</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Progression', 'cm')}>Ball Progression</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Short & Long Passing Mix', 'cm')}>Short & Long Passing Mix</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Defensive Recovery', 'cm')}>Defensive Recovery</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Vision & Decision Making', 'cm')}>Vision & Decision Making</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Game Tempo Control', 'cm')}>Game Tempo Control</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Press Resistance', 'cm')}>Press Resistance</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Midfield Positioning', 'cm')}>Midfield Positioning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Ball Control on the Move', 'cm')}>Ball Control on the Move</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cm-box-to-box-movement" className={`training-category ${activeFocus === 'box-to-box-movement' ? 'active-focus' : ''}`}>
                    <h5>Box-to-Box Movement</h5>
                    <ul className="training-list">
                      <li>Late runs into box</li>
                      <li>Recovery runs after attacking</li>
                      <li>Supporting both defense and attack</li>
                      <li>Tracking runners from midfield</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-ball-progression" className={`training-category ${activeFocus === 'ball-progression' ? 'active-focus' : ''}`}>
                    <h5>Ball Progression</h5>
                    <ul className="training-list">
                      <li>Driving with ball from deep</li>
                      <li>Combination passing in buildup</li>
                      <li>2v1 overloads</li>
                      <li>Beating first press line</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-short-&-long-passing-mix" className={`training-category ${activeFocus === 'short-&-long-passing-mix' ? 'active-focus' : ''}`}>
                    <h5>Short & Long Passing Mix</h5>
                    <ul className="training-list">
                      <li>Switches under pressure</li>
                      <li>Split passes in tight areas</li>
                      <li>Bounce passes</li>
                      <li>Pass and move drills</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-defensive-recovery" className={`training-category ${activeFocus === 'defensive-recovery' ? 'active-focus' : ''}`}>
                    <h5>Defensive Recovery</h5>
                    <ul className="training-list">
                      <li>Sprint recoveries into defensive line</li>
                      <li>Recovery tackling</li>
                      <li>Cutting off counters</li>
                      <li>Last-ditch pressure</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-vision-&-decision-making" className={`training-category ${activeFocus === 'vision-&-decision-making' ? 'active-focus' : ''}`}>
                    <h5>Vision & Decision Making</h5>
                    <ul className="training-list">
                      <li>Situational pass selection</li>
                      <li>Awareness of striker and winger runs</li>
                      <li>Using decoys</li>
                      <li>Quick release decision drills</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-game-tempo-control" className={`training-category ${activeFocus === 'game-tempo-control' ? 'active-focus' : ''}`}>
                    <h5>Game Tempo Control</h5>
                    <ul className="training-list">
                      <li>Slowing down fast games</li>
                      <li>Switching rhythm mid-play</li>
                      <li>Triggering fast breaks</li>
                      <li>Playing safe in winning moments</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-press-resistance" className={`training-category ${activeFocus === 'press-resistance' ? 'active-focus' : ''}`}>
                    <h5>Press Resistance</h5>
                    <ul className="training-list">
                      <li>Turning with a man behind</li>
                      <li>Shielding with side passes</li>
                      <li>Lateral movement under press</li>
                      <li>Outlet options usage</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-midfield-positioning" className={`training-category ${activeFocus === 'midfield-positioning' ? 'active-focus' : ''}`}>
                    <h5>Midfield Positioning</h5>
                    <ul className="training-list">
                      <li>Covering fullback space</li>
                      <li>Staggered line movements</li>
                      <li>Vertical compactness</li>
                      <li>Positioning to dictate tempo</li>
                    </ul>
                  </div>
                  
                  <div id="training-cm-ball-control-on-the-move" className={`training-category ${activeFocus === 'ball-control-on-the-move' ? 'active-focus' : ''}`}>
                    <h5>Ball Control on the Move</h5>
                    <ul className="training-list">
                      <li>Receiving while running</li>
                      <li>Controlling with opposite foot</li>
                      <li>Ground ball take-ins</li>
                      <li>Handling miscontrolled balls</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'cam' && (
              <div className="position-content">
                <h3>Attacking Midfielder (CAM)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className="focus-tag" onClick={() => handleFocusClick('Through Balls', 'cam')}>Through Balls</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Final Third Decision Making', 'cam')}>Final Third Decision Making</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Movement Between Lines', 'cam')}>Movement Between Lines</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Close Control in Tight Spaces', 'cam')}>Close Control in Tight Spaces</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Long Shots', 'cam')}>Long Shots</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Quick Combination Play', 'cam')}>Quick Combination Play</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('One-Touch Creativity', 'cam')}>One-Touch Creativity</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Vision & Scanning', 'cam')}>Vision & Scanning</span>
                    <span className="focus-tag" onClick={() => handleFocusClick('Pressing High Up', 'cam')}>Pressing High Up</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-cam-through-balls" className={`training-category ${activeFocus === 'through-balls' ? 'active-focus' : ''}`}>
                    <h5>Through Balls</h5>
                    <ul className="training-list">
                      <li>Timed through passes</li>
                      <li>Reverse through balls</li>
                      <li>Vertical threading</li>
                      <li>Split-line passing</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-final-third-decision-making" className={`training-category ${activeFocus === 'final-third-decision-making' ? 'active-focus' : ''}`}>
                    <h5>Final Third Decision Making</h5>
                    <ul className="training-list">
                      <li>Shot vs pass decisions</li>
                      <li>Awareness of striker positions</li>
                      <li>Final pass under pressure</li>
                      <li>Situational improvisation</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-movement-between-lines" className={`training-category ${activeFocus === 'movement-between-lines' ? 'active-focus' : ''}`}>
                    <h5>Movement Between Lines</h5>
                    <ul className="training-list">
                      <li>Ghosting behind midfield</li>
                      <li>Timing runs behind defenders</li>
                      <li>Staying in pockets</li>
                      <li>Reacting to striker movement</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-close-control-in-tight-spaces" className={`training-category ${activeFocus === 'close-control-in-tight-spaces' ? 'active-focus' : ''}`}>
                    <h5>Close Control in Tight Spaces</h5>
                    <ul className="training-list">
                      <li>Small space dribbles</li>
                      <li>Shielding with 2 defenders near</li>
                      <li>One-foot feints</li>
                      <li>Body control under contact</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-long-shots" className={`training-category ${activeFocus === 'long-shots' ? 'active-focus' : ''}`}>
                    <h5>Long Shots</h5>
                    <ul className="training-list">
                      <li>Long-range power shots</li>
                      <li>Shots from bouncing balls</li>
                      <li>Placement from edge of box</li>
                      <li>Fakes before shooting</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-quick-combination-play" className={`training-category ${activeFocus === 'quick-combination-play' ? 'active-focus' : ''}`}>
                    <h5>Quick Combination Play</h5>
                    <ul className="training-list">
                      <li>One-two in the box</li>
                      <li>Triangle plays</li>
                      <li>Flicks and layoffs</li>
                      <li>Dummy runs</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-one-touch-creativity" className={`training-category ${activeFocus === 'one-touch-creativity' ? 'active-focus' : ''}`}>
                    <h5>One-Touch Creativity</h5>
                    <ul className="training-list">
                      <li>One-touch through balls</li>
                      <li>One-touch passes under pressure</li>
                      <li>One-touch shots</li>
                      <li>Redirection plays</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-vision-&-scanning" className={`training-category ${activeFocus === 'vision-&-scanning' ? 'active-focus' : ''}`}>
                    <h5>Vision & Scanning</h5>
                    <ul className="training-list">
                      <li>Peripheral passing drills</li>
                      <li>Scanning in final third</li>
                      <li>Identifying blind-side runs</li>
                      <li>Decision-making off the ball</li>
                    </ul>
                  </div>
                  
                  <div id="training-cam-pressing-high-up" className={`training-category ${activeFocus === 'pressing-high-up' ? 'active-focus' : ''}`}>
                    <h5>Pressing High Up</h5>
                    <ul className="training-list">
                      <li>First line press drills</li>
                      <li>Angle pressing on CBs</li>
                      <li>Triggered team pressing</li>
                      <li>Blocking vertical passes</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'st' && (
              <div className="position-content">
                <h3>Striker (ST)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className={`focus-tag ${activeFocus === 'st-finishing-variety' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Finishing Variety', 'st')}>Finishing Variety</span>
                    <span className={`focus-tag ${activeFocus === 'st-movement-in-the-box' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Movement in the Box', 'st')}>Movement in the Box</span>
                    <span className={`focus-tag ${activeFocus === 'st-aerial-threat' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Aerial Threat', 'st')}>Aerial Threat</span>
                    <span className={`focus-tag ${activeFocus === 'st-first-touch-to-shoot' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('First Touch to Shoot', 'st')}>First Touch to Shoot</span>
                    <span className={`focus-tag ${activeFocus === 'st-link-up-play' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Link-Up Play', 'st')}>Link-Up Play</span>
                    <span className={`focus-tag ${activeFocus === 'st-attacking-positioning' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Attacking Positioning', 'st')}>Attacking Positioning</span>
                    <span className={`focus-tag ${activeFocus === 'st-one-touch-finishing' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('One-Touch Finishing', 'st')}>One-Touch Finishing</span>
                    <span className={`focus-tag ${activeFocus === 'st-timing-of-runs' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Timing of Runs', 'st')}>Timing of Runs</span>
                    <span className={`focus-tag ${activeFocus === 'st-pressing-from-the-front' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Pressing from the Front', 'st')}>Pressing from the Front</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-st-finishing-variety" className={`training-category ${activeFocus === 'st-finishing-variety' ? 'active-focus' : ''}`}>
                    <h5>Finishing Variety</h5>
                    <ul className="training-list">
                      <li>Near post finishes</li>
                      <li>Outside foot finishes</li>
                      <li>First-time volleys</li>
                      <li>Driven shots low</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Movement in the Box</h5>
                    <ul className="training-list">
                      <li>Fake and run movements</li>
                      <li>Delayed box entries</li>
                      <li>Blind side positioning</li>
                      <li>Rebounds anticipation</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Aerial Threat</h5>
                    <ul className="training-list">
                      <li>Heading from crosses</li>
                      <li>Jump timing drills</li>
                      <li>Headers under contact</li>
                      <li>Redirecting aerial balls</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>First Touch to Shoot</h5>
                    <ul className="training-list">
                      <li>Setup touch before shot</li>
                      <li>Controlling bouncing balls</li>
                      <li>Shift-and-shoot drills</li>
                      <li>Quick setup from passes</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Link-Up Play</h5>
                    <ul className="training-list">
                      <li>Wall passes with CAM</li>
                      <li>Layoffs to wings</li>
                      <li>Shielding and turning</li>
                      <li>Drag defenders wide</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Attacking Positioning</h5>
                    <ul className="training-list">
                      <li>Positioning for cutbacks</li>
                      <li>Staying onside on last man</li>
                      <li>Finding space in box</li>
                      <li>Reacting to crosses</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>One-Touch Finishing</h5>
                    <ul className="training-list">
                      <li>Rebound finishes</li>
                      <li>Flicks from close range</li>
                      <li>Fast ball-to-shot actions</li>
                      <li>Redirecting low crosses</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Timing of Runs</h5>
                    <ul className="training-list">
                      <li>Curved runs behind line</li>
                      <li>Beating offside trap</li>
                      <li>Coordinating with CAM</li>
                      <li>Double movements</li>
                    </ul>
                  </div>
                  
                  <div className="training-category">
                    <h5>Pressing from the Front</h5>
                    <ul className="training-list">
                      <li>Triggered pressing from goal kicks</li>
                      <li>Closing CB passing lanes</li>
                      <li>Team press initiation</li>
                      <li>Angled press for forced error</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activePosition === 'w' && (
              <div className="position-content">
                <h3>Winger (RW / LW)</h3>
                <div className="position-focus">
                  <h4>Main Focus</h4>
                  <div className="focus-tags">
                    <span className={`focus-tag ${activeFocus === 'w-1v1-dribbling' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('1v1 Dribbling', 'w')}>1v1 Dribbling</span>
                    <span className={`focus-tag ${activeFocus === 'w-crossing-under-pressure' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Crossing Under Pressure', 'w')}>Crossing Under Pressure</span>
                    <span className={`focus-tag ${activeFocus === 'w-diagonal-runs' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Diagonal Runs', 'w')}>Diagonal Runs</span>
                    <span className={`focus-tag ${activeFocus === 'w-shooting-from-wide-angles' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Shooting from Wide Angles', 'w')}>Shooting from Wide Angles</span>
                    <span className={`focus-tag ${activeFocus === 'w-receiving-on-the-move' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Receiving on the Move', 'w')}>Receiving on the Move</span>
                    <span className={`focus-tag ${activeFocus === 'w-isolation-play' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Isolation Play', 'w')}>Isolation Play</span>
                    <span className={`focus-tag ${activeFocus === 'w-tracking-back-&-pressing' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Tracking Back & Pressing', 'w')}>Tracking Back & Pressing</span>
                    <span className={`focus-tag ${activeFocus === 'w-link-up-with-fullback' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Link-Up with Fullback', 'w')}>Link-Up with Fullback</span>
                    <span className={`focus-tag ${activeFocus === 'w-acceleration-&-agility' ? 'active-tag' : ''}`} onClick={() => handleFocusClick('Acceleration & Agility', 'w')}>Acceleration & Agility</span>
                  </div>
                </div>
                
                <div className="training-details">
                  <h4>Training Details</h4>
                  
                  <div id="training-w-1v1-dribbling" className={`training-category ${activeFocus === 'w-1v1-dribbling' ? 'active-focus' : ''}`}>
                    <h5>1v1 Dribbling</h5>
                    <ul className="training-list">
                      <li>Beating fullbacks with both feet</li>
                      <li>Body feints at speed</li>
                      <li>Stop-and-go moves</li>
                      <li>Cutbacks in final third</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-crossing-under-pressure" className={`training-category ${activeFocus === 'w-crossing-under-pressure' ? 'active-focus' : ''}`}>
                    <h5>Crossing Under Pressure</h5>
                    <ul className="training-list">
                      <li>Crosses while sprinting</li>
                      <li>Low driven crosses</li>
                      <li>Cutbacks from byline</li>
                      <li>Switching crossing foot</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-diagonal-runs" className={`training-category ${activeFocus === 'w-diagonal-runs' ? 'active-focus' : ''}`}>
                    <h5>Diagonal Runs</h5>
                    <ul className="training-list">
                      <li>Inside runs behind CB</li>
                      <li>Outside-to-inside sprints</li>
                      <li>Timing with CAM passes</li>
                      <li>Staying onside diagonally</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-shooting-from-wide-angles" className={`training-category ${activeFocus === 'w-shooting-from-wide-angles' ? 'active-focus' : ''}`}>
                    <h5>Shooting from Wide Angles</h5>
                    <ul className="training-list">
                      <li>Curved shots to far post</li>
                      <li>Power shots near post</li>
                      <li>Tight-angle volleys</li>
                      <li>First-touch shots after cut-in</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-receiving-on-the-move" className={`training-category ${activeFocus === 'w-receiving-on-the-move' ? 'active-focus' : ''}`}>
                    <h5>Receiving on the Move</h5>
                    <ul className="training-list">
                      <li>Receiving at top speed</li>
                      <li>Cushioning high passes</li>
                      <li>Controlling long switches</li>
                      <li>Back foot receiving</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-isolation-play" className={`training-category ${activeFocus === 'w-isolation-play' ? 'active-focus' : ''}`}>
                    <h5>Isolation Play</h5>
                    <ul className="training-list">
                      <li>Creating 1v1s</li>
                      <li>Holding defender wide</li>
                      <li>Beating man then crossing</li>
                      <li>Resetting and retrying</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-tracking-back-&-pressing" className={`training-category ${activeFocus === 'w-tracking-back-&-pressing' ? 'active-focus' : ''}`}>
                    <h5>Tracking Back & Pressing</h5>
                    <ul className="training-list">
                      <li>Recovering on opposition fullbacks</li>
                      <li>Coordinated press with CAM</li>
                      <li>Delaying counters</li>
                      <li>Pressing high from the wing</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-link-up-with-fullback" className={`training-category ${activeFocus === 'w-link-up-with-fullback' ? 'active-focus' : ''}`}>
                    <h5>Link-Up with Fullback</h5>
                    <ul className="training-list">
                      <li>Overlap and underlap setups</li>
                      <li>Quick give-and-go</li>
                      <li>Switching roles in attack</li>
                      <li>Pulling defenders for space</li>
                    </ul>
                  </div>
                  
                  <div id="training-w-acceleration-&-agility" className={`training-category ${activeFocus === 'w-acceleration-&-agility' ? 'active-focus' : ''}`}>
                    <h5>Acceleration & Agility</h5>
                    <ul className="training-list">
                      <li>Quick burst starts</li>
                      <li>Stop-and-turn speed</li>
                      <li>Short sprint repeats</li>
                      <li>Agility with direction change</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {!activePosition && (
              <div className="position-prompt">
                <p>Select a position above to view specialized training details.</p>
              </div>
            )}
          </div>
          
          <div className="level-cta">
            <button onClick={() => handleRegisterClick('level4')} className="btn btn-primary">Register for Level 4 - 650 EGP/month</button>
          </div>
        </section>
        
        {/* Level 5: Elite Performance */}
        <section 
          ref={level5Ref} 
          className={`program-section ${activeLevel === 'level5' ? 'active' : ''}`}
          id="level5"
        >
          <div className="level-header elite-header">
            <div className="level-info">
              <h2>Level 5: Elite Performance</h2>
              <div className="level-meta">
                <span className="level-duration">Duration: 3 months</span>
                <span className="level-difficulty">Elite</span>
              </div>
              <p className="level-objective">Professional-level training for elite players.</p>
            </div>
          </div>
          
          <div className="level-overview">
            <p>Our most advanced program, designed to prepare players for professional and semi-professional football. This program includes comprehensive position-specific training at an elite level with professional coaches.</p>
            <p>Level 5 training incorporates advanced tactical concepts, mental preparation, and physical conditioning that mirrors professional football environments.</p>
          </div>
          
          <div className="elite-features">
            <h3>Elite Program Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faTrophy} /></div>
                <h4>Pro-Level Training</h4>
                <p>Training methods used by professional academies.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faUsers} /></div>
                <h4>Individual Development Plans</h4>
                <p>Personalized programs tailored to each player.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                <h4>Match Analysis</h4>
                <p>Detailed review of performance in game situations.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faBrain} /></div>
                <h4>Mental Conditioning</h4>
                <p>Focus, resilience, and performance psychology.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faFutbol} /></div>
                <h4>Elite Competition</h4>
                <p>Exposure to high-level playing opportunities.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FontAwesomeIcon icon={faRocket} /></div>
                <h4>Professional Guidance</h4>
                <p>Career advice and development pathways.</p>
              </div>
            </div>
          </div>
          
          <div className="elite-admission">
            <h3>Admission Requirements</h3>
            <p>Level 5 admission is by invitation or assessment only. Players must demonstrate advanced proficiency in their position and complete Level 4 or equivalent training.</p>
          </div>
          
          <div className="level-cta">
            <button onClick={() => handleRegisterClick('level5')} className="btn btn-primary elite-btn">Apply for Elite Program - 650 EGP/month</button>
          </div>
        </section>
      </div>
      
      {/* Programs CTA Section */}
      <section className="programs-cta">
        <div className="cta-content">
          <h2>Ready to Take Your Game to the Next Level?</h2>
          <p>Our progressive training programs are designed to help you develop your skills step by step, from foundations to elite performance.</p>
          <div className="cta-buttons">
            {isLoggedIn ? (
              <button onClick={() => navigate('/register')} className="btn btn-primary">Register Today</button>
            ) : (
              <button onClick={() => {
                localStorage.setItem('registrationRedirect', '/register');
                navigate('/login');
              }} className="btn btn-primary">Login to Register</button>
            )}
            <Link to="/about" className="btn btn-secondary">Learn More About Us</Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Programs;
