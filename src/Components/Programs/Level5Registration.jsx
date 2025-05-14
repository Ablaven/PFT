import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faFutbol, faCalendarAlt, faMoneyBillWave, faUser, 
  faEnvelope, faPhone, faRunning, faTrophy, faStopwatch,
  faDumbbell, faHeartbeat, faListCheck, faClipboardCheck, faFileArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../App';
import './Level5Registration.css';

const Level5Registration = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    currentLevel: '',
    playingExperience: '',
    previousTraining: '',
    achievements: '',
    position: '',
    physicalCondition: '',
    injuries: '',
    goals: '',
    videoLink: '',
    howDidYouHear: '',
    availableDates: [],
    terms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  // Available dates for physical tests
  const availableTestDates = [
    { id: 'date1', value: 'June 15, 2023 - 10:00 AM', location: 'Main Training Ground' },
    { id: 'date2', value: 'June 17, 2023 - 2:00 PM', location: 'Elite Performance Center' },
    { id: 'date3', value: 'June 22, 2023 - 9:00 AM', location: 'Main Training Ground' },
    { id: 'date4', value: 'June 24, 2023 - 4:00 PM', location: 'Elite Performance Center' },
    { id: 'date5', value: 'June 29, 2023 - 11:00 AM', location: 'Main Training Ground' }
  ];

  // Physical test components
  const testComponents = [
    { icon: faRunning, title: 'Speed & Agility', description: '30m sprint, agility course, and reactive movement tests' },
    { icon: faDumbbell, title: 'Strength & Power', description: 'Vertical jump, medicine ball throw, and resistance exercises' },
    { icon: faHeartbeat, title: 'Endurance', description: 'Yo-yo test, interval running, and recovery assessment' },
    { icon: faFutbol, title: 'Technical Skills', description: 'Ball control, passing accuracy, shooting precision, and game scenarios' },
    { icon: faStopwatch, title: 'Tactical Awareness', description: 'Decision-making exercises, positional awareness, and game intelligence assessment' }
  ];

  useEffect(() => {
    // Check if user is logged in, redirect to login if not
    if (!isLoggedIn) {
      // Store the intended registration page
      localStorage.setItem('registrationRedirect', '/register/level5');
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    window.scrollTo(0, 0);
  }, [isLoggedIn, navigate, step]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'availableDates') {
      let newDates = [...formData.availableDates];
      if (checked) {
        newDates.push(value);
      } else {
        newDates = newDates.filter(date => date !== value);
      }
      setFormData({
        ...formData,
        availableDates: newDates
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateStep1 = () => {
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
    } else if (isNaN(formData.age) || parseInt(formData.age) < 12 || parseInt(formData.age) > 30) {
      errors.age = 'Level 5 program requires age between 12 and 30';
    }
    
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.currentLevel) errors.currentLevel = 'Please select your current level';
    if (!formData.playingExperience) errors.playingExperience = 'Please provide your playing experience';
    if (!formData.position) errors.position = 'Please select your playing position';
    
    return errors;
  };

  const validateStep3 = () => {
    const errors = {};
    if (formData.availableDates.length === 0) {
      errors.availableDates = 'Please select at least one available date for the physical test';
    }
    if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
    
    return errors;
  };

  const handleNextStep = () => {
    let errors = {};
    
    if (step === 1) {
      errors = validateStep1();
    } else if (step === 2) {
      errors = validateStep2();
    }
    
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateStep3();
    
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
      <div className="level5-registration-container">
        <Navbar />
        <div className="registration-success">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying to our Elite Level 5 Program.</p>
          <p>We've sent a confirmation email to {formData.email} with details about your selected physical test date.</p>
          <div className="success-next-steps">
            <h3>Next Steps:</h3>
            <ol>
              <li>Prepare for your physical test on your selected date(s)</li>
              <li>Bring appropriate football gear and water</li>
              <li>Arrive 30 minutes early to complete registration</li>
              <li>Our coaches will evaluate your performance and notify you of the results within 5 business days</li>
            </ol>
          </div>
          <p>If you have any questions, please contact our coaching staff at <a href="mailto:elite@pftacademy.com">elite@pftacademy.com</a></p>
          <button onClick={handleBackToPrograms} className="btn btn-primary">
            Back to Programs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="level5-registration-container">
      <Navbar />
      
      <div className="level5-header">
        <h1>Level 5 Elite Program Application</h1>
        <div className="elite-badge">
          <FontAwesomeIcon icon={faTrophy} />
          <span>Elite Program</span>
        </div>
        <p>Apply for our highest-level training program designed for elite football players</p>
      </div>
      
      <div className="level5-info-section">
        <div className="level5-info-container">
          <div className="level5-info-content">
            <h2>About the Elite Level 5 Program</h2>
            <p>
              The Level 5 Elite Program is our most advanced training tier, designed for talented players who demonstrate exceptional skill, dedication, and potential. Unlike our other programs, admission to Level 5 requires passing a comprehensive physical and technical assessment.
            </p>
            
            <div className="program-highlights">
              <div className="highlight-item">
                <FontAwesomeIcon icon={faFutbol} className="highlight-icon" />
                <div>
                  <h3>Advanced Training</h3>
                  <p>Train with professional-level methodology and equipment</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="highlight-icon" />
                <div>
                  <h3>3-Month Program</h3>
                  <p>Intensive development over a focused 3-month period</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <FontAwesomeIcon icon={faMoneyBillWave} className="highlight-icon" />
                <div>
                  <h3>650 EGP/month</h3>
                  <p>Premium training with elite coaches and facilities</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="physical-test-info">
            <h2>Physical Test Requirements</h2>
            <p>All applicants must complete and pass a physical test evaluation before being accepted into the program.</p>
            
            <div className="test-components">
              {testComponents.map((component, index) => (
                <div key={index} className="test-component">
                  <FontAwesomeIcon icon={component.icon} className="component-icon" />
                  <div>
                    <h3>{component.title}</h3>
                    <p>{component.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="level5-registration-content">
        <div className="registration-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Personal Information</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Football Experience</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Physical Test Selection</span>
          </div>
        </div>
        
        <div className="level5-form-container">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-step">
                <h2>Personal Information</h2>
                
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
                      min="12"
                      max="30"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={formErrors.age ? 'error' : ''}
                    />
                    {formErrors.age && <span className="error-message">{formErrors.age}</span>}
                    <small className="form-note">Level 5 program is for players aged 12-30 only</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="howDidYouHear">How did you hear about us?</label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend or Family</option>
                      <option value="coach">Coach Referral</option>
                      <option value="event">Football Event</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="form-step">
                <h2>Football Experience</h2>
                
                <div className="form-group">
                  <label htmlFor="currentLevel">Current Training Level</label>
                  <select
                    id="currentLevel"
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleInputChange}
                    className={formErrors.currentLevel ? 'error' : ''}
                  >
                    <option value="">Please select</option>
                    <option value="level4">Level 4 at PFT Academy</option>
                    <option value="level3">Level 3 at PFT Academy</option>
                    <option value="otherAcademy">Other Football Academy</option>
                    <option value="schoolTeam">School/University Team</option>
                    <option value="club">Club Team</option>
                    <option value="professional">Professional/Semi-Professional</option>
                  </select>
                  {formErrors.currentLevel && <span className="error-message">{formErrors.currentLevel}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">Primary Playing Position</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={formErrors.position ? 'error' : ''}
                  >
                    <option value="">Please select</option>
                    <optgroup label="Goalkeeper">
                      <option value="gk">Goalkeeper</option>
                    </optgroup>
                    <optgroup label="Defense">
                      <option value="cb">Center Back</option>
                      <option value="rb">Right Back</option>
                      <option value="lb">Left Back</option>
                      <option value="wb">Wing Back</option>
                    </optgroup>
                    <optgroup label="Midfield">
                      <option value="cdm">Defensive Midfielder</option>
                      <option value="cm">Central Midfielder</option>
                      <option value="cam">Attacking Midfielder</option>
                      <option value="rm">Right Midfielder</option>
                      <option value="lm">Left Midfielder</option>
                    </optgroup>
                    <optgroup label="Attack">
                      <option value="rw">Right Winger</option>
                      <option value="lw">Left Winger</option>
                      <option value="ss">Second Striker</option>
                      <option value="st">Striker</option>
                    </optgroup>
                  </select>
                  {formErrors.position && <span className="error-message">{formErrors.position}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="playingExperience">Playing Experience</label>
                  <textarea
                    id="playingExperience"
                    name="playingExperience"
                    value={formData.playingExperience}
                    onChange={handleInputChange}
                    placeholder="Describe your football playing experience in detail, including teams you've played for, competitions, and duration."
                    className={formErrors.playingExperience ? 'error' : ''}
                  ></textarea>
                  {formErrors.playingExperience && <span className="error-message">{formErrors.playingExperience}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="previousTraining">Previous Training</label>
                  <textarea
                    id="previousTraining"
                    name="previousTraining"
                    value={formData.previousTraining}
                    onChange={handleInputChange}
                    placeholder="List any formal training programs or academies you've participated in."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="achievements">Notable Achievements</label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="List any awards, recognitions, or achievements in football."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoLink">Performance Video Link (Optional)</label>
                  <input
                    type="text"
                    id="videoLink"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleInputChange}
                    placeholder="YouTube, Vimeo or other video link showing your football skills"
                  />
                  <small className="form-note">While optional, a video of your play can strengthen your application</small>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                    Previous Step
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="form-step">
                <h2>Physical Test Selection</h2>
                <p className="test-intro">
                  Select available dates to take the physical test. You can select multiple dates in case you need flexibility.
                </p>
                
                <div className="form-group test-dates-group">
                  <label>Available Test Dates</label>
                  <div className="test-dates-container">
                    {availableTestDates.map((date) => (
                      <div key={date.id} className="test-date-option">
                        <input
                          type="checkbox"
                          id={date.id}
                          name="availableDates"
                          value={date.value}
                          checked={formData.availableDates.includes(date.value)}
                          onChange={handleInputChange}
                        />
                        <label htmlFor={date.id} className="date-label">
                          <span className="date-text">{date.value}</span>
                          <span className="date-location">{date.location}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {formErrors.availableDates && <span className="error-message">{formErrors.availableDates}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="physicalCondition">Current Physical Condition</label>
                  <select
                    id="physicalCondition"
                    name="physicalCondition"
                    value={formData.physicalCondition}
                    onChange={handleInputChange}
                  >
                    <option value="">Please select</option>
                    <option value="excellent">Excellent - Train 5+ times per week</option>
                    <option value="good">Good - Regular training 3-4 times per week</option>
                    <option value="average">Average - Train 1-2 times per week</option>
                    <option value="belowAverage">Below Average - Inconsistent training</option>
                    <option value="recovering">Recovering from injury/break</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="injuries">Recent Injuries or Medical Conditions</label>
                  <textarea
                    id="injuries"
                    name="injuries"
                    value={formData.injuries}
                    onChange={handleInputChange}
                    placeholder="Please list any injuries or medical conditions in the past 12 months that may affect your performance."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="goals">Your Goals in Football</label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="What do you hope to achieve through the Elite Level 5 Program?"
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
                    I understand that acceptance into the Level 5 Program is contingent upon passing the physical test, and that the monthly fee is 650 EGP. I agree to the program terms and conditions.
                  </label>
                  {formErrors.terms && <span className="error-message">{formErrors.terms}</span>}
                </div>
                
                <div className="test-tips">
                  <h3><FontAwesomeIcon icon={faClipboardCheck} /> Test Day Tips:</h3>
                  <ul>
                    <li>Arrive 30 minutes before your scheduled test time</li>
                    <li>Wear appropriate football gear and bring both indoor and outdoor boots</li>
                    <li>Bring plenty of water and a light snack</li>
                    <li>Get adequate rest the night before your test</li>
                    <li>Bring proper ID and a copy of your application confirmation</li>
                  </ul>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                    Previous Step
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Level5Registration; 