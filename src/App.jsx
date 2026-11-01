import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Terminal, Shield, Activity, Code, FileText, Download, ArrowUp, Copy, Check,
  Award, Layers, Network, Send, UserCheck, Eye, Sparkles, ChevronRight, X,
  Volume2, VolumeX, BriefcaseBusiness, GraduationCap, Trophy, GitBranch, Ellipsis,
  Mail, Phone, MapPin, CalendarDays, ExternalLink, Search, CircleX, MessageSquareText, Server,
  Moon, Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';
const profilePhoto = '/media/Abdulrahman_Abdullah_Al-Sodany_Profile-2026-2.jpg';

const stacks = [
  "Kubernetes & Helm",
  "Docker Containers",
  "Terraform IaC",
  "Python & Bash",
  "GCP & AWS Cloud",
  "Linux & NGINX",
  "CI/CD Pipelines",
  "Prometheus & Grafana",
];

const hardSkillGroups = [
  { title: "Cloud & Infrastructure", icon: Network, skills: ["Google Cloud Platform", "AWS", "Terraform"] },
  { title: "Containers & Orchestration", icon: Layers, skills: ["Docker", "Kubernetes", "Helm"] },
  { title: "Automation & CI/CD", icon: GitBranch, skills: ["Jenkins", "Git", "GitHub", "Bash", "Python"] },
  { title: "Systems & Monitoring", icon: Activity, skills: ["Linux (Ubuntu, Debian, Red Hat)", "VMware", "WSL", "NGINX", "Prometheus", "Grafana"] },
  { title: "Networking", icon: Shield, skills: ["CCNA", "Routing & switching", "Network security", "Network protocols"] },
  { title: "Web Technologies", icon: Code, skills: ["JavaScript", "PHP", "HTML/CSS"] },
];

const softSkills = [
  "Communication",
  "Teamwork & collaboration",
  "Leadership",
  "Project planning",
  "Risk management",
  "Critical thinking",
  "Structured decision-making",
  "Problem-solving",
  "Creative thinking",
  "Adaptability",
  "Resilience",
  "Time management",
  "Stress management",
  "Conflict resolution",
  "Mediation & negotiation",
  "Team building",
  "Organization & role clarity",
  "Presentation skills",
  "Business writing",
];

const softSkillGroups = [
  {
    title: "Communication & teamwork",
    icon: MessageSquareText,
    description: "Working clearly and constructively with people.",
    skills: ["Communication", "Teamwork & collaboration", "Leadership", "Team building", "Conflict resolution", "Mediation & negotiation", "Presentation skills", "Business writing"],
  },
  {
    title: "Planning & ownership",
    icon: BriefcaseBusiness,
    description: "Organizing work and following through.",
    skills: ["Project planning", "Risk management", "Time management", "Organization & role clarity"],
  },
  {
    title: "Thinking & resilience",
    icon: Sparkles,
    description: "Staying thoughtful, flexible, and solution-focused.",
    skills: ["Critical thinking", "Structured decision-making", "Problem-solving", "Creative thinking", "Adaptability", "Resilience", "Stress management"],
  },
];

const certifications = [
  { name: "CCNA", provider: "Cisco Networking Academy", date: "Oct 2024", icon: Network, linkHref: "https://www.credly.com/badges/82579ad1-97ec-4b71-8f8f-6168beec6b19/linked_in_profile" },
  { name: "Fundamentals of DevOps", provider: "KodeKloud", date: "Aug 2025", icon: GitBranch, linkHref: "https://learn.kodekloud.com/learn/certificate/e4b0557e-0a58-4ca9-a766-8676d8c0fedb" },
  { name: "Shell Scripts for Beginners", provider: "KodeKloud", date: "Aug 2025", icon: Terminal, linkHref: "https://learn.kodekloud.com/learn/certificate/4ae4baff-a024-4889-ad57-c0fee132efe3" },
  { name: "Linux Basics Course & Labs", provider: "KodeKloud", date: "Oct 2024", icon: Code, linkHref: "https://learn.kodekloud.com/learn/certificate/546a11b4-748b-498c-8d9c-ded3a54a40e4" },
];

// --- Web Audio API Sound Synthesizer ---
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.ambientVoices = [];
    this.ambientTimer = null;
    this.melodyTimer = null;
  }
  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('Web Audio is not supported by this browser.');
      }
      this.ctx = new AudioContextClass();
    }
  }
  async startAmbient() {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    if (this.ambientVoices.length > 0) return;

    const chordProgression = [
      [130.81, 196, 246.94, 329.63],
      [110, 164.81, 220, 329.63],
      [130.81, 174.61, 220, 293.66],
      [98, 164.81, 196, 293.66],
    ];
    const startTime = this.ctx.currentTime;

    this.ambientVoices = chordProgression[0].map((frequency, index) => {
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.035 : 0.026, startTime + 2.5);
      oscillator.connect(gain);
      gain.connect(this.ctx.destination);
      oscillator.start(startTime);
      return { oscillator, gain };
    });

    const melody = [392, 440, 523.25, 493.88, 440, 392, 329.63, 392];
    const melodyOscillator = this.ctx.createOscillator();
    const melodyGain = this.ctx.createGain();
    melodyOscillator.type = 'sine';
    melodyOscillator.frequency.setValueAtTime(melody[0], startTime);
    melodyGain.gain.setValueAtTime(0.0001, startTime);
    melodyOscillator.connect(melodyGain);
    melodyGain.connect(this.ctx.destination);
    melodyOscillator.start(startTime);
    this.ambientVoices.push({ oscillator: melodyOscillator, gain: melodyGain });

    let melodyIndex = 0;
    this.melodyTimer = window.setInterval(() => {
      melodyIndex = (melodyIndex + 1) % melody.length;
      const noteTime = this.ctx.currentTime;
      melodyOscillator.frequency.setTargetAtTime(melody[melodyIndex], noteTime, 0.08);
      melodyGain.gain.cancelScheduledValues(noteTime);
      melodyGain.gain.setValueAtTime(Math.max(melodyGain.gain.value, 0.0001), noteTime);
      melodyGain.gain.exponentialRampToValueAtTime(0.032, noteTime + 0.16);
      melodyGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);
    }, 2200);

    let chordIndex = 0;
    this.ambientTimer = window.setInterval(() => {
      chordIndex = (chordIndex + 1) % chordProgression.length;
      const changeTime = this.ctx.currentTime;
      this.ambientVoices.forEach(({ oscillator }, index) => {
        oscillator.frequency.setTargetAtTime(chordProgression[chordIndex][index], changeTime, 2.5);
      });
    }, 8000);
  }
  stopAmbient() {
    if (this.ambientTimer !== null) {
      window.clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.melodyTimer !== null) {
      window.clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }

    const stopTime = this.ctx?.currentTime ?? 0;
    this.ambientVoices.forEach(({ oscillator, gain }) => {
      gain.gain.cancelScheduledValues(stopTime);
      gain.gain.setTargetAtTime(0.0001, stopTime, 0.18);
      oscillator.stop(stopTime + 0.8);
    });
    this.ambientVoices = [];
  }
  playBeep(freq = 800, duration = 0.05, type = 'sine') {
    if (this.muted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (error) {
      console.warn('Audio feedback could not be started.', error);
    }
  }
  playSuccess() {
    if (this.muted) return;
    this.playBeep(523.25, 0.08);
    setTimeout(() => this.playBeep(659.25, 0.08), 80);
    setTimeout(() => this.playBeep(783.99, 0.12), 160);
  }
  playGlitch() {
    if (this.muted) return;
    this.playBeep(150, 0.04, 'sawtooth');
    setTimeout(() => this.playBeep(300, 0.04, 'square'), 40);
  }
}

const fx = new SoundFX();

let activeScrollFrame = null;
let restoreScrollBehavior = null;

function cancelPageScroll() {
  if (activeScrollFrame !== null) {
    cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  if (restoreScrollBehavior) {
    const { value, priority } = restoreScrollBehavior;
    if (value) {
      document.documentElement.style.setProperty('scroll-behavior', value, priority);
    } else {
      document.documentElement.style.removeProperty('scroll-behavior');
    }
    restoreScrollBehavior = null;
  }
}

function scrollPageTo(targetY) {
  cancelPageScroll();

  const rootStyle = document.documentElement.style;
  restoreScrollBehavior = {
    value: rootStyle.getPropertyValue('scroll-behavior'),
    priority: rootStyle.getPropertyPriority('scroll-behavior'),
  };
  rootStyle.setProperty('scroll-behavior', 'auto', 'important');

  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(850, Math.max(420, Math.abs(distance) / 8));
  const startTime = performance.now();

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - ((1 - progress) ** 3);
    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      activeScrollFrame = requestAnimationFrame(animate);
    } else {
      activeScrollFrame = null;
      cancelPageScroll();
    }
  };

  activeScrollFrame = requestAnimationFrame(animate);
}

export default function App() {
  // Global States
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [copiedText, setCopiedText] = useState(null);
  const [activeModalDoc, setActiveModalDoc] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem('portfolio-theme') === 'dark',
  );
  const [projectFilter, setProjectFilter] = useState('all');
  const [skillQuery, setSkillQuery] = useState('');
  const [skillView, setSkillView] = useState('technical');
  const [skillCategory, setSkillCategory] = useState('all');
  const stopMatrix = useCallback(() => setMatrixActive(false), []);

  // Sound Toggle Handler
  const toggleAudio = async () => {
    if (audioEnabled) {
      fx.stopAmbient();
      fx.muted = true;
      setAudioEnabled(false);
      setAudioError('');
      return;
    }

    try {
      fx.muted = false;
      await fx.startAmbient();
      setAudioEnabled(true);
      setAudioError('');
    } catch (error) {
      fx.muted = true;
      console.error('Background music could not be started.', error);
      setAudioError('Background music could not be started in this browser.');
    }
  };

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    fx.playBeep(900, 0.05);
    setTimeout(() => setCopiedText(null), 2500);
  };

  useEffect(() => {
    const handleSectionNavigation = (event) => {
      const link = event.target instanceof Element
        ? event.target.closest('a[href^="#"]')
        : null;
      const href = link?.getAttribute('href');
      const target = href && href.length > 1
        ? document.getElementById(href.slice(1))
        : null;

      if (!href || !target) return;

      event.preventDefault();
      if (window.location.hash !== href) {
        window.history.pushState(null, '', href);
      }
      const scrollMarginTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const targetY = window.scrollY + target.getBoundingClientRect().top - scrollMarginTop;
      scrollPageTo(Math.max(0, targetY));
    };
    const cancelOnKeyboardScroll = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement
        && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        cancelPageScroll();
      }
    };

    document.addEventListener('click', handleSectionNavigation);
    document.addEventListener('wheel', cancelPageScroll, { passive: true });
    document.addEventListener('touchstart', cancelPageScroll, { passive: true });
    document.addEventListener('keydown', cancelOnKeyboardScroll);
    return () => {
      document.removeEventListener('click', handleSectionNavigation);
      document.removeEventListener('wheel', cancelPageScroll);
      document.removeEventListener('touchstart', cancelPageScroll);
      document.removeEventListener('keydown', cancelOnKeyboardScroll);
      cancelPageScroll();
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const updateProgress = () => {
      const sections = [...document.querySelectorAll('main section[id]')];
      const currentSections = sections.filter((section) => section.getBoundingClientRect().top <= 250);
      const current = currentSections[currentSections.length - 1];
      setActiveSection(current?.id ?? 'hero');
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [projectFilter]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((section) => {
        section.classList.add('is-visible');
      });
      return undefined;
    }

    const sections = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [projectFilter]);

  const celebrateAward = (event) => {
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 78,
      startVelocity: 34,
      ticks: 180,
      scalar: 0.82,
      origin: {
        x: (buttonBounds.left + buttonBounds.width / 2) / window.innerWidth,
        y: (buttonBounds.top + buttonBounds.height / 2) / window.innerHeight,
      },
      colors: ['#0891b2', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'],
      disableForReducedMotion: false,
    });
  };

  const normalizedSkillQuery = skillQuery.trim().toLowerCase();
  const filteredHardSkillGroups = hardSkillGroups
    .map((group) => ({
      ...group,
      skills: group.skills.filter((skill) => skill.toLowerCase().includes(normalizedSkillQuery)),
    }))
    .filter((group) => group.skills.length > 0)
    .filter((group) => skillCategory === 'all' || group.title === skillCategory);
  const filteredHardSkillCount = filteredHardSkillGroups.reduce((total, group) => total + group.skills.length, 0);
  const hardSkillCount = hardSkillGroups.reduce((total, group) => total + group.skills.length, 0);

  return (
    <div className={`portfolio-theme min-h-screen font-sans text-slate-700 selection:bg-cyan-200 selection:text-slate-900 overflow-x-hidden relative${darkMode ? ' dark-theme' : ''}`}>
      {matrixActive && <MatrixRain onClose={stopMatrix} />}

      <header className="portfolio-header fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <ScrollProgress />
        <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 font-sans font-bold">
              AS
            </div>
            <div>
              <span className="header-brand-name font-sans text-slate-900 font-bold tracking-wide text-sm sm:text-base">ABDULRAHMAN AL-SODANY</span>
              <span className="header-brand-title text-xs font-sans text-cyan-800 block tracking-wide">DEVOPS & CLOUD ENGINEER</span>
            </div>
          </div>

          <nav aria-label="Main navigation" className="portfolio-nav hidden lg:flex items-center space-x-2 text-sm font-sans text-slate-600">
            <a href="#experience" aria-current={activeSection === 'experience' ? 'location' : undefined} className="portfolio-nav-link">Experience</a>
            <a href="#vault" aria-current={activeSection === 'vault' ? 'location' : undefined} className="portfolio-nav-link">Credentials</a>
            <a href="#projects" aria-current={activeSection === 'projects' ? 'location' : undefined} className="portfolio-nav-link">Projects</a>
            <a href="#skills" aria-current={activeSection === 'skills' ? 'location' : undefined} className="portfolio-nav-link">Skills</a>
            <a href="#recognition" aria-current={activeSection === 'recognition' ? 'location' : undefined} className="portfolio-nav-link">Recognition</a>
            <a href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined} className="portfolio-nav-link">Contact</a>
          </nav>

          <div className="flex items-center">
            <MobileSectionMenu activeSection={activeSection} />
            <button
              type="button"
              onClick={() => setDarkMode((isDark) => !isDark)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={darkMode}
              className="theme-mode-toggle mr-2 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={audioEnabled ? 'Stop background music' : 'Play calm background music'}
              aria-pressed={audioEnabled}
              className="mr-3 rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
              title={audioEnabled ? 'Stop background music' : 'Play calm background music'}
            >
              {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            {audioError && <span role="status" className="sr-only">{audioError}</span>}
            <a href="#contact" className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg bg-cyan-800 text-white text-sm font-semibold hover:bg-cyan-900 transition-colors">
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-main w-full max-w-none mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-10 2xl:px-12 space-y-20 relative z-10">

        <section id="hero" className="hero-section relative pt-6 pb-10">
          <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
          <div className="hero-orb hero-orb-violet" aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Bio Info */}
            <div className="hero-copy lg:col-span-7 space-y-6">
              <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-900 text-xs font-semibold">
                <Shield size={14} className="text-cyan-800" />
                <span>CLOUD & DEVOPS ENGINEER</span>
              </div>

              <div>
                <h1 className="hero-title text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-2 leading-tight">
                  ABDULRAHMAN ABDULLAH <br />
                  <span className="hero-name-gradient text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-700">
                    AL-SODANY
                  </span>
                </h1>
                
                <div className="h-10 flex items-center text-lg sm:text-xl font-sans text-slate-600">
                  <TypewriterText />
                  <span className="w-0.5 h-6 bg-cyan-700 ml-1 animate-pulse" />
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                Communications and Electronics Engineering graduate with hands-on experience in cloud infrastructure, Linux administration, containerization, and deployment automation through NTI training and engineering roles. Worked with
                <span className="text-cyan-800 font-semibold"> AWS, GCP, Docker, Kubernetes, and Terraform</span>.
                <strong className="text-slate-900"> First-place winner at DevFest Egypt Hackathon 2024.</strong>
              </p>

              {/* Quick Copy Contact Bar & Socials */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleCopy("abdulrahmanabdalla88@gmail.com", "email")}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-cyan-600 text-xs text-slate-700 hover:text-cyan-800 transition-all flex items-center gap-2 group"
                >
                  <Send size={14} className="text-cyan-800 group-hover:scale-110 transition-transform" />
                  <span>abdulrahmanabdalla88@gmail.com</span>
                  {copiedText === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={12} className="opacity-50 group-hover:opacity-100" />}
                </button>

                <button
                  onClick={() => handleCopy("+201022095896", "phone")}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-600 text-xs text-slate-700 hover:text-emerald-800 transition-all flex items-center gap-2 group"
                >
                  <span>+20 102 209 5896</span>
                  {copiedText === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={12} className="opacity-50 group-hover:opacity-100" />}
                </button>

                <div className="flex items-center space-x-2 pl-2">
                  <a
                    href="https://github.com/arabdalla88" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hero-social-link hero-social-github p-2 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 hover:scale-105 transition-all"
                    title="GitHub Repository"
                  >
                    <GitBranch size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdulrahman-abdullah10/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hero-social-link hero-social-linkedin p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:scale-105 transition-all"
                    title="LinkedIn Profile"
                  >
                    <UserCheck size={16} />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#vault"
                  onClick={() => fx.playBeep(700, 0.05)}
                  className="px-6 py-3 rounded-lg bg-cyan-800 text-white font-semibold text-sm hover:bg-cyan-900 transition-all flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>View resume & credentials</span>
                </a>

                <a
                  href="/media/Abdulrahman_Abdullah_Al-Sodany_CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-violet-900 transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-100"
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </a>

                <button
                  onClick={() => { setTerminalOpen(true); fx.playBeep(900, 0.05); }}
                  className="px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-cyan-600 transition-all flex items-center gap-2"
                >
                  <Terminal size={16} />
                  <span>Explore interactive CLI</span>
                </button>
              </div>

              <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <StatCard icon={Layers} value="04" label="Selected projects" tone="cyan" />
                <StatCard icon={BriefcaseBusiness} value="03" label="Career experiences" tone="violet" />
                <StatCard icon={GraduationCap} value="04" label="Certifications" tone="emerald" />
                <StatCard icon={Trophy} value="1st" label="DevFest Egypt 2024" tone="amber" />
              </div>
            </div>

            {/* Profile photo */}
            <div className="hero-photo-wrap lg:col-span-5 flex justify-center relative">
              <div className="hero-photo-decoration" aria-hidden="true" />
              <div className="hero-photo-badge">
                <Trophy size={15} aria-hidden="true" />
                <span>DevFest Egypt 2024 <strong>1st place</strong></span>
              </div>
              <div className="hero-photo-card w-72 sm:w-80">
                <div className="hero-photo-image-frame">
                  <img
                    src={profilePhoto}
                    alt="Abdulrahman Abdullah Al-Sodany"
                    className="hero-photo-image"
                    fetchPriority="high"
                  />
                  <div className="hero-photo-caption">
                    <span className="hero-photo-caption-icon"><Code size={17} aria-hidden="true" /></span>
                    <span>
                      <small>FOCUS AREA</small>
                      <strong>Cloud & DevOps Engineering</strong>
                    </span>
                  </div>
                </div>
                <div className="hero-photo-footer">
                  <span><span className="hero-availability-dot" /> Open to opportunities</span>
                  <span><MapPin size={13} aria-hidden="true" /> Egypt</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="experience" className="portfolio-section space-y-6 scroll-mt-24">
          <SectionHeading
            icon={BriefcaseBusiness}
            eyebrow="Where I have made an impact"
            title="Professional Experience"
            detail="Cloud, DevOps & Networking"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <article className="experience-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <div className="experience-card-topline">
                  <p className="experience-meta"><CalendarDays size={13} /> Oct 2026 – Present</p>
                  <span className="experience-role-icon experience-role-icon-cloud"><Layers size={18} /></span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Cloud DevOps Engineer Trainee</h3>
                <p className="experience-company"><BriefcaseBusiness size={14} /> National Telecommunication Institute (NTI)</p>
                <p className="experience-location"><MapPin size={12} /> New Capital, Egypt</p>
              </div>
              <div className="experience-highlights">
                <p><span><Terminal size={14} /></span> Administer Linux environments and automate infrastructure tasks with Bash and Python.</p>
                <p><span><Layers size={14} /></span> Build and deploy containerized applications using Docker and Kubernetes.</p>
                <p><span><GitBranch size={14} /></span> Provision AWS resources with Terraform and implement automated CI/CD workflows.</p>
              </div>
            </article>

            <article className="experience-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <div className="experience-card-topline">
                  <p className="experience-meta"><CalendarDays size={13} /> Sep 2025 – Jan 2026</p>
                  <span className="experience-role-icon experience-role-icon-systems"><Server size={18} /></span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">DevOps Engineer</h3>
                <p className="experience-company"><BriefcaseBusiness size={14} /> Soft Forte</p>
                <p className="experience-location"><MapPin size={12} /> Cairo, Egypt</p>
              </div>
              <div className="experience-highlights">
                <p><span><Server size={14} /></span> Configured Linux and NGINX servers and automated routine administration with Bash and Python.</p>
                <p><span><GitBranch size={14} /></span> Applied Docker for portable container deployments and collaborated on source control using Git and GitHub.</p>
              </div>
            </article>

            <article className="experience-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <div className="experience-card-topline">
                  <p className="experience-meta"><CalendarDays size={13} /> Jul 2024 – Sep 2024</p>
                  <span className="experience-role-icon experience-role-icon-network"><Network size={18} /></span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Network Engineer</h3>
                <p className="experience-company"><BriefcaseBusiness size={14} /> Telecom Egypt (WE)</p>
                <p className="experience-location"><MapPin size={12} /> Mansoura, Egypt</p>
              </div>
              <div className="experience-highlights">
                <p><span><Network size={14} /></span> Designed and simulated network topologies using Cisco Packet Tracer and CCNA concepts.</p>
                <p><span><Shield size={14} /></span> Configured routing, switching, basic network security, and Linux command-line tools.</p>
              </div>
            </article>
          </div>

          <div className="education-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="education-kicker"><GraduationCap size={15} /> Education · Mansoura, Egypt</p>
              <h3 className="mt-1 text-base font-bold text-slate-900">B.Sc. in Communications & Electronics Engineering</h3>
              <p className="text-sm text-slate-600">Delta Higher Institute for Engineering & Technology · 2021–2026</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-900">GPA 3.01</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">Graduation project: Excellent</span>
            </div>
          </div>
        </section>

        <section id="vault" className="portfolio-section credentials-section space-y-6 scroll-mt-24">
          <SectionHeading
            icon={Shield}
            eyebrow="Documents & qualifications"
            title="Resume & Credentials"
          />

          <p className="text-sm text-slate-600 font-sans">
            Browse the resume and available credential summaries. Only documents supplied with the portfolio can be downloaded.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Official CV */}
            <VaultCard
              title="Official Curriculum Vitae"
              filename="Abdulrahman_Abdullah_Al-Sodany_CV.pdf"
              fileType="PDF Document (2 Pages)"
              date="2026 Edition"
              downloadHref="/media/Abdulrahman_Abdullah_Al-Sodany_CV.pdf"
              badge="VERIFIED RESUME"
              badgeColor="cyan"
              onPreview={() => setActiveModalDoc({
                title: "Official Curriculum Vitae",
                subtitle: "Abdulrahman Abdullah Al-Sodany - DevOps Engineer",
                type: "cv",
                previewUrl: "/media/Abdulrahman_Abdullah_Al-Sodany_CV.pdf"
              })}
            />

            {/* Card 2: Cover Letter */}
            <VaultCard
              title="Professional Cover Letter"
              filename="Abdulrahman_Abdullah_Al-Sodany_Cover-Letter.pdf"
              fileType="PDF Document"
              date="2026 Edition"
              downloadHref="/media/Abdulrahman_Abdullah_Al-Sodany_Cover-Letter.pdf"
              badge="LETTER OF INTENT"
              badgeColor="emerald"
              onPreview={() => setActiveModalDoc({
                title: "Professional Cover Letter",
                subtitle: "DevOps & Infrastructure Engineer Application",
                type: "cover",
                previewUrl: "/media/Abdulrahman_Abdullah_Al-Sodany_Cover-Letter.pdf"
              })}
            />

            {/* Card 3: Engineering Degree Certificate */}
            <VaultCard
              title="B.Sc. Engineering Degree Certificate"
              filename="Abdulrahman_Abdullah_Al-Sodany_Degree-Certificate.jpeg"
              fileType="Official Academic Certificate (Image)"
              date="2026"
              downloadHref="/media/Abdulrahman_Abdullah_Al-Sodany_Degree-Certificate.jpeg"
              badge="VERY GOOD (GPA 3.01)"
              badgeColor="yellow"
              onPreview={() => setActiveModalDoc({
                title: "B.Sc. Communications & Electronics Engineering",
                subtitle: "Delta Higher Institute for Engineering & Technology | Project Grade: Excellent",
                type: "degree",
                previewUrl: "/media/Abdulrahman_Abdullah_Al-Sodany_Degree-Certificate.jpeg"
              })}
            />

          </div>
        </section>

        <section id="projects" className="portfolio-section space-y-6 scroll-mt-24">
          <SectionHeading
            icon={Layers}
            eyebrow="Things I have built"
            title="Selected Projects"
            detail="Cloud · DevOps · IoT"
          />

          <div className="project-filters" role="group" aria-label="Filter projects">
            {[
              { id: 'all', label: 'All projects', count: 4, icon: Layers },
              { id: 'cloud', label: 'Cloud & DevOps', count: 3, icon: Network },
              { id: 'iot', label: 'IoT', count: 1, icon: Activity },
            ].map(({ id, label, count, icon: FilterIcon }) => (
              <button
                type="button"
                key={id}
                className="project-filter-button"
                aria-pressed={projectFilter === id}
                onClick={() => setProjectFilter(id)}
              >
                <FilterIcon size={15} aria-hidden="true" />
                {label}
                <span>{count}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project 1: Sky Config Platform (DevFest 1st Place) */}
            {projectFilter !== 'iot' && <ProjectCard
              title="Sky Config Platform"
              category="AI & Cloud Brokerage Platform"
              award="1st Place Winner · DevFest Egypt Hackathon 2024"
              description="AI-driven cloud brokerage platform featuring an intelligent chatbot matching SMBs with optimal global cloud providers based on cost, compliance, and performance."
              tags={["GCP", "Python", "AI Agents", "Docker", "Nginx", "Kubernetes"]}
              resourceHref="https://github.com/arabdalla88/Sky-Config-Platform-Cloud-Assistant-"
              resourceLabel="View on GitHub"
              onOpenTopology={() => setActiveModalProject({
                name: "Sky Config Platform",
                award: "1st Place Winner - DevFest Egypt Hackathon 2024",
                nodes: [
                  { id: "user", label: "SMB User Interface", sub: "React & Tailwind" },
                  { id: "gateway", label: "API Gateway", sub: "NGINX Reverse Proxy" },
                  { id: "ai", label: "AI Matching Broker", sub: "Python LLM Engine" },
                  { id: "cloud", label: "Cloud Multi-Provider API", sub: "AWS / GCP / Azure Specs" },
                  { id: "db", label: "Telemetry DB", sub: "PostgreSQL & Redis" }
                ]
              })}
            />}

            {/* Project 2: Limix - IoT Smart Aquaculture */}
            {projectFilter !== 'cloud' && <ProjectCard
              title="Limix - IoT Smart Aquaculture Platform"
              category="Cloud-Managed IoT & SRE Infrastructure"
              award="Graduation Project Grade: Excellent"
              description="Developed backend services, containerized components using Docker, and engineered real-time telemetry handling pipelines for IoT water parameters."
              tags={["Python Flask", "Docker", "Firebase", "IoT Telemetry", "Grafana"]}
              resourceHref="https://github.com/arabdalla88/Limix-IoT-based-Smart-Aquaculture-Management-System"
              resourceLabel="View on GitHub"
              onOpenTopology={() => setActiveModalProject({
                name: "Limix - IoT Smart Aquaculture Platform",
                award: "Graduation Project Grade: Excellent",
                nodes: [
                  { id: "sensors", label: "Aquaculture Sensors", sub: "IoT Nodes (ESP32)" },
                  { id: "broker", label: "MQTT / HTTP Ingress", sub: "Flask Backend" },
                  { id: "firebase", label: "Realtime Telemetry DB", sub: "Firebase Cloud" },
                  { id: "k8s", label: "Containerized Engine", sub: "Docker Microservices" },
                  { id: "grafana", label: "Observability Dashboard", sub: "Prometheus + Grafana" }
                ]
              })}
            />}

            {/* Project 3: Ghaymah SRE Technical Assessment */}
            {projectFilter !== 'iot' && <ProjectCard
              title="Ghaymah SRE Reliability Assessment"
              category="Cloud Infrastructure & SRE"
              award="End-to-End Reliability Engineering"
              description="Architected SRE solutions covering cloud resource sizing, auto-scaling, Prometheus alerting rules, CI/CD pipeline automation, and post-mortem frameworks."
              tags={["Terraform", "Kubernetes", "Prometheus", "Helm", "CI/CD", "AWS"]}
              resourceHref="https://app.gitpasha.com/ar_abdullah/ghaymah-exam-Abdulrahman-Abdullah-Farag-SRE"
              resourceLabel="View project"
              onOpenTopology={() => setActiveModalProject({
                name: "Ghaymah SRE Technical Assessment",
                award: "Cloud Reliability & Monitoring Architecture",
                nodes: [
                  { id: "tf", label: "IaC Provisioning", sub: "Terraform Modules" },
                  { id: "k8s", label: "Production EKS Cluster", sub: "Auto-scaling Pods" },
                  { id: "ingress", label: "Ingress Controller", sub: "NGINX Load Balancer" },
                  { id: "prom", label: "Alertmanager & Metrics", sub: "Prometheus Monitoring" },
                  { id: "graf", label: "Grafana Dashboards", sub: "Real-time Telemetry" }
                ]
              })}
            />}

            {/* Project 4: WarshaTech */}
            {projectFilter !== 'iot' && <ProjectCard
              title="WarshaTech - Industrial B2B Platform"
              category="Cloud GCP Deployment"
              award="Industrial Marketplace Infrastructure"
              description="Built and integrated backend APIs and managed end-to-end cloud deployment on Google Cloud Platform with automated CD pipelines."
              tags={["GCP", "Google Cloud APIs", "Docker", "Git/GitHub", "Nginx"]}
              resourceHref="https://github.com/arabdalla88/WarshaTech-Industrial-B2B-Marketplace-Platform"
              resourceLabel="View on GitHub"
              onOpenTopology={() => setActiveModalProject({
                name: "WarshaTech Industrial B2B Platform",
                award: "GCP Cloud Infrastructure Deployment",
                nodes: [
                  { id: "client", label: "B2B Clients", sub: "Web App" },
                  { id: "gcp", label: "Google Cloud Platform", sub: "Compute Engine VM" },
                  { id: "api", label: "Backend API Engine", sub: "REST Microservices" },
                  { id: "storage", label: "Cloud SQL & Bucket", sub: "GCP Managed DB" }
                ]
              })}
            />}

          </div>
        </section>

        <section id="skills" className="portfolio-section skills-section space-y-7 scroll-mt-24">
          <SectionHeading
            icon={Network}
            eyebrow="What I bring to the team"
            title="Skills & Expertise"
            detail="Engineering skills and the people skills that help teams deliver."
          />

          <div className="skills-workspace">
            <div className="skills-workspace-top">
              <div>
                <p className="skills-workspace-kicker">Explore my toolkit</p>
                <h3 className="skills-workspace-title">A closer look at what I do</h3>
              </div>
              <div className="skills-view-tabs" role="tablist" aria-label="Skill categories">
                <button
                  type="button"
                  role="tab"
                  id="skills-tab-technical"
                  aria-selected={skillView === 'technical'}
                  aria-controls="skills-view-panel"
                  className="skills-view-tab"
                  onClick={() => setSkillView('technical')}
                >
                  <Code size={16} /> Technical <span>{hardSkillCount}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  id="skills-tab-people"
                  aria-selected={skillView === 'people'}
                  aria-controls="skills-view-panel"
                  className="skills-view-tab"
                  onClick={() => setSkillView('people')}
                >
                  <UserCheck size={16} /> Soft <span>{softSkills.length}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  id="skills-tab-learning"
                  aria-selected={skillView === 'learning'}
                  aria-controls="skills-view-panel"
                  className="skills-view-tab"
                  onClick={() => setSkillView('learning')}
                >
                  <Award size={16} /> Learning <span>{certifications.length + 2}</span>
                </button>
              </div>
            </div>

            <div
              className="skills-view-panel"
              id="skills-view-panel"
              role="tabpanel"
              aria-labelledby={`skills-tab-${skillView === 'technical' ? 'technical' : skillView === 'people' ? 'people' : 'learning'}`}
              key={skillView}
            >
              {skillView === 'technical' && (
                <div className="technical-explorer">
                  <aside className="skill-category-rail" aria-label="Filter technical skills by category">
                    <p className="skill-rail-label">Browse by area</p>
                    <button
                      type="button"
                      className="skill-category-button"
                      aria-pressed={skillCategory === 'all'}
                      onClick={() => setSkillCategory('all')}
                    >
                      <span className="skill-category-icon"><Layers size={15} /></span>
                      <span>All technologies</span>
                      <small>{hardSkillCount}</small>
                    </button>
                    {hardSkillGroups.map((group) => {
                      const CategoryIcon = group.icon;
                      return (
                        <button
                          type="button"
                          className="skill-category-button"
                          key={group.title}
                          aria-pressed={skillCategory === group.title}
                          onClick={() => setSkillCategory(group.title)}
                        >
                          <span className="skill-category-icon"><CategoryIcon size={15} /></span>
                          <span>{group.title}</span>
                          <small>{group.skills.length}</small>
                        </button>
                      );
                    })}
                  </aside>

                  <div className="technical-catalog">
                    <div className="technical-catalog-heading">
                      <div>
                        <p className="skills-workspace-kicker">
                          {skillCategory === 'all' ? 'Technology directory' : skillCategory}
                        </p>
                        <h4>{skillCategory === 'all' ? 'Technical skills' : 'Tools & technologies'}</h4>
                      </div>
                      <span className="technical-results-count" aria-live="polite">
                        {filteredHardSkillCount} {normalizedSkillQuery ? 'matches' : 'technologies'}
                      </span>
                    </div>
                    <label className="skill-search">
                      <Search size={16} aria-hidden="true" />
                      <input
                        type="search"
                        value={skillQuery}
                        onChange={(event) => setSkillQuery(event.target.value)}
                        placeholder="Search technologies..."
                        aria-label="Search technical skills"
                      />
                      {skillQuery && (
                        <button type="button" onClick={() => setSkillQuery('')} aria-label="Clear skill search">
                          <CircleX size={16} />
                        </button>
                      )}
                    </label>
                    {filteredHardSkillGroups.map((group) => (
                      <div className="technical-category-block" key={group.title}>
                        {skillCategory === 'all' && (
                          <h5><group.icon size={15} /> {group.title}</h5>
                        )}
                        <div className="technical-skill-grid">
                          {group.skills.map((skill, index) => (
                            <div
                              className="technical-skill-tile"
                              key={skill}
                              style={{ "--skill-delay": `${index * 45}ms` }}
                            >
                              <span className="technical-skill-tile-icon"><group.icon size={16} /></span>
                              <span>{skill}</span>
                              <ChevronRight size={14} className="technical-skill-arrow" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {filteredHardSkillGroups.length === 0 && (
                      <p className="skill-search-empty" role="status">No technical skills match “{skillQuery}”. Try another term.</p>
                    )}
                  </div>
                </div>
              )}

              {skillView === 'people' && (
                <div className="people-skills-view">
                  <div className="people-skills-intro">
                    <span className="people-intro-icon"><UserCheck size={22} /></span>
                    <div>
                      <p className="skills-workspace-kicker">Beyond the tools</p>
                      <h4>How I work with people</h4>
                      <p>Good engineering is a team effort. These are the strengths I bring to one.</p>
                    </div>
                  </div>
                  <div className="people-skill-groups">
                    {softSkillGroups.map((group, index) => {
                      const GroupIcon = group.icon;
                      return (
                        <article
                          className="people-skill-group"
                          key={group.title}
                          style={{ "--group-delay": `${index * 100}ms` }}
                        >
                          <span className="people-group-icon"><GroupIcon size={18} /></span>
                          <h4>{group.title}</h4>
                          <p>{group.description}</p>
                          <ul>
                            {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                          </ul>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {skillView === 'learning' && (
                <div className="learning-view">
                  <div className="learning-intro">
                    <span className="people-intro-icon"><Award size={22} /></span>
                    <div>
                      <p className="skills-workspace-kicker">Continuous learning</p>
                      <h4>Certifications & languages</h4>
                      <p>Formal training alongside a growing toolkit.</p>
                    </div>
                  </div>
                  <div className="learning-content">
                    <div className="certification-list">
                      {certifications.map((certification) => {
                        const CertificationIcon = certification.icon;
                        return (
                          <div className="certification-row" key={certification.name}>
                            <span className="certification-icon"><CertificationIcon size={17} /></span>
                            <span className="certification-details">
                              <strong>{certification.name}</strong>
                              <small>{certification.provider}</small>
                            </span>
                            <span className="certification-date">{certification.date}</span>
                            {certification.linkHref ? (
                              <a
                                className="certification-link"
                                href={certification.linkHref}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${certification.name} certificate`}
                              >
                                <ExternalLink size={13} /> Certificate
                              </a>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                    <div className="language-panel">
                      <p className="skills-workspace-kicker">Languages</p>
                      <div className="language-level">
                        <span className="language-monogram">ع</span>
                        <span><strong>Arabic</strong><small>Native</small></span>
                      </div>
                      <div className="language-level">
                        <span className="language-monogram language-monogram-en">EN</span>
                        <span><strong>English</strong><small>Intermediate · B1</small></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="recognition" className="portfolio-section space-y-6 scroll-mt-24">
          <SectionHeading
            icon={Award}
            eyebrow="Milestones & mentorship"
            title="Recognition & Community"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="recognition-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <p className="recognition-meta"><Trophy size={13} /> Award · 2024</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">1st Place — DevFest Egypt Hackathon</h3>
              <p className="mt-2 text-sm text-slate-600">Recognized for the Sky Config Platform, an AI-assisted cloud brokerage concept.</p>
              <button
                type="button"
                onClick={celebrateAward}
                className="celebrate-button mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Sparkles size={16} /> Celebrate the win
              </button>
            </article>
            <article className="recognition-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Oct 2022 – Jun 2026 · Mansoura, Egypt</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Technical Mentor & Instructor</h3>
              <p className="text-sm font-medium text-slate-600">iHOW Community</p>
              <p className="mt-2 text-sm text-slate-600">Mentored and instructed community members in technical topics.</p>
            </article>
          </div>
        </section>

        {/* SECTION 7: SECURE DISPATCH CONTACT CENTER */}
        <section id="contact" className="portfolio-section contact-section space-y-6 scroll-mt-24">
          <SectionHeading
            icon={Send}
            eyebrow="Let's build something reliable"
            title="Get in touch"
            detail="Cairo · New Capital · Remote"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="contact-info-card reveal-on-scroll">
                <div className="contact-info-heading">
                  <span className="contact-info-icon"><Send size={18} /></span>
                  <div>
                    <p className="contact-eyebrow">Available for opportunities</p>
                    <h3 className="font-bold text-slate-900 text-base">Direct communication</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Available for full-time Cloud DevOps Engineer roles, SRE reliability positions, and high-impact infrastructure consulting in Cairo, New Capital, or Remote global setups.
                </p>

                <div className="contact-channel-list">
                  <a href="mailto:abdulrahmanabdalla88@gmail.com" className="contact-channel">
                    <span className="contact-channel-icon"><Mail size={16} /></span>
                    <span><small>Email</small><strong>abdulrahmanabdalla88@gmail.com</strong></span>
                    <ExternalLink size={14} className="contact-channel-arrow" />
                  </a>
                  <a href="tel:+201022095896" className="contact-channel">
                    <span className="contact-channel-icon"><Phone size={16} /></span>
                    <span><small>Phone / WhatsApp</small><strong>+20 102 209 5896</strong></span>
                    <ExternalLink size={14} className="contact-channel-arrow" />
                  </a>
                  <div className="contact-channel">
                    <span className="contact-channel-icon"><MapPin size={16} /></span>
                    <span><small>Location</small><strong>Cairo & New Capital, Egypt</strong></span>
                  </div>
                </div>
                <div className="contact-social-links">
                  <a href="https://github.com/arabdalla88" target="_blank" rel="noreferrer"><GitBranch size={15} /> GitHub</a>
                  <a href="https://www.linkedin.com/in/abdulrahman-abdullah10/" target="_blank" rel="noreferrer"><UserCheck size={15} /> LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              <ContactDispatchForm />
            </div>
          </div>
        </section>

      </main>

      {/* Floating Rocket Back-to-Top Button */}
      <RocketButton />

      <footer className="portfolio-footer border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Abdulrahman Abdullah Al-Sodany</div>
          <div>DevOps & Cloud Engineering Portfolio</div>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* 1. Terminal Sandbox Modal */}
      {terminalOpen && (
        <TerminalModal 
          onClose={() => setTerminalOpen(false)} 
          onTriggerMatrix={(command) => {
            setTerminalOpen(false);
            setMatrixActive((active) => (
              command === 'matrix off' ? false : command === 'matrix on' ? true : !active
            ));
          }}
        />
      )}

      {/* 2. Document Preview Modal */}
      {activeModalDoc && (
        <DocumentViewerModal 
          doc={activeModalDoc} 
          onClose={() => setActiveModalDoc(null)} 
        />
      )}

      {/* 3. Project Architecture Topology Modal */}
      {activeModalProject && (
        <ProjectTopologyModal 
          project={activeModalProject} 
          onClose={() => setActiveModalProject(null)} 
        />
      )}

    </div>
  );
}

// --- SUB-COMPONENTS ---

function TypewriterText() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [typeText, setTypeText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = stacks[typeIndex % stacks.length];
    if (!isDeleting && typeText === currentWord) {
      const pause = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(pause);
    }

    if (isDeleting && typeText === '') {
      const nextWord = setTimeout(() => {
        setIsDeleting(false);
        setTypeIndex((previous) => previous + 1);
      }, 180);
      return () => clearTimeout(nextWord);
    }

    const typing = setTimeout(() => {
      setTypeText((current) => (
        isDeleting ? current.slice(0, -1) : currentWord.slice(0, current.length + 1)
      ));
    }, isDeleting ? 35 : 60);
    return () => clearTimeout(typing);
  }, [typeText, isDeleting, typeIndex]);

  return <span className="text-cyan-800 font-semibold">{typeText}</span>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      style={{ width: `${progress}%` }}
    />
  );
}

const MobileSectionMenu = React.memo(function MobileSectionMenu({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const closeOnOutsidePointer = (event) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnDesktopResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    window.addEventListener('resize', closeOnDesktopResize);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      window.removeEventListener('resize', closeOnDesktopResize);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="mobile-menu-control lg:hidden" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close section menu' : 'Open section menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-section-navigation"
        className="mobile-menu-toggle mr-2 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
      >
        {isOpen ? <X size={19} /> : <Ellipsis size={20} />}
      </button>
      {isOpen && (
        <nav id="mobile-section-navigation" aria-label="Section navigation" className="portfolio-mobile-nav">
          <a href="#experience" aria-current={activeSection === 'experience' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><BriefcaseBusiness size={16} /> Experience</a>
          <a href="#vault" aria-current={activeSection === 'vault' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><Shield size={16} /> Credentials</a>
          <a href="#projects" aria-current={activeSection === 'projects' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><Layers size={16} /> Projects</a>
          <a href="#skills" aria-current={activeSection === 'skills' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><Code size={16} /> Skills</a>
          <a href="#recognition" aria-current={activeSection === 'recognition' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><Trophy size={16} /> Recognition</a>
          <a href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined} className="portfolio-nav-link" onClick={closeMenu}><Send size={16} /> Contact</a>
        </nav>
      )}
    </div>
  );
});

function StatCard({ icon: Icon, value, label, tone }) {
  return (
    <div className={`stat-card stat-${tone} rounded-xl border bg-white/80 p-3 shadow-sm backdrop-blur`}>
      <Icon size={17} aria-hidden="true" />
      <div className="stat-value mt-2 text-xl font-extrabold leading-none text-slate-900">{value}</div>
      <div className="stat-label mt-1 text-[10px] font-medium leading-tight text-slate-500">{label}</div>
    </div>
  );
}

function SectionHeading({ icon: Icon, eyebrow, title, detail }) {
  return (
    <div className="section-heading">
      <div className="section-heading-title">
        <span className="section-heading-icon"><Icon size={20} aria-hidden="true" /></span>
        <div>
          <p className="section-heading-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {detail && <p className="section-heading-detail">{detail}</p>}
    </div>
  );
}

// 1. Vault Card Component
function VaultCard({ title, filename, fileType, date, downloadHref, badge, badgeColor, onPreview }) {
  return (
    <div className="credential-card reveal-on-scroll p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between space-y-4 relative group shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`credential-badge badge-${badgeColor} px-2.5 py-1 rounded-full text-[10px] font-semibold border`}>
            {badge}
          </span>
          <FileText size={16} className="text-slate-400" aria-hidden="true" />
        </div>

        <h3 className="font-bold text-slate-900 text-sm group-hover:text-cyan-800 transition-colors">
          {title}
        </h3>
        <p className="credential-filename text-[11px] text-slate-500 font-mono">{filename}</p>
      </div>

      <div className="pt-2 border-t border-slate-200 space-y-3">
        <div className="credential-meta flex justify-between items-center text-[10px] text-slate-500">
          <span>{fileType}</span>
          <span className="credential-date">{date}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { fx.playBeep(800, 0.05); onPreview(); }}
            className="credential-preview px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-1"
          >
            <Eye size={12} /> Preview
          </button>
          {downloadHref ? (
            <a
              href={downloadHref}
              download
              onClick={() => fx.playSuccess()}
              className="credential-download px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
            >
              <Download size={12} /> Download
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="The source document was not included in the portfolio files."
              className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold cursor-not-allowed flex items-center justify-center gap-1"
            >
              <Download size={12} /> Not attached
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 2. Project Card Component
function ProjectCard({ title, category, award, description, tags, resourceHref, resourceLabel, onOpenTopology }) {
  return (
    <div className="project-card reveal-on-scroll p-6 rounded-2xl bg-white border border-slate-200 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-sm">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <span className="project-category"><Layers size={14} /> {category}</span>
          <button 
            onClick={() => { fx.playBeep(750, 0.05); onOpenTopology(); }}
            className="topology-button text-xs px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-900 hover:bg-cyan-100 flex items-center gap-1 transition-colors"
          >
            <Network size={13} /> Explore architecture <ChevronRight size={13} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-800 transition-colors">
          {title}
        </h3>

        {award && (
          <div className="project-award p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            {award.includes('1st Place') ? <Trophy size={14} /> : <Sparkles size={14} />} {award}
          </div>
        )}

        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          {description}
        </p>
      </div>

      <div className="project-tags pt-4 border-t border-slate-200 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] text-slate-700">
              {tag}
            </span>
          ))}
        </div>
        {resourceHref ? (
          <a className="project-resource-link" href={resourceHref} target="_blank" rel="noreferrer">
            <ExternalLink size={13} /> {resourceLabel || "View project"}
          </a>
        ) : resourceLabel ? (
          <span className="project-resource-placeholder">
            <ExternalLink size={13} /> {resourceLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

// 3. CLI Terminal Sandbox Modal Component
function TerminalModal({ onClose, onTriggerMatrix }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'ABDULRAHMAN DEVOPS CLI v2.4.0 [x86_64-pc-linux-gnu]' },
    { type: 'output', text: 'Type "help" for available commands.' }
  ]);
  const bottomRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: `$ ${input}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', text: 'Commands: whoami, skills, projects, cat cv.pdf, matrix [on|off], clear, sudo rm -rf /, contact' });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', text: 'Abdulrahman Abdullah Al-Sodany | Cloud DevOps Engineer | B.Sc. Engineer (GPA 3.01) | Cairo & New Capital' });
          break;
        case 'skills':
          newHistory.push({ type: 'output', text: 'Kubernetes [██████████ 95%] | Docker [██████████ 95%] | Terraform [█████████░ 90%] | GCP/AWS [████████░░ 85%]' });
          break;
        case 'projects':
          newHistory.push({ type: 'output', text: '1. Sky Config Platform (DevFest Winner) | 2. Limix IoT Platform | 3. Ghaymah SRE Reliability Spec' });
          break;
        case 'cat cv.pdf':
          newHistory.push({ type: 'output', text: 'Opening secure vault viewer...' });
          break;
        case 'matrix':
        case 'matrix on':
        case 'matrix off':
          onTriggerMatrix(cmd);
          return;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'sudo rm -rf /':
          newHistory.push({ type: 'error', text: 'ACCESS DENIED: Kernel protection active. Permission denied.' });
          break;
        case 'contact':
          newHistory.push({ type: 'output', text: 'Email: abdulrahmanabdalla88@gmail.com | Phone: +20 102 209 5896' });
          break;
        default:
          if (cmd !== '') {
            newHistory.push({ type: 'error', text: `command not found: ${cmd}. Type "help" for assistance.` });
          }
      }

      setHistory(newHistory);
      setInput('');
      fx.playBeep(950, 0.03);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[500px] rounded-lg bg-[#050811] border border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden font-mono text-xs">
        
        {/* Terminal Title Bar */}
        <div className="bg-[#0a0f1d] px-4 py-2 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-gray-400 font-bold ml-2">bash - abdulrahman@devops-cluster:~</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {history.map((h, i) => (
            <div key={i} className={h.type === 'error' ? 'text-red-400' : h.type === 'input' ? 'text-cyan-400 font-bold' : 'text-gray-300'}>
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Row */}
        <div className="p-3 border-t border-cyan-500/30 bg-[#0a0f1d] flex items-center space-x-2">
          <span className="text-emerald-400 font-bold">abdulrahman@node:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent outline-none text-cyan-300 font-mono"
            placeholder="Type command (e.g. help, whoami, matrix)..."
          />
        </div>
      </div>
    </div>
  );
}

// 6. Matrix Rain Background Component
function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Matrix background canvas is not supported by this browser.');
    }

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZKUBERNETESDEVOPS';
    let columns = [];
    let fontSize = 14;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrameTime = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      fontSize = Math.max(12, Math.min(18, width * 0.012));
      canvas.width = Math.ceil(width * pixelRatio);
      canvas.height = Math.ceil(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      columns = Array.from({ length: Math.ceil(width / fontSize) }, () => (
        Math.random() * (height / fontSize)
      ));
    };

    const draw = (time) => {
      if (time - lastFrameTime < 45) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = time;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      columns.forEach((drop, index) => {
        const x = index * fontSize + fontSize / 2;
        const headY = drop * fontSize;
        for (let trail = 5; trail >= 0; trail -= 1) {
          const y = headY - trail * fontSize;
          if (y < 0 || y > height) continue;
          ctx.globalAlpha = trail === 0 ? 0.72 : (0.25 / trail);
          ctx.fillStyle = trail === 0 ? '#a7f3d0' : '#00c878';
          ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), x, y);
        }

        columns[index] += 0.45 + Math.random() * 0.9;
        if (headY > height && Math.random() > 0.975) columns[index] = 0;
      });
      ctx.globalAlpha = 1;
      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const stopOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    resize();
    frameId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', stopOnEscape);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', stopOnEscape);
    };
  }, [onClose]);

  return <canvas ref={canvasRef} className="matrix-rain-background" aria-hidden="true" />;
}

// 7. Document Viewer Modal
function DocumentViewerModal({ doc, onClose }) {
  return (
    <div className="portfolio-modal fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="document-viewer-panel w-full max-w-2xl p-6 space-y-4 text-xs font-mono relative">
        <div className="flex justify-between items-start border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">{doc.title}</h3>
            <p className="document-modal-subtitle">{doc.subtitle}</p>
          </div>
          <button type="button" aria-label="Close document preview" onClick={onClose} className="modal-close-button">
            <X size={18} />
          </button>
        </div>

        <div className={`document-modal-content p-4 rounded-xl border border-slate-200 space-y-3 font-sans leading-relaxed ${doc.previewUrl ? 'document-preview-content' : 'max-h-[350px] overflow-y-auto'}`}>
          {doc.previewUrl ? (
            doc.previewUrl.toLowerCase().endsWith('.pdf') ? (
              <iframe
                src={doc.previewUrl}
                title={doc.title}
                className="document-preview-pdf"
              />
            ) : (
              <img src={doc.previewUrl} alt={doc.title} className="document-preview-image" />
            )
          ) : (
            <>
          {doc.type === 'cv' && (
            <div>
              <h4 className="font-bold text-slate-900 mb-2 text-sm">Professional Summary</h4>
              <p>Cloud & DevOps Engineer with a B.Sc. in Communications & Electronics Engineering (GPA 3.01). Hands-on experience in Linux administration, Docker, NGINX, Git/GitHub, GCP, AWS, Bash, and Python.</p>
              
              <h4 className="font-bold text-slate-900 mt-4 mb-2 text-sm">Experience</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>NTI — Cloud DevOps Engineer Trainee (Oct 2026–Present): Linux/Bash/Python automation, Docker/Kubernetes, AWS/Terraform, and CI/CD.</li>
                <li>Soft Forte — DevOps Engineer (Sep 2025–Jan 2026): Linux, NGINX, Bash/Python, Docker, Git/GitHub.</li>
                <li>Telecom Egypt (WE) — Network Engineer (Jul–Sep 2024): network topologies, routing, switching, and basic network security.</li>
                <li>iHOW Community — Technical Mentor & Instructor (Oct 2022–Jun 2026).</li>
              </ul>

              <h4 className="font-bold text-slate-900 mt-4 mb-2 text-sm">Soft Skills</h4>
              <p>Project management, teamwork and leadership, critical thinking, structured problem-solving, adaptability, resilience, and business communication.</p>

              <h4 className="font-bold text-slate-900 mt-4 mb-2 text-sm">Education & Languages</h4>
              <p>B.Sc. Communications & Electronics Engineering, Delta Higher Institute for Engineering & Technology (2021–2026). Arabic (native), English (B1).</p>
            </div>
          )}

          {doc.type === 'cover' && (
            <div className="space-y-2">
              <p>Dear Hiring Manager,</p>
              <p>I am writing to express my keen interest in the DevOps / Cloud Reliability Engineer position. With a solid background in cloud infrastructure, containerization, and automation systems, I am eager to apply my technical skills to optimize your deployment pipelines and strengthen system reliability.</p>
              <p>Sincerely,<br /><strong>Abdulrahman Al-Sodany</strong></p>
            </div>
          )}

          {doc.type === 'degree' && (
            <div className="space-y-2 text-center py-4">
              <Award size={36} className="mx-auto text-yellow-400" />
              <h4 className="text-base font-bold text-slate-900">Delta Higher Institute for Engineering & Technology</h4>
              <p className="text-cyan-800">Bachelor's Degree in Communications & Electronics Engineering</p>
              <p className="text-emerald-800 font-mono font-bold">Cumulative GPA: 3.01 | Graduation Project Grade: Excellent</p>
            </div>
          )}

            </>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="modal-secondary-button"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}

// 8. Project Architecture Topology Modal
function ProjectTopologyModal({ project, onClose }) {
  return (
    <div className="portfolio-modal fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="topology-viewer-panel w-full max-w-3xl p-6 space-y-6 text-xs font-mono relative">
        <div className="flex justify-between items-start border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
            <p className="topology-modal-subtitle">{project.award}</p>
          </div>
          <button type="button" aria-label="Close architecture preview" onClick={onClose} className="modal-close-button">
            <X size={18} />
          </button>
        </div>

        <div className="topology-flow-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="text-center text-cyan-800 font-bold mb-4">
            MICROSERVICES & CLOUD DATA FLOW ARCHITECTURE
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {project.nodes.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className="topology-node p-3 rounded-xl border text-center space-y-1 w-full sm:w-auto">
                  <div className="font-bold text-slate-900 text-xs">{node.label}</div>
                  <div className="text-[10px] text-cyan-800 font-mono">{node.sub}</div>
                </div>
                {i < project.nodes.length - 1 && (
                  <ChevronRight size={18} className="text-violet-500 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="modal-primary-button">
            Close Topology Diagram
          </button>
        </div>
      </div>
    </div>
  );
}

// 9. Contact Form Component
function ContactDispatchForm() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(
      `${formData.get('message')}\n\nReply to: ${formData.get('email')}`,
    );
    window.location.href = `mailto:abdulrahmanabdalla88@gmail.com?subject=${subject}&body=${body}`;
    setDone(true);
    fx.playBeep(600, 0.05);
  };

  return (
    <div className="contact-form-card font-sans space-y-4 shadow-sm">
      <h3 className="font-bold text-slate-900 text-base"><MessageSquareText size={17} className="text-cyan-800" /> Send a message</h3>

      {done ? (
        <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <Check size={32} className="text-emerald-700 mx-auto" />
          <div className="font-bold text-emerald-900 text-sm">Your email draft is ready</div>
          <p className="text-xs text-slate-600">If your email app did not open, contact Abdulrahman directly using the address on this page.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 mb-1" htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" required type="text" className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm outline-none focus:border-cyan-700" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1" htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" required type="email" className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm outline-none focus:border-cyan-700" placeholder="name@company.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" required rows={4} className="w-full p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm outline-none focus:border-cyan-700" placeholder="Write your message..." />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-cyan-800 hover:bg-cyan-900 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Send size={14} /> Open email app
          </button>
        </form>
      )}
    </div>
  );
}

// 11. Rocket Back to Top Floating Button
function RocketButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setVisible(progress > 8);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    fx.playBeep(1100, 0.08);
    scrollPageTo(0);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="portfolio-back-to-top fixed bottom-6 right-6 z-40 p-3 rounded-full text-white transition-all group"
      title="Back to top"
    >
      <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}