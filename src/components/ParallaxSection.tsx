import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxLayer({ children, className = '', speed = 0.5, direction = 'up' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const distance = 100 * speed;

  const yUp = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const y = direction === 'up' ? yUp : direction === 'down' ? yDown : 0;
  const x = direction === 'left' ? xLeft : direction === 'right' ? xRight : 0;

  return (
    <motion.div ref={ref} className={className} style={{ y, x }}>
      {children}
    </motion.div>
  );
}

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
