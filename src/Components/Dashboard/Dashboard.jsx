import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCalendarAlt, 
  faFileAlt, 
  faChartLine, 
  faCog, 
  faEnvelope,
  faUser,
  faTrophy,
  faSignOutAlt,
  faBell,
  faMapMarkerAlt,
  faRunning,
  faUserFriends,
  faCheckCircle,
  faTimesCircle,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faExclamationTriangle,
  faClipboardCheck,
  faBullseye,
  faChartBar,
  faStar,
  faArrowUp,
  faArrowDown,
  faMinus,
  faClipboardList,
  faFilePdf,
  faFileImage,
  faFileVideo,
  faDownload,
  faEye,
  faShareAlt,
  faFileUpload,
  faFolder,
  faCertificate,
  faCalendarCheck,
  faPaperPlane,
  faInbox,
  faPaperclip,
  faPen,
  faTrash,
  faReply,
  faArrowLeft,
  faExclamationCircle,
  faUserCircle,
  faLock,
  faGlobe,
  faMobileAlt,
  faShieldAlt,
  faThumbsUp,
  faThumbsDown,
  faToggleOn,
  faToggleOff,
  faEdit,
  faSave,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import '../shared-fixes.css';
import { AuthContext } from '../../App';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [userName, setUserName] = useState('Player');
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    sessionsCompleted: 24,
    hoursTraining: 36,
    skillsImproved: 5,
    upcomingSessions: 2
  });
  
  // Mock upcoming sessions - now set dynamically in useEffect
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  
  // Mock recent achievements
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'Skill Assessment',
      date: '2023-07-10',
      description: 'Completed Level 2 Skill Assessment with high scores',
      badge: 'Gold'
    },
    {
      id: 2,
      title: 'Endurance Champion',
      date: '2023-07-05',
      description: 'Completed 10 consecutive training sessions',
      badge: 'Silver'
    },
    {
      id: 3,
      title: 'Perfect Attendance',
      date: '2023-06-30',
      description: 'No missed sessions for 30 days',
      badge: 'Bronze'
    }
  ]);
  
  // Mock program progress
  const [programProgress, setProgramProgress] = useState({
    currentLevel: 'Level 3',
    progress: 65,
    nextMilestone: 'Advanced Tactical Understanding',
    remainingDays: 14
  });

  // Current month for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [sessionHistoryFilters, setSessionHistoryFilters] = useState({
    search: '',
    dateRange: 'all'
  });

  // Mock session history - now set dynamically in useEffect
  const [sessionHistory, setSessionHistory] = useState([]);
  
  // Add new state for Progress tab
  const [skillsData, setSkillsData] = useState([
    { name: 'Technical Skills', currentLevel: 7, previousLevel: 5, maxLevel: 10 },
    { name: 'Tactical Awareness', currentLevel: 6, previousLevel: 5, maxLevel: 10 },
    { name: 'Physical Fitness', currentLevel: 8, previousLevel: 7, maxLevel: 10 },
    { name: 'Mental Strength', currentLevel: 6, previousLevel: 4, maxLevel: 10 },
    { name: 'Game Knowledge', currentLevel: 8, previousLevel: 6, maxLevel: 10 }
  ]);
  
  const [performanceMetrics, setPerformanceMetrics] = useState([
    { 
      period: 'Last Session', 
      metrics: [
        { name: 'Completion Rate', value: '92%', trend: 'up' },
        { name: 'Skill Execution', value: '85%', trend: 'up' },
        { name: 'Tactical Application', value: '78%', trend: 'same' },
        { name: 'Physical Output', value: '90%', trend: 'up' }
      ]
    },
    { 
      period: 'This Month', 
      metrics: [
        { name: 'Completion Rate', value: '88%', trend: 'up' },
        { name: 'Skill Execution', value: '82%', trend: 'up' },
        { name: 'Tactical Application', value: '75%', trend: 'up' },
        { name: 'Physical Output', value: '87%', trend: 'same' }
      ]
    },
    { 
      period: 'Program Average', 
      metrics: [
        { name: 'Completion Rate', value: '85%', trend: 'up' },
        { name: 'Skill Execution', value: '79%', trend: 'up' },
        { name: 'Tactical Application', value: '72%', trend: 'up' },
        { name: 'Physical Output', value: '84%', trend: 'up' }
      ]
    }
  ]);
  
  const [developmentPlans, setDevelopmentPlans] = useState([
    {
      id: 1,
      title: 'Technical Refinement',
      description: 'Focus on improving close control and first touch under pressure',
      progress: 70,
      tasks: [
        { id: 101, name: 'First Touch Drill Set', completed: true },
        { id: 102, name: 'Close Control Exercise Series', completed: true },
        { id: 103, name: 'Pressure Simulation Training', completed: false },
        { id: 104, name: 'Technical Assessment', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Tactical Development',
      description: 'Enhance decision-making in transition phases',
      progress: 45,
      tasks: [
        { id: 201, name: 'Video Analysis Session', completed: true },
        { id: 202, name: 'Game Situation Scenarios', completed: true },
        { id: 203, name: 'Decision-Making Drills', completed: false },
        { id: 204, name: 'On-Field Application', completed: false },
        { id: 205, name: 'Tactical Assessment', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Physical Enhancement',
      description: 'Build explosive power and speed endurance',
      progress: 60,
      tasks: [
        { id: 301, name: 'Baseline Fitness Assessment', completed: true },
        { id: 302, name: 'Strength Training Program', completed: true },
        { id: 303, name: 'Speed & Agility Work', completed: true },
        { id: 304, name: 'Endurance Building', completed: false },
        { id: 305, name: 'Final Fitness Assessment', completed: false }
      ]
    }
  ]);
  
  const [activeProgressTab, setActiveProgressTab] = useState('skills');
  const [activePeriod, setActivePeriod] = useState('Last Session');

  // Add state for Documents tab
  const [activeDocumentsTab, setActiveDocumentsTab] = useState('resources');
  const [documentSearchQuery, setDocumentSearchQuery] = useState('');
  const [documentsFilter, setDocumentsFilter] = useState('all');
  
  // Mock resources
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Training Methodology Guide',
      description: 'Complete guide to PFT training methods and principles',
      type: 'pdf',
      size: '2.4 MB',
      date: '2023-05-10',
      category: 'guides'
    },
    {
      id: 2,
      title: 'Nutrition Plan Template',
      description: 'Customizable nutrition plan for peak performance',
      type: 'pdf',
      size: '1.8 MB',
      date: '2023-04-22',
      category: 'templates'
    },
    {
      id: 3,
      title: 'Technical Skills Demonstration',
      description: 'Video demonstrations of key technical skills',
      type: 'video',
      size: '45.2 MB',
      date: '2023-06-05',
      category: 'videos'
    },
    {
      id: 4,
      title: 'Recovery Protocols',
      description: 'Essential recovery techniques and schedules',
      type: 'pdf',
      size: '3.1 MB',
      date: '2023-03-15',
      category: 'guides'
    },
    {
      id: 5,
      title: 'Game Analysis Framework',
      description: 'Framework for analyzing match performance',
      type: 'pdf',
      size: '1.5 MB',
      date: '2023-05-30',
      category: 'templates'
    },
    {
      id: 6,
      title: 'Training Session Recordings',
      description: 'Video recordings of recent training sessions',
      type: 'video',
      size: '120 MB',
      date: '2023-06-18',
      category: 'videos'
    }
  ]);
  
  // Mock forms
  const [forms, setForms] = useState([
    {
      id: 101,
      title: 'Medical Information Update',
      description: 'Update your medical information and emergency contacts',
      status: 'pending',
      deadline: '2023-07-30',
      required: true
    },
    {
      id: 102,
      title: 'Equipment Request Form',
      description: 'Request additional training equipment',
      status: 'none',
      deadline: 'None',
      required: false
    },
    {
      id: 103,
      title: 'Training Feedback Survey',
      description: 'Provide feedback on your training experience',
      status: 'completed',
      completedDate: '2023-06-10',
      required: true
    },
    {
      id: 104,
      title: 'Travel Consent Form',
      description: 'Consent for upcoming away matches and tournaments',
      status: 'pending',
      deadline: '2023-07-25',
      required: true
    }
  ]);
  
  // Mock certificates
  const [certificates, setCertificates] = useState([
    {
      id: 201,
      title: 'Level 2 Completion Certificate',
      description: 'Certificate of completion for Level 2 training program',
      issueDate: '2023-05-15',
      expiryDate: 'No Expiry',
      thumbnailUrl: 'certificate-thumb-1.jpg'
    },
    {
      id: 202,
      title: 'Technical Skills Assessment',
      description: 'Certificate of achievement in technical skills assessment',
      issueDate: '2023-04-20',
      expiryDate: 'No Expiry',
      thumbnailUrl: 'certificate-thumb-2.jpg'
    },
    {
      id: 203,
      title: 'Sports First Aid Certification',
      description: 'Basic first aid certification for sports',
      issueDate: '2023-03-10',
      expiryDate: '2025-03-10',
      thumbnailUrl: 'certificate-thumb-3.jpg'
    }
  ]);
  
  // Add state for Messages tab
  const [activeMessagesTab, setActiveMessagesTab] = useState('inbox');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Coach Thompson',
      subject: 'Upcoming Training Session Changes',
      preview: 'Please note the changes to our training schedule for next week...',
      date: '2023-07-05',
      read: true,
      important: true,
      content: `
        Hi Alex,
        
        Please note the changes to our training schedule for next week due to the upcoming tournament.
        
        Monday: Session moved to 4:00 PM
        Wednesday: Session canceled
        Friday: Extended session (3 hours)
        
        Let me know if you have any questions or conflicts.
        
        Best regards,
        Coach Thompson
      `
    },
    {
      id: 2,
      sender: 'Admin Team',
      subject: 'Documents Update Required',
      preview: 'Your medical information form needs to be updated before...',
      date: '2023-07-03',
      read: false,
      important: true,
      content: `
        Dear Player,
        
        Your medical information form needs to be updated before the upcoming away games. Please log in to your dashboard and complete the form by July 15th.
        
        This is required for all players participating in the tournament.
        
        Thank you,
        PFT Admin Team
      `
    },
    {
      id: 3,
      sender: 'Coach Martinez',
      subject: 'Performance Feedback',
      preview: "Great job in yesterday's training session. I noticed significant improvement in...",
      date: '2023-06-28',
      read: true,
      important: false,
      content: `
        Hi Alex,
        
        Great job in yesterday's training session. I noticed significant improvement in your technical skills and decision-making.
        
        Areas where you excelled:
        - First touch control
        - Movement off the ball
        - Communication with teammates
        
        Areas to focus on:
        - Defensive positioning
        - Quick transitions
        
        Keep up the good work, and let's discuss these points further in our next one-on-one session.
        
        Regards,
        Coach Martinez
      `
    },
    {
      id: 4,
      sender: 'Nutrition Team',
      subject: 'New Nutrition Plan Available',
      preview: 'Your customized nutrition plan for the upcoming season is now available...',
      date: '2023-06-25',
      read: true,
      important: false,
      content: `
        Hello Alex,
        
        Your customized nutrition plan for the upcoming season is now available in the documents section of your dashboard.
        
        This plan has been tailored based on your recent fitness assessment and goals for the season. Please review it and reach out if you have any questions.
        
        Key highlights:
        - Pre-training meal recommendations
        - Post-training recovery options
        - Hydration schedule
        - Supplement recommendations
        
        Best,
        PFT Nutrition Team
      `
    },
    {
      id: 5,
      sender: 'Team Manager',
      subject: 'Transportation Arrangements',
      preview: 'Details for the upcoming away match transportation...',
      date: '2023-06-20',
      read: false,
      important: true,
      content: `
        Hello Team,
        
        Here are the transportation arrangements for our upcoming away match:
        
        Departure: Friday, July 21 at 8:00 AM
        Meeting Point: Training Center Parking Lot
        Return: Sunday, July 23 around 6:00 PM
        
        Please arrive 15 minutes early and bring your travel kit as discussed.
        
        Parents who wish to arrange their own transportation should notify me by July 15th.
        
        Regards,
        Team Manager
      `
    }
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [composeMessage, setComposeMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Add mock notifications
  const [notificationItems, setNotificationItems] = useState([
    {
      id: 1,
      title: 'Training Session Update',
      message: 'Your session tomorrow has been moved to 4:00 PM',
      time: '2 hours ago',
      read: false,
      type: 'update'
    },
    {
      id: 2,
      title: 'New Message',
      message: 'Coach Thompson sent you a new message',
      time: '1 day ago',
      read: true,
      type: 'message'
    },
    {
      id: 3,
      title: 'Document Required',
      message: 'Please complete your medical form by Friday',
      time: '2 days ago',
      read: true,
      type: 'alert'
    }
  ]);

  // Toggle notification panel
  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Mark notification as read
  const markNotificationAsRead = (id) => {
    setNotificationItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    );
    setNotifications(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotificationItems(prev => 
      prev.map(item => ({ ...item, read: true }))
    );
    setNotifications(0);
  };

  // Add state for Settings tab
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1998-06-15',
    address: '123 Main Street, Anytown, USA',
    emergencyContact: 'Mary Johnson',
    emergencyPhone: '+1 (555) 987-6543'
  });
  const [profileEdit, setProfileEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: {
      trainingUpdates: true,
      performanceReports: true,
      newsAndEvents: false,
      accountAlerts: true
    },
    push: {
      trainingUpdates: true,
      performanceReports: false,
      newsAndEvents: false,
      accountAlerts: true
    }
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    dataSharing: false
  });
  
  const [accountActions, setAccountActions] = useState({
    exportDataStatus: 'none',
    deactivateConfirmOpen: false
  });

  // Add state for CV upload
  const [cvUpload, setCvUpload] = useState({
    fileName: '',
    uploadDate: '',
    showSuccess: false
  });

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    sessionStorage.removeItem('usertoken');
    setIsLoggedIn(false);
    
    // Dispatch a logout event
    window.dispatchEvent(new Event('user-logged-out'));
    
    // Navigate to home page
    navigate('/');
  };
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Update session dates to current month/year
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
      
      // Create sessions for current month
      const updatedUpcomingSessions = [
        {
          id: 1,
          title: 'Tactical Training',
          date: `${currentYear}-${formattedMonth}-15`,
          time: '09:00',
          coach: 'Coach Thompson',
          location: 'Field A',
          status: 'confirmed',
          duration: '60 min',
          description: 'Focus on defensive positioning and team formations',
          category: 'team'
        },
        {
          id: 2,
          title: 'Speed Development',
          date: `${currentYear}-${formattedMonth}-15`,
          time: '11:30',
          coach: 'Coach Richards',
          location: 'Training Center',
          status: 'confirmed',
          duration: '45 min',
          description: 'Sprint drills and reaction time exercises',
          category: 'fitness'
        },
        {
          id: 6,
          title: 'Nutrition Consultation',
          date: `${currentYear}-${formattedMonth}-15`,
          time: '13:30',
          coach: 'Dr. Miller',
          location: 'Medical Office',
          status: 'confirmed',
          duration: '30 min',
          description: 'Personal nutrition plan review and adjustments',
          category: 'wellness'
        },
        {
          id: 7,
          title: 'Technical Skills',
          date: `${currentYear}-${formattedMonth}-15`,
          time: '15:00',
          coach: 'Coach Martinez',
          location: 'Field B',
          status: 'confirmed',
          duration: '75 min',
          description: 'Ball control and passing precision drills',
          category: 'technical'
        },
        {
          id: 8,
          title: 'Recovery Session',
          date: `${currentYear}-${formattedMonth}-15`,
          time: '17:00',
          coach: 'Coach Wilson',
          location: 'Recovery Center',
          status: 'confirmed',
          duration: '45 min',
          description: 'Stretching, ice bath, and compression therapy',
          category: 'recovery'
        },
        {
          id: 9,
          title: 'Team Meeting',
          date: `${currentYear}-${formattedMonth}-18`,
          time: '14:30',
          coach: 'Coach Thompson',
          location: 'Conference Room',
          status: 'confirmed',
          duration: '60 min',
          description: 'Match analysis and upcoming tournament preparation',
          category: 'team'
        }
      ];
      
      const updatedAvailableSessions = [
        {
          id: 3,
          title: 'Group Training',
          date: `${currentYear}-${formattedMonth}-22`,
          time: '10:00',
          coach: 'Coach Wilson',
          location: 'Main Field',
          spots: 3,
          duration: '90 min',
          category: 'team'
        },
        {
          id: 4,
          title: 'Technical Skills',
          date: `${currentYear}-${formattedMonth}-25`,
          time: '16:00',
          coach: 'Coach Martinez',
          location: 'Training Ground B',
          spots: 5,
          duration: '60 min',
          category: 'technical'
        },
        {
          id: 5,
          title: 'Strength & Conditioning',
          date: `${currentYear}-${formattedMonth}-28`,
          time: '15:30',
          coach: 'Coach Johnson',
          location: 'Fitness Center',
          spots: 8,
          duration: '75 min',
          category: 'fitness'
        }
      ];
      
      // Update session history too
      const updatedSessionHistory = [
        {
          id: 101,
          title: 'Speed Training',
          date: `${currentYear}-${formattedMonth}-08`,
          time: '15:00',
          coach: 'Coach Phillips',
          location: 'Track Field',
          feedback: 'Good progress on acceleration drills',
          rating: 4
        },
        {
          id: 102,
          title: 'Tactical Analysis',
          date: `${currentYear}-${formattedMonth}-05`,
          time: '10:30',
          coach: 'Coach Thompson',
          location: 'Analysis Room',
          feedback: 'Great engagement with the tactical concepts',
          rating: 5
        },
        {
          id: 103,
          title: 'Skill Development',
          date: `${currentYear}-${formattedMonth}-03`,
          time: '14:00',
          coach: 'Coach Martinez',
          location: 'Training Center',
          feedback: 'Need to work on precision in technical execution',
          rating: 3
        }
      ];
      
      // Set current month to match data
      setCurrentMonth(currentDate);
      
      // Update session data
      setUpcomingSessions(updatedUpcomingSessions);
      setAvailableSessions(updatedAvailableSessions);
      setSessionHistory(updatedSessionHistory);
    }, 1000);
    
    // Get user info from localStorage or sessionStorage
    const token = localStorage.getItem('usertoken') || sessionStorage.getItem('usertoken');
    if (token) {
      try {
        // In a real app, you'd decode the token or make an API call
        // For now, just set a placeholder name
        setUserName('Alex');
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  // Generate calendar days for the current month
  useEffect(() => {
    const generateCalendarDays = () => {
      console.log('Generating calendar days for:', currentMonth);
      console.log('Available sessions:', availableSessions);
      console.log('Upcoming sessions:', upcomingSessions);
      
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      // Get the first day of the month
      const firstDay = new Date(year, month, 1);
      // Get the last day of the month
      const lastDay = new Date(year, month + 1, 0);
      
      // Calculate days from previous month to fill the first week
      const daysFromPrevMonth = firstDay.getDay();
      
      const days = [];
      
      // Add days from previous month
      const prevMonth = new Date(year, month, 0);
      const prevMonthDays = prevMonth.getDate();
      
      for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevMonthDays - i),
          currentMonth: false,
          hasSession: false
        });
      }
      
      // Add days from current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        // Check if this day has a session
        const hasSession = [...upcomingSessions, ...availableSessions].some(session => {
          const sessionDate = new Date(session.date);
          const sameDay = sessionDate.getDate() === i && 
                 sessionDate.getMonth() === month && 
                 sessionDate.getFullYear() === year;
                 
          if (sameDay) {
            console.log(`Found session on day ${i}:`, session);
          }
          
          return sameDay;
        });
        
        days.push({
          date,
          currentMonth: true,
          hasSession
        });
      }
      
      // Add days from next month to complete the calendar grid (6 rows x 7 days)
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          currentMonth: false,
          hasSession: false
        });
      }
      
      console.log('Calendar days generated:', days.filter(day => day.hasSession).length, 'days with sessions');
      setCalendarDays(days);
    };
    
    generateCalendarDays();
  }, [currentMonth, upcomingSessions, availableSessions]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Handle day selection in calendar
  const handleDayClick = (day) => {
    setSelectedDate(day.date);
  };

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Filter session history based on search and date range
  const getFilteredSessionHistory = () => {
    let filtered = [...sessionHistory];
    
    if (sessionHistoryFilters.search) {
      const searchTerm = sessionHistoryFilters.search.toLowerCase();
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(searchTerm) ||
        session.coach.toLowerCase().includes(searchTerm) ||
        session.location.toLowerCase().includes(searchTerm)
      );
    }
    
    if (sessionHistoryFilters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch(sessionHistoryFilters.dateRange) {
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(session => {
        // Ensure we're properly comparing dates from string format
        const sessionDate = new Date(session.date);
        return sessionDate >= cutoffDate;
      });
    }
    
    return filtered;
  };

  // Update search filter
  const handleSearchChange = (e) => {
    setSessionHistoryFilters({
      ...sessionHistoryFilters,
      search: e.target.value
    });
  };

  // Update date range filter
  const handleDateRangeChange = (range) => {
    setSessionHistoryFilters({
      ...sessionHistoryFilters,
      dateRange: range
    });
  };

  // Function to get trend icon based on trend direction
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return <FontAwesomeIcon icon={faArrowUp} className="trend-icon up" />;
      case 'down':
        return <FontAwesomeIcon icon={faArrowDown} className="trend-icon down" />;
      default:
        return <FontAwesomeIcon icon={faMinus} className="trend-icon same" />;
    }
  };
  
  // Toggle development plan task completion
  const toggleTask = (planId, taskId) => {
    setDevelopmentPlans(plans => 
      plans.map(plan => {
        if (plan.id === planId) {
          const updatedTasks = plan.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          
          // Recalculate progress
          const completedTasks = updatedTasks.filter(task => task.completed).length;
          const progress = Math.round((completedTasks / updatedTasks.length) * 100);
          
          return { ...plan, tasks: updatedTasks, progress };
        }
        return plan;
      })
    );
  };
  
  // Filter resources based on search query and category filter
  const getFilteredResources = () => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(documentSearchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(documentSearchQuery.toLowerCase());
      
      const matchesFilter = documentsFilter === 'all' || resource.category === documentsFilter;
      
      return matchesSearch && matchesFilter;
    });
  };
  
  // Get icon for file type
  const getFileTypeIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <FontAwesomeIcon icon={faFilePdf} />;
      case 'image':
        return <FontAwesomeIcon icon={faFileImage} />;
      case 'video':
        return <FontAwesomeIcon icon={faFileVideo} />;
      default:
        return <FontAwesomeIcon icon={faFileAlt} />;
    }
  };
  
  // Get color class for file type
  const getFileTypeClass = (type) => {
    switch(type) {
      case 'pdf':
        return 'pdf-file';
      case 'image':
        return 'image-file';
      case 'video':
        return 'video-file';
      default:
        return 'text-file';
    }
  };
  
  // Format file size
  const formatFileSize = (size) => {
    return size;
  };
  
  // Get status icon for forms
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      case 'pending':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon pending" />;
      default:
        return <FontAwesomeIcon icon={faFileAlt} className="status-icon none" />;
    }
  };
  
  // Get filtered messages based on search term
  const getFilteredMessages = () => {
    if (!searchTerm) return messages;
    
    return messages.filter(message => 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Compose a new message
  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setComposeMessage({
      ...composeMessage,
      [name]: value
    });
  };
  
  // Send a message
  const sendMessage = () => {
    // In a real app, this would connect to an API
    alert('Message sent successfully!');
    setComposeMessage({
      recipient: '',
      subject: '',
      content: ''
    });
    setIsComposing(false);
  };
  
  // Mark message as read
  const markAsRead = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, read: true } : message
      )
    );
  };
  
  // Toggle message importance
  const toggleImportance = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, important: !message.important } : message
      )
    );
  };
  
  // View message details
  const viewMessage = (id) => {
    const message = messages.find(m => m.id === id);
    if (message) {
      setSelectedMessage(message);
      if (!message.read) {
        markAsRead(id);
      }
    }
  };
  
  // Close message view
  const closeMessageView = () => {
    setSelectedMessage(null);
  };
  
  // Begin editing profile
  const startProfileEdit = () => {
    setProfileEdit({ ...profileData });
    setIsEditing(true);
  };
  
  // Cancel profile editing
  const cancelProfileEdit = () => {
    setProfileEdit(null);
    setIsEditing(false);
  };
  
  // Handle profile field changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileEdit({
      ...profileEdit,
      [name]: value
    });
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    setProfileData({ ...profileEdit });
    setProfileEdit(null);
    setIsEditing(false);
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
  };
  
  // Toggle notification preference
  const toggleNotification = (type, setting) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [type]: {
        ...notificationPreferences[type],
        [setting]: !notificationPreferences[type][setting]
      }
    });
  };
  
  // Toggle security setting
  const toggleSecurity = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting]
    });
  };
  
  // Request data export
  const requestDataExport = () => {
    setAccountActions({
      ...accountActions,
      exportDataStatus: 'pending'
    });
    
    // Simulate API call
    setTimeout(() => {
      setAccountActions({
        ...accountActions,
        exportDataStatus: 'completed'
      });
    }, 2000);
  };
  
  // Open deactivate confirmation
  const openDeactivateConfirm = () => {
    setAccountActions({
      ...accountActions,
      deactivateConfirmOpen: true
    });
  };
  
  // Close deactivate confirmation
  const closeDeactivateConfirm = () => {
    setAccountActions({
      ...accountActions,
      deactivateConfirmOpen: false
    });
  };
  
  // Deactivate account
  const deactivateAccount = () => {
    // In a real app, this would make an API call
    alert('Account deactivation request submitted. A team member will contact you.');
    closeDeactivateConfirm();
  };
  
  // Handle CV upload
  const handleCvUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const now = new Date();
      
      setCvUpload({
        fileName: file.name,
        uploadDate: now.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        showSuccess: true
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setCvUpload(prev => ({
          ...prev,
          showSuccess: false
        }));
      }, 3000);
    }
  };
  
  const [activeScheduleTab, setActiveScheduleTab] = useState('calendar');
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [sessionToBook, setSessionToBook] = useState(null);

  // Format week range
  const formatWeekRange = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${startDate.getFullYear()}`;
    }
  };

  // Navigate to previous week
  const prevWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() - 7);
    setWeekStartDate(newDate);
  };

  // Navigate to next week
  const nextWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() + 7);
    setWeekStartDate(newDate);
  };

  // Generate week days
  const generateWeekDays = () => {
    const days = [];
    const startDate = new Date(weekStartDate);
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayHasSessions = [...upcomingSessions, ...availableSessions].some(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.toDateString() === currentDate.toDateString();
      });
      
      days.push({
        date: currentDate,
        hasSession: dayHasSessions
      });
    }
    
    return days;
  };

  // Book a session
  const bookSession = (session) => {
    setSessionToBook(session);
    setBookingInProgress(true);
  };

  // Confirm booking
  const confirmBooking = () => {
    if (sessionToBook) {
      // In a real app, this would make an API call
      const updatedUpcomingSessions = [...upcomingSessions, {
        ...sessionToBook,
        status: 'confirmed'
      }];
      
      const updatedAvailableSessions = availableSessions.filter(
        session => session.id !== sessionToBook.id
      );
      
      setUpcomingSessions(updatedUpcomingSessions);
      setAvailableSessions(updatedAvailableSessions);
      setBookingInProgress(false);
      setSessionToBook(null);
      
      // Show confirmation message (in a real app)
      alert('Session booked successfully!');
    }
  };

  // Cancel booking
  const cancelBooking = () => {
    setBookingInProgress(false);
    setSessionToBook(null);
  };

  // Function to filter sessions by type, coach, etc.
  const [sessionFilters, setSessionFilters] = useState({
    type: 'all',
    coach: 'all'
  });

  // Get unique coaches
  const getUniqueCoaches = () => {
    const sessions = [...upcomingSessions, ...availableSessions, ...sessionHistory];
    const coaches = [...new Set(sessions.map(session => session.coach))];
    return coaches;
  };

  // Get unique session types
  const getUniqueSessionTypes = () => {
    const sessions = [...upcomingSessions, ...availableSessions, ...sessionHistory];
    const types = [...new Set(sessions.map(session => session.title))];
    return types;
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSessionFilters({
      ...sessionFilters,
      [name]: value
    });
  };

  // Get filtered available sessions
  const getFilteredAvailableSessions = () => {
    return availableSessions.filter(session => {
      if (sessionFilters.type !== 'all' && session.title !== sessionFilters.type) {
        return false;
      }
      if (sessionFilters.coach !== 'all' && session.coach !== sessionFilters.coach) {
        return false;
      }
      return true;
    });
  };
  
  // Add this new function to get session category color
  const getSessionCategoryColor = (category) => {
    switch(category) {
      case 'team':
        return '#4c9aff'; // blue
      case 'fitness':
        return '#ff5630'; // red
      case 'technical':
        return '#6554c0'; // purple
      case 'recovery':
        return '#36b37e'; // green
      case 'wellness':
        return '#ffab00'; // yellow
      default:
        return '#6b778c'; // grey
    }
  };

  // Add this function to format time to 12-hour format
  const formatTime = (time24h) => {
    const [hours, minutes] = time24h.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="user-info">
              <h3>{userName}</h3>
              <p>PFT Member</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li className={activeTab === 'overview' ? 'active' : ''}>
                <button onClick={() => setActiveTab('overview')}>
                  <FontAwesomeIcon icon={faHome} />
                  <span>Overview</span>
                </button>
              </li>
              <li className={activeTab === 'schedule' ? 'active' : ''}>
                <button onClick={() => setActiveTab('schedule')}>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Schedule</span>
                </button>
              </li>
              <li className={activeTab === 'progress' ? 'active' : ''}>
                <button onClick={() => setActiveTab('progress')}>
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>Progress</span>
                </button>
              </li>
              <li className={activeTab === 'documents' ? 'active' : ''}>
                <button onClick={() => setActiveTab('documents')}>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Documents</span>
                </button>
              </li>
              <li className={activeTab === 'messages' ? 'active' : ''}>
                <button onClick={() => setActiveTab('messages')}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Messages</span>
                </button>
              </li>
              <li className={activeTab === 'settings' ? 'active' : ''}>
                <button onClick={() => setActiveTab('settings')}>
                  <FontAwesomeIcon icon={faCog} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'schedule' && 'Training Schedule'}
              {activeTab === 'progress' && 'My Progress'}
              {activeTab === 'documents' && 'Documents'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'settings' && 'Account Settings'}
            </h1>
            
            <div className="header-actions">
              <button className="notification-btn" onClick={toggleNotificationPanel}>
                <FontAwesomeIcon icon={faBell} />
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </button>
              
              {isNotificationOpen && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="notification-list">
                    {notificationItems.length > 0 ? (
                      notificationItems.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className={`notification-icon ${notification.type}`}>
                            {notification.type === 'update' && <FontAwesomeIcon icon={faCalendarAlt} />}
                            {notification.type === 'message' && <FontAwesomeIcon icon={faEnvelope} />}
                            {notification.type === 'alert' && <FontAwesomeIcon icon={faExclamationTriangle} />}
                          </div>
                          <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="notification-footer">
                    <button className="view-all-btn" onClick={() => setActiveTab('notifications')}>
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Overview Content */}
          {activeTab === 'overview' && (
            <div className="dashboard-content">
              <div className="welcome-banner">
                <div className="welcome-content">
                  <h2>Welcome back, {userName}!</h2>
                  <p>Your next training session is scheduled for {formatDate(upcomingSessions[0]?.date)} at {upcomingSessions[0]?.time}.</p>
                  <button className="btn-primary" onClick={() => setActiveTab('schedule')}>View Schedule</button>
                </div>
                <div className="welcome-decoration"></div>
              </div>
              
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.sessionsCompleted}</h3>
                    <p>Sessions Completed</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.hoursTraining}</h3>
                    <p>Training Hours</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.skillsImproved}</h3>
                    <p>Skills Improved</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.upcomingSessions}</h3>
                    <p>Upcoming Sessions</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-row">
                <div className="program-progress-card">
                  <h3>Program Progress</h3>
                  <div className="current-level">
                    <span>Current Level: {programProgress.currentLevel}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${programProgress.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <p>{programProgress.progress}% complete</p>
                    <p>{programProgress.remainingDays} days to next level</p>
                  </div>
                  <div className="next-milestone">
                    <h4>Next Milestone:</h4>
                    <p>{programProgress.nextMilestone}</p>
                  </div>
                </div>
                
                <div className="upcoming-sessions-card">
                  <h3>Upcoming Sessions</h3>
                  {upcomingSessions.length > 0 ? (
                    <ul className="sessions-list">
                      {upcomingSessions.map(session => (
                        <li key={session.id} className="session-item">
                          <div className="session-date">
                            <span className="date">{formatDate(session.date)}</span>
                            <span className="time">{session.time}</span>
                          </div>
                          <div className="session-details">
                            <h4>{session.title}</h4>
                            <p>Coach: {session.coach}</p>
                            <p>Location: {session.location}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-data">No upcoming sessions scheduled</p>
                  )}
                </div>
              </div>
              
              <div className="achievements-card">
                <h3>Recent Achievements</h3>
                {achievements.length > 0 ? (
                  <div className="achievements-list">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="achievement-item">
                        <div className={`achievement-badge ${achievement.badge.toLowerCase()}`}>
                          <FontAwesomeIcon icon={faTrophy} />
                        </div>
                        <div className="achievement-details">
                          <h4>{achievement.title}</h4>
                          <p>{achievement.description}</p>
                          <span className="achievement-date">{formatDate(achievement.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No achievements yet</p>
                )}
              </div>
            </div>
          )}
          
          {/* Schedule Tab Content */}
          {activeTab === 'schedule' && (
            <div className="dashboard-content schedule-content">
              {/* Add prominent info banner */}
              <div className="schedule-info-banner">
                <div className="schedule-info-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <div className="schedule-info-content">
                  <h4>Your Training Schedule</h4>
                  <p>You have <strong>{upcomingSessions.length} booked sessions</strong> this month and <strong>{availableSessions.length} available sessions</strong> you can book. Click on any day with a session to view details.</p>
                </div>
              </div>
              
              {/* Add a legend for session categories */}
              <div className="session-categories-legend">
                <h4>Session Types</h4>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#4c9aff' }}></span>
                    <span className="legend-label">Team Training</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#ff5630' }}></span>
                    <span className="legend-label">Fitness & Conditioning</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#6554c0' }}></span>
                    <span className="legend-label">Technical Skills</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#36b37e' }}></span>
                    <span className="legend-label">Recovery & Rehab</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#ffab00' }}></span>
                    <span className="legend-label">Wellness & Nutrition</span>
                  </div>
                </div>
              </div>
              
              <div className="schedule-tabs">
                <button 
                  className={`schedule-tab ${activeScheduleTab === 'calendar' ? 'active' : ''}`}
                  onClick={() => setActiveScheduleTab('calendar')}
                >
                  Calendar
                </button>
                <button 
                  className={`schedule-tab ${activeScheduleTab === 'available' ? 'active' : ''}`}
                  onClick={() => setActiveScheduleTab('available')}
                >
                  Available Sessions
                </button>
                <button 
                  className={`schedule-tab ${activeScheduleTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveScheduleTab('history')}
                >
                  Session History
                </button>
              </div>
              
              {/* Calendar Section */}
              {activeScheduleTab === 'calendar' && (
                <div className="calendar-container">
                  <div className="view-toggle">
                    <button 
                      className={`view-toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                      onClick={() => setViewMode('month')}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} /> Monthly
                    </button>
                    <button 
                      className={`view-toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
                      onClick={() => setViewMode('week')}
                    >
                      <FontAwesomeIcon icon={faCalendarCheck} /> Weekly
                    </button>
                  </div>
                  
                  {/* Monthly View */}
                  {viewMode === 'month' && (
                    <>
                      <div className="calendar-header">
                        <button className="calendar-nav-btn" onClick={prevMonth}>
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h3>
                          {formatMonthYear(currentMonth)}
                          <span className="session-count">
                            <FontAwesomeIcon icon={faCalendarCheck} className="session-count-icon" />
                            {[...upcomingSessions, ...availableSessions].filter(session => {
                              const sessionDate = new Date(session.date);
                              const sessionMonth = sessionDate.getMonth();
                              const sessionYear = sessionDate.getFullYear();
                              return sessionMonth === currentMonth.getMonth() && sessionYear === currentMonth.getFullYear();
                            }).length} sessions
                          </span>
                        </h3>
                        <button className="calendar-nav-btn" onClick={nextMonth}>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                      
                      <div className="calendar-grid">
                        <div className="calendar-weekdays">
                          <div>Sun</div>
                          <div>Mon</div>
                          <div>Tue</div>
                          <div>Wed</div>
                          <div>Thu</div>
                          <div>Fri</div>
                          <div>Sat</div>
                        </div>
                        
                        <div className="calendar-days">
                          {calendarDays.map((day, index) => {
                            // Get sessions for this day to display category-colored indicators
                            const daySessionsData = day.hasSession ? 
                              [...upcomingSessions, ...availableSessions].filter(session => {
                                const sessionDate = new Date(session.date);
                                return sessionDate.toDateString() === day.date.toDateString();
                              }) : [];
                            
                            return (
                              <div 
                                key={index}
                                className={`calendar-day ${!day.currentMonth ? 'other-month' : ''} ${day.hasSession ? 'has-session' : ''} ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                                onClick={() => handleDayClick(day)}
                              >
                                <span className="day-number">{day.date.getDate()}</span>
                                {day.hasSession && (
                                  <div className="session-indicators">
                                    {daySessionsData
                                      .slice(0, 3) // Only show indicators for first 3 sessions
                                      .map((session, i) => (
                                        <div 
                                          key={i} 
                                          className={`session-indicator ${upcomingSessions.some(s => s.id === session.id) ? 'booked' : 'available'}`}
                                          title={session.title}
                                          style={{
                                            backgroundColor: session.category ? 
                                              `${getSessionCategoryColor(session.category)}99` : // 99 = 60% opacity
                                              undefined,
                                            boxShadow: session.category ? 
                                              `0 0 4px ${getSessionCategoryColor(session.category)}99` : 
                                              undefined
                                          }}
                                        ></div>
                                      ))
                                    }
                                    {daySessionsData.length > 3 && (
                                      <div className="more-sessions">+{daySessionsData.length - 3}</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Weekly View */}
                  {viewMode === 'week' && (
                    <>
                      <div className="calendar-header">
                        <button className="calendar-nav-btn" onClick={prevWeek}>
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h3>
                          {formatWeekRange(weekStartDate)}
                          <span className="session-count">
                            <FontAwesomeIcon icon={faCalendarCheck} className="session-count-icon" />
                            {[...upcomingSessions, ...availableSessions].filter(session => {
                              const sessionDate = new Date(session.date);
                              const weekEndDate = new Date(weekStartDate);
                              weekEndDate.setDate(weekEndDate.getDate() + 6);
                              return sessionDate >= weekStartDate && sessionDate <= weekEndDate;
                            }).length} sessions
                          </span>
                        </h3>
                        <button className="calendar-nav-btn" onClick={nextWeek}>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                      
                      <div className="week-view">
                        {generateWeekDays().map((day, index) => (
                          <div 
                            key={index} 
                            className={`week-day ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                            onClick={() => handleDayClick(day)}
                          >
                            <div className="week-day-header">
                              <div className="week-day-name">{day.date.toLocaleString('default', { weekday: 'short' })}</div>
                              <div className="week-day-date">{day.date.getDate()}</div>
                            </div>
                            
                            <div className="week-day-sessions">
                              {[...upcomingSessions, ...availableSessions]
                                .filter(session => {
                                  const sessionDate = new Date(session.date);
                                  return sessionDate.toDateString() === day.date.toDateString();
                                })
                                .sort((a, b) => {
                                  // Sort by time
                                  const timeA = a.time.split(':').map(Number);
                                  const timeB = b.time.split(':').map(Number);
                                  return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                                })
                                .map(session => (
                                  <div 
                                    key={session.id}
                                    className={`week-session ${upcomingSessions.some(s => s.id === session.id) ? 'booked' : 'available'}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDayClick(day);
                                    }}
                                    style={{
                                      borderLeftColor: session.category ? 
                                        getSessionCategoryColor(session.category) : 
                                        undefined,
                                      boxShadow: session.category ? 
                                        `0 2px 5px ${getSessionCategoryColor(session.category)}50` : 
                                        undefined
                                    }}
                                  >
                                    <div className="week-session-time">{formatTime(session.time)}</div>
                                    <div className="week-session-title">{session.title}</div>
                                  </div>
                                ))
                              }
                              {[...upcomingSessions, ...availableSessions]
                                .filter(session => {
                                  const sessionDate = new Date(session.date);
                                  return sessionDate.toDateString() === day.date.toDateString();
                                }).length === 0 && (
                                  <div className="no-sessions">No sessions</div>
                                )
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {selectedDate && (
                    <div className="selected-date-sessions">
                      <h4>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        Sessions on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </h4>
                      
                      {/* Find sessions for selected date */}
                      {[...upcomingSessions, ...availableSessions].filter(session => {
                        const sessionDate = new Date(session.date);
                        return sessionDate.toDateString() === selectedDate.toDateString();
                      }).length > 0 ? (
                        <>
                          <div className="day-schedule-timeline">
                            <div className="timeline-hours">
                              {Array.from({ length: 12 }, (_, i) => i + 7).map((hour) => (
                                <div key={hour} className="timeline-hour">
                                  <span className="hour-label">{hour % 12 || 12} {hour < 12 ? 'AM' : 'PM'}</span>
                                  <div className="hour-line"></div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="timeline-sessions">
                              {[...upcomingSessions, ...availableSessions]
                                .filter(session => {
                                  const sessionDate = new Date(session.date);
                                  return sessionDate.toDateString() === selectedDate.toDateString();
                                })
                                .sort((a, b) => {
                                  // Sort by time
                                  const timeA = a.time.split(':').map(Number);
                                  const timeB = b.time.split(':').map(Number);
                                  return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                                })
                                .map(session => {
                                  // Calculate position based on time
                                  const [hours, minutes] = session.time.split(':').map(Number);
                                  const timePosition = ((hours - 7) * 60 + minutes) / (12 * 60) * 100;
                                  
                                  // Calculate height based on duration
                                  const durationMinutes = parseInt(session.duration?.split(' ')[0] || '60');
                                  const heightPercent = Math.max(5, (durationMinutes / (12 * 60)) * 100);
                                  
                                  return (
                                    <div 
                                      key={session.id} 
                                      className="timeline-session" 
                                      style={{ 
                                        top: `${timePosition}%`,
                                        height: `${heightPercent}%`,
                                        backgroundColor: `${session.category ? getSessionCategoryColor(session.category) : '#6b778c'}20`,
                                        borderLeft: `4px solid ${session.category ? getSessionCategoryColor(session.category) : '#6b778c'}`
                                      }}
                                    >
                                      <div className="timeline-session-time">{formatTime(session.time)}</div>
                                      <div className="timeline-session-title">{session.title}</div>
                                      <div className="timeline-session-details">
                                        <span className="timeline-coach">{session.coach}</span>
                                        <span className="timeline-location">{session.location}</span>
                                        <span className="timeline-duration">{session.duration}</span>
                                      </div>
                                    </div>
                                  );
                                })
                              }
                            </div>
                          </div>

                          <div className="date-sessions-list">
                            {[...upcomingSessions, ...availableSessions]
                              .filter(session => {
                                const sessionDate = new Date(session.date);
                                return sessionDate.toDateString() === selectedDate.toDateString();
                              })
                              .sort((a, b) => {
                                // Sort by time
                                const timeA = a.time.split(':').map(Number);
                                const timeB = b.time.split(':').map(Number);
                                return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                              })
                              .map(session => (
                                <div 
                                  key={session.id} 
                                  className={`date-session-item ${session.category || ''}`}
                                  style={{
                                    borderLeft: `4px solid ${session.category ? getSessionCategoryColor(session.category) : 'var(--color-neon-green)'}`
                                  }}
                                >
                                  <div className="session-time">{formatTime(session.time)}</div>
                                  <div className="session-info">
                                    <h5>{session.title}</h5>
                                    <p>
                                      <FontAwesomeIcon icon={faUserFriends} className="session-icon" />
                                      Coach: {session.coach}
                                    </p>
                                    <p>
                                      <FontAwesomeIcon icon={faMapMarkerAlt} className="session-icon" />
                                      {session.location}
                                    </p>
                                    {session.duration && (
                                      <p>
                                        <FontAwesomeIcon icon={faCalendarCheck} className="session-icon" />
                                        Duration: {session.duration}
                                      </p>
                                    )}
                                    {session.description && (
                                      <p className="session-description">
                                        <FontAwesomeIcon icon={faFileAlt} className="session-icon" />
                                        {session.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="session-status">
                                    {upcomingSessions.some(upcoming => upcoming.id === session.id) ? (
                                      <span className="status-booked">
                                        <FontAwesomeIcon icon={faCheckCircle} /> Booked
                                      </span>
                                    ) : (
                                      <button className="btn-book" onClick={() => bookSession(session)}>Book Session</button>
                                    )}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </>
                      ) : (
                        <p className="no-sessions-message">No sessions scheduled for this date</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Available Sessions Section */}
              {activeScheduleTab === 'available' && (
                <div className="available-sessions-container">
                  <div className="section-header">
                    <h3>Available Training Sessions</h3>
                    <div className="filter-options">
                      <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input type="text" placeholder="Search sessions..." />
                      </div>
                      <div className="session-filters">
                        <select 
                          name="type" 
                          value={sessionFilters.type} 
                          onChange={handleFilterChange}
                          className="filter-select"
                        >
                          <option value="all">All Session Types</option>
                          {getUniqueSessionTypes().map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                        <select 
                          name="coach" 
                          value={sessionFilters.coach} 
                          onChange={handleFilterChange}
                          className="filter-select"
                        >
                          <option value="all">All Coaches</option>
                          {getUniqueCoaches().map((coach, index) => (
                            <option key={index} value={coach}>{coach}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sessions-grid">
                    {getFilteredAvailableSessions().map(session => (
                      <div key={session.id} className="session-card">
                        <div className="session-card-header">
                          <h4>{session.title}</h4>
                          <span className="session-duration">{session.duration}</span>
                        </div>
                        <div className="session-card-details">
                          <p>
                            <FontAwesomeIcon icon={faCalendarAlt} className="card-icon" />
                            {formatDate(session.date)} at {session.time}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faUserFriends} className="card-icon" />
                            Coach: {session.coach}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="card-icon" />
                            {session.location}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faRunning} className="card-icon" />
                            {session.spots} spots remaining
                          </p>
                        </div>
                        <button className="btn-book-session" onClick={() => bookSession(session)}>Book Now</button>
                      </div>
                    ))}
                  </div>
                  
                  {getFilteredAvailableSessions().length === 0 && (
                    <div className="no-sessions-available">
                      <FontAwesomeIcon icon={faExclamationCircle} className="no-sessions-icon" />
                      <h4>No sessions match your filters</h4>
                      <p>Try adjusting your filter criteria to see more results</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Session History Section */}
              {activeScheduleTab === 'history' && (
                <div className="session-history-container">
                  <div className="section-header">
                    <h3>Training Session History</h3>
                    <div className="filter-options">
                      <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input 
                          type="text" 
                          placeholder="Search sessions..." 
                          value={sessionHistoryFilters.search} 
                          onChange={handleSearchChange} 
                        />
                      </div>
                      <div className="date-filter">
                        <button 
                          className={sessionHistoryFilters.dateRange === 'all' ? 'active' : ''} 
                          onClick={() => handleDateRangeChange('all')}
                        >
                          All Time
                        </button>
                        <button 
                          className={sessionHistoryFilters.dateRange === 'month' ? 'active' : ''} 
                          onClick={() => handleDateRangeChange('month')}
                        >
                          Last Month
                        </button>
                        <button 
                          className={sessionHistoryFilters.dateRange === 'quarter' ? 'active' : ''} 
                          onClick={() => handleDateRangeChange('quarter')}
                        >
                          Last 3 Months
                        </button>
                        <button 
                          className={sessionHistoryFilters.dateRange === 'year' ? 'active' : ''} 
                          onClick={() => handleDateRangeChange('year')}
                        >
                          Last Year
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="history-table-container">
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Session</th>
                          <th>Coach</th>
                          <th>Location</th>
                          <th>Feedback</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredSessionHistory().map(session => (
                          <tr key={session.id}>
                            <td>{formatDate(session.date)}</td>
                            <td>{session.title}</td>
                            <td>{session.coach}</td>
                            <td>{session.location}</td>
                            <td>{session.feedback}</td>
                            <td>
                              <div className="session-rating">
                                {[...Array(5)].map((_, i) => (
                                  <FontAwesomeIcon 
                                    key={i} 
                                    icon={faTrophy} 
                                    className={i < session.rating ? 'rated' : 'unrated'} 
                                  />
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {getFilteredSessionHistory().length === 0 && (
                    <div className="no-history">
                      <FontAwesomeIcon icon={faExclamationCircle} className="no-history-icon" />
                      <h4>No session history found</h4>
                      <p>No sessions match your search criteria</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Booking Confirmation Modal */}
              {bookingInProgress && sessionToBook && (
                <div className="booking-modal-overlay">
                  <div className="booking-modal">
                    <div className="booking-modal-header">
                      <h3>Confirm Booking</h3>
                      <button className="close-modal" onClick={cancelBooking}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </div>
                    <div className="booking-modal-content">
                      <p>You are about to book the following session:</p>
                      <div className="booking-session-details">
                        <h4>{sessionToBook.title}</h4>
                        <p>
                          <FontAwesomeIcon icon={faCalendarAlt} className="booking-icon" />
                          {formatDate(sessionToBook.date)} at {sessionToBook.time}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faUserFriends} className="booking-icon" />
                          Coach: {sessionToBook.coach}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="booking-icon" />
                          {sessionToBook.location}
                        </p>
                        {sessionToBook.duration && (
                          <p>
                            <FontAwesomeIcon icon={faCalendarCheck} className="booking-icon" />
                            Duration: {sessionToBook.duration}
                          </p>
                        )}
                      </div>
                      <div className="booking-note">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="note-icon" />
                        <p>Please make sure you can attend this session. Cancellations should be made at least 24 hours in advance.</p>
                      </div>
                    </div>
                    <div className="booking-modal-actions">
                      <button className="btn-cancel" onClick={cancelBooking}>Cancel</button>
                      <button className="btn-confirm" onClick={confirmBooking}>Confirm Booking</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Progress Tab Content */}
          {activeTab === 'progress' && (
            <div className="dashboard-content progress-content">
              <div className="progress-tabs">
                <button 
                  className={`progress-tab ${activeProgressTab === 'skills' ? 'active' : ''}`} 
                  onClick={() => setActiveProgressTab('skills')}
                >
                  <FontAwesomeIcon icon={faStar} />
                  Skills Assessment
                </button>
                <button 
                  className={`progress-tab ${activeProgressTab === 'metrics' ? 'active' : ''}`} 
                  onClick={() => setActiveProgressTab('metrics')}
                >
                  <FontAwesomeIcon icon={faChartBar} />
                  Performance Metrics
                </button>
                <button 
                  className={`progress-tab ${activeProgressTab === 'development' ? 'active' : ''}`} 
                  onClick={() => setActiveProgressTab('development')}
                >
                  <FontAwesomeIcon icon={faBullseye} />
                  Development Plans
                </button>
              </div>
              
              {/* Skills Assessment Section */}
              {activeProgressTab === 'skills' && (
                <div className="skills-assessment-container">
                  <div className="section-header">
                    <h3>Skills Assessment Profile</h3>
                    <div className="skills-legend">
                      <div className="legend-item">
                        <span className="legend-color current"></span>
                        <span>Current Level</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color previous"></span>
                        <span>Previous Level</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                      <div key={index} className="skill-card">
                        <div className="skill-header">
                          <h4>{skill.name}</h4>
                          <div className="skill-level">
                            <span className="current-level">{skill.currentLevel}</span>
                            <span className="max-level">/{skill.maxLevel}</span>
                          </div>
                        </div>
                        
                        <div className="skill-bar-container">
                          {/* Previous level indicator */}
                          <div 
                            className="skill-bar-previous" 
                            style={{ width: `${(skill.previousLevel / skill.maxLevel) * 100}%` }}
                          ></div>
                          
                          {/* Current level bar */}
                          <div 
                            className="skill-bar" 
                            style={{ width: `${(skill.currentLevel / skill.maxLevel) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="skill-improvement">
                          <span className="improvement-label">Improvement:</span>
                          <span className="improvement-value">
                            +{skill.currentLevel - skill.previousLevel} points
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="skills-note">
                    <div className="note-icon">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div className="note-content">
                      <h4>About Your Assessment</h4>
                      <p>
                        Skills are assessed by your coaches based on performance in training sessions and matches.
                        Assessments are updated monthly and reflect your progress in the program.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Performance Metrics Section */}
              {activeProgressTab === 'metrics' && (
                <div className="performance-metrics-container">
                  <div className="section-header">
                    <h3>Performance Analysis</h3>
                    <div className="period-selector">
                      {performanceMetrics.map((period, index) => (
                        <button 
                          key={index}
                          className={activePeriod === period.period ? 'active' : ''}
                          onClick={() => setActivePeriod(period.period)}
                        >
                          {period.period}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="metrics-grid">
                    {performanceMetrics
                      .find(period => period.period === activePeriod)
                      .metrics.map((metric, index) => (
                        <div key={index} className="metric-card">
                          <h4>{metric.name}</h4>
                          <div className="metric-value-container">
                            <span className="metric-value">{metric.value}</span>
                            <span className="metric-trend">
                              {getTrendIcon(metric.trend)}
                            </span>
                          </div>
                          <div className="metric-gauge">
                            <div 
                              className="metric-gauge-fill"
                              style={{ width: metric.value }}
                            ></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  
                  <div className="metrics-analysis">
                    <h4>Performance Insights</h4>
                    <div className="analysis-content">
                      <p>
                        Your performance shows strong improvement in technical execution and physical output.
                        Continue to focus on tactical application to reach your full potential.
                      </p>
                      <div className="coach-recommendation">
                        <div className="coach-icon">
                          <FontAwesomeIcon icon={faUserFriends} />
                        </div>
                        <div className="recommendation-text">
                          <h5>Coach's Recommendation</h5>
                          <p>
                            "Alex is showing excellent progress in technical areas. We recommend additional
                            tactical sessions to further develop game awareness and decision-making."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Development Plans Section */}
              {activeProgressTab === 'development' && (
                <div className="development-plans-container">
                  <div className="section-header">
                    <h3>Personal Development Plans</h3>
                  </div>
                  
                  <div className="plans-grid">
                    {developmentPlans.map((plan) => (
                      <div key={plan.id} className="plan-card">
                        <div className="plan-header">
                          <h4>{plan.title}</h4>
                          <div className="progress-circle">
                            <span className="progress-text">{plan.progress}%</span>
                            <svg viewBox="0 0 36 36" className="progress-ring">
                              <path 
                                className="progress-ring-bg"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="3"
                              />
                              <path 
                                className="progress-ring-fg"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="var(--color-neon-green)"
                                strokeWidth="3"
                                strokeDasharray={`${plan.progress}, 100`}
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                        
                        <p className="plan-description">{plan.description}</p>
                        
                        <div className="plan-tasks">
                          <h5>Action Items:</h5>
                          <ul className="tasks-list">
                            {plan.tasks.map((task) => (
                              <li key={task.id} className={task.completed ? 'completed' : ''}>
                                <button onClick={() => toggleTask(plan.id, task.id)}>
                                  <FontAwesomeIcon icon={task.completed ? faCheckCircle : faClipboardList} />
                                  <span>{task.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Documents Tab Content */}
          {activeTab === 'documents' && (
            <div className="dashboard-content documents-content">
              <div className="documents-tabs">
                <button 
                  className={`documents-tab ${activeDocumentsTab === 'resources' ? 'active' : ''}`} 
                  onClick={() => setActiveDocumentsTab('resources')}
                >
                  <FontAwesomeIcon icon={faFolder} />
                  Resources
                </button>
                <button 
                  className={`documents-tab ${activeDocumentsTab === 'forms' ? 'active' : ''}`} 
                  onClick={() => setActiveDocumentsTab('forms')}
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                  Forms
                </button>
                <button 
                  className={`documents-tab ${activeDocumentsTab === 'certificates' ? 'active' : ''}`} 
                  onClick={() => setActiveDocumentsTab('certificates')}
                >
                  <FontAwesomeIcon icon={faCertificate} />
                  Certificates
                </button>
              </div>
              
              {/* Resources Section */}
              {activeDocumentsTab === 'resources' && (
                <div className="resources-container">
                  <div className="section-header">
                    <h3>Training Resources</h3>
                    <div className="filter-options">
                      <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input 
                          type="text" 
                          placeholder="Search resources..." 
                          value={documentSearchQuery}
                          onChange={(e) => setDocumentSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="resource-filters">
                        <button 
                          className={documentsFilter === 'all' ? 'active' : ''}
                          onClick={() => setDocumentsFilter('all')}
                        >
                          All
                        </button>
                        <button 
                          className={documentsFilter === 'guides' ? 'active' : ''}
                          onClick={() => setDocumentsFilter('guides')}
                        >
                          Guides
                        </button>
                        <button 
                          className={documentsFilter === 'templates' ? 'active' : ''}
                          onClick={() => setDocumentsFilter('templates')}
                        >
                          Templates
                        </button>
                        <button 
                          className={documentsFilter === 'videos' ? 'active' : ''}
                          onClick={() => setDocumentsFilter('videos')}
                        >
                          Videos
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="resources-grid">
                    {getFilteredResources().map(resource => (
                      <div key={resource.id} className="resource-card">
                        <div className={`resource-icon ${getFileTypeClass(resource.type)}`}>
                          {getFileTypeIcon(resource.type)}
                        </div>
                        <div className="resource-details">
                          <h4>{resource.title}</h4>
                          <p className="resource-description">{resource.description}</p>
                          <div className="resource-meta">
                            <span className="resource-size">{formatFileSize(resource.size)}</span>
                            <span className="resource-date">Added: {formatDate(resource.date)}</span>
                          </div>
                        </div>
                        <div className="resource-actions">
                          <button className="resource-action-btn">
                            <FontAwesomeIcon icon={faEye} />
                            <span>View</span>
                          </button>
                          <button className="resource-action-btn">
                            <FontAwesomeIcon icon={faDownload} />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {getFilteredResources().length === 0 && (
                      <div className="no-resources">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <p>No resources found matching your search criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Forms Section */}
              {activeDocumentsTab === 'forms' && (
                <div className="forms-container">
                  <div className="section-header">
                    <h3>Forms & Documents</h3>
                    <button className="upload-btn">
                      <FontAwesomeIcon icon={faFileUpload} />
                      <span>Upload Document</span>
                    </button>
                  </div>
                  
                  <div className="forms-required-section">
                    <h4>
                      <FontAwesomeIcon icon={faExclamationTriangle} className="section-icon" />
                      Required Forms
                    </h4>
                    <div className="forms-list">
                      {forms.filter(form => form.required && form.status !== 'completed').map(form => (
                        <div key={form.id} className="form-card">
                          <div className="form-status">
                            {getStatusIcon(form.status)}
                          </div>
                          <div className="form-details">
                            <h5>{form.title}</h5>
                            <p>{form.description}</p>
                            {form.deadline && form.deadline !== 'None' && (
                              <div className="form-deadline">
                                <FontAwesomeIcon icon={faCalendarCheck} />
                                <span>Due by: {form.deadline}</span>
                              </div>
                            )}
                          </div>
                          <div className="form-actions">
                            <button className="form-action-btn primary">Complete Form</button>
                          </div>
                        </div>
                      ))}
                      
                      {forms.filter(form => form.required && form.status !== 'completed').length === 0 && (
                        <div className="all-completed-message">
                          <FontAwesomeIcon icon={faCheckCircle} />
                          <p>All required forms have been completed. Great job!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="forms-other-section">
                    <h4>
                      <FontAwesomeIcon icon={faFileAlt} className="section-icon" />
                      Optional & Completed Forms
                    </h4>
                    <div className="forms-list">
                      {forms
                        .filter(form => !form.required || form.status === 'completed')
                        .map(form => (
                          <div key={form.id} className="form-card">
                            <div className="form-status">
                              {getStatusIcon(form.status)}
                            </div>
                            <div className="form-details">
                              <h5>{form.title}</h5>
                              <p>{form.description}</p>
                              {form.status === 'completed' ? (
                                <div className="form-completion">
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                  <span>Completed on: {form.completedDate}</span>
                                </div>
                              ) : (
                                form.deadline && form.deadline !== 'None' && (
                                  <div className="form-deadline">
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                    <span>Due by: {form.deadline}</span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="form-actions">
                              {form.status === 'completed' ? (
                                <button className="form-action-btn secondary">View Submission</button>
                              ) : (
                                <button className="form-action-btn primary">Complete Form</button>
                              )}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
              
              {/* Certificates Section */}
              {activeDocumentsTab === 'certificates' && (
                <div className="certificates-container">
                  <div className="section-header">
                    <h3>Certificates & Achievements</h3>
                  </div>
                  
                  {certificates.length > 0 ? (
                    <div className="certificates-grid">
                      {certificates.map(certificate => (
                        <div key={certificate.id} className="certificate-card">
                          <div className="certificate-preview">
                            <div className="certificate-icon">
                              <FontAwesomeIcon icon={faCertificate} />
                            </div>
                          </div>
                          <div className="certificate-details">
                            <h4>{certificate.title}</h4>
                            <p>{certificate.description}</p>
                            <div className="certificate-meta">
                              <div className="certificate-date">
                                <span>Issued: {formatDate(certificate.issueDate)}</span>
                                {certificate.expiryDate !== 'No Expiry' && (
                                  <span>Expires: {formatDate(certificate.expiryDate)}</span>
                                )}
                              </div>
                            </div>
                            <div className="certificate-actions">
                              <button className="cert-action-btn">
                                <FontAwesomeIcon icon={faEye} />
                                <span>View</span>
                              </button>
                              <button className="cert-action-btn">
                                <FontAwesomeIcon icon={faDownload} />
                                <span>Download</span>
                              </button>
                              <button className="cert-action-btn">
                                <FontAwesomeIcon icon={faShareAlt} />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-certificates">
                      <FontAwesomeIcon icon={faCertificate} />
                      <h4>No Certificates Yet</h4>
                      <p>Complete training modules and assessments to earn certificates</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Messages Tab Content */}
          {activeTab === 'messages' && (
            <div className="dashboard-content messages-content">
              {/* Messages Navigation */}
              <div className="messages-nav">
                <div className="messages-tabs">
                  <button 
                    className={`messages-tab ${activeMessagesTab === 'inbox' ? 'active' : ''}`} 
                    onClick={() => setActiveMessagesTab('inbox')}
                  >
                    <FontAwesomeIcon icon={faInbox} />
                    <span>Inbox</span>
                    <span className="unread-count">
                      {messages.filter(m => !m.read).length}
                    </span>
                  </button>
                  <button 
                    className={`messages-tab ${activeMessagesTab === 'important' ? 'active' : ''}`} 
                    onClick={() => setActiveMessagesTab('important')}
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span>Important</span>
                  </button>
                </div>
                <button className="compose-btn" onClick={() => setIsComposing(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  <span>Compose</span>
                </button>
              </div>
              
              {/* Messages Content Area */}
              <div className="messages-container">
                {/* Not composing and no message selected - show message list */}
                {!isComposing && !selectedMessage && (
                  <>
                    <div className="messages-header">
                      <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input 
                          type="text" 
                          placeholder="Search messages..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="messages-list">
                      {getFilteredMessages()
                        .filter(message => 
                          activeMessagesTab === 'inbox' || 
                          (activeMessagesTab === 'important' && message.important)
                        )
                        .map(message => (
                          <div 
                            key={message.id} 
                            className={`message-item ${!message.read ? 'unread' : ''}`}
                            onClick={() => viewMessage(message.id)}
                          >
                            <div className="message-status">
                              {message.important && (
                                <span className="important-marker">
                                  <FontAwesomeIcon icon={faExclamationCircle} />
                                </span>
                              )}
                            </div>
                            <div className="message-content">
                              <div className="message-sender">{message.sender}</div>
                              <div className="message-subject">{message.subject}</div>
                              <div className="message-preview">{message.preview}</div>
                            </div>
                            <div className="message-date">
                              {formatDate(message.date)}
                            </div>
                          </div>
                        ))
                      }
                      
                      {getFilteredMessages().filter(message => 
                        activeMessagesTab === 'inbox' || 
                        (activeMessagesTab === 'important' && message.important)
                      ).length === 0 && (
                        <div className="no-messages">
                          <FontAwesomeIcon icon={faInbox} />
                          <p>No messages found</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {/* Message Detail View */}
                {selectedMessage && (
                  <div className="message-detail-view">
                    <div className="message-detail-header">
                      <button className="back-btn" onClick={closeMessageView}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Inbox</span>
                      </button>
                      <div className="message-actions">
                        <button className="message-action-btn">
                          <FontAwesomeIcon icon={faReply} />
                          <span>Reply</span>
                        </button>
                        <button 
                          className="message-action-btn"
                          onClick={() => toggleImportance(selectedMessage.id)}
                        >
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          <span>{selectedMessage.important ? 'Unmark Important' : 'Mark Important'}</span>
                        </button>
                        <button className="message-action-btn">
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="message-detail-content">
                      <div className="message-detail-info">
                        <h3 className="message-detail-subject">{selectedMessage.subject}</h3>
                        <div className="message-detail-meta">
                          <span className="message-detail-sender">From: {selectedMessage.sender}</span>
                          <span className="message-detail-date">Date: {formatDate(selectedMessage.date)}</span>
                        </div>
                      </div>
                      
                      <div className="message-detail-body">
                        {selectedMessage.content.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Compose Message View */}
                {isComposing && (
                  <div className="compose-view">
                    <div className="compose-header">
                      <h3>New Message</h3>
                      <button className="close-compose-btn" onClick={() => setIsComposing(false)}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </div>
                    
                    <div className="compose-form">
                      <div className="compose-field">
                        <label htmlFor="recipient">To:</label>
                        <input 
                          type="text" 
                          id="recipient" 
                          name="recipient" 
                          placeholder="Recipient name or email"
                          value={composeMessage.recipient}
                          onChange={handleComposeChange}
                        />
                      </div>
                      
                      <div className="compose-field">
                        <label htmlFor="subject">Subject:</label>
                        <input 
                          type="text" 
                          id="subject" 
                          name="subject" 
                          placeholder="Message subject"
                          value={composeMessage.subject}
                          onChange={handleComposeChange}
                        />
                      </div>
                      
                      <div className="compose-field">
                        <textarea 
                          name="content" 
                          placeholder="Type your message here..."
                          rows="8"
                          value={composeMessage.content}
                          onChange={handleComposeChange}
                        ></textarea>
                      </div>
                      
                      <div className="compose-actions">
                        <button className="compose-action-btn secondary">
                          <FontAwesomeIcon icon={faPaperclip} />
                          <span>Attach</span>
                        </button>
                        <button className="compose-action-btn primary" onClick={sendMessage}>
                          <FontAwesomeIcon icon={faPaperPlane} />
                          <span>Send Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="dashboard-content settings-content">
              <div className="settings-sidebar">
                <div className="settings-tabs">
                  <button 
                    className={`settings-tab ${activeSettingsTab === 'profile' ? 'active' : ''}`} 
                    onClick={() => setActiveSettingsTab('profile')}
                  >
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className={`settings-tab ${activeSettingsTab === 'notifications' ? 'active' : ''}`} 
                    onClick={() => setActiveSettingsTab('notifications')}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    <span>Notifications</span>
                  </button>
                  <button 
                    className={`settings-tab ${activeSettingsTab === 'security' ? 'active' : ''}`} 
                    onClick={() => setActiveSettingsTab('security')}
                  >
                    <FontAwesomeIcon icon={faShieldAlt} />
                    <span>Security & Privacy</span>
                  </button>
                  <button 
                    className={`settings-tab ${activeSettingsTab === 'account' ? 'active' : ''}`} 
                    onClick={() => setActiveSettingsTab('account')}
                  >
                    <FontAwesomeIcon icon={faCog} />
                    <span>Account</span>
                  </button>
                </div>
              </div>
              
              <div className="settings-main">
                {/* Profile Settings */}
                {activeSettingsTab === 'profile' && (
                  <div className="settings-section">
                    <div className="section-header">
                      <h3>Profile Information</h3>
                      {!isEditing ? (
                        <button className="edit-btn" onClick={startProfileEdit}>
                          <FontAwesomeIcon icon={faEdit} />
                          <span>Edit Profile</span>
                        </button>
                      ) : (
                        <div className="edit-actions">
                          <button className="cancel-btn" onClick={cancelProfileEdit}>
                            <span>Cancel</span>
                          </button>
                          <button className="save-btn" onClick={saveProfileChanges}>
                            <FontAwesomeIcon icon={faSave} />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="profile-content">
                      <div className="profile-pic-section">
                        <div className="profile-pic">
                          <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        {isEditing && (
                          <button className="change-pic-btn">
                            <FontAwesomeIcon icon={faCamera} />
                            <span>Change Photo</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="profile-details">
                        <div className="profile-form">
                          <div className="form-row">
                            <div className="form-group">
                              <label>First Name</label>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  name="firstName" 
                                  value={profileEdit.firstName} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.firstName}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Last Name</label>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  name="lastName" 
                                  value={profileEdit.lastName} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.lastName}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Email</label>
                              {isEditing ? (
                                <input 
                                  type="email" 
                                  name="email" 
                                  value={profileEdit.email} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.email}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Phone Number</label>
                              {isEditing ? (
                                <input 
                                  type="tel" 
                                  name="phone" 
                                  value={profileEdit.phone} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.phone}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Date of Birth</label>
                              {isEditing ? (
                                <input 
                                  type="date" 
                                  name="dob" 
                                  value={profileEdit.dob} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.dob}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="form-row full-width">
                            <div className="form-group">
                              <label>Address</label>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  name="address" 
                                  value={profileEdit.address} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.address}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="section-divider"></div>
                          <h4>Emergency Contact</h4>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Contact Name</label>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  name="emergencyContact" 
                                  value={profileEdit.emergencyContact} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.emergencyContact}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Contact Phone</label>
                              {isEditing ? (
                                <input 
                                  type="tel" 
                                  name="emergencyPhone" 
                                  value={profileEdit.emergencyPhone} 
                                  onChange={handleProfileChange} 
                                />
                              ) : (
                                <div className="field-value">{profileData.emergencyPhone}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Notification Settings */}
                {activeSettingsTab === 'notifications' && (
                  <div className="settings-section">
                    <div className="section-header">
                      <h3>Notification Preferences</h3>
                    </div>
                    
                    <div className="notifications-content">
                      <div className="notification-type">
                        <h4>
                          <FontAwesomeIcon icon={faEnvelope} />
                          Email Notifications
                        </h4>
                        
                        <div className="notification-list">
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Training Updates</span>
                              <span className="notification-desc">Schedule changes, new sessions, etc.</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.email.trainingUpdates ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('email', 'trainingUpdates')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.email.trainingUpdates ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Performance Reports</span>
                              <span className="notification-desc">Skills assessments, progress updates</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.email.performanceReports ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('email', 'performanceReports')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.email.performanceReports ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">News & Events</span>
                              <span className="notification-desc">Program announcements, newsletters</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.email.newsAndEvents ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('email', 'newsAndEvents')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.email.newsAndEvents ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Account Alerts</span>
                              <span className="notification-desc">Required documents, billing information</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.email.accountAlerts ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('email', 'accountAlerts')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.email.accountAlerts ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="notification-type">
                        <h4>
                          <FontAwesomeIcon icon={faMobileAlt} />
                          Push Notifications
                        </h4>
                        
                        <div className="notification-list">
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Training Updates</span>
                              <span className="notification-desc">Schedule changes, new sessions, etc.</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.push.trainingUpdates ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('push', 'trainingUpdates')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.push.trainingUpdates ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Performance Reports</span>
                              <span className="notification-desc">Skills assessments, progress updates</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.push.performanceReports ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('push', 'performanceReports')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.push.performanceReports ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">News & Events</span>
                              <span className="notification-desc">Program announcements, newsletters</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.push.newsAndEvents ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('push', 'newsAndEvents')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.push.newsAndEvents ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                          
                          <div className="notification-item">
                            <div className="notification-info">
                              <span className="notification-name">Account Alerts</span>
                              <span className="notification-desc">Required documents, billing information</span>
                            </div>
                            <button 
                              className={`toggle-btn ${notificationPreferences.push.accountAlerts ? 'on' : 'off'}`}
                              onClick={() => toggleNotification('push', 'accountAlerts')}
                            >
                              <FontAwesomeIcon icon={notificationPreferences.push.accountAlerts ? faToggleOn : faToggleOff} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Security Settings */}
                {activeSettingsTab === 'security' && (
                  <div className="settings-section">
                    <div className="section-header">
                      <h3>Security & Privacy</h3>
                    </div>
                    
                    <div className="security-content">
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Change Password</h4>
                          <p>It's a good idea to use a strong password that you don't use elsewhere</p>
                        </div>
                        <button className="action-btn">
                          <FontAwesomeIcon icon={faLock} />
                          <span>Change Password</span>
                        </button>
                      </div>
                      
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Two-Factor Authentication</h4>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                        <button 
                          className={`toggle-btn large ${securitySettings.twoFactorEnabled ? 'on' : 'off'}`}
                          onClick={() => toggleSecurity('twoFactorEnabled')}
                        >
                          <FontAwesomeIcon icon={securitySettings.twoFactorEnabled ? faToggleOn : faToggleOff} />
                          <span>{securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      </div>
                      
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Login Alerts</h4>
                          <p>Receive notifications when your account is accessed from a new device</p>
                        </div>
                        <button 
                          className={`toggle-btn large ${securitySettings.loginAlerts ? 'on' : 'off'}`}
                          onClick={() => toggleSecurity('loginAlerts')}
                        >
                          <FontAwesomeIcon icon={securitySettings.loginAlerts ? faToggleOn : faToggleOff} />
                          <span>{securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      </div>
                      
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Data Sharing</h4>
                          <p>Allow anonymized performance data to be used for program improvement</p>
                        </div>
                        <button 
                          className={`toggle-btn large ${securitySettings.dataSharing ? 'on' : 'off'}`}
                          onClick={() => toggleSecurity('dataSharing')}
                        >
                          <FontAwesomeIcon icon={securitySettings.dataSharing ? faToggleOn : faToggleOff} />
                          <span>{securitySettings.dataSharing ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Account Settings */}
                {activeSettingsTab === 'account' && (
                  <div className="settings-section">
                    <div className="section-header">
                      <h3>Account Management</h3>
                    </div>
                    
                    <div className="account-content">
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Export Your Data</h4>
                          <p>Download a copy of your personal data and performance history</p>
                        </div>
                        <button 
                          className={`action-btn ${accountActions.exportDataStatus !== 'none' ? 'disabled' : ''}`}
                          onClick={requestDataExport}
                          disabled={accountActions.exportDataStatus !== 'none'}
                        >
                          {accountActions.exportDataStatus === 'none' && (
                            <>
                              <FontAwesomeIcon icon={faDownload} />
                              <span>Request Export</span>
                            </>
                          )}
                          {accountActions.exportDataStatus === 'pending' && (
                            <>
                              <div className="btn-spinner"></div>
                              <span>Processing...</span>
                            </>
                          )}
                          {accountActions.exportDataStatus === 'completed' && (
                            <>
                              <FontAwesomeIcon icon={faCheckCircle} />
                              <span>Download Ready</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Communication Preferences</h4>
                          <p>Manage how we communicate with you</p>
                        </div>
                        <button className="action-btn">
                          <FontAwesomeIcon icon={faGlobe} />
                          <span>Manage Preferences</span>
                        </button>
                      </div>
                      
                      <div className="setting-card">
                        <div className="setting-info">
                          <h4>Upload CV</h4>
                          <p>Upload your curriculum vitae to share with coaches and partners</p>
                          {cvUpload.fileName && (
                            <div className="uploaded-file">
                              <FontAwesomeIcon icon={faFilePdf} className="file-icon" />
                              <div className="file-info">
                                <span className="file-name">{cvUpload.fileName}</span>
                                <span className="file-date">Uploaded on {cvUpload.uploadDate}</span>
                              </div>
                            </div>
                          )}
                          {cvUpload.showSuccess && (
                            <div className="upload-success">
                              <FontAwesomeIcon icon={faCheckCircle} />
                              <span>CV uploaded successfully!</span>
                            </div>
                          )}
                        </div>
                        <label htmlFor="cv-upload" className="action-btn">
                          <FontAwesomeIcon icon={faFileUpload} />
                          <span>{cvUpload.fileName ? 'Update CV' : 'Upload CV'}</span>
                          <input 
                            type="file" 
                            id="cv-upload" 
                            accept=".pdf,.doc,.docx" 
                            style={{ display: 'none' }}
                            onChange={handleCvUpload}
                          />
                        </label>
                      </div>
                      
                      <div className="setting-card danger">
                        <div className="setting-info">
                          <h4>Deactivate Account</h4>
                          <p>Temporarily disable your account and access to the platform</p>
                        </div>
                        <button className="action-btn danger" onClick={openDeactivateConfirm}>
                          <span>Deactivate</span>
                        </button>
                      </div>
                      
                      {accountActions.deactivateConfirmOpen && (
                        <div className="confirmation-modal">
                          <div className="confirmation-content">
                            <h4>Deactivate Your Account?</h4>
                            <p>This will temporarily disable your access to the platform. All your data will be preserved, but you won't be able to log in until you contact support to reactivate your account.</p>
                            <div className="confirmation-actions">
                              <button className="cancel-btn" onClick={closeDeactivateConfirm}>
                                <FontAwesomeIcon icon={faThumbsDown} />
                                <span>Cancel</span>
                              </button>
                              <button className="confirm-btn" onClick={deactivateAccount}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <span>Confirm Deactivation</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 