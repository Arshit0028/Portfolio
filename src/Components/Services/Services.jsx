import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Services.css";

const Services = () => {
  const services = [
    { title: "Web Development", icon: "fas fa-code", description: "Responsive modern web apps.", color: "#0984e3" },
    { title: "UI/UX Design", icon: "fas fa-paint-brush", description: "Clean and intuitive interfaces.", color: "#00b894" },
    { title: "Mobile Development", icon: "fas fa-mobile-alt", description: "Cross-platform mobile apps.", color: "#6c5ce7" },
    { title: "Backend Development", icon: "fas fa-server", description: "Robust and scalable backend.", color: "#e17055" },
    { title: "API Development", icon: "fas fa-plug", description: "Secure and efficient APIs.", color: "#fdcb6e" },
    { title: "DevOps", icon: "fas fa-cogs", description: "CI/CD & cloud automation.", color: "#d63031" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Particle background like hero
  useEffect(() => {
    const canvas = document.getElementById("services-bg");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 120;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fill();

        s.x += s.dx;
        s.y += s.dy;

        if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
      });
      requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="services-section" id="services">
      <canvas id="services-bg" className="services-bg"></canvas>
      <div className="services-container">
        <motion.div className="services-header" initial="hidden" whileInView="visible" variants={containerVariants}>
          <motion.h2 className="services-title" variants={itemVariants}>My Services</motion.h2>
          <motion.p className="services-description" variants={itemVariants}>
            Offering compact and modern development solutions for your projects.
          </motion.p>
        </motion.div>

        <motion.div className="services-grid" variants={containerVariants}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card"
              style={{ "--service-color": service.color }}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
