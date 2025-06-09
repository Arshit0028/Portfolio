import React from "react";
import { motion } from "framer-motion";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      icon: "fas fa-code",
      description: "Creating responsive and modern web applications using React, Node.js, and other cutting-edge technologies.",
      color: "#0984e3"
    },
    {
      title: "UI/UX Design",
      icon: "fas fa-paint-brush",
      description: "Designing intuitive and engaging user interfaces with a focus on user experience and modern design principles.",
      color: "#00b894"
    },
    {
      title: "Mobile Development",
      icon: "fas fa-mobile-alt",
      description: "Building cross-platform mobile applications that deliver exceptional user experiences on any device.",
      color: "#6c5ce7"
    },
    {
      title: "Backend Development",
      icon: "fas fa-server",
      description: "Developing robust and scalable backend solutions using Node.js, Express, and modern database technologies.",
      color: "#e17055"
    },
    {
      title: "API Development",
      icon: "fas fa-plug",
      description: "Creating secure and efficient RESTful APIs that power modern web and mobile applications.",
      color: "#fdcb6e"
    },
    {
      title: "DevOps",
      icon: "fas fa-cogs",
      description: "Implementing CI/CD pipelines and cloud infrastructure solutions for seamless deployment and scaling.",
      color: "#d63031"
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
    <section className="services-section" id="services">
      <div className="services-container">
        <motion.div
          className="services-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="section-header"
            variants={itemVariants}
          >
            <h2 className="section-title">My Services</h2>
            <p className="section-description">
              I offer a comprehensive range of development services to help bring your ideas to life.
              Let's create something amazing together.
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{ "--service-color": service.color }}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <motion.div 
                  className="service-hover-effect"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
