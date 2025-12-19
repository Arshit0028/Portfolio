import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "./Hero.css";

// Optimized & Smooth Polygon Mesh Background
const PolygonMesh = () => {
  const meshRef = useRef();
  const numPoints = 50; // tuned for performance + look

  // positions buffer
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
  }, [numPoints]);

  // convert to array of [x,y,z] for Line
  const linePoints = useMemo(() => {
    const arr = [];
    for (let i = 0; i < points.length; i += 3) {
      arr.push([points[i], points[i + 1], points[i + 2]]);
    }
    return arr;
  }, [points]);

  // internal smooth state for mouse-follow and rotation (lerp)
  const target = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const current = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useFrame(({ mouse, clock }) => {
    // update target gently based on mouse
    target.current.x = mouse.x * 0.8;
    target.current.y = -mouse.y * 0.6;
    // small automatic rotation over time
    target.current.ry = Math.sin(clock.getElapsedTime() * 0.12) * 0.25;
    target.current.rx = Math.cos(clock.getElapsedTime() * 0.07) * 0.12;

    // lerp helper
    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = 0.06; // smaller -> smoother/slower
    current.current.x = lerp(current.current.x, target.current.x, ease);
    current.current.y = lerp(current.current.y, target.current.y, ease);
    current.current.ry = lerp(current.current.ry, target.current.ry, ease);
    current.current.rx = lerp(current.current.rx, target.current.rx, ease);

    if (meshRef.current) {
      meshRef.current.rotation.y = current.current.ry;
      meshRef.current.rotation.x = current.current.rx;
      // small subtle parallax movement
      meshRef.current.position.x = current.current.x;
      meshRef.current.position.y = current.current.y;
      // add a tiny, slow breathing scale
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.3) * 0.015;
      meshRef.current.scale.set(scale, scale, scale);
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

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  // delay mount for a single-frame mount to avoid initial stutter on some devices
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="hero-section">
      {/* Canvas Background with smooth entrance using framer-motion */}
      <motion.div
        className="canvas-container"
        initial={{ opacity: 1, scale: 8 }}
        animate={{ opacity: 1, scale: 0.82 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={40} />
          <Suspense fallback={null}>{mounted && <PolygonMesh />}</Suspense>
        </Canvas>
      </motion.div>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
