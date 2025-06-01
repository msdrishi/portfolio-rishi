import React, { useEffect, useRef, useState } from 'react';
import '../styles/tagSphere.css';

const TagSphere = ({ tags }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !tags || tags.length === 0) return;

    // Set dimensions based on container
    const updateDimensions = () => {
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    // Initial dimension set
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Create and deploy the tag sphere
    const radius = Math.min(dimensions.width, dimensions.height) / 2.5;
    const tagElements = [];
    
    // Place tags on sphere
    const count = tags.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    tags.forEach((tag, i) => {
      // Calculate position on sphere
      const y = 1 - (i / (count - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
      
      const theta = phi * i; // Golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // Create tag element
      const tagEl = document.createElement('div');
      tagEl.className = 'tag';
      tagEl.style.transform = `translate3d(${x * radius}px, ${y * radius}px, ${z * radius}px)`;
      
      // Add logo or fallback
      if (tag.logoUrl) {
        const img = document.createElement('img');
        img.src = tag.logoUrl;
        img.alt = tag.name;
        img.className = 'tag-logo';
        tagEl.appendChild(img);
      } else {
        tagEl.textContent = tag.name;
      }
      
      // Add tooltip
      const tooltip = document.createElement('span');
      tooltip.className = 'tag-tooltip';
      tooltip.textContent = tag.name;
      tagEl.appendChild(tooltip);
      
      container.appendChild(tagEl);
      tagElements.push(tagEl);
    });
    
    // Animation variables
    let animationFrameId = null;
    let mouseX = 0;
    let mouseY = 0;
    let speed = 0.5;
    let lastX = 0;
    let lastY = 0;
    let rotationX = 0;
    let rotationY = 0;
    
    // Mouse interaction
    const handleMouseMove = (e) => {
      if (!isActive) return;
      
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      speed = 2; // Faster rotation when mouse is moving
    };
    
    const handleMouseEnter = () => {
      setIsActive(true);
    };
    
    const handleMouseLeave = () => {
      setIsActive(false);
      speed = 0.5; // Back to normal speed
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events for mobile
    const handleTouchStart = (e) => {
      e.preventDefault();
      setIsActive(true);
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isActive) return;
      
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      mouseX = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      speed = 2;
    };
    
    const handleTouchEnd = () => {
      setIsActive(false);
      speed = 0.5;
    };
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    
    // Animation function
    const animate = () => {
      // Update rotation based on mouse position or automatic rotation
      if (isActive) {
        rotationX += (mouseY - rotationX) * 0.05;
        rotationY += (mouseX - rotationY) * 0.05;
      } else {
        rotationX += 0.01;
        rotationY += 0.01;
      }
      
      // Apply rotation to container
      container.style.transform = `rotateX(${rotationX * 30}deg) rotateY(${rotationY * 30}deg)`;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      // Remove all tag elements
      tagElements.forEach(el => {
        if (el.parentNode === container) {
          container.removeChild(el);
        }
      });
    };
  }, [tags, dimensions, isActive]);
  
  return (
    <div className="tag-sphere-container">
      <div 
        ref={containerRef} 
        className="tag-sphere"
        style={{ 
          width: '100%', 
          height: '500px'
        }}
      />
    </div>
  );
};

export default TagSphere;