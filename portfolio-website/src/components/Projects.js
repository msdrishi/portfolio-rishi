import React from 'react';
import '../styles/projects.css';
import motocaristImg from '../assets/motocarist.png';
import emailRoutingImg from '../assets/emailrouting.png';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Motocarist - Bubble Head Caricature",
      description: "Built a responsive portfolio website to showcase digital caricature artworks. Attracted 20,000+ social media followers, demonstrating creative skills and digital branding.",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      liveLink: "https://msdrishi.github.io/motocarist/",
      githubLink: "https://github.com/msdrishi/motocarist",
      image: motocaristImg
    },
    {
      id: 2,
      title: "Email Classification using GenAI",
      description: "Designed and developed a GenAI-based solution to automate classification and data extraction from commercial banking emails using LLMs (Groqcloud - LLaMA 3.3 70B). Implemented RAG-based semantic search with FAISS for duplicate detection.",
      technologies: ["Python", "LLMs", "FAISS", "HuggingFace", "OCR"],
      liveLink: "",
      githubLink: "https://github.com/msdrishi/Email-Classification",
      image: emailRoutingImg
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
        </div>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="card project-card">
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                  <div className="project-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;