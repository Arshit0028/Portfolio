import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Services.css";

const Services = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const reduced = useReducedMotion();

  const services = [
    {
      title: "Web Development",
      icon: "code",
      description: "Responsive modern web apps.",
      color: "#0984e3",
    },
    {
      title: "UI/UX Design",
      icon: "palette",
      description: "Clean and intuitive interfaces.",
      color: "#00b894",
    },
    {
      title: "Mobile Development",
      icon: "smartphone",
      description: "Cross-platform mobile apps.",
      color: "#6c5ce7",
    },
    {
      title: "Backend Development",
      icon: "server",
      description: "Robust and scalable backend.",
      color: "#e17055",
    },
    {
      title: "API Development",
      icon: "plug",
      description: "Secure and efficient APIs.",
      color: "#fdcb6e",
    },
    {
      title: "DevOps",
      icon: "cogs",
      description: "CI/CD & cloud automation.",
      color: "#d63031",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: i * 0.06 },
    }),
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const stars = [];
    const numStars = Math.max(60, Math.floor((width * height) / 50000)); // responsive density

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    let last = performance.now();

    const animate = (now) => {
      const dt = Math.min(32, now - last);
      last = now;
      ctx.clearRect(0, 0, width, height);

      // background subtle gradient
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "rgba(6,7,10,0.85)");
      g.addColorStop(1, "rgba(10,10,14,0.95)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // draw stars
      for (let s of stars) {
        s.x += s.dx * (dt / 16);
        s.y += s.dy * (dt / 16);

        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      }

      // optional slow twinkle
      for (let i = 0; i < 2; i++) {
        const t = stars[Math.floor(Math.random() * stars.length)];
        t.alpha = 0.2 + Math.random() * 0.8;
      }

      if (!reduced) rafRef.current = requestAnimationFrame(animate);
    };

    if (!reduced) rafRef.current = requestAnimationFrame(animate);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <section className="services-section" id="services">
      <canvas ref={canvasRef} className="services-bg" aria-hidden />

      <div className="services-container">
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2
            className="services-title"
            variants={itemVariants}
            custom={0}
          >
            My Services
          </motion.h2>
          <motion.p
            className="services-description"
            variants={itemVariants}
            custom={1}
          >
            Offering compact and modern development solutions for your projects.
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((service, i) => (
            <motion.button
              key={service.title}
              className="service-card"
              style={{ ["--service-color"]: service.color }}
              variants={itemVariants}
              custom={i}
              whileHover={{ scale: 1.035, y: -6 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              aria-label={service.title}
              onClick={() => {
                // simple action — could open modal or navigate
                console.log(`Clicked ${service.title}`);
              }}
            >
              <div className="service-icon" aria-hidden>
                {/* Lightweight inline SVG icons for crispness */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="var(--service-color)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--service-color)"
                    fontFamily="sans-serif"
                  >
                    {service.icon[0].toUpperCase()}
                  </text>
                </svg>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
