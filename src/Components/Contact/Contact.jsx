import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';
import Footer from '../Landing/Footer';
import Navbar from '../Landing/Navbar';

// Icons
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

const Contact = () => {
  // State for expanded FAQs
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  
  // Particles effect
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Message sent successfully! We will get back to you soon.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      resetForm();
    } catch (error) {
      toast.error('There was an error sending your message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Toggle FAQ expansion
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };
  
  // Create ripple effect on button click
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };
  
  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particlesArray = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(57, 255, 20, ${Math.random() * 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 10000));
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
      setParticles(particlesArray);
    };
    
    createParticles();
    
    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // FAQ data
  const faqData = [
    {
      question: "What training programs do you offer?",
      answer: "We offer 5 structured training levels designed for players aged 12-21. Level 1 (Beginner) focuses on basic skills for ages 12-14, Level 2 (Intermediate) covers teamwork and positioning for ages 14-16, Level 3 (Advanced) targets fitness and mental prep for ages 16-18, Level 4 (Elite) emphasizes strategy for ages 18-20, and Level 5 (Pro) prepares ages 20-21 for professional football."
    },
    {
      question: "How much do the training programs cost?",
      answer: "All our training programs are affordably priced at EGP 650 per month, saving you 65-83% compared to other academies that charge EGP 2,000-4,000 monthly. We believe that talent should not be limited by financial constraints."
    },
    {
      question: "How does PFT help players get noticed by clubs?",
      answer: "PFT provides a platform for players to market their talents to scouts and clubs through highlight videos, performance statistics, and digital CVs showcasing skills and achievements. We also organize events with club scouts and have partnerships with local clubs."
    },
    {
      question: "Where are your training facilities located?",
      answer: "Our training programs are available throughout Cairo, Egypt through our location-based zones and academies. The app allows you to select training locations and book sessions with nearby coaches based on your location."
    },
    {
      question: "When will the full app be launched?",
      answer: "The MVP with basic location features is planned for Q2 2025, with the full app launch including advanced location filters scheduled for Q4 2025. Our website will be launched alongside the app in Q3 2025."
    }
  ];
  
  // Validation schema for form
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9+\-\s()]{7,15}$/, 'Invalid phone number'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required').min(10, 'Message is too short')
  });
  
  return (
    <div className="contact-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="canvas-container">
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Get in <span className="text-neon">Touch</span></h1>
          <p className="hero-subtitle">
            Have questions about our training programs or want to learn more about how PFT can help you reach professional football? 
            Our team of coaches is here to guide you on your path to football training.
          </p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          {/* Contact Form */}
          <div className="contact-form">
            <h2 className="section-title">Send us a <span className="text-neon">Message</span></h2>
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name && touched.name ? 'error' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className="error-message" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email && touched.email ? 'error' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone (optional)</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone && touched.phone ? 'error' : ''}`}
                    />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <Field
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject && touched.subject ? 'error' : ''}`}
                    />
                    <ErrorMessage name="subject" component="div" className="error-message" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="5"
                      className={`form-control ${errors.message && touched.message ? 'error' : ''}`}
                    />
                    <ErrorMessage name="message" component="div" className="error-message" />
                  </div>
                  
                  <button
                    type="submit"
                    className="form-button"
                    disabled={isSubmitting}
                    onClick={createRipple}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          
          {/* Contact Information */}
          <div className="contact-cards">
            <div className="card">
              <h3 className="card-title">Contact Information</h3>
              
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <p>Training Center:</p>
                  <p>PFT Academy Headquarters</p>
                  <p>Cairo, Egypt</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <p>Phone:</p>
                  <p>+20 1XX XXX XXXX</p>
                  <p>+20 2 XXXX XXXX</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <p>Email:</p>
                  <p>info@pathfootballtraining.com</p>
                  <p>support@pathfootballtraining.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaClock className="contact-icon" />
                <div>
                  <p>Working Hours:</p>
                  <p>Sunday - Thursday: 9:00 AM - 8:00 PM</p>
                  <p>Friday - Saturday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaFacebookF />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaYoutube />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <h2 className="section-title">Our <span className="text-neon">Location</span></h2>
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37629581601!2d31.209131636206267!3d30.059608796651198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1679566509842!5m2!1sen!2sus" 
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PFT Cairo Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">Frequently Asked <span className="text-neon">Questions</span></h2>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFAQ === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaChevronDown 
                    className={`faq-icon ${expandedFAQ === index ? 'active' : ''}`} 
                  />
                </div>
                
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Component instead of CTA Section */}
      <Footer />
      
      <ToastContainer />
    </div>
  );
};

export default Contact;