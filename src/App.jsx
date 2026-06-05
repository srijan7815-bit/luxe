import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Play, ChevronDown, Calendar, MapPin, 
  Mail, Phone, Globe 
} from 'lucide-react';

// Luxury Product Data
const collections = [
  {
    id: 1,
    name: "Noir Éternel",
    season: "Fall/Winter 2026",
    description: "A symphony of midnight black cashmere and liquid silk, redefining timeless sophistication.",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80",
    price: "From $2,850",
    pieces: 24,
    color: "Obsidian & Gold"
  },
  {
    id: 2,
    name: "Velvet Reverie",
    season: "Resort 2026",
    description: "Whispers of ivory silk velvet and hand-embroidered gold filigree.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
    price: "From $3,200",
    pieces: 18,
    color: "Ivory & Antique Gold"
  },
  {
    id: 3,
    name: "Architectural Noir",
    season: "Spring/Summer 2026",
    description: "Precision tailoring meets sculptural draping in the finest Italian wool.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
    price: "From $1,950",
    pieces: 32,
    color: "Charcoal & Gold"
  },
  {
    id: 4,
    name: "L'Éclat Collection",
    season: "Couture 2026",
    description: "Limited edition pieces featuring 24k gold thread embroidery and rare pearls.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    price: "From $8,500",
    pieces: 8,
    color: "Black & 24K Gold"
  }
];

// Lookbook Images with details
const lookbookImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80",
    title: "The Longing",
    season: "FW26",
    description: "Captured at the private salon in Paris. The model wears the signature velvet cape from the Velvet Reverie collection.",
    location: "Paris, France",
    photographer: "Élodie Laurent"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&q=80",
    title: "Midnight Silhouette",
    season: "FW26",
    description: "The architectural coat in liquid cashmere. Shot against the dramatic backdrop of the Montmartre at dusk.",
    location: "Paris, France",
    photographer: "Jean-Luc Moreau"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=80",
    title: "Golden Hour",
    season: "SS26",
    description: "Hand-finished leather jacket with 18k gold hardware. The light catches the details like liquid metal.",
    location: "Marrakech, Morocco",
    photographer: "Sofia Reyes"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80",
    title: "The Atelier",
    season: "Couture 26",
    description: "Behind the scenes at our atelier in Florence. Every stitch is placed by hand by master artisans.",
    location: "Florence, Italy",
    photographer: "Marco Bellini"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
    title: "Eternal Grace",
    season: "FW26",
    description: "The floor-length gown in double-faced silk. A study in minimalism and maximal impact.",
    location: "Venice, Italy",
    photographer: "Isabella Rossi"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
    title: "The Procession",
    season: "SS26",
    description: "Runway finale in our signature black and gold. The collection's defining moment.",
    location: "New York, USA",
    photographer: "Alexander Chen"
  }
];

// Craftsmanship steps
const craftsmanshipSteps = [
  {
    number: "01",
    title: "Material Selection",
    description: "We source only the rarest materials—triple-milled cashmere from Mongolia, silk from the Como region, and gold leaf from Florence.",
    detail: "Every bolt is inspected by hand for three weeks before approval."
  },
  {
    number: "02",
    title: "The Pattern",
    description: "Our master patternmakers create paper patterns using techniques passed down through four generations of artisans.",
    detail: "Each pattern is cut with precision to the millimeter."
  },
  {
    number: "03",
    title: "Hand Construction",
    description: "Every garment is constructed entirely by hand in our atelier. No machine touches the final piece.",
    detail: "Over 120 hours of handwork per couture piece."
  },
  {
    number: "04",
    title: "The Finishing",
    description: "Gold embroidery, hand-set pearls, and final fittings. The last 40 hours are dedicated solely to the invisible details.",
    detail: "Signed and numbered by the artisan who created it."
  }
];

// Journal Articles
const journalArticles = [
  {
    id: 1,
    title: "The Architecture of Silence",
    excerpt: "In a world of noise, we design for the spaces between. A meditation on the power of restraint in luxury.",
    date: "May 28, 2026",
    readTime: "12 min",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
  },
  {
    id: 2,
    title: "Gold as Memory",
    excerpt: "Why we embed 24k gold into every collection. A history of the metal that has defined empires and our craft.",
    date: "May 12, 2026",
    readTime: "9 min",
    category: "Craft",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
  },
  {
    id: 3,
    title: "The Last Couturier",
    excerpt: "An intimate conversation with our Creative Director on why the future of luxury lies in the past.",
    date: "April 29, 2026",
    readTime: "15 min",
    category: "Interview",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80"
  }
];

// Designer Notes
const designerNotes = [
  {
    quote: "We do not chase seasons. We craft legacies.",
    author: "Margot Laurent",
    role: "Creative Director",
    context: "On the philosophy behind LUXE"
  },
  {
    quote: "Every stitch is a conversation with time. Every button, a promise to the future.",
    author: "Margot Laurent",
    role: "Creative Director",
    context: "On the value of handcraft"
  }
];

const navItems = [
  { label: "Collections", id: "collections" },
  { label: "Atelier", id: "atelier" },
  { label: "Journal", id: "journal" },
  { label: "Campaigns", id: "lookbook" }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLookbook, setSelectedLookbook] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Mouse Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      
      // Update CSS variable for spotlight
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Active section detection for nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Open Lookbook Modal
  const openLookbook = (image) => {
    setSelectedLookbook(image);
    document.body.style.overflow = 'hidden';
  };

  // Close Lookbook Modal
  const closeLookbook = () => {
    setSelectedLookbook(null);
    document.body.style.overflow = 'unset';
  };

  // Open Collection Detail
  const openCollection = (collection) => {
    setSelectedCollection(collection);
    document.body.style.overflow = 'hidden';
  };

  const closeCollection = () => {
    setSelectedCollection(null);
    document.body.style.overflow = 'unset';
  };

  // Handle contact form submit (demo)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    alert("Thank you. Your inquiry has been received. Our atelier will contact you within 48 hours.");
    form.reset();
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariant = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } }
  };

  const parallaxVariant = {
    initial: { scale: 1.1 },
    whileInView: { scale: 1, transition: { duration: 1.8, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="min-h-screen bg-luxe-black text-luxe-ivory font-sans-luxe overflow-x-hidden">
      {/* Mouse Follow Spotlight - Luxury Effect */}
      <div 
        className="spotlight" 
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`
        }}
      />

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-luxe-black/95 backdrop-blur-xl border-b border-luxe-light-gray">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer group"
          >
            <div className="text-[28px] font-semibold tracking-[-1.5px] gold-text transition-all group-hover:tracking-[-1px]">
              LUXE
            </div>
            <div className="ml-1.5 text-[9px] tracking-[3px] text-luxe-gold/70 font-light mt-1">EST 1892</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-4">
            <button 
              onClick={() => scrollToSection('collections')}
              className="luxe-btn hidden md:block text-xs px-6 py-3"
            >
              Explore Collections
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-luxe-ivory"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-luxe-light-gray bg-luxe-black px-8 py-8"
            >
              <div className="flex flex-col gap-y-6 text-sm">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left nav-link py-1 text-base"
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('collections')}
                  className="luxe-btn w-full mt-4"
                >
                  Explore Collections
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO - Fullscreen Cinematic Runway Video */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="video-container">
          {/* Cinematic Runway Video - High quality stock */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsVideoPlaying(true)}
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/398/398-small.mp4" 
              type="video/mp4" 
            />
            {/* Fallback elegant image if video fails */}
            Your browser does not support the video tag.
          </video>
          
          {/* Elegant Video Overlay */}
          <div className="hero-overlay" />
          
          {/* Subtle grain texture overlay for luxury film feel */}
          <div className="absolute inset-0 bg-[radial-gradient(#D6B56C_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-[0.035] z-10" />
        </div>

        {/* Massive Typography */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          >
            <div className="mb-6">
              <div className="inline-block px-5 py-1.5 border border-luxe-gold/40 text-luxe-gold text-[10px] tracking-[4px] mb-8">
                PARIS • MILAN • NEW YORK
              </div>
            </div>

            <h1 className="text-[92px] md:text-[120px] lg:text-[140px] leading-[0.82] font-semibold tracking-[-6.5px] text-luxe-ivory mb-4">
              CRAFTED<br />BEYOND<br />TRENDS.
            </h1>
            
            <p className="text-xl md:text-2xl text-luxe-ivory/80 max-w-md mx-auto tracking-[-0.2px] mb-12 font-light">
              Timeless elegance. Uncompromising craft.<br />Since 1892.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('collections')}
                className="luxe-btn group px-10 py-[17px] text-sm flex items-center gap-3"
              >
                DISCOVER THE COLLECTION 
                <ArrowRight size={17} className="group-hover:translate-x-0.5 transition" />
              </button>
              
              <button 
                onClick={() => scrollToSection('lookbook')}
                className="luxe-btn luxe-btn-secondary px-10 py-[17px] text-sm flex items-center gap-3"
              >
                <Play size={15} className="mr-1" /> WATCH THE FILM
              </button>
            </div>
          </motion.div>
        </div>

        {/* Elegant Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => scrollToSection('collections')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        >
          <div className="text-[10px] tracking-[3px] text-luxe-gold/60 mb-2">SCROLL TO BEGIN</div>
          <ChevronDown size={18} className="text-luxe-gold/60 group-hover:text-luxe-gold transition" />
        </motion.div>
      </section>

      {/* NEW COLLECTION SECTION */}
      <section id="collections" className="section max-w-7xl mx-auto px-8">
        <div className="section-header">
          <div className="flex items-end justify-between">
            <div>
              <div className="section-title">NEW SEASON</div>
              <h2 className="section-heading">New Collection</h2>
            </div>
            <div className="hidden md:block text-right text-sm text-luxe-ivory/50 max-w-[260px]">
              Four new collections. Each piece numbered and signed by the artisan who made it.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-luxe-light-gray">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              variants={itemVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -1 }}
              onClick={() => openCollection(collection)}
              className="collection-card bg-luxe-black group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3.1]">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="collection-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
                
                <div className="absolute top-6 right-6 text-right">
                  <div className="text-xs tracking-[2px] text-luxe-gold/80">{collection.season}</div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-[-1px] mb-1">{collection.name}</h3>
                    <p className="text-luxe-gold text-sm tracking-[1px]">{collection.color}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-luxe-ivory/50">FROM</div>
                    <div className="text-xl font-medium text-luxe-gold tracking-tight">{collection.price.split(' ')[1]}</div>
                  </div>
                </div>

                <p className="text-luxe-ivory/70 text-[15px] leading-relaxed mb-6 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between text-xs uppercase tracking-widest border-t border-luxe-light-gray pt-5">
                  <div>{collection.pieces} PIECES</div>
                  <div className="flex items-center gap-1.5 text-luxe-gold group-hover:gap-2 transition-all">
                    VIEW DETAILS <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => scrollToSection('lookbook')}
            className="luxe-btn text-xs px-8 py-4 tracking-[2.5px]"
          >
            VIEW THE ENTIRE LOOKBOOK
          </button>
        </div>
      </section>

      {/* LOOKBOOK - Magazine Style Layout with Cinematic Transitions */}
      <section id="lookbook" className="section bg-luxe-dark-gray">
        <div className="max-w-7xl mx-auto px-8">
          <div className="section-header">
            <div className="flex items-end justify-between flex-wrap gap-y-4">
              <div>
                <div className="section-title">VISUAL ARCHIVE</div>
                <h2 className="section-heading">The Lookbook</h2>
              </div>
              <p className="text-luxe-ivory/60 max-w-sm text-[15px]">
                Editorial moments from our private shows and atelier sessions. Each image tells a story of craft.
              </p>
            </div>
          </div>

          {/* Magazine Grid - Editorial Parallax Style */}
          <div className="magazine-grid">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={image.id}
                onClick={() => openLookbook(image)}
                className={`magazine-item ${index === 0 || index === 5 ? 'magazine-item-wide' : ''} group cursor-pointer relative`}
                whileHover={{ scale: 1.002 }}
              >
                <div className="parallax-container absolute inset-0">
                  <motion.img 
                    src={image.src} 
                    alt={image.title}
                    className="cinematic-img absolute inset-0 w-full h-full object-cover"
                    variants={parallaxVariant}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                  />
                </div>

                <div className="magazine-overlay opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div>
                    <div className="text-luxe-gold text-xs tracking-[3px] mb-2">{image.season}</div>
                    <h3 className="text-white text-3xl font-medium tracking-[-1px] leading-none mb-3">{image.title}</h3>
                    <p className="text-luxe-ivory/80 text-sm line-clamp-2 pr-12">{image.description.substring(0, 110)}...</p>
                  </div>
                </div>

                <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/70 text-[10px] tracking-[2px] border border-white/20 text-white/90 opacity-0 group-hover:opacity-100 transition-all">
                  VIEW EDITORIAL
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP / ATELIER */}
      <section id="atelier" className="section max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-x-16 items-start">
          <div className="md:col-span-5 mb-12 md:mb-0">
            <div className="sticky top-24">
              <div className="section-title">THE HOUSE</div>
              <h2 className="section-heading leading-none mb-8">The Art of<br />Craftsmanship</h2>
              
              <p className="text-xl text-luxe-ivory/70 leading-relaxed mb-9">
                Every LUXE piece is born from 189 years of knowledge, passed from hand to hand in our Paris and Florence ateliers.
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="px-5 py-3 border border-luxe-gold/50 text-luxe-gold">1892 — PRESENT</div>
                <div className="text-luxe-ivory/50">FOUR GENERATIONS</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {craftsmanshipSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="timeline-item group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-6 mb-3">
                  <div className="text-[72px] font-semibold text-luxe-gold/10 group-hover:text-luxe-gold/20 transition-colors tabular-nums tracking-tighter">
                    {step.number}
                  </div>
                  <div className="-ml-2">
                    <h4 className="text-3xl tracking-[-1.2px] mb-2 font-medium">{step.title}</h4>
                    <p className="text-luxe-ivory/80 text-[15px] pr-8 leading-relaxed">{step.description}</p>
                    <p className="mt-3 text-xs text-luxe-gold/70 tracking-widest font-medium">{step.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNER NOTES - Elegant Editorial */}
      <section className="section bg-luxe-dark-gray border-y border-luxe-light-gray">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="section-title mb-4">FROM THE CREATIVE DIRECTOR</div>
          <h2 className="section-heading mb-16">Designer Notes</h2>

          <div className="space-y-20">
            {designerNotes.map((note, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
                className="max-w-2xl mx-auto"
              >
                <div className="quote mb-9 leading-tight">
                  “{note.quote}”
                </div>
                <div>
                  <div className="text-luxe-gold text-sm tracking-[3px]">{note.author.toUpperCase()}</div>
                  <div className="text-luxe-ivory/60 text-sm mt-1">{note.role} • {note.context}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL - Magazine Style */}
      <section id="journal" className="section max-w-7xl mx-auto px-8">
        <div className="section-header flex items-end justify-between">
          <div>
            <div className="section-title">THE LUXE JOURNAL</div>
            <h2 className="section-heading">Stories &amp; Reflections</h2>
          </div>
          <button className="hidden md:block luxe-btn text-xs px-7 py-3.5">READ ALL STORIES</button>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-luxe-light-gray">
          {journalArticles.map((article, index) => (
            <motion.div 
              key={article.id}
              className="journal-card bg-luxe-black group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => alert(`Opening full article: ${article.title}\n\n(This is a demo. In production this would open the full story.)`)}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" 
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs mb-5">
                  <span className="journal-card meta">{article.category}</span>
                  <span className="text-luxe-ivory/40">•</span>
                  <span className="text-luxe-ivory/50">{article.date}</span>
                  <span className="text-luxe-ivory/40">•</span>
                  <span className="text-luxe-ivory/50">{article.readTime}</span>
                </div>
                
                <h3 className="text-2xl leading-tight font-medium tracking-[-0.5px] mb-4 group-hover:text-luxe-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-luxe-ivory/70 leading-relaxed text-[15px]">{article.excerpt}</p>
                
                <div className="mt-8 flex items-center text-xs tracking-widest text-luxe-gold group-hover:gap-2 gap-1 transition-all">
                  READ THE ESSAY <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-9 text-center md:hidden">
          <button className="luxe-btn text-xs px-7 py-3.5">READ ALL STORIES</button>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section bg-luxe-dark-gray border-t border-luxe-light-gray">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-14">
            {/* Contact Info */}
            <div>
              <div className="section-title">PRIVATE ATELIER</div>
              <h2 className="section-heading mb-10">Speak With Us</h2>
              
              <div className="space-y-8 text-[15px]">
                <div>
                  <div className="flex items-center gap-3 mb-1 text-luxe-gold">
                    <MapPin size={17} /> <span className="text-xs tracking-[2px]">PARIS</span>
                  </div>
                  <div>17 Rue de la Paix, 75002 Paris, France</div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1 text-luxe-gold">
                    <MapPin size={17} /> <span className="text-xs tracking-[2px]">FLORENCE</span>
                  </div>
                  <div>Via della Spada 12, 50123 Florence, Italy</div>
                </div>

                <div className="pt-6 border-t border-luxe-light-gray">
                  <a href="mailto:atelier@luxe.com" className="flex items-center gap-3 hover:text-luxe-gold transition-colors mb-3">
                    <Mail size={17} /> atelier@luxe.com
                  </a>
                  <a href="tel:+33142601500" className="flex items-center gap-3 hover:text-luxe-gold transition-colors">
                    <Phone size={17} /> +33 1 42 60 15 00
                  </a>
                </div>
              </div>

              <div className="mt-12 flex gap-5">
                <a href="#" className="text-luxe-ivory/60 hover:text-luxe-gold transition p-1" aria-label="Instagram">
                  <Globe size={19} />
                </a>
                <a href="#" className="text-luxe-ivory/60 hover:text-luxe-gold transition p-1" aria-label="X">
                  <X size={19} />
                </a>
                <a href="#" className="text-luxe-ivory/60 hover:text-luxe-gold transition p-1" aria-label="Facebook">
                  <Globe size={19} />
                </a>
              </div>
            </div>

            {/* Contact Form - Elegant */}
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className="luxe-input" 
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    className="luxe-input" 
                    required 
                  />
                </div>
                
                <input 
                  type="text" 
                  placeholder="INTEREST (E.G. PRIVATE APPOINTMENT, COUTURE INQUIRY)" 
                  className="luxe-input" 
                />

                <textarea 
                  placeholder="TELL US MORE ABOUT YOUR INQUIRY..." 
                  rows={6} 
                  className="luxe-input resize-y min-h-[140px]" 
                  required 
                />

                <button 
                  type="submit"
                  className="luxe-btn w-full mt-4 py-[19px] text-sm tracking-[2.5px]"
                >
                  SEND PRIVATE INQUIRY
                </button>
                
                <p className="text-center text-xs text-luxe-ivory/50 pt-2">
                  All inquiries are handled personally by our client relations team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxe-black border-t border-luxe-light-gray py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-8">
            <div>
              <div className="text-4xl tracking-[-1.5px] gold-text mb-1">LUXE</div>
              <div className="text-xs text-luxe-ivory/50 tracking-[2.5px]">ESTABLISHED 1892</div>
            </div>

            <div className="text-sm text-luxe-ivory/60 max-w-xs">
              Handcrafted in Paris and Florence. <br className="hidden md:block" />Every piece is a singular expression of time.
            </div>

            <div className="text-xs text-luxe-ivory/40 tracking-widest">
              © {new Date().getFullYear()} LUXE. ALL RIGHTS PRESERVED.
            </div>
          </div>
        </div>
      </footer>

      {/* LOOKBOOK MODAL - Cinematic Full Experience */}
      <AnimatePresence>
        {selectedLookbook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8" onClick={closeLookbook}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="modal relative max-w-[1100px] w-full bg-luxe-black border border-luxe-light-gray overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={closeLookbook} 
                  className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full transition"
                >
                  <X size={20} />
                </button>

                <div className="relative aspect-video md:aspect-[16/9] bg-black overflow-hidden">
                  <img 
                    src={selectedLookbook.src} 
                    alt={selectedLookbook.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                </div>

                <div className="p-10 md:p-14 text-luxe-ivory">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-luxe-gold text-xs tracking-[4px] mb-2">{selectedLookbook.season}</div>
                      <h3 className="text-5xl md:text-6xl font-semibold tracking-[-2.2px] leading-none">{selectedLookbook.title}</h3>
                    </div>
                    <div className="hidden md:block text-right text-sm text-luxe-ivory/60">
                      {selectedLookbook.location}<br />
                      <span className="text-luxe-gold/70 text-xs">PHOTO BY {selectedLookbook.photographer}</span>
                    </div>
                  </div>

                  <div className="max-w-3xl text-xl leading-tight text-luxe-ivory/90 font-light tracking-[-0.2px]">
                    {selectedLookbook.description}
                  </div>

                  <div className="md:hidden mt-8 text-xs text-luxe-ivory/60">
                    {selectedLookbook.location} — {selectedLookbook.photographer}
                  </div>

                  <div className="mt-12 pt-8 border-t border-luxe-light-gray flex items-center gap-4">
                    <button 
                      onClick={() => {
                        closeLookbook();
                        setTimeout(() => scrollToSection('collections'), 300);
                      }}
                      className="luxe-btn text-xs px-9 py-3.5"
                    >
                      SHOP THIS LOOK
                    </button>
                    <button 
                      onClick={closeLookbook}
                      className="text-xs tracking-[2px] px-6 py-4 text-luxe-ivory/60 hover:text-luxe-gold transition"
                    >
                      CLOSE EDITORIAL
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COLLECTION DETAIL MODAL */}
      <AnimatePresence>
        {selectedCollection && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" onClick={closeCollection}>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="modal bg-luxe-black max-w-5xl w-full border border-luxe-light-gray overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-5">
                {/* Image Side */}
                <div className="md:col-span-3 relative overflow-hidden bg-black aspect-[4/3] md:aspect-auto">
                  <img 
                    src={selectedCollection.image} 
                    alt={selectedCollection.name}
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-xs tracking-[3px] text-luxe-gold mb-2">{selectedCollection.season}</div>
                    <div className="text-white text-6xl font-semibold tracking-[-3px] leading-none">{selectedCollection.name}</div>
                  </div>
                </div>

                {/* Details Side */}
                <div className="md:col-span-2 p-10 md:p-12 flex flex-col">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <div className="text-luxe-gold text-sm tracking-[2.5px]">{selectedCollection.color}</div>
                        <div className="mt-1 text-5xl font-medium tracking-[-1.5px]">{selectedCollection.price}</div>
                      </div>
                      <div className="text-right text-xs text-luxe-ivory/50">
                        {selectedCollection.pieces} PIECES<br />WORLDWIDE
                      </div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-luxe-ivory/80 mb-10">
                      {selectedCollection.description}
                    </p>

                    <div className="space-y-5 text-sm">
                      <div className="flex justify-between border-b border-luxe-light-gray pb-4">
                        <span className="text-luxe-ivory/60">Material</span>
                        <span>Hand-selected Italian Cashmere, Silk, 24K Gold</span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-light-gray pb-4">
                        <span className="text-luxe-ivory/60">Origin</span>
                        <span>Paris &amp; Florence Ateliers</span>
                      </div>
                      <div className="flex justify-between border-b border-luxe-light-gray pb-4">
                        <span className="text-luxe-ivory/60">Lead Time</span>
                        <span>6–12 weeks (bespoke)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-10 flex flex-col gap-3">
                    <button className="luxe-btn py-[18px] text-sm tracking-[2px]">
                      REQUEST PRIVATE FITTING
                    </button>
                    <button 
                      onClick={closeCollection}
                      className="text-xs py-4 tracking-[2px] text-luxe-ivory/50 hover:text-luxe-gold"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
