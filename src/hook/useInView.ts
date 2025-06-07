
'use client';
import { useEffect, useRef, useState, RefObject } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(
  options = {}
): { ref: RefObject<T | null>; isIntersecting: boolean } {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}
