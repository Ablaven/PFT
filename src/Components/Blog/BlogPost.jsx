import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import './Blog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

// Import mock data from Blog.jsx (in a real app, this would be from an API or separate file)
const mockPosts = [
  {
    id: 1,
    title: "5 Essential Drills to Improve Your Ball Control",
    excerpt: "Master these five drills that professional players use to develop exceptional ball control and first touch skills.",
    category: "Training",
    author: "Coach Ahmed",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    content: `
      <p>Ball control is one of the most fundamental skills in football. Without it, even the most athletic players will struggle to make an impact on the game. Professional footballers spend countless hours perfecting their touch, and for good reason – better ball control means more time to make decisions, more successful dribbles, and ultimately more effective play.</p>
      
      <h2>Why Ball Control Matters</h2>
      <p>When you can control the ball instantly, you can:</p>
      <ul>
        <li>Maintain possession under pressure</li>
        <li>Create space for yourself and teammates</li>
        <li>Execute more precise passes and shots</li>
        <li>Increase your confidence on the ball</li>
      </ul>
      
      <p>Here are five essential drills that professional players regularly use to develop exceptional ball control:</p>
      
      <h2>1. The Figure Eight</h2>
      <p>This classic drill improves close control and coordination:</p>
      <ul>
        <li>Place two cones about 2 meters apart</li>
        <li>Dribble around the cones in a figure eight pattern</li>
        <li>Start slowly, focusing on using both feet</li>
        <li>Gradually increase speed while maintaining control</li>
        <li>Challenge yourself: Try using only your weaker foot</li>
      </ul>
      
      <h2>2. Wall Passes with First Touch Control</h2>
      <p>This drill simulates game situations where you need to control passes quickly:</p>
      <ul>
        <li>Stand 3-5 meters from a wall</li>
        <li>Pass the ball against the wall with moderate force</li>
        <li>Control the rebound with your first touch in a specific direction</li>
        <li>Pass again immediately</li>
        <li>Vary the surfaces you use: inside foot, outside foot, thigh, chest</li>
      </ul>
      
      <h2>3. Juggling Variations</h2>
      <p>Juggling improves touch, coordination, and concentration:</p>
      <ul>
        <li>Basic juggling: Keep the ball in the air using feet, thighs, and chest</li>
        <li>Sequence juggling: Establish patterns (e.g., right foot, left foot, thigh, repeat)</li>
        <li>Surface challenges: Limit yourself to specific body parts</li>
        <li>Movement juggling: Walk or jog while juggling</li>
      </ul>
      
      <h2>4. First Touch Directional Control</h2>
      <p>This drill develops your ability to control the ball into space with your first touch:</p>
      <ul>
        <li>Have a partner toss the ball to you from different angles</li>
        <li>Before the ball arrives, identify an open space to move into</li>
        <li>Use your first touch to direct the ball into that space</li>
        <li>Immediately accelerate after the ball</li>
        <li>Practice with all surfaces: inside/outside foot, instep, sole</li>
      </ul>
      
      <h2>5. Rondo Training</h2>
      <p>This game-like drill improves control under pressure:</p>
      <ul>
        <li>Form a circle with 5-6 players (keep possession) and 1-2 defenders</li>
        <li>The possession players must control and pass in one or two touches</li>
        <li>If a defender wins the ball, they swap with the player who lost it</li>
        <li>Focus on controlling passes quickly and accurately</li>
      </ul>
      
      <h2>Keys to Successful Practice</h2>
      <p>Remember these tips when practicing ball control:</p>
      <ul>
        <li>Quality over quantity: Focus on perfect technique</li>
        <li>Consistent practice: Even 15 minutes daily is better than 2 hours once a week</li>
        <li>Vary the surfaces: Use all parts of both feet</li>
        <li>Increase difficulty gradually: Start slow, then add speed and pressure</li>
        <li>Be patient: Mastery takes time</li>
      </ul>
      
      <p>Incorporate these drills into your training routine, and you'll notice improvements in your ball control within weeks. Remember that even the world's best players continue to practice these fundamentals throughout their careers.</p>
    `
  },
  {
    id: 2,
    title: "Nutrition Guide for Young Players",
    excerpt: "Learn what foods to eat before and after training to maximize performance and recovery for youth footballers.",
    category: "Nutrition",
    author: "Dr. Sarah Johnson",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    content: `
      <p>Proper nutrition is just as important as technical training for young footballers. What you eat directly impacts your energy levels, recovery time, and overall performance on the pitch. This guide will help young players and their parents understand how to fuel properly for optimal athletic development.</p>
      
      <h2>The Importance of Nutrition for Young Players</h2>
      <p>Young athletes have unique nutritional needs compared to adults:</p>
      <ul>
        <li>They're still growing and developing</li>
        <li>Their metabolism is typically faster</li>
        <li>They may not recognize hunger/thirst cues during intense activity</li>
        <li>Recovery and injury prevention are especially important</li>
      </ul>
      
      <h2>Fueling Before Training or Matches</h2>
      <p><strong>2-3 hours before:</strong> Eat a balanced meal containing:</p>
      <ul>
        <li>Complex carbohydrates (whole grains, brown rice, sweet potatoes)</li>
        <li>Moderate protein (chicken, fish, eggs, beans)</li>
        <li>Small amount of healthy fats (avocado, nuts, olive oil)</li>
        <li>Vegetables or fruits</li>
      </ul>
      
      <p><strong>Example meals:</strong></p>
      <ul>
        <li>Whole grain pasta with lean meat sauce and vegetables</li>
        <li>Brown rice with grilled chicken and steamed vegetables</li>
        <li>Wholemeal sandwich with tuna/chicken and salad</li>
      </ul>
      
      <p><strong>30-60 minutes before:</strong> If needed, a small carbohydrate snack:</p>
      <ul>
        <li>Banana</li>
        <li>Small bowl of low-fiber cereal</li>
        <li>Energy bar (look for low fat, low fiber options)</li>
        <li>Sports drink (if training in hot conditions)</li>
      </ul>
      
      <h2>Hydration Strategy</h2>
      <p>Staying hydrated is crucial for performance and safety:</p>
      <ul>
        <li><strong>2-3 hours before:</strong> 500-600ml of water</li>
        <li><strong>15 minutes before:</strong> 200-300ml of water</li>
        <li><strong>During training:</strong> Small sips every 15-20 minutes</li>
        <li><strong>For sessions over 60 minutes:</strong> Consider a sports drink with electrolytes</li>
      </ul>
      
      <h2>Recovery Nutrition</h2>
      <p><strong>Within 30 minutes after training/match:</strong></p>
      <ul>
        <li>Fluids with electrolytes to rehydrate</li>
        <li>Carbohydrates to replenish glycogen stores</li>
        <li>Protein to repair muscles</li>
      </ul>
      
      <p><strong>Recovery snack examples:</strong></p>
      <ul>
        <li>Chocolate milk (natural recovery drink with ideal carb:protein ratio)</li>
        <li>Fruit smoothie with Greek yogurt</li>
        <li>Turkey/chicken sandwich</li>
        <li>Fruit and yogurt</li>
      </ul>
      
      <p><strong>1-2 hours after:</strong> Complete meal with:</p>
      <ul>
        <li>High-quality protein</li>
        <li>Complex carbohydrates</li>
        <li>Colorful vegetables</li>
        <li>Healthy fats</li>
      </ul>
      
      <h2>Everyday Nutrition for Young Players</h2>
      <p>General guidelines for daily eating:</p>
      <ul>
        <li><strong>Carbohydrates:</strong> 50-60% of daily intake (focus on whole grains, fruits, vegetables)</li>
        <li><strong>Protein:</strong> 15-20% of daily intake (lean meats, fish, eggs, dairy, beans)</li>
        <li><strong>Fats:</strong> 25-30% of daily intake (mostly unsaturated fats from olive oil, nuts, avocados)</li>
      </ul>
      
      <h2>Foods to Limit</h2>
      <ul>
        <li>Processed foods high in refined sugars</li>
        <li>Fried foods</li>
        <li>Sugary drinks and energy drinks</li>
        <li>Excessive caffeine</li>
      </ul>
      
      <h2>Special Considerations</h2>
      <p><strong>Growth spurts:</strong> During rapid growth phases, caloric and protein needs increase significantly.</p>
      <p><strong>Tournament days:</strong> Multiple matches require strategic refueling between games.</p>
      <p><strong>Travel:</strong> Prepare and pack appropriate snacks when traveling for matches.</p>
      
      <p>Remember that nutrition should be personalized. What works for one player may not work for another. Listen to your body, and consider consulting with a sports nutritionist for tailored advice.</p>
    `
  },
  {
    id: 3,
    title: "From Academy to Pro: Success Stories",
    excerpt: "Read inspiring stories of players who made it from our academy to professional leagues around the world.",
    category: "Success Stories",
    author: "Mohamed Ali",
    date: "June 8, 2023",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
    content: `
      <p>The journey from academy training to professional football is challenging, demanding, and incredibly rewarding. At PFT Academy, we've had the privilege of nurturing talented young players who have gone on to achieve their dreams of playing professionally. Here are some of their inspiring stories.</p>
      
      <h2>Ahmed Hassan: From Local Fields to Premier League</h2>
      <p>Ahmed joined our academy at age 12, showing raw talent but needing technical refinement. What set him apart was his incredible work ethic and ability to apply coaching instructions.</p>
      
      <p>"I remember training three times as hard as everyone else," Ahmed recalls. "When other players went home, I'd stay for an extra hour working on my weaker left foot and practicing free kicks."</p>
      
      <p>By 16, Ahmed was scouted by several clubs and eventually signed with a Premier League academy. Today, at 23, he's a regular starter for his club and has made several appearances for the national team.</p>
      
      <p><strong>Ahmed's Advice:</strong> "Find the part of your game that makes you special and develop it into a superpower. But never neglect the fundamentals – they're what keep you in the game when your special talents aren't enough."</p>
      
      <h2>Layla Mahmoud: Breaking Barriers in Women's Football</h2>
      <p>When Layla joined PFT Academy at 14, women's football was still developing in the region. She faced cultural resistance but found support through our program.</p>
      
      <p>"The coaches at PFT treated me exactly the same as the boys," Layla says. "They pushed me just as hard and had the same expectations. That equality in training was what prepared me for professional football."</p>
      
      <p>Layla went on to earn a football scholarship to a top university in the United States, where she excelled both academically and athletically. After graduating, she signed with a professional team in Europe's top women's league.</p>
      
      <p><strong>Layla's Advice:</strong> "Don't let anyone tell you what's possible or impossible for your career. Set your own ceiling and work relentlessly to break through it."</p>
      
      <h2>Omar Saeed: Overcoming Injury to Reach the Top</h2>
      <p>Omar's journey wasn't straightforward. After showing tremendous promise in our elite program, he suffered a serious ACL injury at 17 that threatened to end his career before it began.</p>
      
      <p>"That injury was the darkest time of my life," Omar remembers. "But the academy didn't abandon me. They arranged for the best physiotherapy and kept me involved in training sessions as an observer so I could develop tactically while recovering physically."</p>
      
      <p>After 14 months of rehabilitation, Omar returned stronger than before. His tactical understanding had improved dramatically during his recovery, and his physical resilience impressed scouts. At 19, he signed his first professional contract.</p>
      
      <p><strong>Omar's Advice:</strong> "Injuries are part of the journey. How you respond to setbacks defines your career more than your natural talent. Use every obstacle as a chance to grow in unexpected ways."</p>
      
      <h2>Fatima Al-Farsi: From Late Bloomer to International Star</h2>
      <p>Unlike many success stories, Fatima didn't join our academy until she was 16 – relatively late for player development. She had played casually but never received formal training.</p>
      
      <p>"I was so far behind the other players technically," Fatima admits. "But the coaches identified my natural athleticism and game intelligence. They created a specialized program to fast-track my technical development."</p>
      
      <p>Within two years, Fatima had caught up to her peers and was selected for the U19 national team. Her rise continued with a professional contract at 20, and she now plays in one of Europe's top leagues.</p>
      
      <p><strong>Fatima's Advice:</strong> "It's never too late if you're willing to put in double the work. Find coaches who believe in your potential and trust their process, even when progress seems slow."</p>
      
      <h2>Karim El-Masry: Choosing the Right Path</h2>
      <p>Karim was exceptional from a young age and received offers from several prestigious academies internationally. He chose to stay with PFT until he was 18, a decision that raised eyebrows at the time.</p>
      
      <p>"Many people thought I should leave for Europe earlier," Karim explains. "But at PFT, I was getting regular playing time, personalized coaching, and developing leadership skills as one of the senior academy players. Those experiences proved invaluable."</p>
      
      <p>When Karim did make the move abroad at 18, he was mentally and technically ready. Rather than getting lost in a large academy system, he made an immediate impact and progressed to the first team within a season.</p>
      
      <p><strong>Karim's Advice:</strong> "The right move isn't always the most prestigious one. Consider where you'll get the best development, not just the best name on your CV. Development happens when you play regularly and have coaches who truly invest in you."</p>
      
      <h2>What These Success Stories Have in Common</h2>
      <p>While each player's journey is unique, we've identified common factors in their success:</p>
      <ul>
        <li><strong>Extraordinary work ethic:</strong> All put in additional hours beyond regular training</li>
        <li><strong>Mental resilience:</strong> They viewed setbacks as growth opportunities</li>
        <li><strong>Receptiveness to coaching:</strong> They applied feedback quickly and effectively</li>
        <li><strong>Clear goals:</strong> Each had specific, written objectives for their development</li>
        <li><strong>Support network:</strong> Family, mentors, and friends who believed in their dream</li>
      </ul>
      
      <p>At PFT Academy, we're proud of all our graduates, whether they've gone on to professional careers or applied their football learnings to success in other fields. The discipline, teamwork, and resilience developed through football training create a foundation for excellence in all endeavors.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // In a real app, fetch post data from API
    // For demo, we'll use the mock data
    const timer = setTimeout(() => {
      try {
        const postId = parseInt(id);
        const foundPost = mockPosts.find(p => p.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Find related posts (same category)
          const related = mockPosts
            .filter(p => p.category === foundPost.category && p.id !== postId)
            .slice(0, 3);
          
          setRelatedPosts(related);
        } else {
          setError("Post not found");
        }
        
        setLoading(false);
      } catch (err) {
        setError("Error loading post");
        setLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="blog-page">
        <Navbar />
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-page">
        <Navbar />
        <div className="container">
          <div className="error-container">
            <h2>Oops! {error || "Post not found"}</h2>
            <p>We couldn't find the article you're looking for.</p>
            <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Navbar />
      
      <div className="blog-post-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${post.image})` }}>
        <div className="container">
          <span className="post-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <div className="author-date">
              <span className="post-author">{post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <div className="post-share">
              <button className="share-btn" aria-label="Share on Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </button>
              <button className="share-btn" aria-label="Share on Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </button>
              <button className="share-btn" aria-label="Share on LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="blog-content container">
        <div className="blog-post-container">
          <article className="blog-post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          <div className="blog-author-box">
            <div className="author-info">
              <div className="author-avatar">
                {/* Placeholder avatar - in a real app, use author's photo */}
                <div className="avatar-placeholder">{post.author.charAt(0)}</div>
              </div>
              <div className="author-bio">
                <h3>{post.author}</h3>
                <p>Football coach and specialist with over 10 years of experience training professional and youth players. Passionate about player development and modern training methodologies.</p>
              </div>
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h2 className="section-title">Related Articles</h2>
            <div className="posts-grid">
              {relatedPosts.map(related => (
                <div className="post-card" key={related.id}>
                  <div className="post-image" style={{ backgroundImage: `url(${related.image})` }}>
                    <div className="post-category">{related.category}</div>
                  </div>
                  <div className="post-content">
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                    <div className="post-meta">
                      <span className="post-author">{related.author}</span>
                      <span className="post-date">{related.date}</span>
                    </div>
                    <Link to={`/blog/${related.id}`} className="read-more">Read Article</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="blog-navigation">
          <Link to="/blog" className="back-to-blog">
            <span className="nav-arrow">←</span> Back to All Articles
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost; 