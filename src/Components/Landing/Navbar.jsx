import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../App';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  
  // Get auth state from context
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  
  // Force check auth state on every render
  const [forceUpdate, setForceUpdate] = useState(0);

  // Check auth state on component mount and when auth events occur
  useEffect(() => {
    const checkAuthState = () => {
      const token = localStorage.getItem('usertoken') || sessionStorage.getItem('usertoken');
      console.log('Navbar: Checking auth state -', token ? 'Token found' : 'No token');
      setIsLoggedIn(!!token);
    };

    // Initial check
    checkAuthState();

    // Listen for login/logout events
    const handleLoginEvent = () => {
      console.log('Navbar: Login event detected');
      checkAuthState();
      // Force re-render
      setForceUpdate(prev => prev + 1);
    };

    const handleLogoutEvent = () => {
      console.log('Navbar: Logout event detected');
      checkAuthState();
      // Force re-render
      setForceUpdate(prev => prev + 1);
    };

    // Set up interval to periodically check auth state
    const authCheckInterval = setInterval(() => {
      checkAuthState();
    }, 2000);

    window.addEventListener('auth-state-changed', handleLoginEvent);
    window.addEventListener('auth-state-changed', handleLogoutEvent);

    return () => {
      window.removeEventListener('auth-state-changed', handleLoginEvent);
      window.removeEventListener('auth-state-changed', handleLogoutEvent);
      clearInterval(authCheckInterval);
    };
  }, [setIsLoggedIn, forceUpdate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Debug log when isLoggedIn changes
  useEffect(() => {
    console.log('Navbar: isLoggedIn changed to', isLoggedIn);
  }, [isLoggedIn]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showProfileDropdown &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    sessionStorage.removeItem('usertoken');
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    
    // Dispatch a logout event
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Use setTimeout to ensure state updates are completed before navigation
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  const handleLinkClick = (e, path) => {
    // Close menu and dropdown
    closeMenu();
    setShowProfileDropdown(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left section - Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span>PFT</span>
          <span className="logo-accent">Academy</span>
        </Link>

        {/* Center section - Navigation */}
        <div className="navbar-menu desktop-menu">
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/programs" className="nav-link" onClick={(e) => handleLinkClick(e, '/programs')}>
                Programs
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/marketing" className="nav-link" onClick={(e) => handleLinkClick(e, '/marketing')}>
                Player Marketing
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/partners" className="nav-link" onClick={(e) => handleLinkClick(e, '/partners')}>
                Our Partners
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={(e) => handleLinkClick(e, '/blog')}>
                Blog Hub
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={(e) => handleLinkClick(e, '/about')}>About Us</Link>
            </li>
          </ul>
        </div>
        
        {/* Right section - Login/Register or Profile */}
        <div className="navbar-right">
          {/* Mobile menu toggle button */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          {/* Login/Register buttons or Profile button */}
          {isLoggedIn ? (
            <div className="nav-buttons desktop">
              <div className="profile-container">
                <button 
                  onClick={toggleProfileDropdown} 
                  className="profile-icon-btn"
                  ref={profileButtonRef}
                  aria-label="Profile menu"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    fill="currentColor"
                    className="user-icon"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown" ref={profileDropdownRef}>
                    <Link to="/dashboard" className="profile-dropdown-item" onClick={(e) => handleLinkClick(e, '/dashboard')}>Dashboard</Link>
                    <div className="profile-divider"></div>
                    <button onClick={handleLogout} className="profile-dropdown-item logout-btn">Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="nav-buttons desktop">
              <Link to="/register" className="btn btn-secondary" onClick={(e) => handleLinkClick(e, '/register')}>
                Register
              </Link>
              <Link to="/login" className="btn btn-primary" onClick={(e) => handleLinkClick(e, '/login')}>
                Member Login
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - separate from main container */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <Link to="/" className="navbar-logo mobile" onClick={closeMenu}>
            <span>PFT</span>
            <span className="logo-accent">Academy</span>
          </Link>
          <button className="menu-close" onClick={toggleMenu}>
            <span>&times;</span>
          </button>
        </div>

        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/programs" className="nav-link" onClick={(e) => handleLinkClick(e, '/programs')}>
              Programs
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/marketing" className="nav-link" onClick={(e) => handleLinkClick(e, '/marketing')}>
              Player Marketing
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/partners" className="nav-link" onClick={(e) => handleLinkClick(e, '/partners')}>
              Our Partners
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/blog" className="nav-link" onClick={(e) => handleLinkClick(e, '/blog')}>
              Blog Hub
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={(e) => handleLinkClick(e, '/about')}>About Us</Link>
          </li>
        </ul>
        
        {/* Mobile Login/Profile section */}
        {isLoggedIn ? (
          <div className="nav-buttons mobile">
            <div className="profile-container">
              <button 
                onClick={toggleProfileDropdown} 
                className="profile-icon-btn"
                aria-label="Profile menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="16" 
                  height="16" 
                  fill="currentColor"
                  className="user-icon"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                </svg>
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <Link to="/dashboard" className="profile-dropdown-item" onClick={(e) => handleLinkClick(e, '/dashboard')}>Dashboard</Link>
                  <div className="profile-divider"></div>
                  <button onClick={handleLogout} className="profile-dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nav-buttons mobile">
            <Link to="/register" className="btn btn-secondary" onClick={(e) => handleLinkClick(e, '/register')}>
              Register
            </Link>
            <Link to="/login" className="btn btn-primary" onClick={(e) => handleLinkClick(e, '/login')}>
              Member Login
            </Link>
          </div>
        )}
      </div>
      
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar; 