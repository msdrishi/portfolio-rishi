import React from 'react';
import '../styles/skills.css';

const Skills = () => {
  // All skills grouped together
  const allSkills = [
    // Programming languages
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      category: 'Languages'
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'Languages'
    },
    {
      name: 'C++',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      category: 'Languages'
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      category: 'Languages'
    },
    // Frontend technologies
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      category: 'Frontend'
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      category: 'Frontend'
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frontend'
    },
    {
      name: 'Bootstrap',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg',
      category: 'Frontend'
    },
    // Backend technologies
    {
      name: 'Spring',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      category: 'Backend'
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'Backend'
    },
    {
      name: 'Express',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      category: 'Backend'
    },
    // Database technologies
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'Databases'
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      category: 'Databases'
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      category: 'Databases'
    },
    // DevOps & Tools
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'DevOps'
    },
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      category: 'DevOps'
    },
    {
      name: 'Azure',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      category: 'DevOps'
    },
    {
      name: 'Jenkins',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      category: 'DevOps'
    },
  ];

  // Certifications
  const certifications = [
    {
      name: 'Microsoft Azure Fundamentals (AZ-900)',
      provider: 'Microsoft',
      date: 'March 2022',
      logo: 'https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png'
    },
    {
      name: 'Microsoft Azure Developer Associate (AZ-204)',
      provider: 'Microsoft',
      date: 'July 2022',
      logo: 'https://images.credly.com/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png'
    }
  ];

  return (
    <div className="skills-section" id="skills">
      <div className="container">
        <div className="section-title">
          <h2>Skills & Technologies</h2>
          <p>My technical toolkit and areas of expertise</p>
        </div>

        {/* Background accent elements */}
        <div className="bg-accent bg-accent-1"></div>
        <div className="bg-accent bg-accent-2"></div>

        {/* All skills in one centered grid */}
        <div className="skills-all-container">
          <div className="skills-grid">
            {allSkills.map((skill, index) => (
              <div className="skill-card" key={index} data-category={skill.category}>
                <div className="skill-category-badge">{skill.category}</div>
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="skill-icon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/60x60?text=${skill.name[0]}`;
                  }}
                />
                <p className="skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications">
          <div className="section-title">
            <h2>Certifications</h2>
          </div>
          
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <div className="cert-card" key={index}>
                <img 
                  src={cert.logo} 
                  alt={cert.name} 
                  className="cert-logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/60x60?text=Cert`;
                  }}
                />
                <div className="cert-info">
                  <h4>{cert.name}</h4>
                  <p>{cert.provider}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;