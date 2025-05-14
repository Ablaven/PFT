import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './Components/shared-fixes.css'; // Import shared fixes
import { Toaster } from 'react-hot-toast';
import PageTransition from './Components/PageTransition';
import ChatBot from './Components/ChatBot/ChatBot'; // Import ChatBot component

// Use lazy loading for components
const Login = lazy(() => import('./Components/Auth/Login'));
const AuthRegister = lazy(() => import('./Components/Auth/Register'));
const ProgramRegister = lazy(() => import('./Pages/Register'));
const Landing = lazy(() => import('./Components/Landing/Landing'));
const TestLogin = lazy(() => import('./Components/Auth/TestLogin'));
const About = lazy(() => import('./Components/About/About'));
const Blog = lazy(() => import('./Components/Blog/Blog'));
const BlogPost = lazy(() => import('./Components/Blog/BlogPost'));
const Contact = lazy(() => import('./Components/Contact/Contact'));
const Programs = lazy(() => import('./Components/Programs/Programs'));
const Marketing = lazy(() => import('./Components/Marketing/Marketing'));
const Partners = lazy(() => import('./Components/Partners/Partners'));
const Level5Registration = lazy(() => import('./Components/Programs/Level5Registration'));
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));

// Create a Auth Context
export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// Loading component
const LoadingFallback = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Component to add CSS classes on mount/unmount
const RouteChangeHandler = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Add transition class to body
    document.body.classList.add('page-transition-active');
    
    // Remove class after animation completes
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transition-active');
    }, 300);
    
    return () => {
      clearTimeout(timer);
      // Mark as unmounting
      document.body.classList.add('unmounting');
      
      // Clean up
      setTimeout(() => {
        document.body.classList.remove('unmounting');
      }, 10);
    };
  }, [location.pathname]);
  
  return <>{children}</>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('usertoken') || sessionStorage.getItem('usertoken');
      console.log('App: Checking auth -', token ? 'Token found' : 'No token');
      
      // Only update state if it's different from current state to avoid loops
      if (!!token !== isLoggedIn) {
        setIsLoggedIn(!!token);
        
        // Only broadcast on initial load, not during event handling
        if (token && !isInitialAuthCheckDone) {
          console.log('App: Broadcasting auth state on init');
          window.dispatchEvent(new Event('auth-state-changed'));
        }
      }
    };
    
    // Flag to track initial auth check
    let isInitialAuthCheckDone = false;

    // Check immediately on load
    checkAuth();
    isInitialAuthCheckDone = true;
    
    // Also check after a small delay to ensure all components have mounted
    setTimeout(() => {
      checkAuth();
    }, 500);
    
    // Listen for login events from other components
    const handleLoginEvent = () => {
      console.log('App: Login event detected');
      // Just update state, don't dispatch another event
      const token = localStorage.getItem('usertoken') || sessionStorage.getItem('usertoken');
      if (token && !isLoggedIn) {
        setIsLoggedIn(true);
      }
    };
    
    // Listen for logout events
    const handleLogoutEvent = () => {
      console.log('App: Logout event detected');
      // Just update state, don't dispatch another event
      setIsLoggedIn(false);
    };
    
    window.addEventListener('user-logged-in', handleLoginEvent);
    window.addEventListener('user-logged-out', handleLogoutEvent);
    
    return () => {
      window.removeEventListener('user-logged-in', handleLoginEvent);
      window.removeEventListener('user-logged-out', handleLogoutEvent);
    };
  }, [isLoggedIn]);

  // This can be enhanced later with proper JWT token checking
  const isAuthenticated = () => {
    return localStorage.getItem('usertoken') !== null || sessionStorage.getItem('usertoken') !== null;
  };

  // Function to handle successful login
  const SaveLoginData = () => {
    console.log('App: SaveLoginData called');
    setIsLoggedIn(true);
    // Dispatch login event to notify other components
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Check if there's a saved redirect in localStorage
    const redirectPath = localStorage.getItem('registrationRedirect');
    if (redirectPath) {
      localStorage.removeItem('registrationRedirect');
      window.location.href = redirectPath; // Use location.href for full page reload
    }
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Marketing route wrapper to ensure it remounts on navigation
  const MarketingWrapper = () => {
    const location = useLocation();
    // Using key based on pathname to force remount
    return <Marketing key={location.pathname} />;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <PageTransition />
        <Toaster position="top-right" />
        <ChatBot />
        <Suspense fallback={<LoadingFallback />}>
          <RouteChangeHandler>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing key="landing" />} />
              <Route 
                path="/login" 
                element={
                  <Login 
                    key="login" 
                    SaveLoginData={SaveLoginData} 
                  />
                } 
              />
              <Route path="/register" element={<AuthRegister key="auth-register" />} />
              <Route path="/register/:program" element={
                <ProtectedRoute>
                  <ProgramRegister key="program-register" />
                </ProtectedRoute>
              } />
              <Route path="/register/level5" element={
                <ProtectedRoute>
                  <Level5Registration key="level5-register" />
                </ProtectedRoute>
              } />
              <Route path="/test-login" element={<TestLogin key="test-login" />} />
              <Route path="/about" element={<About key="about" />} />
              <Route path="/blog" element={<Blog key="blog" />} />
              <Route path="/blog/:id" element={<BlogPost key="blog-post" />} />
              <Route path="/contact" element={<Contact key="contact" />} />
              <Route path="/programs" element={<Programs key="programs" />} />
              <Route path="/programs/:programType" element={<Programs key="program-type" />} />
              <Route path="/marketing" element={<MarketingWrapper />} />
              <Route path="/partners" element={<Partners key="partners" />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard key="dashboard" />
                </ProtectedRoute>
              } />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </RouteChangeHandler>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
