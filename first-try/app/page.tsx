"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent, useSpring } from "framer-motion";
import { Search, ShoppingBag, User, ChevronDown, Zap, Fingerprint, Aperture, Infinity, MessageCircle, GitBranch, Briefcase } from "lucide-react";
import { useAsciiVideo } from "../hooks/useAsciiVideo";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const [titleHidden, setTitleHidden] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useAsciiVideo(videoRef, asciiRef, videoLoaded);

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      }
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play prevented or video not ready, ignore
        });
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [bgImageVisible, setBgImageVisible] = useState(false);

  // Video Scrubbing and triggers
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.4 && !titleHidden) {
      setTitleHidden(true);
    } else if (latest <= 0.4 && titleHidden) {
      setTitleHidden(false);
    }

    if (latest >= 0.5 && !bgImageVisible) {
      setBgImageVisible(true);
    } else if (latest < 0.5 && bgImageVisible) {
      setBgImageVisible(false);
    }

  });

  // Title fades out slowly on scroll
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

  // Word transforms for "It's your choice"
  const springConfig = { stiffness: 45, damping: 18, mass: 1 };
  
  const rawWord1Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const rawWord1Y = useTransform(scrollYProgress, [0.55, 0.65], [80, 0]);
  const word1Opacity = useSpring(rawWord1Opacity, springConfig);
  const word1Y = useSpring(rawWord1Y, springConfig);

  const rawWord2Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const rawWord2Y = useTransform(scrollYProgress, [0.65, 0.75], [80, 0]);
  const word2Opacity = useSpring(rawWord2Opacity, springConfig);
  const word2Y = useSpring(rawWord2Y, springConfig);

  const rawWord3Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const rawWord3Y = useTransform(scrollYProgress, [0.75, 0.85], [80, 0]);
  const word3Opacity = useSpring(rawWord3Opacity, springConfig);
  const word3Y = useSpring(rawWord3Y, springConfig);

  const rawWord4Opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const rawWord4Y = useTransform(scrollYProgress, [0.85, 0.95], [80, 0]);
  const word4Opacity = useSpring(rawWord4Opacity, springConfig);
  const word4Y = useSpring(rawWord4Y, springConfig);

  const words = [
    { text: "We", opacity: word1Opacity, y: word1Y },
    { text: "build", opacity: word2Opacity, y: word2Y },
    { text: "this", opacity: word3Opacity, y: word3Y },
    { text: "reality", opacity: word4Opacity, y: word4Y },
  ];

  return (
    <main className="main-content">
          <header className="ios-glass-header">
            <div className="header-logo">VISION</div>
            <nav className="header-nav">
              <a href="#about">Overview</a>
              <a href="#tech">Tech Specs</a>
              <a href="#compare" className="flex-link">Models <ChevronDown size={14} /></a>
            </nav>
            <div className="header-actions">
              <button className="icon-btn"><Search size={16} /></button>
              <button className="icon-btn"><User size={16} /></button>
              <button className="icon-btn"><ShoppingBag size={16} /></button>
              <button className="header-buy">Buy</button>
            </div>
          </header>

      <div ref={containerRef} className="scroll-container">
        <div className="sticky-container">
          <div className="video-wrapper">
            {!videoLoaded && (
              <div className="video-loader-overlay">
                <div className="ios-spinner"></div>
                <p>Decoding Matrix...</p>
              </div>
            )}
            
            <pre ref={asciiRef} className="ascii-bg"></pre>
            <motion.video
              ref={videoRef}
              src="/video/new-version.mp4"
              onCanPlayThrough={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="bg-video"
            />
            {/* Corner blur mask overlay */}
            <div className="corner-blur-overlay"></div>
            <div className="bottom-vignette-overlay"></div>
            <div className="top-vignette-overlay"></div>
          </div>



          {!titleHidden && (
            <motion.h1 style={{ opacity: titleOpacity }} className="title-see-true">
              SEE THROUGH
            </motion.h1>
          )}

          {bgImageVisible && (
            <motion.div className="product-phrase">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  style={{
                    opacity: word.opacity,
                    y: word.y,
                    display: "inline-block"
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <section className="info-section" id="about">
        <div className="info-overlay"></div>
        <div className="info-content-wrapper">
          <div className="info-header">
            <h2>Vision AI. Reality, Reimagined.</h2>
            <p>Our breakthrough neural-processing architecture seamlessly bridges the gap between your physical environment and infinite digital possibilities. Every interaction is intuitively predicted and instantaneously rendered.</p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="card-bg-gradient"></div>
              <div className="card-content">
                <div className="card-icon-wrapper"><Infinity size={32} className="text-accent" /></div>
                <h3>Boundless Canvas</h3>
                <p>Break free from physical screens. Your workspace is now as big as your imagination, seamlessly blending into your reality with perfect spatial mapping.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card">
              <div className="card-bg-gradient"></div>
              <div className="card-content">
                <div className="card-icon-wrapper"><Aperture size={32} className="text-accent" /></div>
                <h3>True Clarity</h3>
                <p>Custom micro-OLED displays pack 23 million pixels for breathtaking, lifelike visual fidelity.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="card-bg-gradient"></div>
              <div className="card-content">
                <div className="card-icon-wrapper"><Fingerprint size={32} className="text-accent" /></div>
                <h3>Secure by Design</h3>
                <p>Your environment and eye-tracking data is encrypted end-to-end and processed entirely on-device. Absolute privacy, without compromise.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="card-bg-gradient"></div>
              <div className="card-content">
                <div className="card-icon-wrapper"><Zap size={32} className="text-accent" /></div>
                <h3>Instantaneous Response</h3>
                <p>The dual-chip architecture guarantees a photon-to-photon latency of just 12 milliseconds. It feels completely natural, like pure magic.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">VISION</h2>
            <p>Pioneering the next generation of spatial computing and intuitive human-computer interfaces.</p>
            <div className="social-links">
              <a href="#"><MessageCircle size={20} /></a>
              <a href="#"><GitBranch size={20} /></a>
              <a href="#"><Briefcase size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Overview</a>
              <a href="#">Tech Specs</a>
              <a href="#">Pricing</a>
              <a href="#">Accessories</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get the latest news and feature updates about Vision AI directly to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Vision Corp. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
