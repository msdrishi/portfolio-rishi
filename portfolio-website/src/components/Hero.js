import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/hero.css';
import profilePic from '../assets/profile.png';

const Hero = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);
  
  // Handle mouse movement for cursor follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Handle mouse enter to create bubble effect
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '150px';
        cursorRef.current.style.height = '150px';
        
        // Create bubble effect
        const createBubble = () => {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          bubble.style.left = `${Math.random() * 100}%`;
          bubble.style.top = `${Math.random() * 100}%`;
          bubble.style.width = `${Math.random() * 100 + 50}px`;
          bubble.style.height = `${Math.random() * 100 + 50}px`;
          bubble.style.opacity = '0.3';
          
          // Use theme-specific colors for bubbles
          const bubbleColor = isDarkTheme ? 
            `rgba(236, 72, 153, ${Math.random() * 0.3 + 0.1})` : 
            `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
          
          bubble.style.background = bubbleColor;
          
          const bubbleContainer = document.querySelector('.bubble-container');
          if (bubbleContainer) {
            bubbleContainer.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => {
              if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
              }
            }, 10000);
          }
        };
        
        // Create multiple bubbles
        createBubble();
        setTimeout(createBubble, 300);
        setTimeout(createBubble, 600);
      }
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '80px';
        cursorRef.current.style.height = '80px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', handleMouseEnter);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', handleMouseEnter);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isDarkTheme]);

  // Space background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Regenerate stars when resizing
    };

    // Create stars
    const initStars = () => {
      stars = [];
      const numberOfStars = Math.floor(canvas.width * canvas.height / 1000);
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          flickerSpeed: Math.random() * 0.05
        });
      }
    };

    // Create occasional shooting star
    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.01) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height / 3;
        const length = Math.random() * 100 + 50;
        const angle = Math.PI / 4 + Math.random() * Math.PI / 4;
        
        shootingStars.push({
          x: startX,
          y: startY,
          length: length,
          angle: angle,
          speed: Math.random() * 15 + 10,
          progress: 0
        });
      }
    };

    // Draw stars with color based on theme
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Determine star color based on theme
      const starColor = isDarkTheme ? 
        'rgba(255, 255, 255, ' : 
        'rgba(59, 130, 246, ';
      
      // Draw static stars with twinkling effect
      stars.forEach(star => {
        star.opacity += Math.sin(Date.now() * star.flickerSpeed) * 0.05;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor}${star.opacity})`;
        ctx.fill();
      });
      
      // Draw shooting stars
      shootingStars = shootingStars.filter(star => {
        star.progress += star.speed;
        
        if (star.progress >= 100) return false;
        
        const opacity = star.progress < 10 ? star.progress / 10 : 
                        star.progress > 90 ? (100 - star.progress) / 10 : 1;
        
        const endX = star.x + Math.cos(star.angle) * star.length * (star.progress / 100);
        const endY = star.y + Math.sin(star.angle) * star.length * (star.progress / 100);
        const tailX = star.x + Math.cos(star.angle) * star.length * Math.max(0, (star.progress - 10) / 100);
        const tailY = star.y + Math.sin(star.angle) * star.length * Math.max(0, (star.progress - 10) / 100);
        
        // Create gradient for shooting star
        const gradient = ctx.createLinearGradient(tailX, tailY, endX, endY);
        gradient.addColorStop(0, `${starColor}0)`);
        gradient.addColorStop(1, `${starColor}${opacity})`);
        
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        
        return true;
      });
      
      createShootingStar();
      animationFrameId = requestAnimationFrame(drawStars);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkTheme]);
  
  // Update the downloadResume function to use the Google Drive link
const downloadResume = () => {
  // Direct link to Google Drive file
  window.open('https://drive.google.com/file/d/1PnsGKs5TED0BvAF5y9Boom4cloxblAIw/view', '_blank');
};
  
  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="cursor-follower" ref={cursorRef}></div>
      <div className="bubble-container"></div>
      
      <div className="container hero-container">
        {/* Profile image is now above the content */}
        <div className="hero-image">
          <div className="profile-container">
            <img src={profilePic} alt="Rishi Prasad" className="profile-pic" />
          </div>
        </div>
        
        <div className="hero-content">
          <p className="greeting">Hello, I'm</p>
          <h1 className="hero-name">
            Rishi Prasad
          </h1>
          <h2 className="hero-title">
            Software Engineer | Backend Developer
          </h2>
          <p className="hero-description">
            Specialized in Java, Spring Boot, Microservices, Cloud (Azure), and System Design,
            delivering efficient solutions to complex engineering challenges.
          </p>
          
          <div className="hero-buttons">
            <button onClick={downloadResume} className="btn btn-primary">
              Download Resume <span className="btn-icon">↓</span>
            </button>
            <a href="#projects" className="btn btn-light">
              View Projects <span className="btn-icon">→</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/msdrishi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/rishi-prasad-6526a7213/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:rishiprasad543@gmail.com" aria-label="Email">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="grid-background"></div>
    </section>
  );
};

export default Hero;