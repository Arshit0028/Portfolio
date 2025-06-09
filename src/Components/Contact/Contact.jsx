import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">
              Have a project in mind or want to discuss potential opportunities? 
              I'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="info-card">
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>arshitdhiman@gmail.com</p>
              </div>
              <div className="info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Location</h3>
                <p>Delhi, India</p>
              </div>
              <div className="info-card">
                <i className="fas fa-phone"></i>
                <h3>Phone</h3>
                <p>+91 9876543210</p>
              </div>
            </motion.div>

            <motion.form 
              className="contact-form"
              variants={itemVariants}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" required></textarea>
                <span className="focus-border"></span>
              </div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
                <i className="fas fa-paper-plane"></i>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
