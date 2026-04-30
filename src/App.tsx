import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Phone, CheckCircle2, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { CursorGlow } from './components/CursorGlow';
import { FloatingParticles } from './components/FloatingParticles';
import { GradientMesh } from './components/GradientMesh';
import { ScrambleText, TypewriterText } from './components/AnimatedText';
import { MagneticButton } from './components/MagneticButton';
import { ParallaxLayer } from './components/ParallaxSection';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const REPO_OWNER = import.meta.env.VITE_REPO_OWNER || '';
const REPO_NAME = import.meta.env.VITE_REPO_NAME || 'walima-invite';
const FILE_PATH = 'rsvps.md';

function App() {
  const [guestName, setGuestName] = useState('Valued Guest');
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [isFamilyComing, setIsFamilyComing] = useState<boolean | null>(null);
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('n');
    if (nameParam) {
      const formattedName = decodeURIComponent(nameParam)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]/g, ' ');
      const titleCase = formattedName.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      setGuestName(titleCase);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const timestamp = new Date().toISOString();
    let rsvpDetails = `- **${guestName}**: Not Coming (${timestamp})\n`;

    if (rsvpStatus === 'yes') {
      const familyDetails = isFamilyComing ? `with ${familyMembersCount} family member(s)` : 'alone';
      rsvpDetails = `- **${guestName}**: Coming ${familyDetails} (${timestamp})\n`;
    }

    try {
      const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
      const getResponse = await fetch(getUrl, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let currentContent = '';
      let fileSha = '';

      if (getResponse.ok) {
        const fileData = await getResponse.json();
        currentContent = decodeURIComponent(escape(window.atob(fileData.content)));
        fileSha = fileData.sha;
      } else if (getResponse.status === 404) {
        currentContent = '# Walima RSVPs\n\n';
      } else {
        throw new Error('Failed to fetch existing RSVPs');
      }

      const newContent = currentContent + rsvpDetails;
      const encodedContent = window.btoa(unescape(encodeURIComponent(newContent)));

      const putResponse = await fetch(getUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `RSVP from ${guestName}`,
          content: encodedContent,
          sha: fileSha || undefined
        })
      });

      if (!putResponse.ok) {
        throw new Error('Failed to save RSVP');
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error saving RSVP:", error);
      alert('There was an issue saving your RSVP. Please try again or contact via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-gold-500 selection:text-white overflow-x-hidden">
      <CursorGlow />
      <FloatingParticles />
      <GradientMesh />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 z-[100]"
        style={{ width: useTransform(useScroll().scrollYProgress, [0, 1], ['0%', '100%']) }}
      />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full border border-gold-400/10 animate-rotate-slow"
          style={{ y: scrollY * 0.05 }}
        />
        <motion.div
          className="absolute top-40 left-20 w-20 h-20 rounded-full border border-gold-400/15 animate-rotate-slow"
          style={{ y: scrollY * -0.03, animationDirection: 'reverse', animationDuration: '40s' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-gold-400/5 animate-float"
          style={{ y: scrollY * 0.08 }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center p-6 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-gold-400/10 animate-rotate-slow" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-gold-400/15 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-gold-400/20 animate-rotate-slow" style={{ animationDuration: '60s' }} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFBF7] pointer-events-none z-10" />

        <motion.div
          className="relative z-20 text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gold-600 animate-shimmer inline-block px-4 py-2 rounded-full border border-gold-400/20">
              <Sparkles className="w-3 h-3 inline mr-2" />
              In the name of Allah, the Most Gracious, the Most Merciful
            </span>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex justify-center mb-3 text-gold-500"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-8 h-8 fill-gold-500" />
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-light italic mb-3 font-serif text-slate-600">
            <TypewriterText text="We joyfully invite" speed={60} />
          </motion.h2>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-navy-900 mb-3 tracking-tight">
            <ScrambleText text={guestName} duration={1200} />
          </motion.h1>

          <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-light italic mb-4 font-serif text-slate-600">
            to celebrate the Walima of
          </motion.h2>

          <motion.div variants={fadeIn} className="mb-6">
            <motion.h3
              className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-2 relative inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-gradient">Haseeb Shah</span>
            </motion.h3>
            <motion.span
              className="text-lg italic font-serif text-slate-500 block my-1"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              &
            </motion.span>
            <motion.h3
              className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mt-0 relative inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-gradient">His Bride</span>
            </motion.h3>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gold-500/60 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Details Section */}
      <ParallaxLayer speed={0.3} direction="up">
        <motion.div
          className="max-w-4xl mx-auto px-6 py-16 bg-white/80 backdrop-blur-sm rounded-t-[3rem] shadow-xl relative z-20 border border-white/50"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <motion.div
              className="space-y-8"
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
                className="flex flex-col md:flex-row items-center md:items-start gap-4 group"
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
                className="flex flex-col md:flex-row items-center md:items-start gap-4 group"
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
              className="space-y-8"
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
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-lg transition-all group card-hover relative overflow-hidden"
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
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-lg transition-all group card-hover relative overflow-hidden"
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
        <div className="bg-navy-900 text-white py-20 px-6 relative z-10 overflow-hidden">
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
              <p className="text-slate-300">Please let us know if you will be joining us for the celebration.</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleRSVPSubmit}
                  className="bg-navy-800/50 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-700/50 relative overflow-hidden"
                >
                  {/* Shimmer border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-gold-400/0 hover:border-gold-400/20 transition-colors duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/0 via-gold-400/10 to-gold-400/0 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

                  <div className="mb-8 relative z-10">
                    <label className="block text-lg font-medium mb-4 text-white">Are you coming?</label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={() => setRsvpStatus('yes')}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all relative overflow-hidden ${rsvpStatus === 'yes' ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
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
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${rsvpStatus === 'no' ? 'bg-red-500/80 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
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
                        className="mb-8 overflow-hidden"
                      >
                        <label className="block text-lg font-medium mb-4 text-white">Is your family coming with you?</label>
                        <div className="flex gap-4">
                          <motion.button
                            type="button"
                            onClick={() => setIsFamilyComing(true)}
                            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${isFamilyComing === true ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Yes
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => setIsFamilyComing(false)}
                            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${isFamilyComing === false ? 'bg-slate-500 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
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
                        className="mb-8 overflow-hidden"
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
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                          placeholder="e.g., 4"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <MagneticButton
                    type="submit"
                    disabled={!rsvpStatus || isSubmitting}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-semibold py-4 px-8 rounded-lg shadow-xl shadow-gold-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 relative overflow-hidden group"
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
                  className="bg-navy-800/50 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-slate-700/50 text-center relative overflow-hidden"
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
