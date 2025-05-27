// src/components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

// Pastikan ada "export default" di sini
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" legacyBehavior>
        <a className={styles.logo}>Flixzy.</a>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" legacyBehavior><a>Home</a></Link>
        <Link href="/about" legacyBehavior><a>About</a></Link> {/* Sesuaikan '/about' jika perlu */}
      </div>
    </nav>
  );
}