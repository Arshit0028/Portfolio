import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

/* ================= PROJECTS DATA ================= */

const projects = [
  {
    title: "MediGo",
    description:
      "Doctor appointment booking platform with secure payments, appointment scheduling, and a smooth end-to-end user experience.",
    image: "/medigo.png",
    live: "https://medigoo.netlify.app/",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "Portfolio",
    description:
      "Personal portfolio showcasing projects, skills, and experience with smooth animations and a modern dark UI.",
    image: "/portfolio.png",
    live: "https://arshitportfolio.netlify.app/",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
  },
  {
    title: "Pooja Jewellers",
    description:
      "Premium business website designed to improve brand presence, SEO performance, and local discoverability.",
    image: "/pooja.png",
    live: "https://poojajewellers.co.in/",
    tech: ["HTML", "CSS", "SEO"],
  },
  {
    title: "OoMamiMeats",
    description:
      "E-commerce platform for fresh meat and essentials with optimized performance and conversion-focused UI.",
    image: "/mami.png",
    live: "https://www.oomamimeats.com",
    tech: ["Shopify", "Liquid", "SEO", "GA4"],
  },
];

/* ================= PROJECTS SECTION ================= */

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-black text-white py-48 space-y-48"
    >
      {projects.map((project) => (
        <ScrollAnimatedCard key={project.title} {...project} />
      ))}
    </section>
  );
}

/* ================= SCROLL CARD ================= */

function ScrollAnimatedCard({
  title,
  description,
  image,
  live,
  tech,
}: {
  title: string;
  description: string;
  image: string;
  live: string;
  tech: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ===== Animations (FIXED) ===== */
  const rotate = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.92, 1] : [1.04, 1]
  );
  const opacity = useTransform(scrollYProgress, [0, 80], [80, 1]);
  const descY = useTransform(scrollYProgress, [0, 0.8], [80, 0]); // ✅ small value = no jump

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-[95vh] px-4 md:px-0"
      style={{ perspective: "1200px" }}
    >
      {/* ===== Title (NO Y-MOTION) ===== */}
      <motion.div
        style={{ opacity }}
        className="text-4xl font-semibold text-black dark:text-white"
      >
        <h2
          className="
            text-4xl md:text-5xl
            font-semibold
            tracking-tight
            leading-[2.6rem]
            md:leading-[3rem]
          "
        >
          {title}
        </h2>
      </motion.div>

      {/* ===== Card ===== */}
      <AnimatedCard rotate={rotate} scale={scale}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </AnimatedCard>

      {/* ===== Description + Tech + CTA ===== */}
      <motion.div
        style={{ opacity, translateY: descY }}
        className="mt-10 max-w-xl text-center space-y-6"
      >
        <p className="text-zinc-400 text-[17px] leading-relaxed">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="
                px-3 py-1
                text-sm
                rounded-full
                border border-white/10
                bg-white/5
                text-zinc-300
              "
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="
       inline-flex items-center gap-2
  px-6 py-2.5
  rounded-full
  text-sm font-medium
  border border-white/20
  text-white
  hover:bg-white hover:text-black
  transition-all duration-300
          "
        >
          View Live
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}

/* ================= CARD ================= */

function AnimatedCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="
        w-full max-w-5xl
        rounded-[28px]
        bg-gradient-to-b from-zinc-900 to-zinc-950
        border border-white/10
        shadow-[0_50px_140px_rgba(0,0,0,0.65)]
        p-4 md:p-6
        will-change-transform
      "
    >
      <div
        className="
          h-[22rem] md:h-[32rem]
          w-full
          overflow-hidden
          rounded-2xl
          bg-zinc-950
          border border-white/5
        "
      >
        {children}
      </div>
    </motion.div>
  );
}
