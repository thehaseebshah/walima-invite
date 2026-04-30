import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Phone, CheckCircle2, Heart } from 'lucide-react';

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('n');
    if (nameParam) {
      const formattedName = decodeURIComponent(nameParam).replace(/[-_]/g, ' ');
      const titleCase = formattedName.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      setGuestName(titleCase);
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-gold-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFBF7] pointer-events-none z-10"></div>

        <motion.div
          className="relative z-20 text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gold-600">
              In the name of Allah, the Most Gracious, the Most Merciful
            </span>
          </motion.div>

          <motion.div variants={fadeIn} className="flex justify-center mb-8 text-gold-500">
            <Heart className="w-8 h-8 fill-gold-500" />
          </motion.div>

          <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-light italic mb-8 font-serif text-slate-600">
            We joyfully invite
          </motion.h2>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-navy-900 mb-8 tracking-tight">
            {guestName}
          </motion.h1>

          <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-light italic mb-10 font-serif text-slate-600">
            to celebrate the Walima of
          </motion.h2>

          <motion.div variants={fadeIn} className="mb-10">
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mb-2">Haseeb Shah</h3>
            <span className="text-lg italic font-serif text-slate-500">&</span>
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-navy-900 mt-2">His Bride</h3>
          </motion.div>
        </motion.div>
      </div>

      {/* Details Section */}
      <motion.div
        className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-t-[3rem] shadow-xl relative z-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="space-y-8">
            <h4 className="text-2xl font-serif font-bold text-navy-900 border-b-2 border-gold-400 pb-2 inline-block">
              Event Details
            </h4>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="bg-gold-50 p-3 rounded-full text-gold-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg text-navy-900">Sunday, 3rd May 2026</p>
                <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Clock className="w-4 h-4" /> 1:00 PM Onwards
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="bg-gold-50 p-3 rounded-full text-gold-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg text-navy-900">Jhambra Sharqi</p>
                <p className="text-slate-500 mt-1">Mianwali, Punjab, Pakistan</p>
                <a
                  href="https://maps.google.com/?q=Jhambra+Sharqi+Mianwali"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold-600 hover:text-gold-500 text-sm font-medium mt-2 inline-block transition-colors"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-2xl font-serif font-bold text-navy-900 border-b-2 border-gold-400 pb-2 inline-block">
              Contact Info
            </h4>
            <p className="text-slate-600">For any inquiries or assistance, please reach out:</p>

            <div className="space-y-4">
              <a
                href="https://wa.me/923324844004"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-md transition-all group"
              >
                <div className="bg-[#25D366] p-3 rounded-full text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-navy-900">Haseeb Shah</p>
                  <p className="text-sm text-slate-500">+92 332 4844004 (WhatsApp)</p>
                </div>
              </a>

              <a
                href="https://wa.me/923334844004"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-gold-400 hover:shadow-md transition-all group"
              >
                <div className="bg-[#25D366] p-3 rounded-full text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-navy-900">Hafeez Shah</p>
                  <p className="text-sm text-slate-500">+92 333 4844004 (WhatsApp)</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RSVP Section */}
      <div className="bg-navy-900 text-white py-20 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">RSVP</h2>
            <p className="text-slate-300">Please let us know if you will be joining us for the celebration.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleRSVPSubmit}
                className="bg-navy-800 p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-700/50"
              >
                <div className="mb-8">
                  <label className="block text-lg font-medium mb-4 text-white">Are you coming?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('yes')}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${rsvpStatus === 'yes' ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                    >
                      Yes, Joyfully
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRsvpStatus('no');
                        setIsFamilyComing(null);
                      }}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${rsvpStatus === 'no' ? 'bg-red-500/80 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                    >
                      Regretfully, No
                    </button>
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
                        <button
                          type="button"
                          onClick={() => setIsFamilyComing(true)}
                          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${isFamilyComing === true ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFamilyComing(false)}
                          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${isFamilyComing === false ? 'bg-slate-500 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                        >
                          No, Just Me
                        </button>
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
                      <input
                        type="number"
                        min="2"
                        max="20"
                        value={familyMembersCount}
                        onChange={(e) => setFamilyMembersCount(parseInt(e.target.value) || 2)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="e.g., 4"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={!rsvpStatus || isSubmitting}
                  className="w-full bg-gold-600 hover:bg-gold-500 text-white font-semibold py-4 px-8 rounded-lg shadow-xl shadow-gold-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  whileHover={!isSubmitting && rsvpStatus ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && rsvpStatus ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Confirm RSVP'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-navy-800 p-12 rounded-2xl shadow-2xl border border-slate-700/50 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Thank You, {guestName}!</h3>
                <p className="text-slate-300">
                  {rsvpStatus === 'yes'
                    ? "Your RSVP has been confirmed. We look forward to celebrating with you."
                    : "We're sorry you can't make it. Thank you for letting us know."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="bg-navy-900 border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        <p>Made with Heart by Haseeb Shah</p>
      </footer>
    </div>
  );
}

export default App;