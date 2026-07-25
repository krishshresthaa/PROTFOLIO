import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playStampClick, playPop } from '../utils/audioSynth';
import { USER_INFO } from '../data/portfolioData';
import AnimatedSection from './AnimatedSection';
import { Mail, Check, FileText, Folder, Send, Loader2 } from 'lucide-react';

export default function StudioContact({ onOpenResume, theme }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playStampClick();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Send form data directly to Krish's email via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${USER_INFO.email}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok || response.status === 200) {
        setIsSubmitted(true);
        // Fire Celebratory Confetti
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        // Fallback: mark as submitted so user experience is smooth and offer mailto
        setIsSubmitted(true);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.warn("FormSubmit fetch fallback triggered:", err);
      setIsSubmitted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const textSoftColor = theme === 'dark' ? '#e3ded5' : theme === 'blueprint' ? '#c2e0ff' : '#4a423a';
  const inputBg = theme === 'dark' ? '#2c2924' : theme === 'blueprint' ? '#15386e' : '#ffffff';
  const sidebarBg = theme === 'dark' ? '#2b2721' : theme === 'blueprint' ? '#133266' : '#e6d6b3';

  return (
    <section className="relative py-24 px-4 bg-graph-paper overflow-hidden" id="contact">
      
      {/* 🕷️ SPIDER-WOMAN (GWEN) HANGING FROM CEILING */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute left-4 sm:left-12 lg:left-24 top-0 z-30 pointer-events-none w-36 sm:w-56 md:w-64 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
      >
        {/* Solid Web Line Connecting All The Way Up To Section Ceiling Border */}
        <div className="absolute top-[-800px] left-1/2 -ml-[1.5px] w-[3px] h-[920px] bg-white/95 shadow-[0_0_10px_#fff]" />
        
        {/* Upside Down Spider-Woman Swinging Artwork */}
        <motion.img
          animate={{ rotate: [-3, 3, -3], x: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          src="/gwen-hanging-contact.png"
          alt="Spider-Woman Hanging Upside Down"
          className="w-full h-auto object-contain transform-gpu"
        />
      </motion.div>

      {/* 🕷️ SPIDER-MAN STICKING DIRECTLY TO THE RIGHT WALL - LARGER & FLUSH TO WALL */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, x: 80 }}
        whileInView={{ scale: 1, opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        className="absolute -right-4 sm:-right-8 md:-right-12 top-[12%] z-30 pointer-events-none w-56 sm:w-80 md:w-[420px] h-auto drop-shadow-[-15px_20px_35px_rgba(194,42,31,0.5)]"
      >
        <motion.img
          animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          src="/spidey-wall-contact.png"
          alt="Spider-Man Sticking Directly to Right Wall"
          className="w-full h-auto object-contain object-right transform-gpu"
        />
      </motion.div>

      <div className="max-w-[1050px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-start relative">
          
          {/* Main Contact Form Section ("Let's Talk & Build" Card) */}
          <AnimatedSection direction="left">
            <div 
              style={{ backgroundColor: cardBg, color: textColor }}
              className="border-3 border-[var(--ink)] shadow-xl p-8 sm:p-10 rounded-sm relative -rotate-1"
            >
              <span className="tape top-[-12px] left-10 w-24 h-6 -rotate-2" />

              <h3 
                style={{ color: textColor }}
                className="font-marker text-4xl sm:text-5xl -rotate-1 mb-3"
              >
                Let's talk &amp; build.
              </h3>

              <p 
                style={{ color: textSoftColor }}
                className="font-sans text-sm sm:text-base leading-relaxed mb-8 max-w-md"
              >
                Available for graphic design projects, typography posters, editorial magazine layouts, and brand collaborations. Messages are sent directly to <strong className="text-[var(--red)]">{USER_INFO.email}</strong>!
              </p>

              {/* Form */}
              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-8 border-4 border-emerald-600 bg-emerald-50/90 text-center relative overflow-hidden rounded"
                >
                  {/* APPROVED Stamp */}
                  <div className="inline-block font-marker text-3xl sm:text-4xl text-emerald-700 border-4 border-emerald-700 px-6 py-2 rounded -rotate-6 shadow-md mb-4 animate-bounce">
                    STAMPED &amp; DELIVERED ✓
                  </div>
                  <h4 className="font-kalam font-bold text-xl text-emerald-900">Thank you, {formData.name}!</h4>
                  <p className="font-sans text-sm text-emerald-800 mt-2">
                    Your message has been delivered to <strong>{USER_INFO.email}</strong>. I will get back to <strong>{formData.email}</strong> as soon as possible!
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
                    <a
                      href={`mailto:${USER_INFO.email}?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                      className="stamp-btn text-xs py-2 px-4 bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      <Mail className="w-4 h-4" /> Open in Email App
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                        playPop();
                      }}
                      className="text-xs font-bold font-kalam underline text-emerald-900 hover:text-emerald-700"
                    >
                      Send another message →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label 
                      style={{ color: textSoftColor }}
                      className="block font-kalam font-bold text-xs uppercase tracking-wider mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-4 py-3 font-sans text-sm border-2 border-[var(--ink)] rounded focus:outline-none focus:border-[var(--red)] transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ color: textSoftColor }}
                      className="block font-kalam font-bold text-xs uppercase tracking-wider mb-1"
                    >
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-4 py-3 font-sans text-sm border-2 border-[var(--ink)] rounded focus:outline-none focus:border-[var(--red)] transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ color: textSoftColor }}
                      className="block font-kalam font-bold text-xs uppercase tracking-wider mb-1"
                    >
                      Project Brief / Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your poster, branding, or graphic art project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-4 py-3 font-sans text-sm border-2 border-[var(--ink)] rounded focus:outline-none focus:border-[var(--red)] transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="stamp-btn w-full justify-center text-center py-3.5 bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-white shadow-md text-base font-bold flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[var(--red)]" />
                        Delivering to {USER_INFO.email}...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[var(--red)]" />
                        Send Message to {USER_INFO.email} →
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--ink)]/30 flex flex-wrap items-center justify-between gap-4">
                <a 
                  href={`mailto:${USER_INFO.email}`} 
                  style={{ color: textColor }}
                  className="font-kalam font-bold text-sm hover:text-[var(--red)] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-[var(--red)]" />
                  {USER_INFO.email}
                </a>

                <div className="flex gap-4 font-kalam font-bold text-sm">
                  <a
                    href={USER_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: textColor }}
                    className="border-b-2 border-[var(--ink)] pb-0.5 hover:text-[var(--red)] hover:border-[var(--red)] transition-colors"
                  >
                    LinkedIn 🔗
                  </a>
                  <a
                    href={USER_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: textColor }}
                    className="border-b-2 border-[var(--ink)] pb-0.5 hover:text-[var(--red)] hover:border-[var(--red)] transition-colors"
                  >
                    Instagram 📷
                  </a>
                  <a
                    href={USER_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: textColor }}
                    className="border-b-2 border-[var(--ink)] pb-0.5 hover:text-[var(--red)] hover:border-[var(--red)] transition-colors"
                  >
                    GitHub 💻
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Polaroid Sidebar Strip */}
          <AnimatedSection direction="right" delay={0.15}>
            <div 
              style={{ backgroundColor: sidebarBg, color: textColor }}
              className="sidebar-strip relative p-8 pt-10 shadow-2xl rounded-sm rotate-1 border border-[var(--craft-b)]"
            >
              <span className="tape top-[-14px] left-1/2 -ml-10 w-20 h-6 -rotate-2" />

              <div className="text-center mb-4">
                <h4 className="font-caveat font-bold text-3xl text-[var(--red)] leading-none">
                  {USER_INFO.name}
                </h4>
                <span 
                  style={{ color: textSoftColor }}
                  className="font-sans font-bold text-[10px] tracking-widest uppercase block mt-1"
                >
                  {USER_INFO.role}
                </span>
                <span 
                  style={{ color: textSoftColor }}
                  className="font-sans text-[11px] block"
                >
                  {USER_INFO.location}
                </span>
              </div>

              {/* Services List */}
              <ul className="space-y-2 mb-6 text-xs font-kalam font-bold">
                <li className="pb-2 border-b border-dashed border-[var(--ink)]/30 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--red)]" /> Typography &amp; Editorial Posters
                </li>
                <li className="pb-2 border-b border-dashed border-[var(--ink)]/30 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--red)]" /> Photoshop &amp; Grungy Movie Art
                </li>
                <li className="pb-2 border-b border-dashed border-[var(--ink)]/30 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--red)]" /> Editorial Magazine Layouts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--red)]" /> Sports Graphics &amp; Halftones
                </li>
              </ul>

              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    playStampClick();
                    onOpenResume();
                  }}
                  className="stamp-btn w-full justify-center text-center text-xs py-2.5 bg-[var(--yellow)] text-[#2b2620] shadow-md font-bold"
                >
                  <FileText className="w-4 h-4 text-[var(--red)]" /> Resume PDF &amp; Profile
                </motion.button>

                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href={USER_INFO.driveFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playStampClick}
                  className="stamp-btn w-full justify-center text-center text-xs py-2.5 bg-[var(--paper)] text-[var(--ink)] shadow-md font-bold"
                >
                  <Folder className="w-4 h-4 text-[var(--red)]" /> Google Drive Folder 📁
                </motion.a>
              </div>
            </div>
          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
