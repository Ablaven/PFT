import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Landing/Navbar';
import Footer from '../Components/Landing/Footer';
import '../Components/Auth/Auth.css';

// Import icons from font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCakeCandles, faFutbol, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const { program } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    program: program || 'level1',
    location: 'cairo_east',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [particles, setParticles] = useState([]);

  const programOptions = [
    { value: 'level1', label: 'Level 1: Fundamentals', price: '650 EGP/month' },
    { value: 'level2', label: 'Level 2: Technical Development', price: '650 EGP/month' },
    { value: 'level3', label: 'Level 3: Position Specialization', price: '650 EGP/month' },
    { value: 'level4', label: 'Level 4: Advanced Specialization', price: '650 EGP/month' }
  ];
  
  const locationOptions = [
    { value: 'cairo_east', label: 'Cairo East Zone', academies: 'Al Ahly Youth Academy, Al Nasr Club' },
    { value: 'cairo_west', label: 'Cairo West Zone', academies: 'Wadi Degla Club, Shooting Club' },
    { value: 'cairo_north', label: 'Cairo North Zone', academies: 'El Shams Club, Heliopolis Club' },
    { value: 'cairo_south', label: 'Cairo South Zone', academies: 'Maadi Club, El Gezira Club' },
    { value: 'giza', label: 'Giza Zone', academies: '6th October Club, El Gaish Club' },
    { value: 'alahly_club', label: 'Al-Ahly Club Academy', academies: 'Main Training Center' }
  ];

  // Generate particles for background effect
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real implementation, you would send the form data to your backend
      // For demonstration, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        program: program || 'level1',
        location: 'cairo_east',
        message: ''
      });
      
      // Redirect to thank you page or show success message
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
      
    } catch (error) {
      setSubmitError('There was an error submitting your registration. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProgram = programOptions.find(option => option.value === formData.program);
  const selectedLocation = locationOptions.find(option => option.value === formData.location);

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-overlay"></div>
        <div className="auth-particles">
          {particles.map(particle => (
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
            />
          ))}
        </div>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="auth-card">
                <div className="auth-header">
                  <h1 className="auth-title">Program Registration</h1>
                  <p className="auth-subtitle">Join our professional football training program and take your skills to the next level</p>
                </div>
                
                <div className="auth-form-container">
                  <div className="program-details" style={{ marginBottom: '30px', padding: '20px', borderRadius: '10px', background: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.2)' }}>
                    <h3 style={{ color: 'var(--color-neon-green)', marginBottom: '15px', fontSize: '1.2rem' }}>Selected Program</h3>
                    {selectedProgram && (
                      <div>
                        <h4 style={{ color: 'var(--color-white)', fontSize: '1.1rem', marginBottom: '10px' }}>{selectedProgram.label}</h4>
                        <p style={{ color: 'var(--color-neon-green)', fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px' }}>{selectedProgram.price}</p>
                        {selectedLocation && (
                          <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
                            <p style={{ color: 'var(--color-light-gray)', fontSize: '0.9rem', marginBottom: '5px' }}>
                              <FontAwesomeIcon icon={faLocationDot} className="me-2" /> Training Location:
                            </p>
                            <p style={{ color: 'var(--color-white)', fontSize: '1rem' }}>{selectedLocation.label}</p>
                            <p style={{ color: 'var(--color-greenish-blue)', fontSize: '0.9rem', marginTop: '5px' }}>
                              Available Academies: {selectedLocation.academies}
                            </p>
                          </div>
                        )}
                        <p style={{ color: 'var(--color-light-gray)', fontSize: '0.9rem', marginTop: '15px' }}>After registration, our team will contact you with schedule options and payment details.</p>
                      </div>
                    )}
                  </div>
                  
                  {submitSuccess ? (
                    <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(57, 255, 20, 0.05)', borderRadius: '10px', border: '1px solid rgba(57, 255, 20, 0.2)' }}>
                      <div style={{ fontSize: '50px', color: 'var(--color-neon-green)', marginBottom: '20px' }}>✓</div>
                      <h3 style={{ color: 'var(--color-white)', marginBottom: '15px', fontSize: '1.5rem' }}>Registration Successful!</h3>
                      <p style={{ color: 'var(--color-light-gray)', marginBottom: '10px' }}>Thank you for registering. We will contact you shortly with further details.</p>
                      <p style={{ color: 'var(--color-light-gray)' }}>Redirecting you to the thank you page...</p>
                    </div>
                  ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                      {submitError && (
                        <div className="error-message">{submitError}</div>
                      )}
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faUser} className="me-2" /> Full Name *
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          required 
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Email Address *
                        </label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          required 
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faPhone} className="me-2" /> Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          required 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faCakeCandles} className="me-2" /> Age *
                        </label>
                        <input 
                          type="number" 
                          className="form-control" 
                          name="age" 
                          min="5" 
                          max="50" 
                          value={formData.age} 
                          onChange={handleChange}
                          required 
                          placeholder="Enter your age"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faFutbol} className="me-2" /> Program *
                        </label>
                        <select 
                          className="form-control" 
                          name="program" 
                          value={formData.program} 
                          onChange={handleChange}
                          required
                        >
                          {programOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">
                          <FontAwesomeIcon icon={faLocationDot} className="me-2" /> Training Location *
                        </label>
                        <select 
                          className="form-control" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleChange}
                          required
                        >
                          {locationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.academies}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Additional Information</label>
                        <textarea 
                          className="form-control" 
                          name="message" 
                          rows="4" 
                          value={formData.message} 
                          onChange={handleChange}
                          placeholder="Tell us about your football experience, goals, or any questions you have."
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="auth-button w-100" 
                        disabled={isSubmitting}
                        onClick={createRipple}
                      >
                        {isSubmitting ? 'Processing...' : 'Complete Registration'}
                      </button>
                      
                      <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--color-light-gray)', fontSize: '0.9rem' }}>
                        <p>By registering, you agree to our <a href="#" style={{ color: 'var(--color-neon-green)', textDecoration: 'none' }}>Terms & Conditions</a></p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register; 