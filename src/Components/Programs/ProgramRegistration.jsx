import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFutbol, faCalendarAlt, faMoneyBillWave, faUser, faEnvelope, faPhone, faGraduationCap, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './ProgramRegistration.css';

const ProgramRegistration = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(level || 'level1');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    preferredPosition: '',
    experience: '',
    specialRequirements: '',
    terms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (level && levelDetails[level]) {
      setSelectedLevel(level);
    } else {
      setSelectedLevel('level1');
    }
    window.scrollTo(0, 0);
  }, [level]);

  const levelDetails = {
    level1: { name: 'Level 1: Foundation', price: 650, duration: '1.5 months', difficulty: 'Beginner' },
    level2: { name: 'Level 2: Development', price: 650, duration: '2 months', difficulty: 'Intermediate' },
    level3: { name: 'Level 3: Position Specialization', price: 650, duration: '2.5 months', difficulty: 'Intermediate-Advanced' },
    level4: { name: 'Level 4: Advanced Specialization', price: 650, duration: '3 months', difficulty: 'Advanced' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleLevelChange = (level) => {
    if (levelDetails[level]) {
      setSelectedLevel(level);
    }
  };

  const navigateToElite = () => {
    navigate('/register/level5');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number is invalid';
    }
    
    if (!formData.age.trim()) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 5 || parseInt(formData.age) > 50) {
      errors.age = 'Please enter a valid age between 5 and 50';
    }
    
    if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  };

  const handleBackToPrograms = () => {
    navigate('/programs');
  };

  if (submitted) {
    return (
      <div className="program-registration-container">
        <Navbar />
        <div className="registration-success">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h2>Registration Successful!</h2>
          <p>Thank you for registering for {levelDetails[selectedLevel].name}.</p>
          <p>We've sent a confirmation email to {formData.email} with payment instructions and next steps.</p>
          <p>The monthly fee is <span className="price-highlight">{levelDetails[selectedLevel].price} EGP</span></p>
          <p>Our team will contact you within 24 hours to confirm your registration and provide additional information.</p>
          <button onClick={handleBackToPrograms} className="btn btn-primary">
            Back to Programs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="program-registration-container">
      <Navbar />
      
      <div className="registration-header">
        <h1>Program Registration</h1>
        <p>Register for our football training programs and start your journey to becoming a better player</p>
      </div>
      
      <div className="registration-content">
        <div className="program-selection">
          <h2>Select Your Program</h2>
          <div className="program-options">
            {Object.keys(levelDetails).map(level => (
              <div 
                key={level} 
                className={`program-option ${selectedLevel === level ? 'selected' : ''}`}
                onClick={() => handleLevelChange(level)}
              >
                <div className="program-icon">
                  <FontAwesomeIcon icon={faFutbol} />
                </div>
                <h3>{levelDetails[level].name}</h3>
                <div className="program-details">
                  <div className="program-detail">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{levelDetails[level].duration}</span>
                  </div>
                  <div className="program-detail">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>{levelDetails[level].difficulty}</span>
                  </div>
                  <div className="program-detail price">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <span>{levelDetails[level].price} EGP/month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="elite-program-banner">
            <h3>Level 5: Elite Performance Program</h3>
            <p>Our Level 5 program is designed for elite players and requires a specialized assessment process, including physical tests and technical evaluations. The monthly fee is 650 EGP.</p>
            <button onClick={navigateToElite} className="elite-program-button">
              Apply for Elite Program <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        
        <div className="registration-form">
          <h2>Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  <FontAwesomeIcon icon={faUser} /> First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? 'error' : ''}
                />
                {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">
                  <FontAwesomeIcon icon={faUser} /> Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? 'error' : ''}
                />
                {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">
                  <FontAwesomeIcon icon={faPhone} /> Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                  placeholder="e.g. 01234567890"
                />
                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="5"
                  max="50"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={formErrors.age ? 'error' : ''}
                />
                {formErrors.age && <span className="error-message">{formErrors.age}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="preferredPosition">Preferred Position (if any)</label>
                <select
                  id="preferredPosition"
                  name="preferredPosition"
                  value={formData.preferredPosition}
                  onChange={handleInputChange}
                >
                  <option value="">Select a position (optional)</option>
                  <option value="goalkeeper">Goalkeeper</option>
                  <option value="defender">Defender</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="forward">Forward</option>
                  <option value="notSure">Not Sure Yet</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Football Experience</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner - Little to no experience</option>
                <option value="recreational">Recreational - Played casually</option>
                <option value="intermediate">Intermediate - Some team experience</option>
                <option value="advanced">Advanced - Regular team experience</option>
                <option value="competitive">Competitive - High level experience</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="specialRequirements">Special Requirements or Notes</label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                placeholder="Let us know if you have any special requirements, medical conditions, or other information we should be aware of."
              ></textarea>
            </div>
            
            <div className="form-group terms-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className={formErrors.terms ? 'error' : ''}
              />
              <label htmlFor="terms">
                I agree to the terms and conditions, including the payment of 650 EGP per month.
              </label>
              {formErrors.terms && <span className="error-message">{formErrors.terms}</span>}
            </div>
            
            <div className="registration-summary">
              <h3>Registration Summary</h3>
              <p>Program: <strong>{levelDetails[selectedLevel].name}</strong></p>
              <p>Duration: <strong>{levelDetails[selectedLevel].duration}</strong></p>
              <p>Monthly Fee: <strong>{levelDetails[selectedLevel].price} EGP</strong></p>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary registration-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProgramRegistration; 