import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import './Blog.css';

// Mock data for blog posts
const mockPosts = [
  {
    id: 1,
    title: "5 Essential Drills to Improve Your Ball Control",
    excerpt: "Master these five drills that professional players use to develop exceptional ball control and first touch skills.",
    category: "Training",
    author: "Coach Ahmed",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Nutrition Guide for Young Players",
    excerpt: "Learn what foods to eat before and after training to maximize performance and recovery for youth footballers.",
    category: "Nutrition",
    author: "Dr. Sarah Johnson",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 3,
    title: "From Academy to Pro: Success Stories",
    excerpt: "Read inspiring stories of players who made it from our academy to professional leagues around the world.",
    category: "Success Stories",
    author: "Mohamed Ali",
    date: "June 8, 2023",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Mental Toughness: The Overlooked Skill",
    excerpt: "Why mental resilience might be the most important skill for footballers and how to develop it.",
    category: "Psychology",
    author: "Coach Sam",
    date: "March 10, 2023",
    image: "https://images.unsplash.com/photo-1526232361755-76c7a45f3888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Understanding Youth Football Leagues",
    excerpt: "A comprehensive guide to youth football league structures and what parents should know.",
    category: "Youth Football",
    author: "Omar Khalid",
    date: "February 18, 2023",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Summer Training Plan for Players",
    excerpt: "Keep in top shape during the off-season with this comprehensive summer training program.",
    category: "Training",
    author: "Coach Ahmed",
    date: "May 30, 2023",
    image: "https://images.unsplash.com/photo-1526232373132-c2f94f6f51ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 7,
    title: "How to Choose the Right Football Boots",
    title: "Recovery Techniques for Busy Training Schedules",
    excerpt: "How to properly recover between training sessions to prevent injuries and improve performance...",
    category: "Health",
    author: "Dr. Sarah Johnson",
    date: "December 12, 2022",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: 8,
    title: "Goalkeeper Special: Reflexes and Positioning",
    excerpt: "Specialized training methods for goalkeepers looking to take their game to the next level...",
    category: "Goalkeeper",
    author: "Coach Kareem",
    date: "November 5, 2022",
    image: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(mockPosts.map(post => post.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on active category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Separate featured posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      <Navbar />
      
      <div className="blog-hero">
        <div className="container">
          <h1>PFT Academy Blog Hub</h1>
          <p>Insights, tips, and stories to help you excel in football</p>
        </div>
      </div>
      
      <div className="blog-content container">
        <div className="blog-search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <div className="featured-posts">
                <h2 className="section-title">Featured Articles</h2>
                <div className="featured-grid">
                  {featuredPosts.map(post => (
                    <div className="featured-post" key={post.id}>
                      <div className="post-image" style={{ backgroundImage: `url(${post.image})` }}>
                        <div className="post-category">{post.category}</div>
                      </div>
                      <div className="post-content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="post-meta">
                          <span className="post-author">{post.author}</span>
                          <span className="post-date">{post.date}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="read-more">Read Article</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="regular-posts">
              <h2 className="section-title">Recent Articles</h2>
              {regularPosts.length === 0 ? (
                <div className="no-posts">
                  <p>No articles found matching your criteria.</p>
                </div>
              ) : (
                <div className="posts-grid">
                  {regularPosts.map(post => (
                    <div className="post-card" key={post.id}>
                      <div className="post-image" style={{ backgroundImage: `url(${post.image})` }}>
                        <div className="post-category">{post.category}</div>
                      </div>
                      <div className="post-content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="post-meta">
                          <span className="post-author">{post.author}</span>
                          <span className="post-date">{post.date}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="read-more">Read Article</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog; 