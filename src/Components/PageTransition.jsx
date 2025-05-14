import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will handle cleaning up side effects when navigating between pages
const PageTransition = () => {
  const location = useLocation();
  
  // Reset everything on route change
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reset any overflowing styles that might have been set
    document.body.style.overflow = '';
    
    // Clean up any particles
    const particles = document.querySelectorAll('.particle, .particle-container, .static-particle');
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    
    // Clean up any animation classes
    const animatedElements = document.querySelectorAll('.in-viewport, .animate-fade-in, .animated');
    animatedElements.forEach(el => {
      if (el) {
        el.classList.remove('in-viewport', 'animate-fade-in', 'animated');
      }
    });
    
    // Reset any transform styles
    const transformedElements = document.querySelectorAll('[style*="transform"]');
    transformedElements.forEach(el => {
      if (el && el.style) {
        el.style.transform = '';
      }
    });
    
    // Reset any fixed positioning that might be lingering
    const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
    fixedElements.forEach(el => {
      if (el && el.style) {
        // Don't remove fixed positioning from core UI elements
        if (!el.closest('.navbar') && !el.closest('.loading-screen') && !el.closest('.toaster')) {
          el.style.position = '';
        }
      }
    });
    
    // Force a layout recalculation
    document.body.offsetHeight; // This triggers a reflow
    
    // Clean up Swiper instances
    if (window.Swiper) {
      const swiperElements = document.querySelectorAll('.swiper-initialized');
      swiperElements.forEach(el => {
        const swiperInstance = el.swiper;
        if (swiperInstance && typeof swiperInstance.destroy === 'function') {
          try {
            swiperInstance.destroy(true, true);
          } catch (e) {
            console.error('Error destroying Swiper:', e);
          }
        }
      });
    }
  }, [location.pathname]);
  
  return null;
};

export default PageTransition; 