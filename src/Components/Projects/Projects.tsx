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
    image: "/medigo.png",
    live: "https://medigoo.netlify.app/",
  },
  {
    title: "Portfolio",
    image: "/portfolio.png",
    live: "https://arshitportfolio.netlify.app/",
  },
  {
    title: "Pooja Jewellers",
    image: "/pooja.png",
    live: "https://poojajewellers.co.in/",
  },
  {
    title: "OoMamiMeats",
    image: "/mami.png",
    live: "https://www.oomamimeats.com",
  },
  {
    title: "TheFirstPick",
    image: "/firstpick.png",
    live: "https://thedfirstpick.in",
  },
];

/* ================= PROJECTS SECTION ================= */

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-black text-white py-16 md:py-44 space-y-20 md:space-y-48"
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
  image,
  live,
}: {
  title: string;
  image: string;
  live: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ===== Animations (UNCHANGED) ===== */
  const rotate = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.96, 1] : [1.05, 1]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-[70vh] md:min-h-[95vh] px-4 md:px-6"
      style={{ perspective: "1600px" }}
    >
      {/* Subtle Background Depth */}
      <div className="absolute -z-10 inset-0 flex justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-br from-white/5 via-white/3 to-transparent rounded-full blur-3xl opacity-40" />
      </div>

      {/* Title */}
      <motion.h2
        style={{ opacity }}
        className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] mb-10 md:mb-14 text-center"
      >
        {title}
      </motion.h2>

      {/* Floating Card */}
      <AnimatedCard rotate={rotate} scale={scale} live={live}>
        <motion.img
          src={image}
          alt={title}
          style={{ scale: imageScale }}
          className="w-full h-full object-cover object-top"
        />
      </AnimatedCard>
    </section>
  );
}

/* ================= FLOATING CARD ================= */

function AnimatedCard({
  rotate,
  scale,
  children,
  live,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  live: string;
}) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="
        relative group
        w-full max-w-6xl
        rounded-[36px]
        p-[1px]
        bg-gradient-to-r from-white/15 via-white/5 to-white/15
        shadow-[0_50px_150px_rgba(0,0,0,0.8)]
      "
    >
      <div className="relative h-[18rem] sm:h-[22rem] md:h-[38rem] w-full overflow-hidden rounded-[28px] md:rounded-[34px] bg-zinc-950">
        
        {children}

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />
<div className="absolute inset-0 flex items-center justify-center">
  <motion.a
    href={live}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.035 }}
    whileTap={{ scale: 1.98 }}
    style={{ WebkitTapHighlightColor: "transparent" }}
    className="
      opacity-0 group-hover:opacity-100
      transition-all duration-500
      
      px-9 md:px-11
      py-2.5
      
      rounded-full
      
      bg-black/90
      backdrop-blur-2xl
      
      border border-white/12
      
      text-white
      text-[13.5px]
      font-medium
      tracking-[0.04em]
      
      shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]
      
      hover:border-white/25
      hover:bg-black/75
      
      no-underline
      outline-none
      focus:outline-none
    "
  >
    <span className="flex items-center gap-2">
      View Project
      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </span>
  </motion.a>
</div>


      </div>
    </motion.div>
  );
}
