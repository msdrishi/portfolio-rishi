import React, { useState, useRef } from 'react';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Sending your message...'
    });
    
    // Construct email data
    const emailContent = `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      
      Message: 
      ${formData.message}
    `;
    
    // Create mailto URL
    const mailtoUrl = `mailto:rishiprasad543@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailContent)}`;
    
    // Open default email client
    window.open(mailtoUrl, '_blank');
    
    // Update form status after email client opens
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Your default email client has been opened. Please send the email to complete the process.'
    });
    
    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset form status after 10 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 10000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card card">
              <div className="contact-item">
                <div className="contact-icon">
                  <span>📧</span>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p><a href="mailto:rishiprasad543@gmail.com">rishiprasad543@gmail.com</a></p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <span>📞</span>
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p><a href="tel:+916381173933">+91 6381173933</a></p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <span>🔗</span>
                </div>
                <div className="contact-details">
                  <h3>LinkedIn</h3>
                  <p><a href="https://linkedin.com/in/rishi-prasad-6526a7213" target="_blank" rel="noopener noreferrer">linkedin.com/in/rishi-prasad-6526a7213</a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form card">
            <h3>Send Me a Message</h3>
            {formStatus.submitted && (
              <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            
            <div className="contact-direct-info">
              <p>Or email me directly at: <a href="mailto:rishiprasad543@gmail.com">rishiprasad543@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;