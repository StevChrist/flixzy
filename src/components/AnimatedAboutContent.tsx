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
        <h2>About and Core Objective</h2>
        <p>
          Flixzy is a project aimed at building a modern movie streaming platform prototype with advanced search and recommendation capabilities. It leverages a multimodal database system, combining document and vector databases, to provide a rich user experience. <br />
          The primary goal of this project is to develop a robust system that utilizes two distinct NoSQL databases to handle different types of movie-related data. These databases strengths are then combined through an intelligent query aggregator system to offer nuanced search and recommendation features.
        </p>
      </motion.section>

      <motion.section className={styles.section} variants={itemVariants}>
        <h2>System Component & Architecture</h2>
        <table style={{ borderCollapse: 'separate', borderSpacing: '0 0.3rem' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 500, paddingRight: 8, whiteSpace: 'nowrap' }}>Front End</td>
              <td style={{ fontWeight: 500, paddingRight: 4 }}>:</td>
              <td>Next.js, React, TypeScript, Tailwind CSS, Framer Motion</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, paddingRight: 8, whiteSpace: 'nowrap' }}>Back End</td>
              <td style={{ fontWeight: 500, paddingRight: 4 }}>:</td>
              <td>Python, FastAPI</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, paddingRight: 8, whiteSpace: 'nowrap' }}>Database</td>
              <td style={{ fontWeight: 500, paddingRight: 4 }}>:</td>
              <td>MongoDB, Faiss (Vector Database)</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500, paddingRight: 8, whiteSpace: 'nowrap' }}>Dataset</td>
              <td style={{ fontWeight: 500, paddingRight: 4 }}>:</td>
              <td>
                <a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata">TMDB (The Movie Database)</a>,{' '}
                <a href="https://grouplens.org/datasets/movielens/20m/">MovieLens</a>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.section>

      <motion.section className={styles.section} variants={itemVariants}>
        <h2>Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <img src="/team/member1.jpg" alt="Member 1" className={styles.teamPhoto} />
            <div className={styles.teamName}>Steven Immanuel C Girsang</div>
          </div>
          <div className={styles.teamMember}>
            <img src="/team/member2.jpg" alt="Member 2" className={styles.teamPhoto} />
            <div className={styles.teamName}>Muhammad Aqil Ghazali Anhein</div>
          </div>
          <div className={styles.teamMember}>
            <img src="/team/member3.jpg" alt="Member 3" className={styles.teamPhoto} />
            <div className={styles.teamName}>Bima Harish Mazaya</div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}