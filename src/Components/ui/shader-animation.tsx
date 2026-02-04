import { useEffect, useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaChevronDown,
} from "react-icons/fa"

export function ShaderAnimation() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{ animationId: number }>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    if (window.innerWidth < 768) return // optional: disable on mobile

    const container = canvasRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy)
          / min(resolution.x, resolution.y);

        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);

        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) /
              abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
              - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      )
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      if (sceneRef.current) {
        sceneRef.current.animationId = requestAnimationFrame(animate)
      }
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    sceneRef.current = { animationId: 0 }
    animate()

    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      window.removeEventListener("resize", resize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* ===== Shader Background ===== */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* ===== Dark Overlay ===== */}
      <div className="absolute inset-0 z-[5] bg-black/40" />

      {/* ===== HERO CONTENT ===== */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title"
        >
          Hi, I’m <span className="highlight">Arshit Dhiman</span> 👋
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-subtitle"
        >
          Full Stack Developer & Web Enthusiast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-description max-w-3xl mt-4"
        >
          Web Developer crafting high-performance, responsive websites.
          I turn ideas into polished digital products with clean UI, strong UX,
          and real-world impact.
        </motion.p>

        {/* ===== Buttons ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-buttons mt-8 flex gap-4 flex-wrap justify-center"
        >
          <a
            href="https://www.linkedin.com/in/arshit-dhiman-b70999357/"
            target="_blank"
            rel="noreferrer"
            className="btn primary-btn"
          >
            <FaLinkedin /> Connect
          </a>

          <a
            href="/Arshit_Resume_2026.pdf"
            download
            className="btn secondary-btn"
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

        {/* ===== Scroll Arrow ===== */}
        <motion.div
          className="scroll-arrow mt-16"
          animate={{ y: 14, opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <span className="pulse-ring" />
          <FaChevronDown className="arrow-icon" />
        </motion.div>
      </div>
    </section>
  )
}
