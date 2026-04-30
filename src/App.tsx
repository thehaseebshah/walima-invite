import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Phone, CheckCircle2, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { CursorGlow } from './components/CursorGlow';
import { FloatingParticles } from './components/FloatingParticles';
import { GradientMesh } from './components/GradientMesh';
import { ScrambleText, TypewriterText } from './components/AnimatedText';
import { MagneticButton } from './components/MagneticButton';
import { ParallaxLayer } from './components/ParallaxSection';
import { DecorativeOrnaments } from './components/DecorativeOrnaments';
import { OrnateDivider } from './components/OrnateDivider';
import { CountdownTimer } from './components/CountdownTimer';

const WHATSAPP_NUMBER = '923324844004'; // Haseeb Shah
const DEFAULT_GUEST_NAME = 'Valued Guest';

function getInitialGuestName() {
  if (typeof window === 'undefined') return DEFAULT_GUEST_NAME;

  const params = new URLSearchParams(window.location.search);
  const nameParam = params.get('n');
  if (!nameParam) return DEFAULT_GUEST_NAME;

  const formattedName = decodeURIComponent(nameParam)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ');

  return formattedName.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function App() {
  const [guestName] = useState(getInitialGuestName);
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [isFamilyComing, setIsFamilyComing] = useState<boolean | null>(null);
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: pageScrollProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const progressWidth = useTransform(pageScrollProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rsvpStatus) return;

    setIsSubmitting(true);

    const coming = rsvpStatus === 'yes' ? 'Yes' : 'No';
    const familyCount =
      rsvpStatus === 'yes' && isFamilyComing
        ? familyMembersCount
        : rsvpStatus === 'yes'
          ? 1
          : 0;

    const message =
      `*Walima RSVP*\n` +
      `Name: ${guestName}\n` +
      `Attending: ${coming}\n` +
      `Family Members: ${familyCount}\n`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-slate-800 font-sans selection:bg-gold-500 selection:text-white overflow-x-hidden">
      {!shouldReduceMotion && <CursorGlow />}
      {!shouldReduceMotion && <FloatingParticles />}
      <GradientMesh />
      {!shouldReduceMotion && <DecorativeOrnaments />}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 z-[100]"
        style={{ width: progressWidth }}
      />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden hidden md:block">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full border-2 border-gold-400/25 animate-rotate-slow"
          style={{ y: scrollY * 0.05 }}
        />
        <motion.div
          className="absolute top-40 left-20 w-20 h-20 rounded-full border-2 border-gold-400/30 animate-rotate-slow"
          style={{ y: scrollY * -0.03, animationDirection: 'reverse', animationDuration: '40s' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-gold-400/15 animate-float"
          style={{ y: scrollY * 0.08 }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-5 py-14 md:p-8 overflow-hidden"
        style={{
          opacity: shouldReduceMotion ? 1 : heroOpacity,
          scale: shouldReduceMotion ? 1 : heroScale,
          y: shouldReduceMotion ? 0 : heroY,
        }}
      >
        {/* Islamic geometric pattern background */}
        <div className="absolute inset-0 islamic-pattern opacity-60 pointer-events-none" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1.5px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Animated rings */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-gold-400/25 animate-rotate-slow" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-gold-400/35 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
          <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-gold-400/40 animate-rotate-slow" style={{ animationDuration: '60s' }} />
          <div className="absolute w-[150px] h-[150px] rounded-full border-2 border-gold-400/30 animate-pulse-glow" />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"
          animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Bouncing material shapes */}
        <div className="hidden md:block">
        <motion.div
          className="absolute top-[15%] left-[10%] w-12 h-12 rounded-xl bg-gold-400/25 backdrop-blur-sm border border-gold-400/40 shadow-lg shadow-gold-400/20 pointer-events-none"
          animate={{ y: [0, -50, 0], rotate: [0, 180, 360] }}
          transition={{ type: "spring", stiffness: 100, damping: 10, repeat: Infinity, repeatDelay: 0.5, delay: 0 }}
        />
        <motion.div
          className="absolute top-[25%] right-[12%] w-8 h-8 rounded-full bg-gold-500/25 backdrop-blur-sm border border-gold-400/40 shadow-lg shadow-gold-400/20 pointer-events-none"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ type: "spring", stiffness: 120, damping: 12, repeat: Infinity, repeatDelay: 0.3, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[15%] w-10 h-10 rounded-lg bg-gold-600/25 backdrop-blur-sm border border-gold-400/40 rotate-45 shadow-lg shadow-gold-400/20 pointer-events-none"
          animate={{ y: [0, -35, 0], rotate: [45, 225, 45] }}
          transition={{ type: "spring", stiffness: 80, damping: 8, repeat: Infinity, repeatDelay: 0.8, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[8%] w-14 h-14 rounded-2xl bg-gold-400/20 backdrop-blur-sm border border-gold-400/35 shadow-xl shadow-gold-400/20 pointer-events-none"
          animate={{ y: [0, 45, 0], scale: [1, 1.15, 1] }}
          transition={{ type: "spring", stiffness: 90, damping: 9, repeat: Infinity, repeatDelay: 0.6, delay: 1.5 }}
        />
        <motion.div
          className="absolute top-[60%] left-[8%] w-6 h-6 rounded-full bg-gold-500/30 backdrop-blur-sm border border-gold-400/40 shadow-md shadow-gold-400/20 pointer-events-none"
          animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ type: "spring", stiffness: 150, damping: 15, repeat: Infinity, repeatDelay: 0.4, delay: 2 }}
        />
        <motion.div
          className="absolute top-[10%] right-[25%] w-16 h-16 rounded-full bg-gold-400/15 backdrop-blur-sm border border-gold-400/25 shadow-xl shadow-gold-400/20 pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ type: "spring", stiffness: 60, damping: 15, repeat: Infinity, repeatDelay: 1, delay: 0.8 }}
        />
        </div>

        {/* Additional large floating geometric shapes to fill empty spaces */}
        <motion.div
          className="absolute top-[8%] left-[5%] w-24 h-24 pointer-events-none opacity-[0.18]"
          animate={{ rotate: [0, 360], y: [0, -20, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <path d="M50 0 L61 35 L100 35 L68 57 L79 91 L50 70 L21 91 L32 57 L0 35 L39 35 Z" />
            <circle cx="50" cy="50" r="20" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] right-[5%] w-32 h-32 pointer-events-none opacity-[0.16]"
          animate={{ rotate: [360, 0], y: [0, 15, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <rect x="10" y="10" width="80" height="80" rx="4" />
            <rect x="25" y="25" width="50" height="50" rx="2" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="15" />
            <path d="M50 20 L50 80 M20 50 L80 50" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-[45%] left-[3%] w-20 h-20 pointer-events-none opacity-[0.2]"
          animate={{ rotate: [0, -360], x: [0, 10, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <polygon points="50,5 95,50 50,95 5,50" />
            <polygon points="50,20 80,50 50,80 20,50" />
            <circle cx="50" cy="50" r="12" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-[30%] right-[3%] w-28 h-28 pointer-events-none opacity-[0.18]"
          animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <path d="M50 5 L50 95 M5 50 L95 50" />
            <path d="M15 15 L85 85 M85 15 L15 85" />
          </svg>
        </motion.div>

        {/* Traditional corner borders */}
        <div className="corner-border corner-border-tl animate-ornament-float" style={{ animationDelay: '0s' }} />
        <div className="corner-border corner-border-tr animate-ornament-float" style={{ animationDelay: '1.5s' }} />
        <div className="corner-border corner-border-bl animate-ornament-float" style={{ animationDelay: '3s' }} />
        <div className="corner-border corner-border-br animate-ornament-float" style={{ animationDelay: '4.5s' }} />

        {/* Hero frame */}
        <div className="hero-frame" />

        {/* Very subtle vignette — kept light so decorations pop */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(253,251,247,0.15) 100%)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFBF7] pointer-events-none z-10" />

        <motion.div
          className="hero-card relative z-20 text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-5">
            <motion.span
              className="uppercase tracking-[0.24em] text-[10px] md:text-xs font-semibold text-gold-700 inline-flex items-center justify-center px-4 md:px-5 py-2.5 rounded-full border border-gold-400/35 bg-white/65 backdrop-blur-sm shadow-sm shadow-gold-400/10"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.15)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mr-2"
              >
                <Sparkles className="w-3 h-3 inline" />
              </motion.span>
              In the name of Allah, the Most Gracious, the Most Merciful
            </motion.span>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex justify-center mb-4 text-gold-500"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Heart className="w-10 h-10 fill-gold-500 drop-shadow-lg" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl"
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeIn} className="text-lg md:text-2xl font-light italic mb-3 font-serif text-slate-600">
            <TypewriterText text="We joyfully invite" speed={60} />
          </motion.h2>

          <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-navy-900 mb-3 tracking-tight leading-[0.95] text-balance">
            <ScrambleText text={guestName} duration={1200} />
          </motion.h1>

          <motion.h2 variants={fadeIn} className="text-lg md:text-2xl font-light italic mb-4 font-serif text-slate-600">
            to celebrate the Walima of
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="mb-8 relative group rounded-[2rem]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Transparent hover rectangle */}
            <motion.div
              className="absolute inset-0 -m-6 rounded-2xl border-2 border-gold-400/60 bg-white/[0.02] backdrop-blur-[2px] pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              whileHover={{ opacity: 1, scale: 1, borderColor: 'rgba(212,175,55,0.95)' }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 -m-6 rounded-2xl bg-gradient-to-br from-gold-400/[0.03] via-transparent to-gold-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            {/* Floating decorative stars */}
            <motion.div
              className="absolute -left-8 top-0 text-gold-400/30"
              animate={{ y: [0, -10, 0], rotate: [0, 180, 360], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <motion.div
              className="absolute -right-8 top-0 text-gold-400/30"
              animate={{ y: [0, 10, 0], rotate: [0, -180, -360], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>

            <motion.h3
              className="text-3xl md:text-5xl font-serif font-semibold text-navy-900 mb-2 relative inline-block leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-black drop-shadow-sm">Haseeb Shah</span>
            </motion.h3>
            <motion.span
              className="text-xl italic font-serif text-gold-500/80 block my-2"
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              &
            </motion.span>
            <motion.h3
              className="text-3xl md:text-5xl font-serif font-semibold text-navy-900 mt-0 relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-black drop-shadow-sm">His Wife</span>
            </motion.h3>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-2 mb-6">
            <OrnateDivider delay={1.8} />
          </motion.div>

          <motion.div variants={fadeIn} className="mb-8">
            <CountdownTimer targetDate="2026-05-03T13:00:00" />
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-slate-600">
            <span className="rounded-full border border-gold-400/30 bg-white/55 px-4 py-2 backdrop-blur-sm">Sunday, 3 May</span>
            <span className="rounded-full border border-gold-400/30 bg-white/55 px-4 py-2 backdrop-blur-sm">1:00 PM onwards</span>
            <span className="rounded-full border border-gold-400/30 bg-white/55 px-4 py-2 backdrop-blur-sm">Mianwali, Punjab</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-0 right-0 mx-auto flex flex-col items-center gap-2 text-gold-500/70 z-20 w-fit"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-full border border-gold-400/20 bg-white/30 backdrop-blur-sm"
            whileHover={{ scale: 1.1, borderColor: 'rgba(212,175,55,0.5)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Details Section */}
      <ParallaxLayer speed={0.3} direction="up">
        <motion.div
          className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-16 bg-white/85 backdrop-blur-sm rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-gold-900/5 relative z-20 border border-white/70"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-center md:text-left">
            <motion.div
              className="info-panel space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h4
                variants={slideIn}
                className="text-2xl font-serif font-bold text-navy-900 border-b-2 border-gold-400 pb-2 inline-block line-reveal"
              >
                Event Details
              </motion.h4>

              <motion.div
                variants={slideIn}
                className="detail-row flex flex-col md:flex-row items-center md:items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="bg-gold-50 p-3 rounded-full text-gold-600 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="absolute inset-0 bg-gold-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                  <Calendar className="w-6 h-6 relative z-10" />
                </motion.div>
                <div>
                  <p className="font-semibold text-lg text-navy-900">Sunday, 3rd May 2026</p>
                  <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-4 h-4" />
                    </motion.span>
                    1:00 PM Onwards
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={slideIn}
                className="detail-row flex flex-col md:flex-row items-center md:items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="bg-gold-50 p-3 rounded-full text-gold-600 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="absolute inset-0 bg-gold-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                  <MapPin className="w-6 h-6 relative z-10" />
                </motion.div>
                <div>
                  <p className="font-semibold text-lg text-navy-900">Jhambra Sharqi</p>
                  <p className="text-slate-500 mt-1">Mianwali, Punjab, Pakistan</p>
                  <motion.a
                    href="https://maps.google.com/?q=Jhambra+Sharqi+Mianwali"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-600 hover:text-gold-500 text-sm font-medium mt-2 inline-block transition-colors relative group/link"
                    whileHover={{ x: 5 }}
                  >
                    View on Google Maps &rarr;
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="info-panel space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h4
                variants={slideInRight}
                className="text-2xl font-serif font-bold text-navy-900 border-b-2 border-gold-400 pb-2 inline-block line-reveal"
              >
                Contact Info
              </motion.h4>
              <motion.p variants={slideInRight} className="text-slate-600">
                For any inquiries or assistance, please reach out:
              </motion.p>

              <div className="space-y-4">
                <motion.a
                  variants={slideInRight}
                  href="https://wa.me/923324844004"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-lg transition-all group card-hover relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/5 to-gold-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <motion.div
                    className="bg-[#25D366] p-3 rounded-full text-white shadow-sm relative z-10"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Phone className="w-5 h-5" />
                  </motion.div>
                  <div className="text-left relative z-10">
                    <p className="font-semibold text-navy-900">Haseeb Shah</p>
                    <p className="text-sm text-slate-500">+92 332 4844004 (WhatsApp)</p>
                  </div>
                </motion.a>

                <motion.a
                  variants={slideInRight}
                  href="https://wa.me/923334844004"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-lg transition-all group card-hover relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/5 to-gold-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <motion.div
                    className="bg-[#25D366] p-3 rounded-full text-white shadow-sm relative z-10"
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Phone className="w-5 h-5" />
                  </motion.div>
                  <div className="text-left relative z-10">
                    <p className="font-semibold text-navy-900">Hafeez Shah</p>
                    <p className="text-sm text-slate-500">+92 333 4844004 (WhatsApp)</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </ParallaxLayer>

      {/* RSVP Section */}
      <ParallaxLayer speed={0.2} direction="up">
        <div className="bg-navy-900 text-white py-20 px-5 md:px-6 relative z-10 overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 mb-4"
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.4)' }}
              >
                <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Join the Celebration</span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                <ScrambleText text="RSVP" duration={800} />
              </h2>
              <p className="text-slate-300 text-balance">Please let us know if you will be joining us. Your response opens WhatsApp with a ready-to-send message.</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleRSVPSubmit}
                  className="bg-navy-800/60 backdrop-blur-md p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden"
                >
                  {/* Shimmer border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-gold-400/0 hover:border-gold-400/20 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/0 via-gold-400/10 to-gold-400/0 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="mb-8 relative z-10">
                    <label className="block text-lg font-medium mb-4 text-white">Are you coming?</label>
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      <motion.button
                        type="button"
                        onClick={() => setRsvpStatus('yes')}
                        className={`rsvp-choice py-3.5 px-5 rounded-2xl font-medium transition-all relative overflow-hidden ${rsvpStatus === 'yes' ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20 border-gold-300' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-white/10'}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {rsvpStatus === 'yes' && (
                          <motion.div
                            className="absolute inset-0 bg-gold-400/20"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                        )}
                        <span className="relative z-10">Yes, Joyfully</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setRsvpStatus('no');
                          setIsFamilyComing(null);
                        }}
                        className={`rsvp-choice py-3.5 px-5 rounded-2xl font-medium transition-all ${rsvpStatus === 'no' ? 'bg-red-500/80 text-white shadow-lg border-red-300/70' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-white/10'}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Regretfully, No
                      </motion.button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {rsvpStatus === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden relative z-10"
                      >
                        <label className="block text-lg font-medium mb-4 text-white">Is your family coming with you?</label>
                        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                          <motion.button
                            type="button"
                            onClick={() => setIsFamilyComing(true)}
                            className={`rsvp-choice py-3.5 px-5 rounded-2xl font-medium transition-all ${isFamilyComing === true ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20 border-gold-300' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-white/10'}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Yes
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => setIsFamilyComing(false)}
                            className={`rsvp-choice py-3.5 px-5 rounded-2xl font-medium transition-all ${isFamilyComing === false ? 'bg-slate-500 text-white shadow-lg border-slate-300/60' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-white/10'}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            No, Just Me
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {rsvpStatus === 'yes' && isFamilyComing === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden relative z-10"
                      >
                        <label className="block text-lg font-medium mb-4 text-white">
                          Number of family members attending (including you)?
                        </label>
                        <motion.input
                          type="number"
                          min="2"
                          max="20"
                          value={familyMembersCount}
                          onChange={(e) => setFamilyMembersCount(parseInt(e.target.value) || 2)}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
                          placeholder="e.g., 4"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <MagneticButton
                    type="submit"
                    disabled={!rsvpStatus || isSubmitting}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl shadow-gold-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="relative z-10">Confirm RSVP</span>
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-navy-800/60 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10 text-center relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-gold-400/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">
                    Thank You, {guestName}!
                  </h3>
                  <p className="text-slate-300 relative z-10">
                    {rsvpStatus === 'yes'
                      ? "Your RSVP has been confirmed. We look forward to celebrating with you."
                      : "We're sorry you can't make it. Thank you for letting us know."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ParallaxLayer>

      {/* Footer */}
      <motion.footer
        className="bg-navy-900 border-t border-slate-800 py-8 text-center text-slate-500 text-sm relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gold-400/5 via-transparent to-gold-400/5"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative z-10 flex items-center justify-center gap-2">
          <span>Made with</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-400 fill-red-400 inline" />
          </motion.span>
          <span>by Haseeb Shah</span>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
