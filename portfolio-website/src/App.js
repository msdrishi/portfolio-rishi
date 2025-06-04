import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';

// Analytics
import { trackPageView, trackVisit } from './utils/analytics';

// Context
import { ThemeContext } from './context/ThemeContext';

// Styles
import './styles/global.css';

const App = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  // Initialize analytics when the app loads
  useEffect(() => {
    // Track page view and portfolio visit
    trackPageView('portfolio_home');
    trackVisit();
    
    // Record page visit in localStorage for backup/debugging
    const visitsCount = parseInt(localStorage.getItem('visitsCount') || '0') + 1;
    localStorage.setItem('visitsCount', visitsCount.toString());
    console.log(`Portfolio visit #${visitsCount} (localStorage count)`);
  }, []);

  // Intersection Observer for fade-in animations and section tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          
          // Get section ID for analytics tracking
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            import('./utils/analytics').then(module => {
              module.trackSectionView(sectionId);
            });
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.fade-in, section[id]').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.fade-in, section[id]').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Rishi Prasad | Software Engineer</title>
        <meta name="description" content="Portfolio of Rishi Prasad, a Software Engineer with experience in Java, Spring, and microservices." />
        <meta name="keywords" content="Rishi Prasad, Software Engineer, Java, Spring, Microservices, React, Portfolio" />
        <meta name="theme-color" content={isDarkTheme ? '#0D0D0D' : '#FFFFFF'} />
      </Helmet>
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />

          <section id="skills" className="fade-in">
            <Skills />
          </section>

          <section id="projects" className="fade-in">
            <Projects />
          </section>

          <section id="experience" className="fade-in">
            <Experience />
          </section>

          <section id="contact" className="fade-in">
            <Contact />
          </section>
        </main>
        <Footer />
        <ScrollToTop />
        <ThemeToggle />
      </div>
    </>
  );
};

export default App;