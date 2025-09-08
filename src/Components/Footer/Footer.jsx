import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/Arshit0028' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/arshit-dhiman-b70999357/' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/ArshitDhiman' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/arshit_dhiman2328/' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Social */}
        <motion.div 
          className="footer-brand-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="footer-brand">
            <h2>Arshit Dhiman</h2>
            <p>Full Stack Developer</p>
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, textShadow: '0 0 8px #4cc9f0', color: '#4cc9f0' }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Text */}
        <motion.p 
          className="footer-bottom-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          © {currentYear} Arshit Dhiman. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
