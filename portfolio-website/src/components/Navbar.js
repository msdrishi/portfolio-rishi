import React, { useState, useEffect } from 'react';
import { smoothScroll } from '../utils/smoothScroll';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { to: 'hero', text: 'About' },
    { to: 'skills', text: 'Skills' },
    { to: 'projects', text: 'Projects' },
    { to: 'experience', text: 'Experience' },
    { to: 'contact', text: 'Contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    closeMenu();
    smoothScroll(`#${id}`, 1200); // Use custom smooth scroll with longer duration
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a 
          href="#hero" 
          className="logo"
          onClick={(e) => handleNavLinkClick(e, 'hero')}
        >
          Portfolio.
        </a>

        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a 
                href={`#${link.to}`}
                onClick={(e) => handleNavLinkClick(e, link.to)}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;