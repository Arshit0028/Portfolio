import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "./Hero.css";

// Optimized Polygon Mesh Background
const PolygonMesh = () => {
  const meshRef = useRef();
  const numPoints = 50; // Reduce points for performance

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

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
      meshRef.current.rotation.x += 0.0004;
      meshRef.current.position.x = mouse.x * 0.5;
      meshRef.current.position.y = -mouse.y * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial
          color="#38bdf8"
          size={0.12}
          sizeAttenuation
          depthWrite={false}
          transparent
          opacity={0.5}
        />
      </Points>
      <Line
        points={linePoints}
        color="#a855f7"
        lineWidth={0.25}
        transparent
        opacity={0.15}
      />
    </group>
  );
};

const Hero = () => {
  const [showMesh, setShowMesh] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShowMesh(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="hero-section">
      {/* Canvas Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          {showMesh && <PolygonMesh />}
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title"
        >
          Hi, I’m <span className="highlight">Arshit Dhiman</span> 👋
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subtitle"
        >
          Full Stack Developer & Web Enthusiast
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          <a href="/Arshit_Resume_2025.pdf" className="btn secondary-btn" download>
            <FaFileDownload /> Resume
          </a>
          <a
            href="https://github.com/Arshit0028"
            target="_blank"
            rel="noreferrer"
            className="btn ghost-btn"
          >
            <FaGithub /> GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
