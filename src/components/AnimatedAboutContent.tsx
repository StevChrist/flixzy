// src/components/AnimatedAboutContent.tsx
'use client'; // Komponen ini adalah Client Component

import { motion } from 'framer-motion';
// Sesuaikan path jika About.module.css Anda berada di src/app/about/
// Jika Anda memindahkan style ke src/styles/ atau src/components/ maka pathnya akan berbeda
import styles from '../app/about/About.module.css';

// Varian untuk kontainer utama (misalnya, .aboutContainer) untuk mengatur animasi anak-anaknya
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Jeda antar animasi anak-anak (h1, section, section, ...)
    },
  },
};

// Varian untuk item anak (h1, section)
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Mulai transparan dan sedikit di bawah
  visible: {
    opacity: 1,
    y: 0,            // Bergerak ke posisi normal
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function AnimatedAboutContent() {
  return (
    <motion.div
      className={styles.aboutContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.pageTitle} variants={itemVariants}>
        About Flixzy.
      </motion.h1>

      <motion.section className={styles.section} variants={itemVariants}>
        <h2>Our Mission</h2>
        <p>
          Welcome to Flixzy! Our mission is to provide a seamless and personalized movie streaming
          experience. We leverage cutting-edge technology to help you discover films you love,
          powered by a unique multimodal database system.
        </p>
      </motion.section>

      <motion.section className={styles.section} variants={itemVariants}>
        <h2>The Technology</h2>
        <p>
          Flixzy is built using a modern tech stack including Next.js for the frontend,
          Python for the backend, and a sophisticated multimodal database approach
          combining vector and document databases to deliver rich search and recommendation
          capabilities.
        </p>
      </motion.section>

      <motion.section className={styles.section} variants={itemVariants}>
        <h2>Data Sources</h2>
        <p>
          Our film data is curated from reliable sources such as The Movie Database (TMDB)
          and MovieLens datasets, ensuring a comprehensive and diverse catalog.
        </p>
      </motion.section>
    </motion.div>
  );
}