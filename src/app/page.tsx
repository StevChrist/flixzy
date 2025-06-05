'use client';

import { useState } from 'react';
import AnimatedHeroSection from '../components/AnimatedHeroSection';
import SearchResults from '../components/SearchResults';
import { SmoothScrollWrapper } from '../components/SmoothScrollWrapper';
import styles from './Home.module.css';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/search/hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SmoothScrollWrapper>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <AnimatedHeroSection onSearch={handleSearch} />
          <div id="search-results-section">
            <SearchResults query={query} results={results} loading={loading} />
          </div>
        </div>
      </main>
    </SmoothScrollWrapper>
  );
}