import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Hero.css";

/* ================= REVIEWS DATA ================= */

const reviews = [
  {
    name: "Archit Rana",
    role: "Business Owner of Pooja Jewellers",
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

/* ================= REVIEWS SECTION ================= */

const Reviews = () => {
  return (
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
            transition={{ duration: 0.5, ease: "easeOut" }}
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
  );
};

export default Reviews;
