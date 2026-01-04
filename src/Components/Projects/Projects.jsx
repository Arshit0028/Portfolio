import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import { OrbitControls } from "@react-three/drei";
import "./Projects.css";

/* ================= CAMERA RIG ================= */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ================= PARTICLES ================= */
function Particles({ count = 100 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 45;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 45;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
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
      <pointsMaterial size={0.18} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

/* ================= PROJECTS ================= */
const Projects = () => {
  const projects = [
    {
      side: "left",
      title: "MediGo",
      description:
        "A full-featured doctor appointment booking platform that allows patients to book appointments, manage doctors, and complete secure online payments with a seamless user experience..",
      image: "/medigo.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      link: "https://medigoo.netlify.app/",
      color: "#6ea8fe",
    },
    {
      side: "right",
      title: "My Portfolio",
      description:
        "A responsive personal portfolio website showcasing projects, skills, and experience, built with smooth motion effects and a minimal dark UI to ensure clarity, performance, and visual appeal..",
      image: "/portfolio.png",
      technologies: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Framer Motion",
        "Responsive Design",
        "Modern UI/UX",
      ],
      link: "https://arshitportfolio.netlify.app/",
      color: "#7dd3fc",
    },
    {
      side: "left",
      title: "Pooja Jewellers",
      description:
        "A premium business website for a jewellery brand featuring an elegant product showcase, seamless Google Maps integration, SEO-optimized structure, and reliable GoDaddy deployment—designed to enhance brand presence, customer trust, and local discoverability.",
      image: "/pooja.png",
      technologies: ["HTML", "CSS", "SEO", "GoDaddy"],
      link: "https://poojajewellers.co.in/",
      color: "#c4b5fd",
    },
    {
      side: "right",
      title: "oomamimeasts",
      description:
        "OoMamiMeats is a premium meat and daily essentials e-commerce platform offering fresh, hygienic products with smooth ordering, secure checkout, and location-based delivery. Built with a clean UI, optimized performance, and SEO-friendly structure to ensure a seamless shopping experience.",
      image: "/mami.png",
      technologies: [
        "Shopify",
        "Liquid",
        "HTML",
        "CSS",
        "SEO",
        "GA4",
        "Meta Pixel",
        "Payment Gateway",
      ],
      link: "https://www.oomamimeats.com",
      color: "#e84393",
    },
  ];

  return (
    <section className="projects-section" id="projects">
      {/* ===== Minimal Background ===== */}
      <div className="projects-bg-wrap">
        <Canvas
          className="projects-bg-canvas"
          camera={{ position: [0, 0, 28], fov: 70 }}
        >
          <CameraRig />
          <ambientLight intensity={0.45} />
          <directionalLight position={[6, 8, 5]} intensity={0.6} />
          <Particles />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* ===== Content ===== */}
      <div className="projects-container">
        <div className="projects-content">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              A selection of real-world projects built with clean UI, scalable
              architecture, and modern technologies.
            </p>
          </div>

          <div className="projects-split">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className={`project-row ${project.side}`}
                style={{ ["--project-color"]: project.color }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* ===== MACBOOK ===== */}
                <div className="project-visual">
                  <div className="macbook">
                    <div className="macbook-screen">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="macbook-bottom">
                      <span className="macbook-notch" />
                    </div>
                  </div>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="view-project-btn"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
