/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import './Auth.css';
import Navbar from '../Landing/Navbar';
import SHA256 from 'crypto-js/sha256';

// Import icons from font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Example image import, replace with your actual image path
import footballTrainingImg from '../../assets/img/football-training.jpg';

export default function Login({ SaveLoginData }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Generate random particles for background effect
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = window.innerWidth < 768 ? 20 : 40;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 3 + 2,
          animationDuration: `${Math.random() * 10 + 5}s`,
          animationDelay: `${Math.random() * 5}s`
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate particles on window resize
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Remember Me toggle
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Create ripple effect on button click
  const createRipple = (event) => {
    const button = event.currentTarget;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    // Get button's position relative to the viewport
    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left}px`;
    circle.style.top = `${event.clientY - rect.top}px`;
    circle.classList.add("ripple");
    
    // Remove existing ripples
    const ripple = button.querySelector(".ripple");
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove the ripple element after animation completes
    setTimeout(() => {
      if (circle) {
        circle.remove();
      }
    }, 600);
  };

  // Login API call
  async function handleLogin(values) {
    try {
      setIsSubmitting(true);
      
      const { email, password } = values;
      
      // Get users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
      
      // Add default admin user if no users exist
      if (storedUsers.length === 0) {
        const adminUser = {
          email: 'admin@pft.com',
          password: SHA256('admin123').toString(), // Hash the default admin password
          name: 'Admin User',
          role: 'admin',
          created: new Date().toISOString()
        };
        storedUsers.push(adminUser);
        localStorage.setItem('pft_users', JSON.stringify(storedUsers));
      }
      
      // Find user by email
      const user = storedUsers.find(user => user.email === email);
      
      // Hash the entered password and compare with stored hash
      const hashedPassword = SHA256(password).toString();
      if (user && user.password === hashedPassword) {
        // Valid login
        const mockToken = "user-token-" + Math.random().toString(36).substring(2);
        
        // Call the SaveLoginData function from props (if it exists)
        if (typeof SaveLoginData === 'function') {
          SaveLoginData();
        }
        
        // Set login status explicitly in all possible storage mechanisms
        // to ensure all components can detect the auth state
        if (rememberMe) {
          localStorage.setItem('usertoken', mockToken);
          localStorage.setItem('current_user', JSON.stringify({
            email: user.email,
            name: user.name,
            role: user.role
          }));
          // Also set in sessionStorage to ensure consistency across pages
          sessionStorage.setItem('usertoken', mockToken);
          sessionStorage.setItem('current_user', JSON.stringify({
            email: user.email,
            name: user.name,
            role: user.role
          }));
        } else {
          sessionStorage.setItem('usertoken', mockToken);
          sessionStorage.setItem('current_user', JSON.stringify({
            email: user.email,
            name: user.name,
            role: user.role
          }));
        }
        
        // Dispatch a custom event to notify other components about the login
        window.dispatchEvent(new Event('auth-state-changed'));
        
        toast.success(`Welcome back, ${user.name || 'User'}!`, {
          position: "top-right",
          style: {
            background: 'var(--color-dark-gray)',
            color: 'var(--color-white)',
            border: '1px solid var(--color-neon-green)'
          },
          iconTheme: {
            primary: 'var(--color-neon-green)',
            secondary: 'var(--color-black)'
          }
        });
        
        // Add navigation to home page after successful login
        navigate('/');
      } else {
        // Invalid credentials
        toast.error("Invalid email or password. Please try again.", {
          position: "top-right",
          style: {
            background: 'var(--color-dark-gray)',
            color: 'var(--color-white)',
            border: '1px solid #ff4757'
          }
        });
      }
      
      /* Commented out for now, when you have a real API, you can uncomment and modify this
      try {
        const { data } = await axios.post(`https://your-real-api-endpoint/users/signIn`, values);
        console.log("API Response:", data);
        
        // Store token with respect to "Remember Me" option
        if (rememberMe) {
          localStorage.setItem('usertoken', data.token);
        } else {
          sessionStorage.setItem('usertoken', data.token);
        }
        
        // Call the SaveLoginData function from props (if it exists)
        if (typeof SaveLoginData === 'function') {
          SaveLoginData();
        }
        
        // Dispatch a custom event to notify other components about the login
        window.dispatchEvent(new Event('user-logged-in'));
        
        toast.success("Login successful! Welcome to PFT.", {
          position: "top-right",
          style: {
            background: 'var(--color-dark-gray)',
            color: 'var(--color-white)',
            border: '1px solid var(--color-neon-green)'
          },
          iconTheme: {
            primary: 'var(--color-neon-green)',
            secondary: 'var(--color-black)'
          }
        });
        
        navigate('/');
      } catch (apiError) {
        console.error("API login failed:", apiError);
        toast.error("Login failed. " + (apiError.response?.data?.message || "Please check your credentials."), {
          position: "top-right",
          style: {
            background: 'var(--color-dark-gray)',
            color: 'var(--color-white)',
            border: '1px solid #ff4757'
          }
        });
      }
      */
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-right",
        style: {
          background: 'var(--color-dark-gray)',
          color: 'var(--color-white)',
          border: '1px solid #ff4757'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="auth-overlay"></div>
      
      {/* Particle background */}
      <div className="auth-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="auth-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: particle.animationDuration,
              animationDelay: particle.animationDelay
            }}
          ></div>
        ))}
      </div>
      
      {/* Back button */}
      <Link to="/" className="auth-back-link">
        <FontAwesomeIcon icon={faChevronLeft} />
        Back to Homepage
      </Link>
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="auth-image">
              <img 
                src={footballTrainingImg} 
                alt="Football Training" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/121212/00e6e6?text=Football+Training';
                }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="auth-card">
              <div className="auth-header">
                <h1 className="auth-title">
                  <span className="text-neon">Login</span>
                </h1>
                <p className="auth-subtitle">
                  Welcome back! Sign in to continue your football training journey
                </p>
              </div>

              <div className="auth-form-container">
                <form className="auth-form" onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : formik.touched.email && !formik.errors.email ? 'is-valid' : ''}`}
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error-message">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      <FontAwesomeIcon icon={faLock} className="me-2" />
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : formik.touched.password && !formik.errors.password ? 'is-valid' : ''}`}
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <button 
                        type="button" 
                        className="password-toggle" 
                        onClick={togglePasswordVisibility}
                        tabIndex="-1"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="error-message">{formik.errors.password}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="auth-link">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit" 
                      className="auth-button"
                      disabled={isSubmitting}
                      onClick={createRipple}
                    >
                      {isSubmitting ? 'Signing In...' : 'Login'}
                    </button>
                  </div>

                  <div className="auth-links">
                    Don't have an account?
                    <Link to="/register" className="auth-link">
                      Register Now
                    </Link>
                  </div>

                  <div className="auth-divider">
                    <span>or login with</span>
                  </div>

                  <div className="auth-social">
                    <button type="button" className="auth-social-btn" aria-label="Login with Google" onClick={createRipple}>
                      <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button type="button" className="auth-social-btn" aria-label="Login with Facebook" onClick={createRipple}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button type="button" className="auth-social-btn" aria-label="Login with Twitter" onClick={createRipple}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
