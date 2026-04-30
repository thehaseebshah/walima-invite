import { motion } from 'framer-motion';

export function DecorativeOrnaments() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {/* Left Ornament - Large arabesque floral */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-[0.35]"
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#D4AF37" strokeWidth="1.8" fill="none">
            {/* Main vine stem */}
            <path d="M200 600 Q 200 500 150 450 Q 100 400 50 380" />
            <path d="M200 600 Q 200 500 250 450 Q 300 400 350 380" />
            {/* Upper branches */}
            <path d="M150 450 Q 120 380 80 360 Q 40 340 20 350" />
            <path d="M250 450 Q 280 380 320 360 Q 360 340 380 350" />
            {/* Curlicues and leaves */}
            <path d="M80 360 Q 60 320 90 300 Q 120 280 100 260" />
            <path d="M320 360 Q 340 320 310 300 Q 280 280 300 260" />
            {/* Top curls */}
            <path d="M100 260 Q 80 220 120 200 Q 160 180 140 150" />
            <path d="M300 260 Q 320 220 280 200 Q 240 180 260 150" />
            {/* Center top flourish */}
            <path d="M140 150 Q 120 100 170 80 Q 220 60 200 20" />
            <path d="M260 150 Q 280 100 230 80 Q 180 60 200 20" />
            {/* Additional decorative curls */}
            <path d="M50 380 Q 20 350 40 320 Q 60 290 30 270" />
            <path d="M350 380 Q 380 350 360 320 Q 340 290 370 270" />
            {/* Small leaf shapes */}
            <path d="M90 300 Q 70 280 85 260 Q 100 240 95 270" />
            <path d="M310 300 Q 330 280 315 260 Q 300 240 305 270" />
            <path d="M120 200 Q 100 180 115 160 Q 130 140 125 170" />
            <path d="M280 200 Q 300 180 285 160 Q 270 140 275 170" />
            {/* Dots */}
            <circle cx="200" cy="20" r="4" fill="#D4AF37" stroke="none" />
            <circle cx="30" cy="270" r="3" fill="#D4AF37" stroke="none" />
            <circle cx="370" cy="270" r="3" fill="#D4AF37" stroke="none" />
          </g>
        </svg>
      </motion.div>

      {/* Right Ornament - Mirrored */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.35] scale-x-[-1]"
        animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#D4AF37" strokeWidth="1.8" fill="none">
            <path d="M200 600 Q 200 500 150 450 Q 100 400 50 380" />
            <path d="M200 600 Q 200 500 250 450 Q 300 400 350 380" />
            <path d="M150 450 Q 120 380 80 360 Q 40 340 20 350" />
            <path d="M250 450 Q 280 380 320 360 Q 360 340 380 350" />
            <path d="M80 360 Q 60 320 90 300 Q 120 280 100 260" />
            <path d="M320 360 Q 340 320 310 300 Q 280 280 300 260" />
            <path d="M100 260 Q 80 220 120 200 Q 160 180 140 150" />
            <path d="M300 260 Q 320 220 280 200 Q 240 180 260 150" />
            <path d="M140 150 Q 120 100 170 80 Q 220 60 200 20" />
            <path d="M260 150 Q 280 100 230 80 Q 180 60 200 20" />
            <path d="M50 380 Q 20 350 40 320 Q 60 290 30 270" />
            <path d="M350 380 Q 380 350 360 320 Q 340 290 370 270" />
            <path d="M90 300 Q 70 280 85 260 Q 100 240 95 270" />
            <path d="M310 300 Q 330 280 315 260 Q 300 240 305 270" />
            <path d="M120 200 Q 100 180 115 160 Q 130 140 125 170" />
            <path d="M280 200 Q 300 180 285 160 Q 270 140 275 170" />
            <circle cx="200" cy="20" r="4" fill="#D4AF37" stroke="none" />
            <circle cx="30" cy="270" r="3" fill="#D4AF37" stroke="none" />
            <circle cx="370" cy="270" r="3" fill="#D4AF37" stroke="none" />
          </g>
        </svg>
      </motion.div>

      {/* Top center small ornament */}
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 opacity-[0.45]"
        animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <g stroke="#D4AF37" strokeWidth="1.5" fill="none">
            <path d="M60 80 L60 50" />
            <path d="M60 50 Q 30 40 20 20 Q 15 10 25 5" />
            <path d="M60 50 Q 90 40 100 20 Q 105 10 95 5" />
            <path d="M20 20 Q 10 25 5 20" />
            <path d="M100 20 Q 110 25 115 20" />
            <circle cx="25" cy="5" r="3" fill="#D4AF37" stroke="none" />
            <circle cx="95" cy="5" r="3" fill="#D4AF37" stroke="none" />
            <path d="M60 50 Q 45 35 50 25 Q 55 15 60 10" />
            <path d="M60 50 Q 75 35 70 25 Q 65 15 60 10" />
            <circle cx="60" cy="8" r="2" fill="#D4AF37" stroke="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
