import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Auth.css';
import Navbar from '../Landing/Navbar';
import SHA256 from 'crypto-js/sha256';

// Import icons from font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faLock, faPhone, faCakeCandles, faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Example image import, replace with your actual image path
import footballPlayerImg from '../../assets/img/football-player.jpg';

export default function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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

  // Create ripple effect on button click
  const createRipple = (event) => {
    const button = event.currentTarget;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
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

  // Registration API call
  async function handleRegistration(values) {
    try {
      setIsSubmitting(true);
      
      // Get existing users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
      
      // Check if email already exists
      if (storedUsers.some(user => user.email === values.email)) {
        toast.error("A user with this email already exists. Please login instead.", {
          position: "top-right",
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #ff4757'
          }
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create new user object with hashed password
      const hashedPassword = SHA256(values.password).toString();
      const newUser = {
        name: values.name,
        email: values.email,
        password: hashedPassword,
        age: values.age,
        phone: values.phone,
        role: 'user',
        created: new Date().toISOString()
      };
      
      // Add to users array
      storedUsers.push(newUser);
      
      // Save to localStorage
      localStorage.setItem('pft_users', JSON.stringify(storedUsers));
      
      /* Commented out for now, when you have a real API, you can uncomment and modify this
      try {
        const { data } = await axios.post(`https://your-real-api-endpoint/users/signUp`, values);
        console.log("API Response:", data);
      } catch (apiError) {
        console.error("API registration failed:", apiError);
        // If API call fails, still store user locally for demo purposes
      }
      */
      
      toast.success("Registration successful! Please log in.", {
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
      
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.", {
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
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    age: Yup.number()
      .min(12, "You must be at least 12 years old")
      .max(50, "Age must be less than 50")
      .required("Age is required")
      .integer("Age must be a whole number"),
    phone: Yup.string()
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid phone number"
      )
      .required("Phone number is required"),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegistration
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
                src={footballPlayerImg} 
                alt="Football Player Training" 
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
                  <span className="text-neon">Register</span>
                </h1>
                <p className="auth-subtitle">
                  Join our community of players and start your journey to professional football
                </p>
              </div>

              <div className="auth-form-container">
                <form className="auth-form" onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : formik.touched.name && !formik.errors.name ? 'is-valid' : ''}`}
                      placeholder="Enter your full name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error-message">{formik.errors.name}</div>
                    )}
                  </div>

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
                        placeholder="Create a strong password"
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
                    <div className="form-helper">
                      Password must contain at least 8 characters, including uppercase, lowercase, and numbers
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="age">
                          <FontAwesomeIcon icon={faCakeCandles} className="me-2" />
                          Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : formik.touched.age && !formik.errors.age ? 'is-valid' : ''}`}
                          placeholder="Your age"
                          value={formik.values.age}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.age && formik.errors.age && (
                          <div className="error-message">{formik.errors.age}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : formik.touched.phone && !formik.errors.phone ? 'is-valid' : ''}`}
                          placeholder="Your phone number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="error-message">{formik.errors.phone}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <button 
                      type="submit" 
                      className="auth-button"
                      disabled={isSubmitting}
                      onClick={createRipple}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Register Now'}
                    </button>
                  </div>

                  <div className="auth-links">
                    Already have an account?
                    <Link to="/login" className="auth-link">
                      Login
                    </Link>
                  </div>

                  <div className="auth-divider">
                    <span>or register with</span>
                  </div>

                  <div className="auth-social">
                    <button type="button" className="auth-social-btn" onClick={createRipple}>
                      <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button type="button" className="auth-social-btn" onClick={createRipple}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button type="button" className="auth-social-btn" onClick={createRipple}>
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
