import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

// Your Firebase configuration (replace with your own values from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC7HzLfzPgXpCLAypb-qpf75rWBSbklb9w",
  authDomain: "portfolio-vistitors.firebaseapp.com",
  projectId: "portfolio-vistitors",
  storageBucket: "portfolio-vistitors.firebasestorage.app",
  messagingSenderId: "363621317159",
  appId: "1:363621317159:web:d128610b26cc26195d2c02",
  measurementId: "G-N75XZC8T5Y"
};

// Initialize Firebase with error handling
let analytics = null;

const initializeAnalytics = async () => {
  try {
    // Check if analytics is supported in this environment
    const isAnalyticsSupported = await isSupported();
    
    if (isAnalyticsSupported) {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized successfully');
      return true;
    } else {
      console.log('Firebase Analytics is not supported in this environment');
      return false;
    }
  } catch (error) {
    console.error('Error initializing Firebase Analytics:', error);
    return false;
  }
};

// Track page view event
export const trackPageView = async (pageName = 'home') => {
  if (!analytics) {
    const initialized = await initializeAnalytics();
    if (!initialized) return;
  }
  
  try {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    console.log(`Page view tracked: ${pageName}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track portfolio visit event
export const trackVisit = async () => {
  if (!analytics) {
    const initialized = await initializeAnalytics();
    if (!initialized) return;
  }
  
  try {
    logEvent(analytics, 'portfolio_visit', {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent
    });
    console.log('Portfolio visit tracked');
  } catch (error) {
    console.error('Error tracking portfolio visit:', error);
  }
};

// Track section view
export const trackSectionView = async (sectionName) => {
  if (!analytics) {
    const initialized = await initializeAnalytics();
    if (!initialized) return;
  }
  
  try {
    logEvent(analytics, 'section_view', {
      section_name: sectionName,
      timestamp: new Date().toISOString()
    });
    console.log(`Section view tracked: ${sectionName}`);
  } catch (error) {
    console.error('Error tracking section view:', error);
  }
};

// Track button clicks
export const trackButtonClick = async (buttonName) => {
  if (!analytics) {
    const initialized = await initializeAnalytics();
    if (!initialized) return;
  }
  
  try {
    logEvent(analytics, 'button_click', {
      button_name: buttonName,
      timestamp: new Date().toISOString()
    });
    console.log(`Button click tracked: ${buttonName}`);
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
};

// Get analytics instance (useful for advanced usage)
export const getAnalyticsInstance = async () => {
  if (!analytics) {
    await initializeAnalytics();
  }
  return analytics;
};