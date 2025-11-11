import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { OrbitControls } from "@react-three/drei";
import "./Projects.css";

// -----------------------------
// Helper: Camera rig for subtle parallax (react-three)
// -----------------------------
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    // mouse is normalized -1..1. subtle camera movement
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// 🌌 Particle Field (optimized with useMemo so positions aren't regenerated each render)
function Particles({ count = 150 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    mesh.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.4;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.25}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// 🔮 Futuristic Glowing Wireframe Sphere
function HologramSphere({ position, color = "#4cc9f0", size = 10, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.002 * speed;
    mesh.current.rotation.x += 0.001 * speed;

    const pulse = 0.5 + Math.sin(t * 2) * 0.3;
    if (mesh.current.material) {
      mesh.current.material.opacity = 0.25 + pulse * 0.15;
    }
  });

  return (
    <lineSegments ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.35}
        linewidth={1}
      />
    </lineSegments>
  );
}

// -----------------------------
// Projects component
// -----------------------------
const Projects = () => {
  const projects = [
    {
      title: "MediGo",
      description:
        "🚑 MediGo is a modern doctor appointment booking platform that helps patients connect with doctors, book appointments, and manage their healthcare with ease.",
      image: "/medigo.png",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Stripe",
        "Razorpay",
        "JWT",
        "Framer Motion",
        "JavaScript",
        "Tailwind CSS",
      ],
      link: "https://medigoo.netlify.app/",
      color: "#0984e3",
    },
    {
      title: "My Portfolio",
      description:
        "A personal portfolio website showcasing skills and projects with smooth animations and dark theme UI.",
      image: "/portfolio.png",
      technologies: [
        "React",
        "HTML",
        "CSS",
        "JavaScript",
        "Framer Motion",
        "Node.js",
      ],
      link: "https://arshitportfolio.netlify.app/",
      color: "#00b894",
    },
    {
      title: "Pooja Jewellers Website",
      description:
        "A comprehensive e-commerce website for a jewelry store with product listings, and location map and contact form... client want deployment from GoDaddy.",
      image: "/pooja.png",
      technologies: ["GoDaddy", "Tools", "SEO", "HTML", "CSS"],
      link: "https://poojajewellers.co.in/",
      color: "#6c5ce7",
    },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        when: "beforeChildren",
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const canvasVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  // motion values to create consistent tilt effect when focusing/hovering via keyboard
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useTransform(mx, [-1, 1], [8, -8]);
  const rotateX = useTransform(my, [-1, 1], [-6, 6]);

  // reset values when unmounting
  useEffect(() => {
    return () => {
      mx.set(0);
      my.set(0);
    };
  }, [mx, my]);

  return (
    <section className="projects-section" id="projects">
      {/* 🌌 3D Background - animate the container so the WebGL fades/zooms in smoothly when scrolled into view */}
      <motion.div
        className="projects-bg-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={canvasVariants}
      >
        <Canvas
          className="projects-bg-canvas"
          camera={{ position: [0, 0, 25], fov: 75 }}
        >
          <CameraRig />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Particles count={180} />
          <HologramSphere
            position={[-20, 14, -15]}
            color="#4cc9f0"
            size={10}
            speed={1.2}
          />
          <HologramSphere
            position={[15, -10, -18]}
            color="#7209b7"
            size={12}
            speed={0.9}
          />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </motion.div>

      {/* Projects Content */}
      <div className="projects-container">
        <motion.div
          className="projects-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              Some of my recent projects displayed inside laptop screens with
              interactive 3D background.
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                className="project-card"
                variants={itemVariants}
                whileHover={{ scale: 1.04, translateY: -6 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                style={{ ["--project-color"]: project.color, rotateY, rotateX }}
                onPointerMove={(e) => {
                  // set motion values normalized to -1..1
                  const rect = e.currentTarget.getBoundingClientRect();
                  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                  mx.set(nx);
                  my.set(ny);
                }}
                onPointerLeave={() => {
                  mx.set(0);
                  my.set(0);
                }}
                tabIndex={0}
                onFocus={() => {
                  /* keyboard focus will trigger motion values staying at 0 until arrow interaction */
                }}
                onKeyDown={(e) => {
                  // small keyboard accessibility: arrow keys tilt card
                  if (e.key === "ArrowLeft") mx.set(-0.6);
                  if (e.key === "ArrowRight") mx.set(0.6);
                  if (e.key === "ArrowUp") my.set(-0.45);
                  if (e.key === "ArrowDown") my.set(0.45);
                  if (e.key === "Enter") window.open(project.link, "_blank");
                }}
                onKeyUp={() => {
                  mx.set(0);
                  my.set(0);
                }}
              >
                <div className="project-laptop">
                  <div className="laptop-screen">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                    />
                    {/* Hover Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-link"
                      aria-label={`Visit ${project.title}`}
                    >
                      Visit Project ↗
                    </a>
                  </div>
                  <div className="laptop-base" aria-hidden></div>
                </div>

                {/* Always show project title */}
                <h3 className="project-title">{project.title}</h3>

                {/* Hidden content until hover */}
                <div className="project-content">
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
