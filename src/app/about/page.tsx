// src/app/about/page.tsx
import type { Metadata } from 'next';
import AnimatedAboutContent from '../../components/AnimatedAboutContent'; // Impor komponen baru

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Flixzy.',
};

export default function AboutPage() {
  return (
    <AnimatedAboutContent />
  );
}