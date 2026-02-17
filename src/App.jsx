


import { useEffect, useState, useRef } from 'react';
import './App.css';

const MapIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C8.14 2 5 5.03 5 8.89c0 4.9 5.58 11.3 6.52 12.34.26.29.7.29.96 0 .94-1.04 6.52-7.44 6.52-12.34C19 5.03 15.86 2 12 2Zm0 9.78c-1.7 0-3.08-1.38-3.08-3.08S10.3 5.62 12 5.62s3.08 1.38 3.08 3.08S13.7 11.78 12 11.78Z" fill="#c54c2c"/>
  </svg>
);

const LinkIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.5 6.5h2a3.5 3.5 0 1 1 0 7h-2m-5 0h-2a3.5 3.5 0 1 1 0-7h2" stroke="#c54c2c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 12.5h5" stroke="#c54c2c" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const VolumeOnIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#fff"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.07 5.93a9 9 0 0 1 0 12.14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VolumeOffIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#fff"/>
    <line x1="23" y1="9" x2="17" y2="15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="17" y1="9" x2="23" y2="15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

function FloatingParticle({ delay, duration, size }) {
  return (
    <div 
      className="floating-particle" 
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

// Feb 26, 2026, 11:38 AM IST (convert to UTC+5:30)
function getTimeDiff() {
  const target = new Date('2026-02-26T06:08:00Z');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

function primeTimeLeft() {
  const base = getTimeDiff();
  if (base.isPast) {
    return { days: 0, hours: 0, minutes: 0, seconds: 2, isOver: false, replaying: true };
  }
  const { days, hours, minutes, seconds } = base;
  return { days, hours, minutes, seconds, isOver: false, replaying: false };
}



function FlipUnit({ value, label }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    if (value !== displayValue) {
      // Trigger re-render with new key to restart animation
      setKey(prev => prev + 1);
      
      // Update display value at midpoint
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);
  
  return (
    <div className="flip-unit">
      <div key={key} className="flip-card flipping">
        <span className="flip-card-inner">{String(displayValue).padStart(2, '0')}</span>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

function App() {
  const [timeLeft, setTimeLeft] = useState(primeTimeLeft());
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const photos = [
    { id: 1, src: '/images/proposal.jpeg', alt: 'Proposal on the cliff', label: 'The Proposal' },
    { id: 2, src: '/images/together-watching-horizon.jpeg', alt: 'Together watching the horizon', label: 'Watching the Horizon' },
    { id: 3, src: '/images/hand-in-hand-ring.jpeg', alt: 'Engagement ring moment', label: 'Hand in Hand'},
  ];

  const events = [
    {
      title: 'Sangeeth',
      date: 'Feb 20, 2026',
      time: '7:00 PM onwards',
      attire: 'Shimmer & Shine',
      location: 'SNC Convention, Attapur',
      map: 'https://maps.app.goo.gl/DoMJZx2CJkyaWQdi6',
    },
    {
      title: 'Haldi',
      date: 'Feb 22, 2026',
      time: '10:00 AM onwards',
      attire: 'Bright & Bold',
      location: 'Ayana Resorts, Aziz Nagar',
      map: 'https://maps.app.goo.gl/Rb7JKS2t4LBtyZqYA',
    },
    {
      title: 'Wedding',
      date: 'Feb 26, 2026',
      time: 'Pelli Muhurtham: 11:38 AM',
      attire: 'Traditional',
      location: 'The Address Convention, Narsingi',
      map: 'https://maps.app.goo.gl/Gc94adgCjkjkFex9A',
    },
    {
      title: 'Vratham',
      date: 'Feb 27, 2026',
      time: '10:00 AM onwards',
      attire: 'Traditional',
      location: 'Aditya Empress Park, Villa No. 8',
      map: 'https://maps.app.goo.gl/9mBR1WREi1Qmuvp37',
    },
    {
      title: 'Reception',
      date: 'Mar 1, 2026',
      time: '7:00 PM onwards',
      attire: 'Festive / Evening',
      location: 'JD Convention, Shamshabad',
      map: 'https://maps.app.goo.gl/wRX1UQ6EEZ1Cx78y9',
    },
  ];

  const handleSaveDate = () => {
    // Create .ics file with all wedding events
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Prudvi & Shreya Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Prudvi & Shreya Wedding
X-WR-TIMEZONE:Asia/Kolkata

BEGIN:VEVENT
UID:sangeeth-prudvi-shreya@wedding.com
DTSTAMP:20260217T000000Z
DTSTART:20260220T133000Z
DTEND:20260220T163000Z
SUMMARY:Prudvi & Shreya - Sangeeth
DESCRIPTION:Join us for the Sangeeth ceremony!\\nDress Code: Shimmer & Shine
LOCATION:SNC Convention, Attapur, Hyderabad, India
STATUS:CONFIRMED
END:VEVENT

BEGIN:VEVENT
UID:haldi-prudvi-shreya@wedding.com
DTSTAMP:20260217T000000Z
DTSTART:20260222T043000Z
DTEND:20260222T073000Z
SUMMARY:Prudvi & Shreya - Haldi
DESCRIPTION:Join us for the Haldi ceremony!\\nDress Code: Bright & Bold
LOCATION:Ayana Resorts, Aziz Nagar, Hyderabad, India
STATUS:CONFIRMED
END:VEVENT

BEGIN:VEVENT
UID:wedding-prudvi-shreya@wedding.com
DTSTAMP:20260217T000000Z
DTSTART:20260226T013000Z
DTEND:20260226T083000Z
SUMMARY:Prudvi & Shreya - Wedding
DESCRIPTION:Join us to celebrate Prudvi & Shreya's wedding ceremony.\\nPelli Muhurtham at 11:38 AM IST\\nDress Code: Traditional
LOCATION:The Address Convention, Narsingi, Hyderabad, India
STATUS:CONFIRMED
END:VEVENT

BEGIN:VEVENT
UID:vratham-prudvi-shreya@wedding.com
DTSTAMP:20260217T000000Z
DTSTART:20260227T043000Z
DTEND:20260227T073000Z
SUMMARY:Prudvi & Shreya - Vratham
DESCRIPTION:Join us for the Vratham ceremony!\\nDress Code: Traditional
LOCATION:Aditya Empress Park, Villa No. 8, Hyderabad, India
STATUS:CONFIRMED
END:VEVENT

BEGIN:VEVENT
UID:reception-prudvi-shreya@wedding.com
DTSTAMP:20260217T000000Z
DTSTART:20260301T133000Z
DTEND:20260301T163000Z
SUMMARY:Prudvi & Shreya - Reception
DESCRIPTION:Join us for the Reception!\\nDress Code: Festive / Evening
LOCATION:JD Convention, Shamshabad, Hyderabad, India
STATUS:CONFIRMED
END:VEVENT

END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Prudvi-Shreya-Wedding-Events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  const copyLink = (url) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.replaying) {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          }
          return { ...prev, isOver: true, replaying: false };
        }
        const base = getTimeDiff();
        if (base.isPast) {
          return { days: 0, hours: 0, minutes: 0, seconds: 2, isOver: false, replaying: true };
        }
        const { days, hours, minutes, seconds } = base;
        return { days, hours, minutes, seconds, isOver: false, replaying: false };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.isOver) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [timeLeft.isOver]);

  useEffect(() => {
    if (showContent && audioRef.current) {
      //audioRef.current.currentTime = 15; // Start at 0:15
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  }, [showContent]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [showContent]);

  const handleEnvelopeClick = () => {
    if (!envelopeOpened) {
      setEnvelopeOpened(true);
      setTimeout(() => {
        setShowContent(true);
      }, 1000); // Faster transition to content
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/The Walkmen - Heaven (Official Music Video).mp3" type="audio/mpeg" />
      </audio>

      {/* Mute Button */}
      {showContent && (
        <button className="mute-button" onClick={toggleMute} aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}>
          {isMuted ? <VolumeOffIcon size={28} /> : <VolumeOnIcon size={28} />}
        </button>
      )}

      {!showContent && (
        <div className={`envelope-wrapper ${envelopeOpened ? 'hiding' : ''}`}>
          {!envelopeOpened && (
            <div className="greeting-message">
              <h2>📬 You've Got Mail!</h2>
              <p>There's a special invitation waiting for you...</p>
              <div className="click-hint">Tap to open ↓</div>
            </div>
          )}
          <div className={`envelope-container ${envelopeOpened ? 'opened' : ''}`} onClick={handleEnvelopeClick}>
            <div className="envelope">
              <div className="envelope-back"></div>
              <div className="envelope-body">
                <div className="invitation-card">
                  <div className="card-content">
                    <h1>Prudvi & Shreya</h1>
                    <p>You're Invited</p>
                    <div className="heart">♥</div>
                  </div>
                </div>
              </div>
              <div className="envelope-flap"></div>
            </div>
          </div>
        </div>
      )}
      
      {showContent && (
      <div className="app-container fade-in-content">
      {/* Hero Section */}
      <section
        className="hero-section"
        id="hero"
      >
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            duration={8 + (i % 5)} 
            size={4 + (i % 3) * 2}
          />
        ))}
        
        <div className="overlay fade-in">
          <h1 className="hero-title slide-in-top">Prudvi &amp; Shreya</h1>
          <h2 className="hero-subtitle slide-in-top" style={{animationDelay: '0.2s'}}><span className="wedding-highlight">joyfully invite you to celebrate their wedding.</span></h2>
          <div className="countdown-container slide-in-top" style={{animationDelay: '0.4s'}}>
            <span className="countdown-label">Getting hitched in...</span>
            {timeLeft.isOver ? (
              <div className="countdown-done">Happily ever after begins now!</div>
            ) : (
              <div id="countdown-timer" className="modern-countdown">
                <FlipUnit value={timeLeft.days} label="Days" />
                <span className="colon">:</span>
                <FlipUnit value={timeLeft.hours} label="Hours" />
                <span className="colon">:</span>
                <FlipUnit value={timeLeft.minutes} label="Minutes" />
                <span className="colon">:</span>
                <FlipUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            )}
      {showConfetti && (
        <div className="confetti">
          {[...Array(80)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 2.5 + Math.random();
            const hue = 18 + Math.random() * 25; // warm palette
            return (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  backgroundColor: `hsl(${hue}, 85%, 65%)`,
                }}
              />
            );
          })}
        </div>
      )}
          </div>
          <div className="event-details slide-in-top" style={{animationDelay: '0.6s'}}>
            <p><strong>Date:</strong> <span className="detail-value">February 26, 2026</span></p>
            <p><strong>Muhurtham:</strong> <span className="detail-value">11:38 AM IST</span></p>
            <p><strong>Location:</strong> <span className="detail-value">Hyderabad, India</span></p>
          </div>
          <div className="live-links-row slide-in-top" style={{animationDelay: '0.7s'}}>
            <a 
              href="https://youtube.com/live/l0B7TMElpNo?feature=share" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="live-link"
            >
              <span className="live-indicator">🔴 LIVE</span>
              Sangeeth Stream 🎶
            </a>
            <a 
              href="https://youtube.com/live/cmou6NKA9FI?feature=share" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="live-link"
            >
              <span className="live-indicator">🔴 LIVE</span>
              Wedding Stream 🎉
            </a>
          </div>
          <div className="cta-row slide-in-top" style={{animationDelay: '0.8s'}}>
            <button className="scroll-down" onClick={() => document.getElementById('gallery').scrollIntoView({behavior: 'smooth'})}>View Gallery ↓</button>
            <button className="scroll-down" onClick={() => document.getElementById('events').scrollIntoView({behavior: 'smooth'})}>Event Details ↓</button>
          </div>
          <div className="save-date-row slide-in-top" style={{animationDelay: '0.85s'}}>
            <button className="save-date" onClick={handleSaveDate}>Save the Date</button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <h2 className="gallery-section-title">Our Journey</h2>
        <p className="section-subtitle">Captured moments of our beautiful story</p>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <button 
              key={photo.id} 
              className="gallery-item fade-in-up" 
              style={{animationDelay: `${index * 0.15}s`}}
              onClick={() => openLightbox(index)}
            >
              <img src={photo.src} alt={photo.alt} />
            </button>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section" id="events">
        <h2 className="events-section-title">Wedding Events</h2>
        <p className="section-subtitle">Celebrate with us across every special moment</p>
        <div className="events-grid">
          {events.map((event, index) => (
            <div 
              key={event.title} 
              className="event-card fade-in-up" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="event-top">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-time">{event.time}</p>
              </div>
              <div className="event-meta">
                <p><strong>Attire:</strong> {event.attire}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              <div className="event-actions">
                <a className="map-link" href={event.map} target="_blank" rel="noreferrer">
                  <MapIcon size={18} />
                  <span>Open in Maps</span>
                </a>
                <button className="copy-link" onClick={() => copyLink(event.map)}>
                  <LinkIcon size={18} />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Photos Section */}
      <section className="share-photos-section" id="share-photos">
        <div className="share-photos-content">
          <div className="camera-icon">📸</div>
          <h2 className="share-photos-title">Capture & Share Your Moments</h2>
          <p className="share-photos-text">
            We'd love to see the celebrations through your eyes! Snap photos during the events 
            and share them with us. Your memories make our day even more special.
          </p>
          <a 
            href="https://drive.google.com/drive/folders/1xyjzEp58QLSWXge-mEahWIdWLIS47nNH" 
            target="_blank" 
            rel="noopener noreferrer"
            className="upload-photos-btn"
          >
            📤 Upload Your Photos
          </a>
          <p className="upload-hint">Tap to open our shared photo album</p>
        </div>
      </section>

      {/* Details Section */}
      {/* <section className="details-section" id="details">
        <h2 className="details-section-title">Event Details</h2>
        <div className="details-card">
          <div className="detail-item">
            <div className="detail-icon">📅</div>
            <h3>When</h3>
            <p>February 26, 2026</p>
            <p className="detail-time">11:38 AM IST (Muhurtham)</p>
          </div>
          <div className="detail-item">
            <div className="detail-icon">📍</div>
            <h3>Where</h3>
            <p>Hyderabad, India</p>
            <p className="detail-time">Venue details to follow</p>
          </div>
          <div className="detail-item">
            <div className="detail-icon">👔</div>
            <h3>Dress Code</h3>
            <p>Traditional Indian Attire</p>
            <p className="detail-time">Festive colors welcome</p>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="site-footer">
        <p>Developed with ♥ by <a href="https://www.linkedin.com/in/rohith-neralla" target="_blank" rel="noopener noreferrer">Rohith Neralla</a></p>
      </footer>

      {currentPhoto && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {currentPhoto.src ? (
              <img src={currentPhoto.src} alt={currentPhoto.alt} />
            ) : (
              <div className="lightbox-placeholder">
                <span>{currentPhoto.label}</span>
                <p>Add your sunset photos here</p>
              </div>
            )}
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
          </div>
        </div>
      )}
      </div>
      )}
    </>
  );
}

export default App;
