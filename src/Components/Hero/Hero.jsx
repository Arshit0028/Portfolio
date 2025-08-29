import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hero-content"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-title"
        >
          Hi, I’m <span className="highlight">Arshit Dhiman</span> 👋
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hero-subtitle"
        >
          Full Stack Developer 💻
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-description"
        >
          I build modern, scalable, and user-friendly web applications.  
          Always passionate about crafting experiences with clean code and design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-buttons"
        >
          <a href="https://www.linkedin.com/in/arshit-dhiman-b70999357/" className="btn primary-btn">
            <FaLinkedin /> Connect
          </a>
          <a href="/Resume.pdf" className="btn secondary-btn">
            <FaFileDownload /> Resume
          </a>
          <a href="https://github.com/Arshit0028" target="_blank" rel="noreferrer" className="btn ghost-btn">
            <FaGithub /> GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="scroll-indicator"
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span className="scroll-arrow">
          <span></span>
          <span></span>
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
