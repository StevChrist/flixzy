// src/app/page.tsx
import type { Metadata } from 'next';
// SearchBar sekarang diimpor dan digunakan di dalam AnimatedHeroSection
// import SearchBar from '../components/SearchBar';
import AnimatedHeroSection from '../components/AnimatedHeroSection'; // Impor komponen baru
import styles from './Home.module.css';

export const metadata: Metadata = {
  title: 'Welcome',
};

export default function HomePage() {
  return (
    <main className={styles.mainContent}>
      <AnimatedHeroSection /> {/* Gunakan komponen yang sudah dianimasikan */}
    </main>
  );
}