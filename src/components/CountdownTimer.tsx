import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

export function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsLive(true);
        return { days: 0, hours: 0, minutes: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isLive) {
    return (
      <motion.div
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gold-400/60 bg-white/60 backdrop-blur-sm ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <span className="text-sm font-semibold text-gold-700 tracking-wide">Today is the Day!</span>
      </motion.div>
    );
  }

  const timeBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
  ];

  return (
    <motion.div
      className={`flex flex-col items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="flex items-center gap-1.5 text-gold-600 mb-1">
        <Calendar className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.2em] font-semibold">Counting Down</span>
      </div>

      <div className="flex items-center gap-2">
        {timeBlocks.map((block, index) => (
          <div key={block.label} className="flex items-center gap-2">
            <motion.div
              className="flex flex-col items-center bg-white/70 backdrop-blur-sm rounded-lg border-2 border-gold-400/40 px-4 py-2.5 min-w-[68px] shadow-sm shadow-gold-400/10"
              whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.7)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="text-xl md:text-2xl font-serif font-bold text-navy-900 tabular-nums"
                key={block.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(block.value).padStart(2, '0')}
              </motion.span>
              <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold">
                {block.label}
              </span>
            </motion.div>

            {index < timeBlocks.length - 1 && (
              <motion.span
                className="text-gold-500 text-lg font-serif font-bold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
