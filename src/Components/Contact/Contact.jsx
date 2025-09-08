import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  const [result, setResult] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "a8a59a56-d6ca-41b4-99ed-577d913a9e21");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setResult("✅ Message sent successfully!");
      e.target.reset();
    } else {
      setResult("❌ Something went wrong.");
    }
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
          {/* Header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Let’s Connect</h2>
            <p className="section-description">
              Open to job opportunities and collaborations. Drop me a message anytime! I’d love to hear from you and explore new opportunities together.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="contact-grid">
            {/* Info Cards */}
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="info-card glass">
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>iamarshit2328@gmail.com</p>
              </div>
              <div className="info-card glass">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Location</h3>
                <p>Hamirpur, Himachal Pradesh</p>
              </div>
              <div className="info-card glass">
                <i className="fas fa-phone"></i>
                <h3>Phone</h3>
                <p>+91 83520-15927</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="contact-form glass"
              variants={itemVariants}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" required></textarea>
              </div>

              <motion.button
                type="submit"
                className="send-btn"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px #4cc9f0" }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message <i className="fas fa-paper-plane"></i>
              </motion.button>

              {result && <p className="form-result">{result}</p>}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
