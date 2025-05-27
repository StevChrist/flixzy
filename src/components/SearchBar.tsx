// src/components/SearchBar.tsx
'use client';

import { useState} from 'react';
import styles from './SearchBar.module.css';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from "react-icons";

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(`/search-results?query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
  };

  return (  
    <form onSubmit={handleSearch} className={styles.searchFormContainer}>
      <div className={styles.searchContainer}>
        <IconContext.Provider value={{ className: styles.searchIcon }}>
          <FiSearch />
        </IconContext.Provider>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for movies, series..."
          className={styles.searchInput}
        />
      </div>
    </form>
  );
}