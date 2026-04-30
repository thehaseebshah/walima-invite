import { motion } from 'framer-motion';

interface OrnateDividerProps {
  className?: string;
  delay?: number;
}

export function OrnateDivider({ className = '', delay = 0 }: OrnateDividerProps) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    >
      {/* Left line with decorative end */}
      <div className="flex items-center flex-1 max-w-[120px]">
        <svg width="100%" height="14" viewBox="0 0 120 14" preserveAspectRatio="none" className="opacity-90">
          <line x1="120" y1="7" x2="20" y2="7" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="12" cy="7" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="6" cy="7" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Center diamond ornament */}
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 32 32"
        fill="none"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer diamond */}
        <path
          d="M16 2 L28 16 L16 30 L4 16 Z"
          stroke="#D4AF37"
          strokeWidth="1.2"
          fill="none"
          opacity="0.85"
        />
        {/* Inner diamond */}
        <path
          d="M16 6 L24 16 L16 26 L8 16 Z"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          opacity="0.9"
        />
        {/* Center cross lines */}
        <line x1="16" y1="2" x2="16" y2="30" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        <line x1="4" y1="16" x2="28" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7" />
        {/* Center dot */}
        <circle cx="16" cy="16" r="2.5" fill="#D4AF37" opacity="1" />
      </motion.svg>

      {/* Right line with decorative end */}
      <div className="flex items-center flex-1 max-w-[120px]">
        <svg width="100%" height="14" viewBox="0 0 120 14" preserveAspectRatio="none" className="opacity-90">
          <line x1="0" y1="7" x2="100" y2="7" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="108" cy="7" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="114" cy="7" r="2" fill="#D4AF37" />
        </svg>
      </div>
    </motion.div>
  );
}
