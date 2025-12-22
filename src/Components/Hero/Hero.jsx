import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import "./Hero.css";

/* ================= POLYGON BACKGROUND ================= */

const PolygonMesh = () => {
  const meshRef = useRef();
  const numPoints = 50;

  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numPoints; i++) {
      temp.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(temp);
  }, []);

  const linePoints = useMemo(() => {
    const arr = [];
    for (let i = 0; i < points.length; i += 3) {
      arr.push([points[i], points[i + 1], points[i + 2]]);
    }
    return arr;
  }, [points]);

  const target = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const current = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useFrame(({ mouse, clock }) => {
    target.current.x = mouse.x * 0.8;
    target.current.y = -mouse.y * 0.6;
    target.current.ry = Math.sin(clock.getElapsedTime() * 0.12) * 0.25;
    target.current.rx = Math.cos(clock.getElapsedTime() * 0.07) * 0.12;

    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = 0.06;

    current.current.x = lerp(current.current.x, target.current.x, ease);
    current.current.y = lerp(current.current.y, target.current.y, ease);
    current.current.ry = lerp(current.current.ry, target.current.ry, ease);
    current.current.rx = lerp(current.current.rx, target.current.rx, ease);

    if (meshRef.current) {
      meshRef.current.rotation.y = current.current.ry;
      meshRef.current.rotation.x = current.current.rx;
      meshRef.current.position.x = current.current.x;
      meshRef.current.position.y = current.current.y;

      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.3) * 0.015;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={meshRef}>
      <Points positions={points} stride={3}>
        <PointMaterial
          color="#38bdf8"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.55}
        />
      </Points>

      <Line
        points={linePoints}
        color="#a855f7"
        lineWidth={0.2}
        transparent
        opacity={0.12}
      />
    </group>
  );
};

/* ================= REVIEWS DATA ================= */

const reviews = [
  {
    name: "Archit rana",
    role: "Business Owner of pooja jewellers",
    image: "/Archit.png",
    review:
      "Arshit delivered our website on time with excellent quality. Very professional and reliable.",
  },
  {
    name: "Ambika",
    role: "Startup Founder of Oomamimeats",
    image: "/ambika.png",
    review:
      "Clean code, modern UI and great communication. Highly recommended developer.",
  },
  {
    name: "Amardeep Singh",
    role: "Business Owner of SOFTECH",
    image: "/Amar.png",
    review:
      "Amazing experience. Clear understanding of requirements and perfect execution.",
  },
];

/* ================= HERO ================= */

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <motion.div
          className="canvas-container"
          initial={{ opacity: 1, scale: 8 }}
          animate={{ opacity: 1, scale: 0.82 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <ambientLight intensity={40} />
            <Suspense fallback={null}>{mounted && <PolygonMesh />}</Suspense>
          </Canvas>
        </motion.div>

        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title"
          >
            Hi, I’m <span className="highlight">Arshit Dhiman</span> 👋
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="hero-subtitle"
          >
            Full Stack Developer & Web Enthusiast
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="hero-buttons"
          >
            <a
              href="https://www.linkedin.com/in/arshit-dhiman-b70999357/"
              className="btn primary-btn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> Connect
            </a>

            <a
              href="/Arshit_Resume_2025.pdf"
              className="btn secondary-btn"
              download
            >
              <FaFileDownload /> Resume
            </a>

            <a
              href="https://github.com/Arshit0028"
              className="btn ghost-btn"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="reviews-section">
        <h2 className="section-title">What Clients Say</h2>
        <p className="section-subtitle">
          Trusted by clients for quality & timely delivery
        </p>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="review-card"
            >
              <img src={r.image} alt={r.name} className="review-avatar" />
              <h4>{r.name}</h4>
              <span className="review-role">{r.role}</span>

              <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <span>4.5 / 5</span>
              </div>

              <p className="review-text">“{r.review}”</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
