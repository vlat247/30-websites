"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Search, ShoppingBag, User, ChevronDown, Zap, Fingerprint, Aperture, Infinity, MessageCircle, GitBranch, Briefcase } from "lucide-react";
import { useWebGLVideo } from "../hooks/useWebGLVideo";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Mouse interactivity state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [mouseX, mouseY]);

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setBgImageVisible(prev => {
      if (latest >= 0.5 && !prev) return true;
      if (latest < 0.5 && prev) return false;
      return prev;
    });
  });

  // Title fades out slowly on scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0, 0], { clamp: true });
  const titleDisplay = useTransform(scrollYProgress, (v) => v > 0.45 ? "none" : "block");

  // Word transforms for "It's your choice"
  const springConfig = { stiffness: 45, damping: 18, mass: 1 };
  
  const rawWord1Opacity = useTransform(scrollYProgress, [0.50, 0.54, 0.68, 0.70], [0, 1, 1, 0]);
  const rawWord1Y = useTransform(scrollYProgress, [0.50, 0.54, 0.68, 0.70], [80, 0, 0, -80]);
  const word1Opacity = useSpring(rawWord1Opacity, springConfig);
  const word1Y = useSpring(rawWord1Y, springConfig);

  const rawWord2Opacity = useTransform(scrollYProgress, [0.52, 0.56, 0.68, 0.70], [0, 1, 1, 0]);
  const rawWord2Y = useTransform(scrollYProgress, [0.52, 0.56, 0.68, 0.70], [80, 0, 0, -80]);
  const word2Opacity = useSpring(rawWord2Opacity, springConfig);
  const word2Y = useSpring(rawWord2Y, springConfig);

  const rawWord3Opacity = useTransform(scrollYProgress, [0.54, 0.58, 0.68, 0.70], [0, 1, 1, 0]);
  const rawWord3Y = useTransform(scrollYProgress, [0.54, 0.58, 0.68, 0.70], [80, 0, 0, -80]);
  const word3Opacity = useSpring(rawWord3Opacity, springConfig);
  const word3Y = useSpring(rawWord3Y, springConfig);

  const rawWord4Opacity = useTransform(scrollYProgress, [0.56, 0.60, 0.68, 0.70], [0, 1, 1, 0]);
  const rawWord4Y = useTransform(scrollYProgress, [0.56, 0.60, 0.68, 0.70], [80, 0, 0, -80]);
  const word4Opacity = useSpring(rawWord4Opacity, springConfig);
  const word4Y = useSpring(rawWord4Y, springConfig);

  const rawWord5Opacity = useTransform(scrollYProgress, [0.70, 0.74, 0.88, 0.90], [0, 1, 1, 0]);
  const rawWord5Y = useTransform(scrollYProgress, [0.70, 0.74, 0.88, 0.90], [80, 0, 0, -80]);
  const word5Opacity = useSpring(rawWord5Opacity, springConfig);
  const word5Y = useSpring(rawWord5Y, springConfig);

  const rawWord6Opacity = useTransform(scrollYProgress, [0.72, 0.76, 0.88, 0.90], [0, 1, 1, 0]);
  const rawWord6Y = useTransform(scrollYProgress, [0.72, 0.76, 0.88, 0.90], [80, 0, 0, -80]);
  const word6Opacity = useSpring(rawWord6Opacity, springConfig);
  const word6Y = useSpring(rawWord6Y, springConfig);

  const rawWord7Opacity = useTransform(scrollYProgress, [0.74, 0.78, 0.88, 0.90], [0, 1, 1, 0]);
  const rawWord7Y = useTransform(scrollYProgress, [0.74, 0.78, 0.88, 0.90], [80, 0, 0, -80]);
  const word7Opacity = useSpring(rawWord7Opacity, springConfig);
  const word7Y = useSpring(rawWord7Y, springConfig);

  const rawWord8Opacity = useTransform(scrollYProgress, [0.90, 0.94], [0, 1]);
  const rawWord8Y = useTransform(scrollYProgress, [0.90, 0.94], [80, 0]);
  const word8Opacity = useSpring(rawWord8Opacity, springConfig);
  const word8Y = useSpring(rawWord8Y, springConfig);

  const rawWord9Opacity = useTransform(scrollYProgress, [0.92, 0.96], [0, 1]);
  const rawWord9Y = useTransform(scrollYProgress, [0.92, 0.96], [80, 0]);
  const word9Opacity = useSpring(rawWord9Opacity, springConfig);
  const word9Y = useSpring(rawWord9Y, springConfig);

  const rawWord10Opacity = useTransform(scrollYProgress, [0.94, 0.98], [0, 1]);
  const rawWord10Y = useTransform(scrollYProgress, [0.94, 0.98], [80, 0]);
  const word10Opacity = useSpring(rawWord10Opacity, springConfig);
  const word10Y = useSpring(rawWord10Y, springConfig);

  const lines = [
    [
      { text: "We", opacity: word1Opacity, y: word1Y },
      { text: "build", opacity: word2Opacity, y: word2Y },
      { text: "this", opacity: word3Opacity, y: word3Y },
      { text: "reality", opacity: word4Opacity, y: word4Y },
    ],
    [
      { text: "not", opacity: word5Opacity, y: word5Y },
      { text: "with", opacity: word6Opacity, y: word6Y },
      { text: "code,", opacity: word7Opacity, y: word7Y },
    ],
    [
      { text: "but", opacity: word8Opacity, y: word8Y },
      { text: "with", opacity: word9Opacity, y: word9Y },
      { text: "vision.", opacity: word10Opacity, y: word10Y, className: "rainbow-text" },
    ]
  ];

  // Smooth mouse coordinates
  const springConfigMouse = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfigMouse);
  const smoothMouseY = useSpring(mouseY, springConfigMouse);

  useWebGLVideo(canvasRef, videoRef, smoothMouseX, smoothMouseY);

  // Spotlight radial gradient that follows the mouse
  const spotlightMask = useMotionTemplate`radial-gradient(circle 500px at ${smoothMouseX}px ${smoothMouseY}px, rgba(0,255,0,0.6), transparent 80%)`;
  // Darken everything else a bit
  const darkenMask = useMotionTemplate`radial-gradient(circle 500px at ${smoothMouseX}px ${smoothMouseY}px, transparent 20%, rgba(0,0,0,0.8) 100%)`;

  // Parallax removed per request

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
          
          <motion.div 
            className="video-wrapper"
            style={{ scale: 1.05 }}
          >
            {!videoLoaded && (
              <div className="video-loader-overlay">
                <div className="ios-spinner"></div>
                <p>Decoding Matrix...</p>
              </div>
            )}
            
            <motion.video
              ref={videoRef}
              src="/video/upscaled-compressed.mp4"
              onCanPlayThrough={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="bg-video"
              style={{ opacity: 0, position: 'absolute', zIndex: -10 }} // Hide the video, use canvas
            />
            
            <canvas 
              ref={canvasRef} 
              className="bg-video pointer-events-none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Interactive Spotlight Overlay */}
            <motion.div 
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{ 
                background: spotlightMask,
                mixBlendMode: "color-dodge" 
              }}
            />
            <motion.div 
              className="pointer-events-none absolute inset-0 z-[4]"
              style={{ 
                background: darkenMask,
              }}
            />

            {/* Corner blur mask overlay */}
            <div className="corner-blur-overlay"></div>
            <div className="bottom-vignette-overlay"></div>
            <div className="top-vignette-overlay"></div>
          </motion.div>



          <motion.h1 style={{ opacity: titleOpacity, display: titleDisplay }} className="title-see-true">
            SEE THROUGH
          </motion.h1>

          {bgImageVisible && (
            <motion.div className="product-phrase-container">
              {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="product-phrase">
                  {line.map((word, i) => (
                    <motion.span
                      key={i}
                      style={{
                        opacity: word.opacity,
                        y: word.y,
                        display: "inline-block"
                      }}
                      className={word.className || ""}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </div>
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
