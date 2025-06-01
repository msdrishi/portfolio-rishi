import React from 'react';
import '../styles/experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "Wells Fargo",
      location: "Bangalore, India",
      period: "Aug 2022 – Present",
      achievements: [
        "Simplified small business onboarding with guided setup pages, improving efficiency by 20%",
        "Built a personal details update screen for customers, boosting data accuracy by 70%",
        "Automated API and function testing using Cucumber (BDD); authored 50+ feature files",
        "Developed a GenAI-powered POC integrating Splunk logs and LLMs, improving debugging efficiency by 60%"
      ],
      isCurrent: true
    },
    {
      id: 2,
      role: "Software Developer Intern",
      company: "ZOHO Corp",
      location: "Chennai, India",
      period: "Feb 2022 – Apr 2022",
      achievements: [
        "Developed JNI program for retrieving software and permissions details of 500+ Windows apps",
        "Created a web app using Tomcat, JSP, and JasperReports to generate and export 100+ PDF reports",
        "Enabled CSV, HTML, XLSX exports with up to 5 levels of folder nesting",
        "Built a real-time chat application using WebSockets and PostgreSQL with an intuitive UI"
      ],
      isCurrent: false
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-title">
          <h2>Work Experience</h2>
        </div>
        
        <div className="timeline">
          {experiences.map(exp => (
            <div key={exp.id} className={`timeline-item ${exp.isCurrent ? 'current' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content card">
                {exp.isCurrent && <div className="current-badge">Current</div>}
                <h3>{exp.role}</h3>
                <div className="company-info">
                  <p className="company-name">{exp.company}</p>
                  <p className="location">{exp.location}</p>
                  <p className="period">{exp.period}</p>
                </div>
                <ul className="achievements">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;