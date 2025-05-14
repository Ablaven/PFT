import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavHover = (index) => {
    setHoverItem(index);
  };

  const handleNavLeave = () => {
    setHoverItem(null);
  };

  // Animated Logo text reveal
  const LogoText = () => {
    const text = "PFT";
    return (
      <span className="logo-text">
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            className="logo-char"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: hoverItem === 'logo' ? 
                `translateY(-2px) scale(1.1) rotate(${(index - 1) * 5}deg)` : 'none'
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div 
          className="logo"
          onMouseEnter={() => handleNavHover('logo')}
          onMouseLeave={handleNavLeave}
        >
          <Link to="/">
            <LogoText />
            <div className="logo-glow"></div>
          </Link>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {['Home', 'About Us', 'Programs', 'Blog', 'Contact'].map((item, index) => (
              <li key={index}>
                <Link 
                  to={index === 0 ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className={`nav-link ${index === 0 ? 'active' : ''}`}
                  onMouseEnter={() => handleNavHover(index)}
                  onMouseLeave={handleNavLeave}
                >
                  {item}
                  <span 
                    className="nav-hover-indicator" 
                    style={{ 
                      opacity: hoverItem === index ? 1 : 0,
                      width: hoverItem === index ? '70%' : '0%'
                    }}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-auth">
            <Link 
              to="/login" 
              className="btn-login"
              onMouseEnter={() => handleNavHover('login')}
              onMouseLeave={handleNavLeave}
            >
              Login
              <span 
                className="btn-login-glow"
                style={{ 
                  opacity: hoverItem === 'login' ? 1 : 0,
                }}
              ></span>
            </Link>
            <Link 
              to="/register" 
              className="btn-register"
              onMouseEnter={() => handleNavHover('register')}
              onMouseLeave={handleNavLeave}
              style={{ 
                boxShadow: hoverItem === 'register' ? 
                  '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4)' : ''
              }}
            >
              Register
            </Link>
          </div>
        </nav>

        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      {/* Background blur gradient that follows mouse */}
      {!mobileMenuOpen && (
        <div 
          className="header-mouse-glow" 
          style={{ 
            opacity: scrolled ? 0.15 : 0,
            left: `${mousePos.x}px`, 
            top: `${mousePos.y}px` 
          }}
        ></div>
      )}
    </header>
  );
};

export default Header; 