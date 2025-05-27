// src/components/AnimatedHeroSection.tsx
'use client'; // Komponen ini perlu menjadi Client Component untuk animasi

import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import styles from '../app/Home.module.css'; // Menggunakan style dari Home.module.css

const subHeadingText = "What film are you looking for?";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function AnimatedHeroSection() {
  return (
    <motion.div
      className={styles.heroSection} // .heroSection punya max-width: 700px dan align-items: center
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.welcomeHeading} variants={itemVariants}>
        Welcome to <span className={styles.flixzyHighlight}>Flixzy</span>
      </motion.h1>

      <motion.p className={styles.subHeading} variants={itemVariants}>
        {subHeadingText}
      </motion.p>

      {/* Modifikasi motion.div pembungkus SearchBar */}
      <motion.div
        variants={itemVariants}
        style={{
          width: '100%', // Membuat pembungkus ini mengambil lebar penuh dari .heroSection
          display: 'flex',          // Untuk memusatkan SearchBar di dalamnya jika SearchBar lebih sempit
          justifyContent: 'center'  // Memusatkan SearchBar secara horizontal
        }}
      >
        <SearchBar /> {/* SearchBar akan menggunakan width & max-width dari CSS-nya sendiri */}
      </motion.div>
    </motion.div>
  );
}