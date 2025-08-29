import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "MediGo",
      description: "🚑 MediGo is a modern doctor appointment booking platform that helps patients connect with doctors, book appointments, and manage their healthcare with ease.💙 It offers secure authentication, real-time availability, and smooth payment integration for a hassle-free experience.",
      image: "/medigo.png",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe" , "Razorpay" , "JWT" , "Framer Motion" , "JavaScript" , "Tailwind CSS" , "HTML" , "Netlify" , "Git/Github"],
      link: "https://medigoo.netlify.app/",
      color: "#0984e3"
    },
    {
      title: "My Portfolio",
      description: "I’m a Full Stack Developer who enjoys creating dynamic and scalable web applications. Skilled in the MERN stack, I specialize in building smooth user experiences with clean, maintainable code. Always eager to learn and explore new technologies, I aim to deliver impactful digital solutions.",
      image: "/portfolio.png",
      technologies: ["React", "HTML", "Material-UI", "CSS" , "JavaScript" , "Framer Motion" , "Node.js" , "Git/Github" , "Netlify"],
      link: "#",
      color: "#00b894"
    },
    {
      title: "Social Media Dashboard",
      description: "A comprehensive social media analytics dashboard with data visualization and reporting features.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
      technologies: ["React", "D3.js", "Node.js", "Express"],
      link: "#",
      color: "#6c5ce7"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{ "--project-color": project.color }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 