"use client";
import { useEffect, useState, useMemo } from 'react';
import styles from './confetti.module.css';

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => {
  return <div className={styles.confettiPiece} style={style}></div>;
};

export default function Confetti() {
  const [pieces, setPieces] = useState<React.ReactElement[]>([]);

  const confettiColors = useMemo(() => [
    '#E6E6FA', // Lavender
    '#D8BFD8', // Pale Violet
    '#C4A7E7', // A slightly deeper violet
    '#F4C2C2', // A soft pink
    '#FFD700', // Gold
  ], []);

  useEffect(() => {
    const newPieces = Array.from({ length: 150 }).map((_, i) => {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
      };
      return <ConfettiPiece key={i} style={style} />;
    });
    setPieces(newPieces);
  }, [confettiColors]);

  return <div className={styles.confettiContainer}>{pieces}</div>;
}
