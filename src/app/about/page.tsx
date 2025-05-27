// src/app/about/page.tsx
import type { Metadata } from 'next';
import AnimatedAboutContent from '../../components/AnimatedAboutContent'; // Impor komponen baru

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Flixzy. and our mission.',
};

export default function AboutPage() {
  return (
    // Konten utama halaman sekarang ditangani oleh AnimatedAboutContent
    // Anda bisa membungkusnya dengan <main> di sini jika diperlukan untuk semantik atau layout global
    // Namun, jika .aboutContainer sudah menangani padding dan layout utama, ini mungkin cukup.
    <AnimatedAboutContent />
  );
}