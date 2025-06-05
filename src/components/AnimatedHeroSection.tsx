'use client';

import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import styles from '../app/Home.module.css';

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

type AnimatedHeroSectionProps = {
  onSearch: (query: string) => void;
};

export default function AnimatedHeroSection({ onSearch }: AnimatedHeroSectionProps) {
  return (
    <motion.div
      className={styles.heroSection}
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

      <motion.div
        variants={itemVariants}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <SearchBar onSearch={onSearch} />
      </motion.div>
    </motion.div>
  );
}