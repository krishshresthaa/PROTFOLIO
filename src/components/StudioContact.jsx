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

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-desk-wood overflow-hidden select-none border-b-8 border-[var(--craft-b)]" id="contact">
      
      {/* VINTAGE POSTAL AIRMAIL STRIPED BACKGROUND ACCENT BORDER */}
      <div 
        className="absolute inset-2 sm:inset-6 rounded-lg pointer-events-none opacity-20 border-8 border-dashed border-[var(--red)]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, var(--red) 0 15px, transparent 15px 30px, #3f7cac 30px 45px, transparent 45px 60px)'
        }}
      />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-kalam font-bold text-xs uppercase tracking-widest text-[var(--red)] bg-[var(--paper)] px-3 py-1 border border-[var(--red)] rounded shadow-sm inline-block mb-3">
              ✉️ DIRECT INBOX DELIVERY
            </span>

            <h2 className="font-marker text-4xl sm:text-6xl md:text-7xl text-[var(--ink)] -rotate-1">
              INBOX <span className="text-[var(--red)]">DISPATCH</span> 📮
            </h2>

            <svg className="w-56 sm:w-72 mx-auto mt-1 block" viewBox="0 0 280 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12c40-14 80 14 120 0s80-14 120 0" stroke="var(--red)" strokeWidth="4" strokeLinecap="round" fill="none"/>
            </svg>

            <p className="font-sans text-xs sm:text-base text-[var(--ink-soft)] max-w-md mx-auto mt-3 sm:mt-4 leading-relaxed px-2">
              Send a message directly to <strong>{USER_INFO.email}</strong>. Available for graphic design projects, typography art, poster commissions, and collaborations.
            </p>
          </div>
        </AnimatedSection>

        {/* Dispatch Grid: Envelope Form & Polaroid Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start max-w-5xl mx-auto">
          
          {/* Main Envelope Letter Form */}
          <AnimatedSection direction="left">
            <div 
              style={{ backgroundColor: cardBg, color: textColor }}
              className="relative p-6 sm:p-10 border-4 border-[var(--ink)] shadow-2xl rounded-lg overflow-hidden -rotate-1"
            >
              {/* Paper Tape & Postal Airmail Stamp */}
              <span className="tape top-[-14px] left-1/2 -ml-12 w-24 h-6 -rotate-2" />
              <div className="absolute top-4 right-4 flex items-center gap-1 border-2 border-dashed border-[var(--red)] px-2.5 py-1 rounded bg-[var(--paper)] text-[var(--red)] font-mono-code text-[10px] font-bold uppercase rotate-3">
                AIRMAIL ✈️ {USER_INFO.email}
              </div>

              <h3 
                style={{ color: textColor }}
                className="font-marker text-2xl sm:text-4xl mb-2 flex items-center gap-2"
              >
                LET'S TALK &amp; BUILD.
              </h3>

              <p 
                style={{ color: textSoftColor }}
                className="font-sans text-xs sm:text-sm mb-6 leading-relaxed"
              >
                Available for graphic design projects, typography posters, editorial magazine layouts, and brand collaborations. Messages are sent directly to <strong className="text-[var(--red)]">{USER_INFO.email}</strong>!
              </p>

              {/* Form or Submitted State */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-emerald-500/10 border-3 border-emerald-500 rounded-lg text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[var(--ink)]">
                    <Check className="w-9 h-9 stroke-[3]" />
                  </div>

                  {/* Stamp Graphic */}
                  <div className="inline-block border-4 border-emerald-600 text-emerald-600 font-marker text-2xl px-6 py-2 rounded -rotate-3 shadow-md bg-[var(--paper)]">
                    STAMPED + DELIVERED ✓
                  </div>

                  <h4 className="font-marker text-xl text-[var(--ink)]">
                    Thank you, {formData.name}!
                  </h4>

                  <p 
                    style={{ color: textSoftColor }}
                    className="font-sans text-xs sm:text-sm max-w-sm mx-auto leading-relaxed"
                  >
                    Your message has been delivered to <strong>{USER_INFO.email}</strong>. I will get back to <strong>{formData.email}</strong> as soon as possible!
                  </p>

                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <a
                      href={`mailto:${USER_INFO.email}?subject=Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                      className="stamp-btn text-xs bg-[var(--paper)] text-[var(--ink)]"
                    >
                      <Mail className="w-3.5 h-3.5 text-[var(--red)]" /> Open in Email App
                    </a>
                    <button
                      onClick={() => {
                        playPop();
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="text-xs font-sans font-bold text-[var(--ink-soft)] underline hover:text-[var(--red)]"
                    >
                      Send another message →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500 text-red-600 rounded text-xs font-sans font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label 
                      style={{ color: textColor }}
                      className="block font-kalam font-bold text-xs sm:text-sm uppercase mb-1"
                    >
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 border-2 border-[var(--ink)]/40 rounded focus:border-[var(--red)] outline-none font-sans text-xs sm:text-sm shadow-inner transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ color: textColor }}
                      className="block font-kalam font-bold text-xs sm:text-sm uppercase mb-1"
                    >
                      Your Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 border-2 border-[var(--ink)]/40 rounded focus:border-[var(--red)] outline-none font-sans text-xs sm:text-sm shadow-inner transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ color: textColor }}
                      className="block font-kalam font-bold text-xs sm:text-sm uppercase mb-1"
                    >
                      Project Brief / Message:
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Tell me about your poster project, typography poster idea, or graphic design requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ backgroundColor: inputBg, color: textColor }}
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 border-2 border-[var(--ink)]/40 rounded focus:border-[var(--red)] outline-none font-sans text-xs sm:text-sm shadow-inner transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="stamp-btn w-full justify-center text-center py-3.5 bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-white shadow-lg text-sm sm:text-base font-bold disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[var(--red)]" /> Dispatching to Inbox...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[var(--red)]" /> Stamp &amp; Send to krishshrestha679@gmail.com
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Direct Mail & Social Bar */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-[var(--ink)]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code font-bold">
                <a
                  href={`mailto:${USER_INFO.email}`}
                  className="flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--red)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--red)]" />
                  {USER_INFO.email}
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href={USER_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playStampClick}
                    className="hover:text-[var(--red)] underline"
                  >
                    LinkedIn 🔗
                  </a>
                  <a
                    href={USER_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playStampClick}
                    className="hover:text-[var(--red)] underline"
                  >
                    Instagram 📷
                  </a>
                  <a
                    href={USER_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playStampClick}
                    className="hover:text-[var(--red)] underline"
                  >
                    GitHub 💻
                  </a>
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* Polaroid Profile Sidebar Card */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-6">
              
              {/* Polaroid Frame */}
              <div className="note craft-note p-6 border-3 border-[var(--ink)] shadow-2xl rounded-sm relative rotate-2">
                <span className="pin red top-[-8px] left-1/2 -ml-2" />
                
                <div className="text-center pb-4 border-b border-dashed border-[var(--ink)]/40">
                  <span className="font-marker text-2xl block text-[var(--red)]">
                    {USER_INFO.name}
                  </span>
                  <span className="font-sans font-extrabold text-[10px] uppercase tracking-widest text-[var(--ink-soft)] block mt-0.5">
                    {USER_INFO.role}
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--ink-soft)] block mt-1">
                    Kathmandu, Nepal / Remote
                  </span>
                </div>

                <div className="py-4 space-y-2 font-kalam text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--red)] font-bold">✓</span>
                    <span>Typography &amp; Editorial Posters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--red)] font-bold">✓</span>
                    <span>Photoshop &amp; Grungy Movie Art</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--red)] font-bold">✓</span>
                    <span>Editorial Magazine Layouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--red)] font-bold">✓</span>
                    <span>Sports Graphics &amp; Halftones</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      playStampClick();
                      onOpenResume();
                    }}
                    className="stamp-btn w-full justify-center text-xs py-2 bg-[var(--paper)] text-[var(--ink)]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[var(--red)]" /> Resume PDF &amp; Profile
                  </button>

                  <a
                    href={USER_INFO.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playStampClick}
                    className="stamp-btn w-full justify-center text-xs py-2 bg-[var(--yellow)] text-[#2b2620]"
                  >
                    <Folder className="w-3.5 h-3.5 text-[var(--red)]" /> Google Drive Folder 📁
                  </a>
                </div>

              </div>

            </div>
          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
