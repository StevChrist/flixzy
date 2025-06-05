'use client';

import { motion } from 'framer-motion';
import styles from './SearchResults.module.css';

type Movie = {
  tmdb_id: string | number;
  title?: string;
  overview?: string;
  genres?: string[];
  release_date?: string;
  runtime?: number;
  director?: string;
  cast?: string[];
  keywords?: string[];
  avg_rating?: number;
  popularity?: number;
};

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: 'flex', marginBottom: '0.7rem' }}>
      <div className={styles.detailLabel}>{label}</div>
      <div className={styles.detailValue}>{value || '-'}</div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SearchResults({
  query,
  results,
  loading,
}: {
  query: string;
  results: Movie[];
  loading: boolean;
}) {
  if (!query) return null;

  return (
    <div className={styles.pageContainer}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h2 className={styles.queryHeading} variants={itemVariants}>
          Results for : <span style={{ color: '#e7b7a3', fontSize: '3rem' }}>{query}</span>
        </motion.h2>
        {loading && (
          <motion.div className={styles.loading} variants={itemVariants}>Loading</motion.div>
        )}
        {!loading && results.length === 0 && (
          <motion.p className={styles.empty} variants={itemVariants}>No results found.</motion.p>
        )}
        {!loading && results.length > 0 && (
          <motion.div
            className={styles.resultsList}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map((movie, idx) => (
              <motion.div
                className={styles.resultLayout}
                key={movie.tmdb_id || idx}
                variants={itemVariants}
              >
                <div className={styles.detailContainer}>
                  <DetailRow label="Title" value={movie.title} />
                  <DetailRow label="Overview" value={movie.overview} />
                  <DetailRow label="Genres" value={movie.genres?.join(', ')} />
                  <DetailRow label="Release Date" value={movie.release_date} />
                  <DetailRow label="Runtime" value={movie.runtime ? `${movie.runtime} min` : undefined} />
                  <DetailRow label="Director" value={movie.director} />
                  <DetailRow label="Cast" value={movie.cast ? movie.cast.slice(0, 4).join(', ') : undefined} />
                  <DetailRow label="Keywords" value={movie.keywords?.join(', ')} />
                  <DetailRow label="Average Rating" value={movie.avg_rating?.toString()} />
                  <DetailRow label="Popularity" value={movie.popularity?.toString()} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}