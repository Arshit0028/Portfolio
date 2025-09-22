import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { OrbitControls } from "@react-three/drei";
import "./Projects.css";

// 🌌 Particle Field
function Particles({ count = 150 }) {
  const mesh = useRef();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
    mesh.current.rotation.y += 0.002 * speed;
    mesh.current.rotation.x += 0.001 * speed;

    const pulse = 0.5 + Math.sin(t * 2) * 0.3;
    mesh.current.material.opacity = 0.25 + pulse * 0.15;
  });

  return (
    <lineSegments ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <lineBasicMaterial color={color} transparent opacity={0.35} linewidth={1} />
    </lineSegments>
  );
}

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
      technologies: ["React", "HTML", "CSS", "JavaScript", "Framer Motion", "Node.js"],
      link: "https://arshitportfolio.netlify.app/",
      color: "#00b894",
    },
    {
      title: "Pooja Jewellers Website",
      description:
        "A comprehensive e-commerce website for a jewelry store with product listings, and location map and contact form... client want deployment from GoDaddy.",
      image: "/pooja.png",
      technologies: ["GoDaddy" , "Tools" , "SEO" , "HTML" , "CSS"],
      link: "https://poojajewellers.co.in/",
      color: "#6c5ce7",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="projects-section" id="projects">
      {/* 🌌 3D Background */}
      <Canvas className="projects-bg-canvas" camera={{ position: [0, 0, 25], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Particles count={180} />
        <HologramSphere position={[-20, 14, -15]} color="#4cc9f0" size={10} speed={1.2} />
        <HologramSphere position={[15, -10, -18]} color="#7209b7" size={12} speed={0.9} />
        <OrbitControls enableZoom={false} />
      </Canvas>

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
              Some of my recent projects displayed inside laptop screens with interactive 3D background.
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="project-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                style={{ "--project-color": project.color }}
              >
                <div className="project-laptop">
                  <div className="laptop-screen">
                    <img src={project.image} alt={project.title} />
                    {/* Hover Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-link"
                    >
                      Visit Project ↗
                    </a>
                  </div>
                  <div className="laptop-base"></div>
                </div>

                {/* Always show project title */}
                <h3 className="project-title">{project.title}</h3>

                {/* Hidden content until hover */}
                <div className="project-content">
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
