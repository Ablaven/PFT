import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Auth.css';
import './admin-dashboard.css';
import Navbar from '../Landing/Navbar';
import SHA256 from 'crypto-js/sha256';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faTrophy, faChartLine, faCog, 
  faSignOutAlt, faBell, faEnvelope, faSearch,
  faHome, faCalendarAlt, faUserCircle, faEdit, 
  faTrash, faEye, faUserShield, faUserPlus, faPlus
} from '@fortawesome/free-solid-svg-icons';

const TestLogin = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([]);
  
  // Admin dashboard states
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New player registration', time: '2 minutes ago', read: false },
    { id: 2, message: 'Training session updated', time: '1 hour ago', read: false },
    { id: 3, message: 'Payment received for Level 5 program', time: '3 hours ago', read: true }
  ]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activePrograms: 3,
    completedTrainings: 124,
    pendingRequests: 7
  });

  // Mock program data
  const programs = [
    { id: 1, name: 'Beginner Training', users: 24, status: 'active', completion: 68 },
    { id: 2, name: 'Advanced Techniques', users: 15, status: 'active', completion: 42 },
    { id: 3, name: 'Professional Skills', users: 8, status: 'active', completion: 23 },
    { id: 4, name: 'Goalkeeper Training', users: 5, status: 'planned', completion: 0 }
  ];
  
  // Mock recent activities
  const recentActivities = [
    { id: 1, user: 'James Rodriguez', action: 'completed Level 3', time: '10 minutes ago' },
    { id: 2, user: 'Sarah Johnson', action: 'registered for Advanced Training', time: '1 hour ago' },
    { id: 3, user: 'Michael Chen', action: 'submitted assessment video', time: '3 hours ago' },
    { id: 4, user: 'Aisha Patel', action: 'achieved 95% score on skills test', time: '5 hours ago' }
  ];
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  useEffect(() => {
    console.log('TestLogin rendered, isLoggedIn:', isLoggedIn);
    
    // Load existing users and ensure admin exists
    const loadUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
      
      // Always ensure admin user exists by checking if there's an admin
      let adminExists = false;
      for (let user of storedUsers) {
        if (user.email === 'admin@pft.com') {
          adminExists = true;
          // Make sure admin has the correct password hash
          const correctHash = SHA256('admin123').toString();
          if (user.password !== correctHash) {
            console.log('Fixing admin password hash');
            user.password = correctHash;
          }
          break;
        }
      }
      
      // Add admin user if not found
      if (!adminExists) {
        console.log('Adding admin user to localStorage');
        const adminUser = {
          email: 'admin@pft.com',
          password: SHA256('admin123').toString(),
          name: 'Admin User',
          role: 'admin',
          created: new Date().toISOString()
        };
        storedUsers.push(adminUser);
        localStorage.setItem('pft_users', JSON.stringify(storedUsers));
      } else {
        // Save any updates we made to admin
        localStorage.setItem('pft_users', JSON.stringify(storedUsers));
      }
      
      setUsers(storedUsers);
    };
    
    loadUsers();
  }, [isLoggedIn]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Attempting login with:', email);
    
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
    
    // Find user by email
    const user = storedUsers.find(user => user.email === email);
    
    if (!user) {
      console.log('User not found with email:', email);
      toast.error('Invalid credentials. Please try again.');
      return;
    }
    
    // Log stored password hash for debugging
    console.log('Stored password hash:', user.password);
    
    // Hash the entered password and compare with stored hash
    const hashedPassword = SHA256(password).toString();
    console.log('Input password hash:', hashedPassword);
    
    if (user && user.password === hashedPassword) {
      console.log('Login successful');
      // Store a token
      const mockToken = "user-token-" + Math.random().toString(36).substring(2);
      sessionStorage.setItem('usertoken', mockToken);
      sessionStorage.setItem('current_user', JSON.stringify({
        email: user.email,
        name: user.name,
        role: user.role
      }));
      
      // Update context
      setIsLoggedIn(true);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('auth-state-changed'));
      
      // Show success message
      toast.success(`Welcome back, ${user.name || 'User'}!`);
      
      // Navigate to dashboard page if admin, otherwise home page
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      console.log('Password hash mismatch');
      toast.error('Invalid credentials. Please try again.');
    }
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
    
    // Check if email already exists
    if (storedUsers.some(user => user.email === email)) {
      toast.error('A user with this email already exists');
      return;
    }
    
    // Create new user with hashed password
    const hashedPassword = SHA256(password).toString();
    const newUser = {
      email,
      password: hashedPassword,
      name,
      role: 'user',
      created: new Date().toISOString()
    };
    
    // Add to users array
    storedUsers.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('pft_users', JSON.stringify(storedUsers));
    
    // Update state
    setUsers(storedUsers);
    
    // Reset form
    setEmail('');
    setPassword('');
    setName('');
    
    // Switch back to login
    setIsRegistering(false);
    
    // Show success message
    toast.success('Account created successfully! You can now log in.');
  };
  
  const handleLogout = () => {
    // Remove token
    localStorage.removeItem('usertoken');
    sessionStorage.removeItem('usertoken');
    sessionStorage.removeItem('current_user');
    
    // Update context
    setIsLoggedIn(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Show success message
    toast.success('Logged out successfully!');
    
    // Navigate to home page
    navigate('/');
  };
  
  // Get current user info
  const getCurrentUser = () => {
    const userStr = sessionStorage.getItem('current_user') || localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle notification click
  const handleNotificationClick = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? {...notification, read: true} : notification));
  };

  // Handle user creation
  const handleCreateUser = (e) => {
    e.preventDefault();
    
    const { name, email, password, role } = newUser;
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
    
    // Check if email already exists
    if (storedUsers.some(user => user.email === email)) {
      toast.error('A user with this email already exists');
      return;
    }
    
    // Create new user with hashed password
    const hashedPassword = SHA256(password).toString();
    const user = {
      email,
      password: hashedPassword,
      name,
      role,
      created: new Date().toISOString()
    };
    
    // Add to users array
    storedUsers.push(user);
    
    // Save to localStorage
    localStorage.setItem('pft_users', JSON.stringify(storedUsers));
    
    // Update state
    setUsers(storedUsers);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    
    // Hide form
    setIsAddingUser(false);
    
    // Show success message
    toast.success(`User ${name} created successfully!`);
  };
  
  // Handle user deletion
  const handleDeleteUser = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('pft_users') || '[]');
      
      // Filter out the user to delete
      const updatedUsers = storedUsers.filter(user => user.email !== email);
      
      // Save to localStorage
      localStorage.setItem('pft_users', JSON.stringify(updatedUsers));
      
      // Update state
      setUsers(updatedUsers);
      
      // Show success message
      toast.success('User deleted successfully');
    }
  };
  
  // Special direct admin login function
  const forceAdminLogin = () => {
    console.log('Force admin login');
    const mockToken = "admin-token-" + Math.random().toString(36).substring(2);
    sessionStorage.setItem('usertoken', mockToken);
    sessionStorage.setItem('current_user', JSON.stringify({
      email: 'admin@pft.com',
      name: 'Admin User',
      role: 'admin'
    }));
    
    // Update context
    setIsLoggedIn(true);
    
    // Dispatch custom event
    window.dispatchEvent(new Event('auth-state-changed'));
    
    toast.success('Admin login successful!');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  // Render the login form if user is not logged in as admin
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <Navbar />
        
        <div className="auth-overlay"></div>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="auth-card">
                <div className="auth-header">
                  <h1 className="auth-title">
                    <span className="text-neon">
                      {isRegistering ? 'Test Registration' : 'Admin Access'}
                    </span>
                  </h1>
                  <p className="auth-subtitle">
                    {isRegistering 
                      ? 'Create a test account to try the system'
                      : 'Admin login: admin@pft.com / admin123'}
                  </p>
                </div>
                
                <div className="auth-form-container">
                  {isRegistering ? (
                    <form className="auth-form" onSubmit={handleRegister}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="auth-button">
                          Register
                        </button>
                      </div>
                      
                      <div className="mt-3 text-center">
                        <button 
                          type="button"
                          className="auth-link-button" 
                          onClick={() => setIsRegistering(false)}
                        >
                          Already have an account? Log in
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form className="auth-form" onSubmit={handleLogin}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="d-flex justify-content-center flex-column">
                        <button type="submit" className="auth-button">
                          Login
                        </button>
                        
                        <button 
                          type="button" 
                          className="auth-button mt-3"
                          onClick={forceAdminLogin}
                          style={{backgroundColor: '#1e1e1e', color: '#39ff14'}}
                        >
                          One-Click Admin Access
                        </button>
                      </div>
                      
                      <div className="mt-3 text-center">
                        <button 
                          type="button"
                          className="auth-link-button" 
                          onClick={() => setIsRegistering(true)}
                        >
                          Don't have an account? Register
                        </button>
                      </div>
                    </form>
                  )}
                  
                  <div className="mt-4 text-center">
                    <button 
                      className="auth-button-secondary" 
                      onClick={() => navigate('/')}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render the admin dashboard if user is logged in
  return (
    <div className="admin-dashboard">
      <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-logo">
            <span className="logo-icon">PFT</span>
            {!isSidebarCollapsed && <span className="logo-text">Admin</span>}
          </h2>
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '»' : '«'}
          </button>
        </div>
        
        <div className="admin-profile">
          {!isSidebarCollapsed && (
            <div className="admin-profile-info">
              <h5>{currentUser?.name || 'Admin'}</h5>
              <span className="admin-role">Administrator</span>
            </div>
          )}
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li className={activeSection === 'dashboard' ? 'active' : ''}>
              <a href="#dashboard" onClick={() => setActiveSection('dashboard')}>
                <FontAwesomeIcon icon={faHome} />
                {!isSidebarCollapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li className={activeSection === 'users' ? 'active' : ''}>
              <a href="#users" onClick={() => setActiveSection('users')}>
                <FontAwesomeIcon icon={faUsers} />
                {!isSidebarCollapsed && <span>Users</span>}
              </a>
            </li>
            <li className={activeSection === 'programs' ? 'active' : ''}>
              <a href="#programs" onClick={() => setActiveSection('programs')}>
                <FontAwesomeIcon icon={faTrophy} />
                {!isSidebarCollapsed && <span>Programs</span>}
              </a>
            </li>
            <li className={activeSection === 'analytics' ? 'active' : ''}>
              <a href="#analytics" onClick={() => setActiveSection('analytics')}>
                <FontAwesomeIcon icon={faChartLine} />
                {!isSidebarCollapsed && <span>Analytics</span>}
              </a>
            </li>
            <li className={activeSection === 'settings' ? 'active' : ''}>
              <a href="#settings" onClick={() => setActiveSection('settings')}>
                <FontAwesomeIcon icon={faCog} />
                {!isSidebarCollapsed && <span>Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
      
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-search">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="admin-header-right">
            <div className="admin-notifications">
              <div className="dropdown">
                <button className="icon-button" data-bs-toggle="dropdown">
                  <FontAwesomeIcon icon={faBell} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="badge">{notifications.filter(n => !n.read).length}</span>
                  )}
                </button>
                <ul className="dropdown-menu notifications-dropdown">
                  <li className="dropdown-header">Notifications</li>
                  {notifications.length === 0 ? (
                    <li className="dropdown-item">No notifications</li>
                  ) : (
                    notifications.map(notification => (
                      <li 
                        key={notification.id} 
                        className={`dropdown-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <small>{notification.time}</small>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            
            <div className="admin-messages">
              <div className="dropdown">
                <button className="icon-button" data-bs-toggle="dropdown">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="badge">2</span>
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-header">Messages</li>
                  <li className="dropdown-item">
                    <div className="notification-content">
                      <p>New player inquiry</p>
                      <small>5 minutes ago</small>
                    </div>
                  </li>
                  <li className="dropdown-item">
                    <div className="notification-content">
                      <p>Training schedule update</p>
                      <small>1 hour ago</small>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="admin-profile-menu">
              <div className="dropdown">
                <button className="profile-button" data-bs-toggle="dropdown">
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                  <span className="profile-name">{currentUser?.name}</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#settings">Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        
        <main className="admin-content">
          {activeSection === 'dashboard' && (
            <div className="dashboard-section">
              <h1 className="section-title">Dashboard</h1>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon user-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="stat-details">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon program-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div className="stat-details">
                    <h3>{stats.activePrograms}</h3>
                    <p>Active Programs</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon training-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <div className="stat-details">
                    <h3>{stats.completedTrainings}</h3>
                    <p>Completed Trainings</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon request-icon">
                    <FontAwesomeIcon icon={faBell} />
                  </div>
                  <div className="stat-details">
                    <h3>{stats.pendingRequests}</h3>
                    <p>Pending Requests</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Recent Activities</h3>
                  </div>
                  <div className="card-body">
                    <ul className="activity-list">
                      {recentActivities.map(activity => (
                        <li key={activity.id} className="activity-item">
                          <div className="activity-content">
                            <p><strong>{activity.user}</strong> {activity.action}</p>
                            <span>{activity.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Program Status</h3>
                  </div>
                  <div className="card-body">
                    {programs.map(program => (
                      <div key={program.id} className="program-item">
                        <div className="program-info">
                          <h4>{program.name}</h4>
                          <div className="program-meta">
                            <span>{program.users} users</span>
                            <span className={`status-badge ${program.status}`}>
                              {program.status}
                            </span>
                          </div>
                        </div>
                        <div className="progress-container">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${program.completion}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{program.completion}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h1 className="section-title">User Management</h1>
                <button className="action-button" onClick={() => setIsAddingUser(true)}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  Add New User
                </button>
              </div>
              
              {isAddingUser && (
                <div className="user-form-card">
                  <div className="card-header">
                    <h3>Create New User</h3>
                    <button className="close-button" onClick={() => setIsAddingUser(false)}>×</button>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleCreateUser}>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={newUser.password}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          className="form-control"
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="coach">Coach</option>
                        </select>
                      </div>
                      
                      <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => setIsAddingUser(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-create">
                          <FontAwesomeIcon icon={faPlus} />
                          Create User
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              <div className="user-list-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.created).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-btn view-btn">
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                              <button className="action-btn edit-btn">
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                onClick={() => handleDeleteUser(user.email)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-results">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeSection === 'programs' && (
            <div className="programs-section">
              <h1 className="section-title">Training Programs</h1>
              
              <div className="program-cards">
                {programs.map(program => (
                  <div key={program.id} className="program-card">
                    <div className="program-card-header">
                      <h3>{program.name}</h3>
                      <span className={`status-badge ${program.status}`}>
                        {program.status}
                      </span>
                    </div>
                    <div className="program-card-body">
                      <div className="program-stats">
                        <div className="stat">
                          <span className="stat-value">{program.users}</span>
                          <span className="stat-label">Participants</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{program.completion}%</span>
                          <span className="stat-label">Completion</span>
                        </div>
                      </div>
                    </div>
                    <div className="program-card-footer">
                      <button className="program-action-btn">View Details</button>
                      <button className="program-action-btn">Edit Program</button>
                    </div>
                  </div>
                ))}
                
                <div className="program-card add-card">
                  <div className="add-program-content">
                    <div className="add-icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <h3>Add New Program</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'analytics' && (
            <div className="analytics-section">
              <h1 className="section-title">Analytics</h1>
              
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h3>User Growth</h3>
                  <div className="chart-placeholder">
                    <div className="bar-chart">
                      <div className="bar" style={{height: '40%'}}><span>Jan</span></div>
                      <div className="bar" style={{height: '55%'}}><span>Feb</span></div>
                      <div className="bar" style={{height: '70%'}}><span>Mar</span></div>
                      <div className="bar" style={{height: '60%'}}><span>Apr</span></div>
                      <div className="bar" style={{height: '85%'}}><span>May</span></div>
                      <div className="bar" style={{height: '95%'}}><span>Jun</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="analytics-card">
                  <h3>Program Engagement</h3>
                  <div className="chart-placeholder">
                    <div className="pie-chart">
                      <div className="pie-segment segment1" style={{transform: 'rotate(0deg)'}}></div>
                      <div className="pie-segment segment2" style={{transform: 'rotate(130deg)'}}></div>
                      <div className="pie-segment segment3" style={{transform: 'rotate(220deg)'}}></div>
                      <div className="pie-center">
                        <span>75%</span>
                      </div>
                    </div>
                    <div className="pie-legend">
                      <div className="legend-item"><span className="color-box segment1-color"></span>Beginner</div>
                      <div className="legend-item"><span className="color-box segment2-color"></span>Advanced</div>
                      <div className="legend-item"><span className="color-box segment3-color"></span>Elite</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="analytics-table-container">
                <h3>Performance Metrics</h3>
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>This Week</th>
                      <th>Last Week</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>New Registrations</td>
                      <td>24</td>
                      <td>18</td>
                      <td className="positive-change">+33%</td>
                    </tr>
                    <tr>
                      <td>Program Completions</td>
                      <td>12</td>
                      <td>15</td>
                      <td className="negative-change">-20%</td>
                    </tr>
                    <tr>
                      <td>Average Session Time</td>
                      <td>45 min</td>
                      <td>38 min</td>
                      <td className="positive-change">+18%</td>
                    </tr>
                    <tr>
                      <td>Assessment Submissions</td>
                      <td>32</td>
                      <td>29</td>
                      <td className="positive-change">+10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeSection === 'settings' && (
            <div className="settings-section">
              <h1 className="section-title">System Settings</h1>
              
              <div className="settings-container">
                <div className="settings-card">
                  <h3>Admin Account Settings</h3>
                  
                  <form className="settings-form">
                    <div className="form-group">
                      <label>Admin Email</label>
                      <input type="email" className="form-control" value={currentUser?.email} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>Admin Name</label>
                      <input type="text" className="form-control" defaultValue={currentUser?.name} />
                    </div>
                    
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" className="form-control" placeholder="Enter current password" />
                    </div>
                    
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" className="form-control" placeholder="Enter new password" />
                    </div>
                    
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" className="form-control" placeholder="Confirm new password" />
                    </div>
                    
                    <button type="submit" className="settings-save-btn">Save Changes</button>
                  </form>
                </div>
                
                <div className="settings-card">
                  <h3>System Preferences</h3>
                  
                  <div className="settings-options">
                    <div className="setting-item">
                      <div className="setting-label">
                        <span>Notifications</span>
                        <p className="setting-description">Enable email notifications for system events</p>
                      </div>
                      <div className="setting-control">
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-label">
                        <span>Dark Mode</span>
                        <p className="setting-description">Use dark theme for admin interface</p>
                      </div>
                      <div className="setting-control">
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-label">
                        <span>Auto-logout</span>
                        <p className="setting-description">Automatically log out after inactivity period</p>
                      </div>
                      <div className="setting-control">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-label">
                        <span>Inactivity Timeout</span>
                        <p className="setting-description">Time before automatic logout</p>
                      </div>
                      <div className="setting-control">
                        <select className="form-control">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="settings-actions">
                    <button className="settings-save-btn">Save Preferences</button>
                    <button className="settings-reset-btn">Reset to Default</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TestLogin; 