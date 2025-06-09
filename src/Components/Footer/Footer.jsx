import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/yourusername' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/yourusername' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/yourusername' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/yourusername' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="footer-top">
            <div className="footer-brand">
              <h2>Arshit Dhiman</h2>
              <p>Full Stack Developer</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h3>Navigation</h3>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#projects">Projects</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h3>Contact</h3>
                <ul>
                  <li><a href="mailto:arshitdhiman@gmail.com">Email</a></li>
                  <li><a href="tel:+919876543210">Phone</a></li>
                  <li><a href="#contact">Contact Form</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={link.icon}></i>
                </motion.a>
              ))}
            </div>
            <p className="copyright">
              © {currentYear} Arshit Dhiman. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
