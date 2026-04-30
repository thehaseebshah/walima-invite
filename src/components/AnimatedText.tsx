import { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function ScrambleText({ text, className = '', delay = 0, duration = 1500 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const result = text
              .split('')
              .map((char, i) => {
                if (char === ' ') return ' ';
                const charProgress = Math.max(0, (progress * text.length - i) / 3);
                if (charProgress >= 1) return char;
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');

            setDisplayText(result);

            if (progress >= 1) {
              clearInterval(interval);
              setDisplayText(text);
            }
          }, 30);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [text, delay, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ text, className = '', delay = 0, speed = 50 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let i = 0;
          const timeout = setTimeout(() => {
            const interval = setInterval(() => {
              if (i <= text.length) {
                setDisplayText(text.slice(0, i));
                i++;
              } else {
                clearInterval(interval);
              }
            }, speed);
          }, delay);

          return () => {
            clearTimeout(timeout);
          };
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [text, delay, speed, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
