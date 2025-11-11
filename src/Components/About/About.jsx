import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const skills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "⏭️" },
    { name: "JavaScript", icon: "📜" },
    { name: "TypeScript", icon: "🟦" },
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "🚏" },
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Git & GitHub", icon: "🔧" },
  ];

  const certifications = [
    {
      name: "JavaScript Development",
      issuer: "AlmaBetter",
      description:
        "I learned JavaScript from AlmaBetter, and it significantly boosted my coding skills!",
      icon: "fab fa-js",
      color: "#F7DF1E",
    },
    {
      name: "HTML & CSS",
      issuer: "AlmaBetter",
      description:
        "I learned HTML and CSS from AlmaBetter, which greatly improved my web development skills!",
      icon: "fab fa-html5",
      color: "#E34F26",
    },
    {
      name: "Full Stack Java Development",
      issuer: "Simplilearn",
      description:
        "I earned my Full Stack Java Development certification from Simplilearn, enhancing my programming expertise!",
      icon: "fab fa-java",
      color: "#007396",
    },
    {
      name: "Python Programming",
      issuer: "TechGyan",
      description:
        "I just received my Python Programming certification from TechGyan! Excited to apply my skills!",
      icon: "fab fa-python",
      color: "#3776AB",
    },
    {
      name: "Advanced Python Programming",
      issuer: "TechGyan",
      description:
        "I just earned my Advanced Python Programming certification from TechGyan! Thrilled to enhance my skills!",
      icon: "fab fa-python",
      color: "#3776AB",
    },
    {
      name: "Artificial Intelligence",
      issuer: "IIT Delhi",
      description:
        "I attended an offline bootcamp on Artificial Intelligence at IIT Delhi! What an amazing experience!",
      icon: "fas fa-brain",
      color: "#FF6B6B",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* About Text */}
          <motion.div className="about-text" variants={itemVariants}>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.p className="about-description" variants={itemVariants}>
              I'm a passionate Full Stack Developer with a keen eye for creating
              elegant solutions to complex problems. With expertise in modern
              web technologies and a strong foundation in software development
              principles, I strive to build applications that are not only
              functional but also provide an exceptional user experience.
            </motion.p>
          </motion.div>
          {/* Skills */}
          <motion.div className="skills-container" variants={itemVariants}>
            <h3 className="skills-title">Technical Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{ ["--skill-color"]: skill.color }}
                >
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Certifications */}
          <motion.div
            className="certifications-container"
            variants={itemVariants}
          >
            <h3 className="certifications-title">Certifications</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div
                  key={`${cert.name}-${index}`}
                  className="certification-item"
                  style={{ ["--cert-color"]: cert.color }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <i
                    className={`${cert.icon} certification-icon`}
                    aria-hidden="true"
                  ></i>
                  <div className="certification-info">
                    <h4 className="certification-name">{cert.name}</h4>
                    <p className="certification-issuer">{cert.issuer}</p>
                    <p className="certification-description">
                      {cert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Experience */}
          <motion.div className="experience-container" variants={itemVariants}>
            <h3 className="experience-title">Experience</h3>
            <div className="experience-timeline">
              {/* Freelance on Top */}
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="timeline-content">
                  <h4>Freelance Full-Stack Developer</h4>
                  <p className="timeline-company">Self-Employed</p>
                  <p className="timeline-date">2023 - Present</p>
                  <p className="timeline-description">
                    Worked with clients to design and develop websites,
                    dashboards, and custom tools. Handled end-to-end development
                    including UI, backend, and deployment.I’m a passionate
                    Freelance MERN Stack and React Developer working
                    independently since 2023. I specialize in building
                    responsive, modern web applications using MongoDB,
                    Express.js, React, and Node.js, with a focus on clean code,
                    UI/UX, and performance optimization.
                  </p>
                </div>
              </motion.div>

              {/* Zudio Tech */}
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="timeline-content">
                  <h4>Web Developer</h4>
                  <p className="timeline-company">Zudio Tech.</p>
                  <p className="timeline-date">April 2025 - July 2</p>
                  <p className="timeline-description">
                    Collaborated with clients to define project scopes and
                    deliverables, ensuring alignment with their goals. Utilised
                    various programming languages and tools to create efficient
                    software solutions tailored to client needs.
                  </p>
                </div>
              </motion.div>

              {/* NayePankh */}
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="timeline-content">
                  <h4>Team Management and Fundraiser </h4>
                  <p className="timeline-company">NayePankh Foundation</p>
                  <p className="timeline-date"> JAN 2024 - FEB 2025</p>
                  <p className="timeline-description">
                    As a Team Manager and Fundraiser, I gained valuable
                    experience in leadership, coordination, and communication. I
                    was responsible for leading a team, setting goals, and
                    ensuring smooth collaboration among members while driving
                    fundraising initiatives to support social causes.
                  </p>
                </div>
              </motion.div>
            </div>{" "}
            {/* experience-timeline end */}
          </motion.div>{" "}
          {/* experience-container end */}
        </motion.div>{" "}
        {/* about-content end */}
      </div>{" "}
      {/* about-container end */}
    </section>
  );
};

export default About;
