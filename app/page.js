'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Home() {
  const [scriptsReady, setScriptsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const loadScriptsSequentially = async () => {
      const scripts = [
        "https://cdn.conveythis.com/javascript/conveythis.js?api_key=pub_b647d78210f98f00ac45aaec54366390",
        "https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js",
        "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68f8983186a14adafbf05ee2",
        "https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/js/webflow.schunk.36b8fb49256177c8.js",
        "https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/js/webflow.schunk.c42549641b7d4501.js",
        "https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/js/webflow.schunk.667c22eb11299573.js",
        "https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/js/webflow.schunk.121b0d7ff03e0f4a.js",
        "https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/js/webflow.454d47b1.24adb832c33730dd.js",
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        "https://cdn.jsdelivr.net/npm/@finsweet/attributes-modal@1/modal.js"
      ];

      const loadScript = (src) => {
        return new Promise((resolve) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const s = document.createElement('script');
          s.src = src;
          s.async = false;
          s.onload = () => resolve();
          s.onerror = (err) => {
            console.warn("Failed to load script:", src, err);
            resolve(); // Resolve anyway to proceed to the next script and avoid blocking
          };
          document.body.appendChild(s);
        });
      };

      try {
        for (const src of scripts) {
          if (!active) return;
          await loadScript(src);
        }

        if (active) {
          console.log("🟢 All third-party scripts loaded post-hydration. Setting scriptsReady = true.");
          setScriptsReady(true);
          
          // Let inline scripts execute and bind, then re-init Webflow Interactions
          setTimeout(() => {
            if (active && window.Webflow) {
              console.log("🔄 Initializing Webflow Interactions...");
              try {
                window.Webflow.destroy();
                window.Webflow.ready();
                const ix2 = window.Webflow.require('ix2');
                if (ix2) {
                  ix2.init();
                }
                
                // Dispatch lifecycle events to trigger any remaining listeners
                document.dispatchEvent(new Event('DOMContentLoaded'));
                window.dispatchEvent(new Event('load'));
              } catch (e) {
                console.error("Webflow re-init error:", e);
              }
            }
          }, 100);
        }
      } catch (err) {
        console.error("Failed loading Webflow scripts dynamically:", err);
      }
    };

    const settleTimer = setTimeout(loadScriptsSequentially, 100);

    return () => {
      active = false;
      clearTimeout(settleTimer);
    };
  }, []);

  // Storytelling scroll animation logic
  useEffect(() => {
    let active = true;
    let ticking = false; // High-performance scroll animation throttle lock
    const totalFrames = 120;
    const images = [];
    
    // Set up canvas dimensions
    const resizeCanvas = () => {
      const activeCanvas = document.getElementById('story-canvas');
      if (!activeCanvas) return;
      const dpr = window.devicePixelRatio || 1; // Render sharp and premium on Retina displays
      const width = activeCanvas.offsetWidth || window.innerWidth;
      const height = activeCanvas.offsetHeight || window.innerHeight;
      activeCanvas.width = width * dpr;
      activeCanvas.height = height * dpr;
      drawFrame(currentProgressRef.current);
    };

    // Calculate aspect ratio cover fit
    function drawImageProp(context, img, x, y, w, h, offsetX = 0.5, offsetY = 0.5) {
      
      const iw = img.width;
      const ih = img.height;
      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let cx, cy, cw, ch;

      // Decide which part to crop
      if (nw < w) {
        const factor = w / nw;
        nw = w;
        nh = nh * factor;
      }
      if (nh < h) {
        const factor = h / nh;
        nh = h;
        nw = nw * factor;
      }

      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // Prevent out of bounds
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    };

    const drawFrame = (progress) => {
      const activeCanvas = document.getElementById('story-canvas');
      if (!activeCanvas) return;
      const activeCtx = activeCanvas.getContext('2d');
      if (!activeCtx) return;

      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * totalFrames))
      );
      
      const img = images[frameIndex];
      if (img && img.complete) {
        activeCtx.imageSmoothingEnabled = true;
        activeCtx.imageSmoothingQuality = 'high';
        activeCtx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
        drawImageProp(activeCtx, img, 0, 0, activeCanvas.width, activeCanvas.height);
      }
    };

    const currentProgressRef = { current: 0 };
    const targetProgressRef = { current: 0 };
    let animationFrameId = null;

    const animateFrames = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      
      // Snapping threshold: if difference is extremely small, snap to target and stop animation loop
      if (Math.abs(diff) < 0.0005) {
        currentProgressRef.current = targetProgressRef.current;
        drawFrame(currentProgressRef.current);
        
        const numFrames = 6;
        const activeIndex = Math.min(numFrames - 1, Math.floor(currentProgressRef.current * numFrames));
        for (let i = 0; i < numFrames; i++) {
          const el = document.getElementById(`story-frame-${i}`);
          if (el) {
            if (i === activeIndex) {
              el.classList.add('active');
            } else {
              el.classList.remove('active');
            }
          }
        }
        animationFrameId = null;
      } else {
        // Easing interpolation: 0.08 is smooth and responsive
        currentProgressRef.current += diff * 0.08;
        drawFrame(currentProgressRef.current);
        
        const numFrames = 6;
        const activeIndex = Math.min(numFrames - 1, Math.floor(currentProgressRef.current * numFrames));
        for (let i = 0; i < numFrames; i++) {
          const el = document.getElementById(`story-frame-${i}`);
          if (el) {
            if (i === activeIndex) {
              el.classList.add('active');
            } else {
              el.classList.remove('active');
            }
          }
        }
        animationFrameId = requestAnimationFrame(animateFrames);
      }
    };

    const handleScroll = () => {
      if (!active) return;

      const wrapper = document.getElementById('story-scroll-section');
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollHeight = wrapper.offsetHeight - window.innerHeight;
      
      // Calculate scroll progress from 0.0 to 1.0
      let progress = 0;
      if (rect.top <= 0 && scrollHeight > 0) {
        progress = Math.min(1.0, Math.max(0.0, -rect.top / scrollHeight));
      }
      
      targetProgressRef.current = progress;

      // Start the animation loop if it's not already running
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(animateFrames);
      }
    };

    // Preload images
    let loadedCount = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/images/story-frames/frame_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        loadedCount++;
        // If this image is the one that is currently active based on current progress, render it immediately
        if (i === Math.min(totalFrames - 1, Math.max(0, Math.floor(currentProgressRef.current * totalFrames)))) {
          drawFrame(currentProgressRef.current);
        }
      };
      images.push(img);
    }
    window.__storyDebug = {
      images,
      getLoadedCount: () => loadedCount,
      currentProgressRef,
      targetProgressRef
    };

    // Set up listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial sizes
    setTimeout(() => {
      resizeCanvas();
      handleScroll();
    }, 100);

    return () => {
      active = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scriptsReady]);

  return (
    <>

        <div className="black-preloader"></div>
        <div fs-scrolldisable-element="when-visible" style={{"display": "flex", "opacity": "1"}} className="preloader">
            <div className="preloader-progress-wrapper">
                <div className="preloader-progress-bar"></div>
            </div>
        </div>
        <div style={{"WebkitTransform": "translate3d(0, -110%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "MozTransform": "translate3d(0, -110%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "msTransform": "translate3d(0, -110%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)", "transform": "translate3d(0, -110%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"}} className="header">
            <div className="header-wrapper">
                <div className="header-container">
                    <div className="inner-header">
                        <a href="/" aria-current="page" className="w-inline-block w--current" style={{ textDecoration: 'none' }}>
                            <span className="logo-site-text">SSPR</span>
                        </a>
                        <div className="menu-wrapper">
                            <a href="/" aria-current="page" className="menu-link w-inline-block w--current">
                                <div>Home</div>
                            </a>
                            <a href="/about" className="menu-link w-inline-block">
                                <div>About Us</div>
                            </a>
                            <a href="/services" className="menu-link w-inline-block">
                                <div>Services</div>
                            </a>
                            <a href="/projects" className="menu-link w-inline-block">
                                <div>Projects</div>
                            </a>
                            <a href="/clients" className="menu-link w-inline-block">
                                <div>Clients</div>
                            </a>
                            <a href="/news" className="menu-link hide w-inline-block">
                                <div>What’s On</div>
                            </a>
                            <div className="menu-divider"></div>
                            <div className="for-weglot-container">
                                <div id="weglot-place" className="weglot-place"></div>
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f5c_Polygon%202%20(1).svg" loading="lazy" alt="" className="image" />
                            </div>
                            <div data-hover="true" data-delay="0" className="lang-header w-dropdown">
                                <div className="dropdown-lang w-dropdown-toggle">
                                    <div id="selected-lang">EN</div>
                                    <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f5c_Polygon%202%20(1).svg" loading="lazy" alt="" className="image" />
                                </div>
                                <nav className="dropdown-list w-dropdown-list">
                                    <a data-locale="en" id="lang-en" className="lang-dropdown-item conveythis-no-translate">EN</a>
                                    <a data-locale="zh" id="lang-zh" className="lang-dropdown-item conveythis-no-translate">CN</a>
                                    <a data-locale="th" id="lang-th" className="lang-dropdown-item conveythis-no-translate">TH</a>
                                    <a data-locale="vi" id="lang-vi" className="lang-dropdown-item conveythis-no-translate">VN</a>
                                </nav>
                            </div>
                            <a href="/contact" className="button w-inline-block">
                                <div>Contact Us</div>
                            </a>
                        </div>
                        <div data-w-id="7c7c22cd-ba1b-b721-1c02-1306f5b68d59" className="menu-hamburger">
                            <img loading="lazy" src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf060bb_hamburger-menu-svgrepo-com.svg" alt="" className="icon-menu-hamburger" />
                        </div>
                    </div>
                    <div className="w-embed">
                        <style dangerouslySetInnerHTML={{
  __html: `:root {
                                --text-primary: #2B1D17;
                                --text-secondary: #695E57;
                            }

                            body {
                                background: #F9F5EF !important;
                                color: var(--text-secondary) !important;
                            }

                            /* Primary Text Overrides */
                            h1, h2, h3, h4, h5, h6,
                            .section-text-black,
                            .heading-testi,
                            .counter-title-black,
                            .dba-text,
                            .mof-name,
                            .mof-title,
                            #selected-lang,
                            #selected-lang-mob,
                            .lang-dropdown-item,
                            .stra-title,
                            .big-text-1,
                            .big-text-2,
                            .big-text-3,
                            .big-text-4,
                            .big-text-2-testi,
                            .big-text-3-v2,
                            .big-text-4-places,
                            .big-text-2-new,
                            .big-text-1-uppercase,
                            .big-text-contact-hero {
                                color: var(--text-primary) !important;
                            }

                            /* Secondary Text Overrides */
                            p,
                            .text-desc,
                            .inner-right-content-text,
                            .cat-testi {
                                color: var(--text-secondary) !important;
                            }

                            /* Navigation Links */
                            .menu-link, .menu-link * {
                                color: var(--text-secondary) !important;
                            }
                            .menu-link:hover, .menu-link:hover *, .menu-link.w--current, .menu-link.w--current * {
                                color: #f57f00 !important;
                            }

                            .meta-about-s2-black {
                                color: var(--text-secondary) !important;
                            }
                            .meta-about-s2-black.active, .meta-about-s2-black:hover {
                                color: #FF8400 !important;
                            }

                            svg {
                                position: relative;
                            }

                            .bubble-act {
                                backdrop-filter: blur(5px);
                                border-radius: 100vw;
                            }

                            .text-desc a, label a {
                                color: #ffffff !important;
                            }

                            .card-country, .card-country-container {
                                 perspective: 100vw;
                                 perspective-origin: 50% 50%;
                             }
                             
                             /* Storytelling Scroll Frames styles */
                             .story-scroll-wrapper {
                                 position: relative;
                                 width: 100%;
                                 height: 900vh;
                                 background: #080808;
                                 z-index: 10;
                             }
                             .story-sticky-container {
                                 position: -webkit-sticky;
                                 position: sticky;
                                 top: 0;
                                 height: 100vh;
                                 width: 100%;
                                 overflow: hidden;
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                                 background: #080808;
                             }
                             .story-canvas {
                                 position: absolute;
                                 top: 0;
                                 left: 0;
                                 width: 100%;
                                 height: 100%;
                                 object-fit: cover;
                                 z-index: 1;
                             }
                             .story-overlay {
                                 position: absolute;
                                 inset: 0;
                                 background: linear-gradient(180deg, rgba(8, 8, 8, 0.15) 0%, rgba(8, 8, 8, 0.4) 100%);
                                 z-index: 2;
                             }
                             .story-content {
                                 position: relative;
                                 z-index: 3;
                                 width: 100%;
                                 height: 100%;
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                             }
                             .story-frame {
                                 position: absolute;
                                 opacity: 0;
                                 visibility: hidden;
                                 transform: translateY(30px);
                                 transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s;
                                 text-align: center;
                                 color: #ffffff;
                                 max-width: 800px;
                                 padding: 24px;
                                 display: flex;
                                 flex-direction: column;
                                 align-items: center;
                             }
                             .story-frame.active {
                                 opacity: 1;
                                 visibility: visible;
                                 transform: translateY(0);
                             }
                             .story-title {
                                 font-size: 3.5rem;
                                 font-weight: 800;
                                 color: #FF8400 !important;
                                 margin-bottom: 20px;
                                 letter-spacing: 2px;
                                 font-family: Outfit, sans-serif;
                                 text-shadow: 0 4px 12px rgba(0,0,0,0.5);
                             }
                             .sspr-title {
                                 font-family: 'Montserrat', sans-serif !important;
                                 font-size: 120px !important;
                                 font-weight: 900 !important;
                                 color: #FFFFFF !important;
                                 text-transform: uppercase !important;
                                 line-height: 1 !important;
                                 text-align: center !important;
                                 letter-spacing: normal !important;
                             }
                             @media (max-width: 767px) {
                                 .sspr-title {
                                     font-size: 48px !important;
                                 }
                             }
                             @media (max-width: 767px) {
                                 .story-title {
                                     font-size: 2.2rem;
                                     margin-bottom: 12px;
                                 }
                             }
                             .story-text {
                                 font-size: 1.6rem;
                                 color: #E5DED5 !important;
                                 line-height: 1.6;
                                 font-family: Outfit, sans-serif;
                                 font-weight: 300;
                                 text-shadow: 0 2px 8px rgba(0,0,0,0.5);
                             }
                             @media (max-width: 767px) {
                                 .story-text {
                                     font-size: 1.15rem;
                                     line-height: 1.5;
                                 }
                             }
                             .story-indicator-wrapper {
                                 margin-top: 30px;
                                 display: flex;
                                 flex-direction: column;
                                 align-items: center;
                             }
                             .story-indicator-text {
                                 font-size: 0.9rem;
                                 color: #969696;
                                 text-transform: uppercase;
                                 letter-spacing: 3px;
                                 font-family: Outfit, sans-serif;
                             }
                             .story-indicator-line {
                                 width: 2px;
                                 height: 45px;
                                 background: #FF8400;
                                 margin-top: 15px;
                                 border-radius: 2px;
                                 animation: storyBounce 2s infinite ease-in-out;
                             }
                             @keyframes storyBounce {
                                 0%, 100% {
                                     transform: translateY(0);
                                     opacity: 0.6;
                                 }
                                 50% {
                                     transform: translateY(10px);
                                     opacity: 1;
                                     height: 55px;
                                 }
                             }

                             /* Text-based SSPR Logo styling */
                              .logo-site-text {
                                  font-family: 'Montserrat', sans-serif !important;
                                  font-weight: 900 !important;
                                  font-size: 28px !important;
                                  color: #FF8400 !important;
                                  text-transform: uppercase !important;
                                  letter-spacing: -0.5px !important;
                                  line-height: 1 !important;
                                  display: inline-block !important;
                                  text-decoration: none !important;
                                  transition: color 0.3s ease !important;
                              }
                              .logo-site-text:hover {
                                  color: var(--text-primary) !important;
                              }
                              .logo-site-text.footer-logo {
                                  font-size: 32px !important;
                                  color: #FF8400 !important;
                              }
                              .logo-site-text.footer-logo:hover {
                                  color: #ffffff !important;
                              }

                             /* Contact Section styles */
                              .sspr-contact-section {
                                  background: #F9F5EF;
                                  padding: 100px 5vw;
                                  color: var(--text-primary);
                                  font-family: 'Outfit', sans-serif;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                  flex-wrap: wrap;
                                  gap: 50px;
                                  position: relative;
                                  z-index: 10;
                              }
                              .sspr-contact-left {
                                  flex: 1;
                                  min-width: 320px;
                                  max-width: 550px;
                              }
                              .sspr-contact-desc {
                                  font-size: 1.2rem;
                                  color: var(--text-secondary) !important;
                                  line-height: 1.6;
                                  font-family: 'Outfit', sans-serif;
                                  font-weight: 300;
                                  margin-bottom: 40px;
                                  text-align: left;
                              }
                              .sspr-contact-tag {
                                  color: #FF8400;
                                  text-transform: uppercase;
                                  font-size: 0.9rem;
                                  font-weight: 600;
                                  letter-spacing: 3px;
                                  margin-bottom: 20px;
                                  font-family: 'Outfit', sans-serif;
                              }
                              .sspr-contact-heading {
                                  font-family: 'Montserrat', sans-serif;
                                  font-size: 3.5rem;
                                  font-weight: 900;
                                  line-height: 1.1;
                                  text-transform: uppercase;
                                  margin-bottom: 30px;
                              }
                              .sspr-contact-heading span {
                                  color: #FF8400;
                              }
                              .sspr-contact-info-list {
                                  margin-top: 40px;
                                  display: flex;
                                  flex-direction: column;
                                  gap: 24px;
                              }
                              .sspr-contact-info-item {
                                  display: flex;
                                  align-items: flex-start;
                                  gap: 16px;
                              }
                              .sspr-contact-info-icon {
                                  color: #FF8400;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  margin-top: 4px;
                              }
                              .sspr-contact-info-text h4 {
                                  margin: 0 0 4px 0;
                                  font-size: 1rem;
                                  text-transform: uppercase;
                                  color: var(--text-secondary);
                                  letter-spacing: 1px;
                              }
                              .sspr-contact-info-text p {
                                  margin: 0;
                                  color: var(--text-primary) !important;
                                  font-size: 1.1rem;
                                  font-weight: 300;
                              }
                              .sspr-contact-right {
                                  flex: 1;
                                  min-width: 320px;
                                  max-width: 600px;
                                  background: #ffffff;
                                  padding: 48px;
                                  border-radius: 8px;
                                  border: 1px solid rgba(43, 29, 23, 0.1);
                                  box-shadow: 0 10px 30px rgba(43, 29, 23, 0.05);
                              }
                              .sspr-contact-form {
                                  display: flex;
                                  flex-direction: column;
                                  gap: 30px;
                              }
                              .sspr-form-group {
                                  position: relative;
                                  display: flex;
                                  flex-direction: column-reverse;
                                  gap: 6px;
                              }
                              .sspr-form-input {
                                  background: transparent;
                                  border: none;
                                  border-bottom: 1px solid rgba(43, 29, 23, 0.2);
                                  padding: 10px 0;
                                  color: var(--text-primary);
                                  font-size: 1.1rem;
                                  font-family: 'Outfit', sans-serif;
                                  outline: none;
                                  transition: all 0.3s;
                              }
                              .sspr-form-label {
                                  color: var(--text-secondary);
                                  font-size: 0.85rem;
                                  text-transform: uppercase;
                                  letter-spacing: 1.5px;
                                  transition: all 0.3s;
                                  transform-origin: left bottom;
                              }
                              .sspr-form-input:focus {
                                  border-bottom-color: #FF8400;
                              }
                              .sspr-form-input:focus ~ .sspr-form-label {
                                  color: #FF8400;
                              }
                              .sspr-form-btn {
                                  background: transparent;
                                  border: 1px solid #FF8400;
                                  color: var(--text-primary);
                                  padding: 16px 32px;
                                  font-family: 'Outfit', sans-serif;
                                  font-size: 1rem;
                                  text-transform: uppercase;
                                  font-weight: 600;
                                  letter-spacing: 2px;
                                  cursor: pointer;
                                  transition: all 0.3s;
                                  align-self: flex-start;
                                  margin-top: 10px;
                              }
                              .sspr-form-btn:hover {
                                  background: #FF8400;
                                  color: #ffffff;
                              }

                             /* Footer styles */
                             .sspr-footer {
                                 background: #020202;
                                 padding: 80px 5vw 30px 5vw;
                                 color: #ffffff;
                                 font-family: 'Outfit', sans-serif;
                                 position: relative;
                                 z-index: 10;
                                 border-top: 1px solid rgba(255,255,255,0.05);
                             }
                             .sspr-footer-top {
                                 display: grid;
                                 grid-template-columns: 2fr 1fr 1fr 1.5fr;
                                 gap: 50px;
                                 margin-bottom: 60px;
                             }
                             @media (max-width: 991px) {
                                 .sspr-footer-top {
                                     grid-template-columns: 1fr 1fr;
                                     gap: 40px;
                                 }
                             }
                             @media (max-width: 576px) {
                                 .sspr-footer-top {
                                     grid-template-columns: 1fr;
                                     gap: 35px;
                                 }
                                 .sspr-contact-section {
                                     padding: 60px 24px;
                                 }
                                 .sspr-contact-right {
                                     padding: 24px;
                                 }
                                 .sspr-contact-heading {
                                     font-size: 2.2rem;
                                 }
                             }
                             .sspr-footer-col.brand {
                                 display: flex;
                                 flex-direction: column;
                                 gap: 20px;
                             }
                             .sspr-footer-logo {
                                 height: 40px;
                                 align-self: flex-start;
                             }
                             .sspr-footer-desc {
                                 color: #969696;
                                 font-size: 1rem;
                                 line-height: 1.6;
                                 font-weight: 300;
                                 max-width: 320px;
                             }
                             .sspr-footer-socials {
                                 display: flex;
                                 gap: 16px;
                                 margin-top: 10px;
                             }
                             .sspr-footer-social-link {
                                 width: 40px;
                                 height: 40px;
                                 border-radius: 50%;
                                 background: rgba(255,255,255,0.05);
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                                 color: #ffffff;
                                 transition: all 0.3s;
                                 text-decoration: none;
                             }
                             .sspr-footer-social-link:hover {
                                 background: #FF8400;
                                 color: #000000;
                                 transform: translateY(-3px);
                             }
                             .sspr-footer-col h3 {
                                 font-family: 'Montserrat', sans-serif;
                                 font-size: 1.1rem;
                                 font-weight: 700;
                                 text-transform: uppercase;
                                 letter-spacing: 2px;
                                 margin-bottom: 25px;
                                 color: #FF8400;
                             }
                             .sspr-footer-links {
                                 display: flex;
                                 flex-direction: column;
                                 gap: 14px;
                             }
                             .sspr-footer-link {
                                 color: #969696;
                                 text-decoration: none;
                                 font-size: 1rem;
                                 transition: color 0.3s;
                                 font-weight: 300;
                             }
                             .sspr-footer-link:hover {
                                 color: #ffffff;
                             }
                             .sspr-footer-contact-item {
                                 display: flex;
                                 align-items: flex-start;
                                 gap: 12px;
                                 margin-bottom: 16px;
                                 color: #969696;
                                 font-size: 0.95rem;
                                 line-height: 1.5;
                                 font-weight: 300;
                             }
                             .sspr-footer-contact-item span {
                                 color: #FF8400;
                             }
                             .sspr-footer-bottom {
                                 border-top: 1px solid rgba(255,255,255,0.05);
                                 padding-top: 30px;
                                 display: flex;
                                 justify-content: space-between;
                                 align-items: center;
                                 flex-wrap: wrap;
                                 gap: 20px;
                             }
                             .sspr-footer-copy {
                                 color: #646464;
                                 font-size: 0.9rem;
                                 font-weight: 300;
                             }
                             .sspr-footer-bottom-links {
                                 display: flex;
                                 gap: 24px;
                             }
                             .sspr-footer-bottom-link {
                                 color: #646464;
                                 text-decoration: none;
                                 font-size: 0.9rem;
                                 transition: color 0.3s;
                                 font-weight: 300;
                             }
                             .sspr-footer-bottom-link:hover {
                                 color: #ffffff;
                             }
                             .sspr-contact-info-icon svg, .sspr-footer-social-link svg {
                                 display: inline-block;
                                 vertical-align: middle;
                             }
                             .sspr-contact-form label {
                                 pointer-events: none;
                             }
                              .sspr-form-input:placeholder-shown ~ .sspr-form-label {
                                  transform: translateY(28px) scale(1.15);
                                  color: var(--text-secondary);
                              }
                              .sspr-form-input:not(:placeholder-shown) ~ .sspr-form-label,
                              .sspr-form-input:focus ~ .sspr-form-label {
                                  transform: translateY(0) scale(1);
                                  color: #FF8400;
                              }
                              .sspr-form-group textarea.sspr-form-input:placeholder-shown ~ .sspr-form-label {
                                  transform: translateY(28px) scale(1.15);
                              }
                              .sspr-form-group textarea.sspr-form-input:not(:placeholder-shown) ~ .sspr-form-label,
                              .sspr-form-group textarea.sspr-form-input:focus ~ .sspr-form-label {
                                  transform: translateY(0) scale(1);
                                  color: #FF8400;
                              }`
                            }} />
                    </div>
                </div>
                <div className="mobile-menu">
                    <div className="mobile-menu-content">
                        <div className="inner-menu-mob">
                            <a href="/" aria-current="page" className="w-inline-block w--current" style={{ textDecoration: 'none' }}>
                                <span className="logo-site-text">SSPR</span>
                            </a>
                            <div data-w-id="35e45486-6968-c31d-2eda-05045eea4628" className="close-menu">
                                <div className="text-desc">Close</div>
                                <img loading="lazy" src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf060bc_close-icon.svg" alt="" className="icon-close" />
                            </div>
                        </div>
                        <div className="inner-menu-mob-ver">
                            <div className="menu-wrapper-mob">
                                <a href="/" aria-current="page" className="menu-link w-inline-block w--current">
                                    <div>Home</div>
                                </a>
                                <a href="/about" className="menu-link w-inline-block">
                                    <div>About Us</div>
                                </a>
                                <a href="/services" className="menu-link w-inline-block">
                                    <div>Services</div>
                                </a>
                                <a href="/projects" className="menu-link w-inline-block">
                                    <div>Projects</div>
                                </a>
                                <a href="/clients" className="menu-link w-inline-block">
                                    <div>Clients</div>
                                </a>
                                <a href="/news" className="menu-link hide w-inline-block">
                                    <div>What’s On</div>
                                </a>
                            </div>
                            <div className="div-block-23">
                                <div className="div-block-21">
                                    <div className="text-desc uppercase">Contact</div>
                                    <div className="text-desc grey">enquiry@sspr.com.sg</div>
                                    <div className="text-desc grey hide">8:00 AM to 4:00 PM</div>
                                    <div className="text-desc grey hide">Monday through Friday</div>
                                </div>
                                <div className="div-block-21">
                                    <div className="text-desc uppercase">Location</div>
                                    <div className="div-block-24">
                                        <a href="/singapore" className="text-desc grey">Singapore</a>
                                        <a href="/thailand" className="text-desc grey">Thailand</a>
                                        <a href="/vietnam" className="text-desc grey">Vietnam</a>
                                        <a href="/china" className="text-desc grey">China</a>
                                    </div>
                                </div>
                                <div className="div-block-22">
                                    <div className="social-media-wrapper">
                                        <a href="https://web.facebook.com/ssprdesignandbuild/?_rdc=1&_rdr#" target="_blank" className="social-media-v2 w-inline-block">
                                            <div className="social-media-icon w-embed">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    {/* !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                                    <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" fill="white"></path>
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="https://www.linkedin.com/company/9489025/admin/" target="_blank" className="social-media-v2 w-inline-block">
                                            <div className="social-media-icon w-embed">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    {/* !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                                    <path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="white"></path>
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="https://www.instagram.com/sspr_designbuild/" target="_blank" className="social-media-v2 w-inline-block">
                                            <div className="social-media-icon w-embed">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    {/* !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                                    <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" fill="white"></path>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                    <div data-hover="false" data-delay="0" id="drop-lang-mob" className="dropdown w-dropdown">
                                        <div className="dropdown-lang w-dropdown-toggle">
                                            <div id="selected-lang-mob">EN</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f5c_Polygon%202%20(1).svg" loading="lazy" alt="" className="image" />
                                        </div>
                                        <nav className="dropdown-list w-dropdown-list">
                                            <a href="#" className="lang-dropdown-item hide w-dropdown-link">EN</a>
                                            <a href="#" className="lang-dropdown-item hide w-dropdown-link">CN</a>
                                            <a href="#" className="lang-dropdown-item hide w-dropdown-link">TH</a>
                                            <a href="#" className="lang-dropdown-item hide w-dropdown-link">VN</a>
                                            <a data-locale="en" id="lang-en-mob" className="lang-dropdown-item conveythis-no-translate">EN</a>
                                            <a data-locale="zh" id="lang-zh-mob" className="lang-dropdown-item conveythis-no-translate">CN</a>
                                            <a data-locale="th" id="lang-th-mob" className="lang-dropdown-item conveythis-no-translate">TH</a>
                                            <a data-locale="vi" id="lang-vi-mob" className="lang-dropdown-item conveythis-no-translate">VN</a>
                                        </nav>
                                    </div>
                                </div>
                                <a href="/contact" className="button contact-mobile w-inline-block">
                                    <div>Contact Us</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Section 1 to 6: Storytelling Scroll Frames Sections */}
        <div className="story-scroll-wrapper" id="story-scroll-section">
            <div className="story-sticky-container">
                <canvas id="story-canvas" className="story-canvas" />
                <div className="story-overlay" />
                <div className="story-content">
                    
                    {/* Section 1: Story Frame 1 - INSPIRE */}
                    <div className="story-frame" id="story-frame-0">
                        <h2 className="story-title">01 / INSPIRE</h2>
                        <p className="story-text">We believe in designing workspaces that spark creativity, foster collaboration, and reflect your unique brand identity.</p>
                        <div className="story-indicator-wrapper">
                            <span className="story-indicator-text">Scroll to begin</span>
                            <div className="story-indicator-line" />
                        </div>
                    </div>

                    {/* Section 2: Story Frame 2 - PLAN */}
                    <div className="story-frame" id="story-frame-1">
                        <h2 className="story-title">02 / PLAN</h2>
                        <p className="story-text">Every successful project starts with a strategic plan. We analyze your workflow and operations to optimize every square meter.</p>
                    </div>

                    {/* Section 3: Story Frame 3 - DESIGN */}
                    <div className="story-frame" id="story-frame-2">
                        <h2 className="story-title">03 / DESIGN</h2>
                        <p className="story-text">Our world-class design team converts insights into inspiring concepts, balancing bold aesthetics with functional perfection.</p>
                    </div>

                    {/* Section 4: Story Frame 4 - BUILD */}
                    <div className="story-frame" id="story-frame-3">
                        <h2 className="story-title">04 / BUILD</h2>
                        <p className="story-text">With over 20 years of experience, we build with precision, quality, and complete accountability from start to finish.</p>
                    </div>

                    {/* Section 5: Story Frame 5 - LIFE */}
                    <div className="story-frame" id="story-frame-4">
                        <h2 className="story-title">05 / LIFE</h2>
                        <p className="story-text">Transforming a space for work into a space for life. Experience the future of commercial architecture with SSPR Design and Build.</p>
                    </div>

                    {/* Section 6: Story Frame 6 - WELCOME TO SSPR */}
                    <div className="story-frame" id="story-frame-5">
                        <h2 className="story-title sspr-title">WELCOME TO SSPR</h2>
                        <p className="story-text">Experience a space built for innovation, care, and excellence. Welcome to the future of SSPR, designed and built to perfection.</p>
                    </div>

                </div>
            </div>
        </div>

        {/* Section 7: Existing Section 1 - Who We Are / About Us */}
        <div className="section-2-black">
            <div className="s2-title-wrap mob vi-adjst">
                <div className="accent-text-black">about us</div>
                <div className="section-text-black desk">
                    Transform<br />
                    A Space for Work into<br />A Space for Life
                </div>
                <div className="section-text-black mob">
                    Transform a Space<br />for Work into a Space for Life
                </div>
                <div className="text-desc">SSPR Design and Build is a reliable interior designer &builder in Singapore that provides integrated services for industrial / office &retail spaces.</div>
            </div>
            <div className="s2-sticky-black">
                <div className="inner-section-s2-black left">
                    <div className="s2-title-wrap desktop">
                        <div className="accent-text-black">about us</div>
                        <div className="section-text-black">
                            Transform A Space for<br />Work, Into A Space for Life
                        </div>
                        <div className="text-desc">
                            SSPR Design and Build is a reliable interior designer &builder in Singapore that<br />provides integrated services for industrial / office &retail spaces.
                        </div>
                    </div>
                    <div className="meta-s2-wrap-black">
                        <div className="background-tabs-abt"></div>
                        <a id="meta-about" href="#about" className="meta-about-s2-black first w-inline-block">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                            <div id="meta-ab" className="meta-about-black">Who We Are</div>
                        </a>
                        <a id="meta-our-values" href="#our-values" className="meta-about-s2-black _2 w-inline-block">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                            <div className="meta-about-black">Our Values</div>
                        </a>
                        <a id="meta-our-team" href="#our-team" className="meta-about-s2-black _3 w-inline-block">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                            <div className="meta-about-black">Our Team</div>
                        </a>
                        <a id="meta-founders" href="#founders" className="meta-about-s2-black _4 w-inline-block">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                            <div className="meta-about-black small">Founders</div>
                        </a>
                    </div>
                    <div className="img-wrap-black">
                        <img src="/images/about-s2-3.webp" loading="lazy" alt="" id="img-about-us" className="img-about-black _1" />
                        <img src="/images/about-s2-1.webp" loading="lazy" alt="" id="img-our-values" className="img-about-black _2" />
                        <img src="/images/about-s2-2.webp" loading="lazy" alt="" id="img-our-team" className="img-about-black _3" />
                        <img src="/images/about-s2-1.webp" loading="lazy" alt="" id="img-founders" className="img-about-black _4" />
                        <div className="gradient-img-s2"></div>
                    </div>
                </div>
                <div className="inner-section-s2-black right">
                    <div className="scroll-rell-black">
                        <div className="scroll-card-item-v2 _1">
                            <div className="accent-text-v2">Who We Are</div>
                            <div className="counter-wrapper-v2">
                                <div className="counter-rell-black wwa">
                                    <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a789" className="counter-item-black _1">
                                        <div className="counter-text-black">10+</div>
                                        <div className="counter-title-black">
                                            Years of<br />Experience
                                        </div>
                                    </div>
                                    <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a78e" className="counter-item-black _2">
                                        <div className="counter-text-black">04</div>
                                        <div className="counter-title-black">
                                            Global Offices<br />In INDIA
                                        </div>
                                    </div>
                                    <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a793" className="counter-item-black _3">
                                        <div className="stat-number-container">
                                            <div className="counter-text-black">2</div>
                                            <div className="counter-text-black">M</div>
                                        </div>
                                        <div className="counter-title-black">
                                            SSP Project<br />Completed
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                        </div>
                        <div className="scroll-card-item-v2 _2">
                            <div className="accent-text-v2">our Values</div>
                            <div className="values-wrapper-v2">
                                <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a79d" className="values-card-v2 _1">
                                    <div className="title-card-values-v2">
                                        <div className="values-card-title-v2">Experience</div>
                                        <div className="description-text-v2">
                                            More than 10 years of <br />experiences in interior fit-out field
                                        </div>
                                    </div>
                                    <div className="values-number-v2">
                                        01<br />
                                    </div>
                                </div>
                                <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a7a8" className="values-card-v2 _2">
                                    <div className="title-card-values-v2">
                                        <div className="values-card-title-v2">Expansion</div>
                                        <div className="description-text-v2 value-card">
                                            8 regional offices<br />around INDIA
                                        </div>
                                    </div>
                                    <div className="values-number-v2">
                                        01<br />
                                    </div>
                                </div>
                                <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a7b3" className="values-card-v2 _3">
                                    <div className="title-card-values-v2">
                                        <div className="values-card-title-v2">Reliable</div>
                                        <div className="description-text-v2">Accountability and creditability</div>
                                    </div>
                                    <div className="values-number-v2">
                                        02<br />
                                    </div>
                                </div>
                                <div data-w-id="660a70d2-6b73-7416-9abd-24b96351a7bc" className="values-card-v2 _4">
                                    <div className="title-card-values-v2">
                                        <div className="values-card-title-v2">Performance</div>
                                        <div className="description-text-v2">Solid track record</div>
                                    </div>
                                    <div className="values-number-v2">
                                        04<br />
                                    </div>
                                </div>
                            </div>
                            <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                        </div>
                        <div className="scroll-card-item-v2 _3">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/690317e8e7c0cb8d0563563e_Our%20Team.svg" loading="lazy" data-w-id="8dc17493-a057-d132-c96c-9c121ed3d086" id="dba-title" alt="" className="dba-title" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/690318fbcf44d4eccda34154_Our%20Team_TH.svg" loading="lazy" id="dba-title-th" alt="" className="dba-title th" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/69031869b7de789538454da6_Our%20Team_VN.svg" loading="lazy" id="dba-title-vi" alt="" className="dba-title vi _2" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6903186ddc89bd68b9777c34_Our%20Team_CN.svg" loading="lazy" id="dba-title-zh" alt="" className="dba-title vi" />
                            <img data-w-id="660a70d2-6b73-7416-9abd-24b96351a7c7" loading="eager" alt="" src="/images/our team.png" className="dba-image" />
                            <div data-w-id="e840f924-5bf5-edaa-67af-d658ccabe520" className="dba-container">
                                <div className="dba">
                                    <div className="dba-text">INTERIOR DESIGNER</div>
                                    <div className="dba-text">|</div>
                                    <div className="dba-text">PROJECT MANAGEMENT </div>
                                    <div className="dba-text">|</div>
                                    <div className="dba-text">CONSTRUCTION TEAM</div>
                                    <div className="dba-text">|</div>
                                    <div className="dba-text">CAD TEAM</div>
                                </div>
                                <div className="dba bottom">
                                    <div className="dba-text">SITE SUPERVISOR &SAFETY TEAM</div>
                                    <div className="dba-text">|</div>
                                    <div className="dba-text">MECHANICAL &ELECTRICAL</div>
                                    <div className="dba-text">|</div>
                                    <div className="dba-text">QUANTITY SURVEYOR</div>
                                </div>
                            </div>
                            <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                        </div>
                        <div className="scroll-card-item-v2 _4">
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%201121%20(1).webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-500.webp 500w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-800.webp 800w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-1080.webp 1080w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%201121%20(1).webp 1161w" alt="" className="image-12" />
                            <div className="w-embed">
                                <style dangerouslySetInnerHTML={{
  __html: `.mof-image {
                                        -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 90%);
                                        -webkit-mask-repeat: no-repeat;
                                        mask-image: linear-gradient(to bottom, black 70%, transparent 90%);
                                        mask-repeat: no-repeat;
                                    }`
}} />
                            </div>
                            <div className="mof-image">
                                <div data-w-id="bcdf83d5-4bda-4bbc-eaa4-3e257f6f19e8" className="inner-mof m1">
                                    <div className="mof-name">Praveen</div>
                                    <div className="mof-title hide">Founder</div>
                                </div>
                                <div data-w-id="99a5c18a-7e69-8cb7-4871-5bbb224e8f8b" className="inner-mof m2">
                                    <div className="mof-name">Praveen</div>
                                    <div className="mof-title hide">Founder</div>
                                </div>
                                <div data-w-id="c1c0aa0d-ada8-83ee-6c5b-d42292f3b004" className="inner-mof m3">
                                    <div className="mof-name">Manoj</div>
                                    <div className="mof-title hide">Founder</div>
                                </div>
                                <div data-w-id="5d3c740d-f932-7f1b-a6b1-aeb6bc6c956f" className="inner-mof m5">
                                    <div className="mof-name">Sai</div>
                                    <div className="mof-title hide">Founder</div>
                                </div>
                                <div data-w-id="424182d8-304c-3b7b-8a67-8fc1eeea38d0" className="inner-mof m4">
                                    <div className="mof-name right">Manoj</div>
                                    <div className="mof-title right hide">Founder</div>
                                </div>
                            </div>
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05fcf_mof.svg" loading="lazy" data-w-id="03771e77-900f-0324-3c2c-405488200e71" id="mof-title" alt="" className="mof-title-big" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6901a4c82c6a234d7a79b530_fd-cth.svg" loading="lazy" id="mof-title-th" alt="" className="mof-title-big zh" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f9f738125d5bd39ba0ac9b_mof_cn.svg" loading="lazy" id="mof-title-zh" alt="" className="mof-title-big zh" />
                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f9f74304bebc287414cd3d_mof_viet.svg" loading="lazy" id="mof-title-vi" alt="" className="mof-title-big vi" />
                            <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                        </div>
                    </div>
                </div>
                <div className="swiper abt-thumb">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="meta-about-s2-mob">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                                <div id="meta-ab-1" className="meta-about-black">Who We Are</div>
                                <div id="meta-ab-vi-1" className="meta-about-black vi-ipad">Chúng tôi là ai</div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="meta-about-s2-mob">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                                <div id="meta-ab-2" className="meta-about-black">Our Values</div>
                                <div id="meta-ab-vi-2" className="meta-about-black vi-ipad-2">Giá trị của chúng tôi</div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="meta-about-s2-mob">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                                <div id="meta-ab-3" className="meta-about-black">Our Team</div>
                                <div id="meta-ab-vi-3" className="meta-about-black vi-ipad-2">Đội ngũ của chúng tôi</div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="meta-about-s2-mob">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05f4f_Polygon%202.svg" loading="lazy" alt="" className="img-icon-black" />
                                <div id="meta-ab-4" className="meta-about-black">Founders</div>
                                <div id="meta-ab-vi-4" className="meta-about-black vi-ipad-founders">Nhà Sáng Lập</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper abt-slide">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="scroll-card-item-v2 _1">
                                <div className="accent-text-v2 desk">Who We Are</div>
                                <div className="counter-wrapper-v2">
                                    <div className="counter-rell-black wwa">
                                        <div data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350ae0" className="counter-item-black _1">
                                            <div className="counter-text-black">10+</div>
                                            <div className="counter-title-black">
                                                Years of<br />Experience
                                            </div>
                                        </div>
                                        <div data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350ae7" className="counter-item-black _2">
                                            <div className="counter-text-black">04</div>
                                            <div className="counter-title-black">
                                                Global Offices<br />In INDIA
                                            </div>
                                        </div>
                                        <div data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350aee" className="counter-item-black _3">
                                            <div className="stat-number-container">
                                                <div className="counter-text-black">2</div>
                                                <div className="counter-text-black">M</div>
                                            </div>
                                            <div className="counter-title-black">
                                                SSP Project<br />Completed
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="scroll-card-item-v2 _2">
                                <div className="accent-text-v2 desk">our Values</div>
                                <div className="values-wrapper-v2">
                                    <div data-w-id="da38125a-ae4d-006e-8143-9dd4937bd121" className="values-card-v2 _1">
                                        <div className="title-card-values-v2">
                                            <div className="values-card-title-v2">Experience</div>
                                            <div className="description-text-v2">
                                                More than 10 years of <br />experiences in interior fit-out field
                                            </div>
                                        </div>
                                        <div className="values-number-v2">
                                            01<br />
                                        </div>
                                    </div>
                                    <div data-w-id="da38125a-ae4d-006e-8143-9dd4937bd12c" className="values-card-v2 _2">
                                        <div className="title-card-values-v2">
                                            <div className="values-card-title-v2">Expansion</div>
                                            <div className="description-text-v2 value-card">
                                                8 regional offices<br />around INDIA
                                            </div>
                                        </div>
                                        <div className="values-number-v2">
                                            01<br />
                                        </div>
                                    </div>
                                    <div data-w-id="da38125a-ae4d-006e-8143-9dd4937bd137" className="values-card-v2 _3">
                                        <div className="title-card-values-v2">
                                            <div className="values-card-title-v2">Reliable</div>
                                            <div className="description-text-v2">Accountability and creditability</div>
                                        </div>
                                        <div className="values-number-v2">
                                            02<br />
                                        </div>
                                    </div>
                                    <div data-w-id="da38125a-ae4d-006e-8143-9dd4937bd140" className="values-card-v2 _4">
                                        <div className="title-card-values-v2">
                                            <div className="values-card-title-v2">Performance</div>
                                            <div className="description-text-v2">Solid track record</div>
                                        </div>
                                        <div className="values-number-v2">
                                            04<br />
                                        </div>
                                    </div>
                                </div>
                                <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="scroll-card-item-v2 _3">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/690317e8e7c0cb8d0563563e_Our%20Team.svg" loading="lazy" data-w-id="a0e51a66-3e33-34dd-7ab1-42d94cf2f83f" id="dba-title-mob" alt="" className="dba-title" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/690318fbcf44d4eccda34154_Our%20Team_TH.svg" loading="lazy" data-w-id="32afc3eb-90a0-2788-9613-3bbe618fe2eb" id="dba-title-th-mob" alt="" className="dba-title" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/69031869b7de789538454da6_Our%20Team_VN.svg" loading="lazy" data-w-id="43122ea2-4116-cb3d-3aef-bb315fd995bb" id="dba-title-vi-mob" alt="" className="dba-title" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6903186ddc89bd68b9777c34_Our%20Team_CN.svg" loading="lazy" data-w-id="fb846bce-bb4c-a48e-a980-f50036d8935c" id="dba-title-zh-mob" alt="" className="dba-title" />
                                <img data-w-id="a0e51a66-3e33-34dd-7ab1-42d94cf2f840" sizes="(max-width: 1940px) 100vw, 1940px" alt="" src="/images/our team.png" loading="lazy" className="dba-image" />
                                <div className="dba-container mob">
                                    <div className="dba home mob">
                                        <div className="dba-text about">INTERIOR DESIGNER</div>
                                        <div className="dba-text about">|</div>
                                        <div className="dba-text about">PROJECT MANAGEMENT</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text about">CONSTRUCTION TEAM</div>
                                        <div className="dba-text about">|</div>
                                        <div className="dba-text about">CAD TEAM</div>
                                        <div className="dba-text about">|</div>
                                        <div className="dba-text about">SITE SUPERVISOR &SAFETY TEAM</div>
                                        <div className="dba-text about">|</div>
                                        <div className="dba-text about">MECHANICAL &ELECTRICAL</div>
                                        <div className="dba-text about">|</div>
                                        <div className="dba-text about">QUANTITY SURVEYOR</div>
                                    </div>
                                    <div className="dba home">
                                        <div className="dba-text">INTERIOR DESIGNER</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text">PROJECT MANAGEMENT</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text">CONSTRUCTION TEAM</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text">CAD TEAM</div>
                                    </div>
                                    <div className="dba mob hide-mob">
                                        <div className="dba-text">SITE SUPERVISOR &SAFETY TEAM</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text">MECHANICAL &ELECTRICAL</div>
                                        <div className="dba-text">|</div>
                                        <div className="dba-text">QUANTITY SURVEYOR</div>
                                    </div>
                                </div>
                                <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="scroll-card-item-v2 _4">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%201121%20(1).webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-500.webp 500w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-800.webp 800w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%25201121%2520(1)-p-1080.webp 1080w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf0611c_Ellipse%201121%20(1).webp 1161w" alt="" className="image-12" />
                                <div className="w-embed">
                                    <style dangerouslySetInnerHTML={{
  __html: `.mof-image {
                                            -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 90%);
                                            -webkit-mask-repeat: no-repeat;
                                            mask-image: linear-gradient(to bottom, black 70%, transparent 90%);
                                            mask-repeat: no-repeat;
                                        }`
}} />
                                </div>
                                <div className="mof-image">
                                    <div data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f092" className="inner-mof m1">
                                        <div className="mof-name">Praveen</div>
                                        <div className="mof-title">Founder</div>
                                    </div>
                                    <div data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f097" className="inner-mof m2">
                                        <div className="mof-name">Praveen</div>
                                        <div className="mof-title hide">Founder</div>
                                    </div>
                                    <div data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f09c" className="inner-mof m3">
                                        <div className="mof-name">Manoj</div>
                                        <div className="mof-title hide">Founder</div>
                                    </div>
                                    <div data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f0a1" className="inner-mof m5">
                                        <div className="mof-name">Sai</div>
                                        <div className="mof-title hide">Founder</div>
                                    </div>
                                    <div data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f0a6" className="inner-mof m4">
                                        <div className="mof-name right">Manoj</div>
                                        <div className="mof-title right">Founder</div>
                                    </div>
                                </div>
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf05fcf_mof.svg" loading="lazy" data-w-id="b65aac54-68ea-1463-6b93-217c8c78efca" id="mof-title-mob" alt="" className="mof-title-big" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f9f738125d5bd39ba0ac9b_mof_cn.svg" loading="lazy" data-w-id="e858b623-237c-a2a2-de93-1343e427d842" id="mof-title-zh-mob" alt="" className="mof-title-big" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6901a4c82c6a234d7a79b530_fd-cth.svg" loading="lazy" data-w-id="170bed4a-e242-631a-7215-db387bdfaf08" id="mof-title-th-mob" alt="" className="mof-title-big" />
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f9f74304bebc287414cd3d_mof_viet.svg" loading="lazy" data-w-id="b252354c-9ba8-1426-fa27-68d2a9155b41" id="mof-title-vi-mob" alt="" className="mof-title-big" />
                                <img loading="lazy" src="https://cdn.prod.website-files.com/68b69beea89e06e32c20e76e/68b69beea89e06e32c20e7c3_point-icon.svg" alt="" className="img-point-black-v2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rell-scroll-s2">
                <div id="about" data-w-id="bb1fc141-5274-a90a-9feb-94f4d6f96197" className="tg-card-1"></div>
                <div id="our-values" data-w-id="bb1fc141-5274-a90a-9feb-94f4d6f96198" className="tg-card-2"></div>
                <div id="our-team" data-w-id="bb1fc141-5274-a90a-9feb-94f4d6f96199" className="tg-card-3"></div>
                <div id="founders" data-w-id="bb1fc141-5274-a90a-9feb-94f4d6f9619a" className="tg-card-4"></div>
            </div>
        </div>
        {/* Section 8: Existing Section 2 - What We Do */}
        <div data-w-id="740b4779-8d95-53c8-a13c-ed2531866edf" className="section-3">
            <div className="gradient-line-s3"></div>
            <div className="inner-section-3 desk">
                <div style={{"opacity": "0"}} className="section-3-title">
                    <div className="sub-heading orange">what we do</div>
                    <div className="big-text-2 s2">Designing Life into Every Space</div>
                    <div className="text-desc center sec-3">SSPR Design and Build is a reliable interior designer &builder in Singapore that provides integrated services for industrial / office &retail spaces. We take pride in delivering personalized, professional.</div>
                </div>
                <div data-w-id="653b1a80-e3ed-cc3d-abf9-13120e82e9cb" style={{"opacity": "0"}} className="section-3-detail-wrapper">
                    <div className="box-rail">
                        <div className="_3d-box-wrapper">
                            <div className="box">
                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf060f0_MANAGEMENT_1.png" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf060f0_MANAGEMENT_1-p-500.png 500w, https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf060f0_MANAGEMENT_1-p-800.png 800w, https://cdn.prod.website-files.com/68f8983186a14adafbf060f0_MANAGEMENT_1.png 1000w" alt="" className="box-image dummy-1" />
                                <img src="/images/CONSTRUCTION_1D_NEW.webp" loading="lazy" alt="" className="box-image dummy-2" />
                                <img src="/images/im-PLANNING.webp" loading="lazy" alt="" className="box-image b-planning" />
                                <img src="/images/im-DESIGNING.webp" loading="lazy" alt="" className="box-image b-designing" />
                                <img src="/images/CONSTRUCTION_1_2.webp" loading="lazy" alt="" className="box-image b-construction" />
                                <img src="/images/MANAGEMENT_ADJUSTED.webp" loading="lazy" alt="" className="box-image b-management" />
                            </div>
                        </div>
                    </div>
                    <div className="section-3-detail">
                        <div className="section-3-card">
                            <div className="sec-3-card-detail">
                                <div className="numbering-1">01</div>
                                <div className="big-text-1">PLANNING</div>
                                <div className="sec-3-point-wrapper">
                                    <div className="sec-3-point center">
                                        <div className="point-number-container center">
                                            <div className="sub-heading orange hide">01</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Pre-release Planning and Site Survey</div>
                                    </div>
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">02</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text adjusted-width">Workplace Study Strategic Facilities Planning</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-3-detail">
                        <div className="section-3-card right">
                            <div className="sec-3-card-detail auto">
                                <div className="numbering-1">02</div>
                                <div className="big-text-1">DESIGNING</div>
                                <div className="sec-3-point-wrapper">
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">01</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Design Consultation and Development</div>
                                    </div>
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">02</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Design &Build / Minor Additional &Alteration Works</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-3-detail">
                        <div className="section-3-card const">
                            <div className="sec-3-card-detail">
                                <div className="numbering-1">03</div>
                                <div className="big-text-1">CONSTRUCTION</div>
                                <div className="sec-3-point-wrapper">
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">01</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Construction &Project Management</div>
                                    </div>
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">02</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Reinstatement Specialist</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-3-detail">
                        <div className="section-3-card right">
                            <div className="sec-3-card-detail auto mana">
                                <div className="numbering-1">04</div>
                                <div className="big-text-1 right">MANAGEMENT</div>
                                <div className="sec-3-point-wrapper">
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">01</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">Move &Migration Management</div>
                                    </div>
                                    <div className="sec-3-point center">
                                        <div className="point-number-container">
                                            <div className="sub-heading orange hide">02</div>
                                            <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet" />
                                        </div>
                                        <div className="sect-3-point-text">After Sales / Facility Maintenance Services</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{"width": "0%", "height": "0%"}} className="border-grad-animation"></div>
            </div>
            <div className="inner-section-3 mob">
                <div className="section-3-title mob">
                    <div className="sub-heading orange">what we do</div>
                    <div className="big-text-2 s2">
                        Designing Life into<br />Every Space
                    </div>
                    <div className="text-desc center sec-3">SSPR Design and Build is a reliable interior designer &builder in Singapore that provides integrated services for industrial / office &retail spaces. We take pride in delivering personalized, professional.</div>
                </div>
                <div className="swiper what-we-do">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="section-3-card mob">
                                <img src="/images/im-PLANNING.webp" loading="lazy" alt="" className="img-planning" />
                                <div className="sec-3-card-detail">
                                    <div className="numbering-1">01</div>
                                    <div className="big-text-1">PLANNING</div>
                                    <div className="sec-3-point-wrapper">
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">01</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">Pre-release Planning and Site Survey</div>
                                        </div>
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">02</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text adjusted-width">Workplace Study Strategic Facilities Planning</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="section-3-card mob">
                                <img src="/images/im-DESIGNING.webp" loading="lazy" alt="" className="img-planning" />
                                <div className="sec-3-card-detail">
                                    <div className="numbering-1">02</div>
                                    <div className="big-text-1">DESIGNING</div>
                                    <div className="sec-3-point-wrapper">
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">01</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">Design Consultation and Development</div>
                                        </div>
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">02</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text width-2">Design &Build / Minor Additional &Alteration Works</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="section-3-card mob">
                                <img src="/images/CONSTRUCTION_1_2.webp" loading="lazy" alt="" className="img-planning" />
                                <div className="sec-3-card-detail">
                                    <div className="numbering-1">03</div>
                                    <div className="big-text-1">CONSTRUCTION</div>
                                    <div className="sec-3-point-wrapper">
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">01</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">Construction &Project Management</div>
                                        </div>
                                        <div className="sec-3-point">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">02</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">Reinstatement Specialist</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="section-3-card mob">
                                <img src="/images/MANAGEMENT_2.webp" loading="lazy" alt="" className="img-planning" />
                                <div className="sec-3-card-detail">
                                    <div className="numbering-1">04</div>
                                    <div className="big-text-1 right">MANAGEMENT</div>
                                    <div className="sec-3-point-wrapper">
                                        <div className="sec-3-point center">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">01</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">Move &Migration Management</div>
                                        </div>
                                        <div className="sec-3-point">
                                            <div className="point-number-container home">
                                                <div className="sub-heading orange hide">02</div>
                                                <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/6902fd1f668cda0eb1dc839a_orange%20bullet.svg" loading="lazy" alt="" className="img-bullet home" />
                                            </div>
                                            <div className="sect-3-point-text">After Sales / Facility Maintenance Services</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-arrow-wwd">
                        <div className="wwd-prev">
                            <div className="embed-svg w-embed">
                                <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.359649" y="0.359649" width="36.6842" height="36.6842" rx="18.3421" transform="matrix(-1 0 0 1 36.6987 0)" stroke="white" strokeWidth="0.719298"></rect>
                                    <path d="M23.7517 17.9877L14.9403 17.9877L18.7166 14.2113L18.2418 13.6719L13.5664 18.3473L18.2418 23.0228L18.7166 22.4833L14.9403 18.707L23.7517 18.707L23.7517 17.9877Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="wwd-next">
                            <div className="embed-svg w-embed">
                                <svg viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.969024" y="0.359649" width="36.6842" height="36.6842" rx="18.3421" stroke="white" strokeWidth="0.719298"></rect>
                                    <path d="M14.2757 17.9877L23.0871 17.9877L19.3108 14.2113L19.7855 13.6719L24.4609 18.3473L19.7855 23.0228L19.3108 22.4833L23.0871 18.707L14.2757 18.707L14.2757 17.9877Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{"width": "0%", "height": "0%"}} className="border-grad-animation"></div>
            </div>
            <div className="gradient-circle-s3"></div>
        </div>
        {/* Section 9: Existing Section 3 - Why SSPR? / Strategy */}
        <div className="section-4">
            <div className="inner-section-4">
                <div className="inner-section-4-title">
                    <div className="big-text-3 text-section-4 desk vi-adjst">
                        Bold Design. Clear Strategy.<br />Dependable Results.
                    </div>
                    <div className="big-text-3 text-section-4 mob">
                        Bold Design.<br />
                        Clear Strategy.<br />Dependable Results.
                    </div>
                    <div className="inner-section-4-right">
                        <div className="sub-heading orange hide">WHY SSPR?</div>
                        <div className="text-desc width-mob-90">SSPR is founded upon the idea of providing first-rate quality design &construction work tailored to each client’s specific needs.  We are an integrated total solutions provider for industrial / office &retail fit-out projects.</div>
                    </div>
                </div>
                <div className="sect-4-big-text-wrap">
                    <div data-w-id="776619ed-e44c-db72-7078-28810dae2d64" className="sect-4-big-text _1">perfectly designed</div>
                    <div data-w-id="f4bd3ece-56a2-a226-97c7-246481eb5cb2" className="sect-4-big-text _2">carefully planned</div>
                    <div data-w-id="a5cb5e24-ffc6-aebe-ba94-58f4f41022a7" className="sect-4-big-text _3">smartly executed</div>
                </div>
                <div data-w-id="b3f8fef3-e717-afb8-6c65-a644c56fcc7f" className="strategy-container">
                    <div data-w-id="487dec34-9760-df7b-b68d-2bb73b904e39" className="strategy-circle c1">
                        <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06013_icon-str-1.svg" loading="lazy" alt="" className="ico-stra" />
                        <div className="stra-title">
                            Perfectly<br />Designed
                        </div>
                        <div data-w-id="d13774df-788d-e92c-00ab-989bb79c0ac2" className="text-desc center strategy">We are design and construction professionals that focus on delivering innovative, creative projects which meet our client’s standards.</div>
                    </div>
                    <div data-w-id="caaf14d2-61de-09a2-efe6-9fb5a36eee0c" className="strategy-circle c2">
                        <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06012_icon-str-3.svg" loading="lazy" alt="" className="ico-stra" />
                        <div className="stra-title">
                            Carefully<br />Planned
                        </div>
                        <div data-w-id="821708b3-a122-9ccc-eaa6-4f8587af02ef" className="text-desc center strategy">We analyse the nature of your business, operations requirement and workflow of your organization.</div>
                    </div>
                    <div data-w-id="5306eab6-ba48-c122-b592-1fa5038053e9" className="strategy-circle c3">
                        <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06011_icon-str-2.svg" loading="lazy" alt="" className="ico-stra" />
                        <div className="stra-title">
                            Smartly<br />Executed
                        </div>
                        <div data-w-id="0f2992bb-68aa-b69a-c1fd-a41651b37e8f" className="text-desc center strategy">Our efficient project execute team ensure projects are delivered in a timely manner including to perform inspection.</div>
                    </div>
                </div>
                <div className="mobile-three-cricle">
                    <div className="swiper three-circle-mobs">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div data-w-id="d360f780-9a6d-e9e9-d285-a8d144dc7220" className="strategy-circle c1">
                                    <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06013_icon-str-1.svg" loading="lazy" alt="" className="ico-stra" />
                                    <div className="stra-title">
                                        Perfectly<br />Designed
                                    </div>
                                    <div data-w-id="d360f780-9a6d-e9e9-d285-a8d144dc7226" className="text-desc center strategy">We are design and construction professionals that focus on delivering innovative, creative projects which meet our client’s standards.</div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div data-w-id="72390665-8ba1-39bb-139f-cc0ead5c5544" className="strategy-circle c2">
                                    <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06012_icon-str-3.svg" loading="lazy" alt="" className="ico-stra" />
                                    <div className="stra-title">
                                        Carefully<br />Planned
                                    </div>
                                    <div className="text-desc center strategy _2">We analyse the nature of your business, operations requirement and workflow of your organization.</div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div data-w-id="ac89da25-5e5b-1246-3382-a703fe9b35ed" className="strategy-circle c3">
                                    <img src="https://cdn.prod.website-files.com/68f8983186a14adafbf05ee2/68f8983186a14adafbf06011_icon-str-2.svg" loading="lazy" alt="" className="ico-stra" />
                                    <div className="stra-title">
                                        Smartly<br />Executed
                                    </div>
                                    <div className="text-desc center strategy _3">Our efficient project execute team ensure projects are delivered in a timely manner including to perform inspection.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-4-masking"></div>
            </div>
        </div>
        <div className="rail-for-section-4">
            <div className="section-4-rail">
                <div data-w-id="7a27a543-1b33-545e-e0e9-c271e88c909d" className="inner-sec-4rail"></div>
                <div data-w-id="7a27a543-1b33-545e-e0e9-c271e88c909e" className="inner-sec-4rail s2"></div>
                <div data-w-id="7a27a543-1b33-545e-e0e9-c271e88c909f" className="inner-sec-4rail s3"></div>
                <div data-w-id="7a27a543-1b33-545e-e0e9-c271e88c90a0" className="inner-sec-4rail s4"></div>
            </div>
        </div>
        <div id="skip-button-circle" className="skip-section-button-new">
            <a href="#skip-circle" className="skip-section w-inline-block">
                <div className="text-desc vertical">Skip Section</div>
                <div className="skip-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none">
                        <path d="M0.251261 4.98376L9.06266 4.98376L5.28635 1.20744L5.76109 0.667969L10.4365 5.34341L5.76108 10.0188L5.28635 9.47937L9.06266 5.70306L0.251261 5.70306L0.251261 4.98376Z" fill="white"></path>
                    </svg>
                </div>
            </a>
        </div>
        {/* Section 11: Contact Us Section */}
        <div id="contact-us" className="sspr-contact-section">
            <div className="sspr-contact-left">
                <div className="sspr-contact-tag">Contact Us</div>
                <h2 className="sspr-contact-heading">Let's build something <span>extraordinary</span> together.</h2>
                <p className="sspr-contact-desc">
                    Have a project in mind or want to know more about our services? Get in touch with our team of specialists today.
                </p>
                <div className="sspr-contact-info-list">
                    <div className="sspr-contact-info-item">
                        <div className="sspr-contact-info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                        </div>
                        <div className="sspr-contact-info-text">
                            <h4>Phone</h4>
                            <p>+65 6250 8820</p>
                        </div>
                    </div>
                    <div className="sspr-contact-info-item">
                        <div className="sspr-contact-info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                            </svg>
                        </div>
                        <div className="sspr-contact-info-text">
                            <h4>Email</h4>
                            <p>enquiry@sspr.com.sg</p>
                        </div>
                    </div>
                    <div className="sspr-contact-info-item">
                        <div className="sspr-contact-info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                        </div>
                        <div className="sspr-contact-info-text">
                            <h4>Headquarters</h4>
                            <p>SSPR Tower, 8 Marina Boulevard, #32-01, Singapore 018981</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="sspr-contact-right">
                <form className="sspr-contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="sspr-form-group">
                        <input type="text" className="sspr-form-input" id="form-name" required placeholder=" " />
                        <label htmlFor="form-name" className="sspr-form-label">Full Name</label>
                    </div>
                    <div className="sspr-form-group">
                        <input type="email" className="sspr-form-input" id="form-email" required placeholder=" " />
                        <label htmlFor="form-email" className="sspr-form-label">Email Address</label>
                    </div>
                    <div className="sspr-form-group">
                        <input type="text" className="sspr-form-input" id="form-service" required placeholder=" " />
                        <label htmlFor="form-service" className="sspr-form-label">Project Type / Services Needed</label>
                    </div>
                    <div className="sspr-form-group">
                        <textarea className="sspr-form-input" id="form-message" rows="4" required placeholder=" " style={{ resize: 'none' }}></textarea>
                        <label htmlFor="form-message" className="sspr-form-label">Project Details</label>
                    </div>
                    <button type="submit" className="sspr-form-btn">Send Enquiry</button>
                </form>
            </div>
        </div>

        {/* Section 12: Footer Section */}
        <footer className="sspr-footer">
            <div className="sspr-footer-top">
                <div className="sspr-footer-col brand">
                    <span className="logo-site-text footer-logo" style={{ marginBottom: '15px' }}>SSPR</span>
                    <p className="sspr-footer-desc">
                        A reliable leader in design and build solutions across Asia Pacific. Transforming spaces for work into spaces for life with absolute quality and precision.
                    </p>
                    <div className="sspr-footer-socials">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sspr-footer-social-link" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sspr-footer-social-link" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sspr-footer-social-link" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.07 5.07 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div className="sspr-footer-col">
                    <h3>Services</h3>
                    <div className="sspr-footer-links">
                        <a href="/services" className="sspr-footer-link">Interior Design</a>
                        <a href="/services" className="sspr-footer-link">Project Management</a>
                        <a href="/services" className="sspr-footer-link">Design & Build</a>
                        <a href="/services" className="sspr-footer-link">M&E Consultation</a>
                        <a href="/services" className="sspr-footer-link">Space Planning</a>
                    </div>
                </div>
                
                <div className="sspr-footer-col">
                    <h3>Company</h3>
                    <div className="sspr-footer-links">
                        <a href="/about" className="sspr-footer-link">About Us</a>
                        <a href="/about#our-values" className="sspr-footer-link">Our Values</a>
                        <a href="/about#our-team" className="sspr-footer-link">Our Team</a>
                        <a href="/about#founders" className="sspr-footer-link">Founders</a>
                        <a href="/news" className="sspr-footer-link">What's On</a>
                    </div>
                </div>
                
                <div className="sspr-footer-col">
                    <h3>Contact Info</h3>
                    <div className="sspr-footer-contact-item">
                        <span>📍</span> SSPR Tower, 8 Marina Boulevard,<br />#32-01, Singapore 018981
                    </div>
                    <div className="sspr-footer-contact-item">
                        <span>📞</span> +65 6250 8820
                    </div>
                    <div className="sspr-footer-contact-item">
                        <span>✉️</span> enquiry@sspr.com.sg
                    </div>
                </div>
            </div>
            
            <div className="sspr-footer-bottom">
                <div className="sspr-footer-copy">
                    &copy; {new Date().getFullYear()} SSPR Singapore. All rights reserved. Co. Reg No: 200408253E.
                </div>
                <div className="sspr-footer-bottom-links">
                    <a href="/privacy-policy" className="sspr-footer-bottom-link">Privacy Policy</a>
                    <a href="/terms" className="sspr-footer-bottom-link">Terms & Conditions</a>
                </div>
            </div>
        </footer>

        {scriptsReady && (<><Script id="inline-script-7" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `/*window.onload = function() {
  setTimeout(() => {
    //console.log('abc');
    // deteksi apakah mobile/tablet (lebar layar di bawah 1024px)
    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    const selectedLang = document.getElementById(isMobileOrTablet ? "selected-lang-mob" : "selected-lang");
    if (!selectedLang) return;

    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const locale = (urlParams.get("locale") || "en").toLowerCase();

    const langMap = {
      "en": "EN",
      "zh": "CN",
      "th": "TH",
      "vi": "VN"
    };

    // update text pada element yang sesuai
    console.log([locale, selectedLang])
    selectedLang.textContent = langMap[locale] || "EN";
    selectedLang.classList.add("conveythis-no-translate");

    // update semua item dropdown
    document.querySelectorAll(".lang-dropdown-item").forEach(item => {
      const newLocale = item.getAttribute("data-locale");
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("locale", newLocale);
      item.setAttribute("href", newUrl.toString());
      item.classList.add("conveythis-no-translate");
    });

    // simpan locale di session
    sessionStorage.setItem("selectedLocale", locale);

    // redirect otomatis ke locale terakhir
    if (!urlParams.has("locale") && sessionStorage.getItem("selectedLocale")) {
      const savedLocale = sessionStorage.getItem("selectedLocale");
      if (savedLocale && savedLocale !== "en") {
        const redirectUrl = new URL(window.location.href);
        redirectUrl.searchParams.set("locale", savedLocale);
        window.history.replaceState({}, "", redirectUrl.toString());
        selectedLang.textContent = langMap[savedLocale] || "EN";
      }
    }
  }, 1500);
};*/

            //window.onload = function () {
            document.addEventListener("DOMContentLoaded", function() {
                setTimeout( () => {

                    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
                    const selectedLang = document.getElementById(isMobileOrTablet ? "selected-lang-mob" : "selected-lang");
                    if (!selectedLang)
                        return;

                    const pathParts = window.location.pathname.split("/").filter(Boolean);
                    const supportedLocales = ["zh", "th", "vi"];
                    const locale = supportedLocales.includes(pathParts[0]) ? pathParts[0] : "en";

                    const langMap = {
                        en: "EN",
                        zh: "CN",
                        th: "TH",
                        vi: "VN"
                    };

                    // update current language label
                    selectedLang.textContent = langMap[locale] || "EN";
                    selectedLang.classList.add("wf-no-translate");

                    // update dropdown items
                    document.querySelectorAll(".lang-dropdown-item").forEach(item => {
                        const newLocale = item.getAttribute("data-locale");
                        if (!newLocale)
                            return;

                        const originalParts = window.location.pathname.split("/").filter(Boolean);
                        let cleanParts = [...originalParts];

                        // hapus locale lama JIKA ADA
                        if (supportedLocales.includes(cleanParts[0])) {
                            cleanParts.shift();
                        }

                        // bangun path baru
                        let newPath = "/" + cleanParts.join("/");

                        // EN = root
                        if (newLocale !== "en") {
                            newPath = "/" + newLocale + newPath;
                        }

                        const finalUrl = window.location.origin + newPath.replace(/\\/+/g, "/") + window.location.search + window.location.hash;

                        item.setAttribute("href", finalUrl);
                    }
                    );

                }
                , 1500);
                //};
            });`
}} />
        <Script id="inline-script-8" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", function() {
                const isMobile = window.matchMedia("(max-width: 991px)").matches;
                // Webflow breakpoint tablet ke bawah
                if (!isMobile)
                    return;
                // keluar kalau bukan mobile/tablet

                const dropdown = document.getElementById("drop-lang-mob");
                if (!dropdown)
                    return;

                const toggle = dropdown.querySelector(".w-dropdown-toggle");
                const list = dropdown.querySelector(".w-dropdown-list");
                if (!toggle || !list)
                    return;

                toggle.addEventListener("click", () => {
                    // tunggu Webflow buka dulu
                    setTimeout( () => {
                        const rect = list.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - rect.bottom;
                        const spaceAbove = rect.top;

                        // jika ruang di bawah kecil → buka ke atas
                        if (spaceBelow < list.offsetHeight && spaceAbove > spaceBelow) {
                            list.classList.add("open-up");
                        } else {
                            list.classList.remove("open-up");
                        }
                    }
                    , 50);
                }
                );
            });`
}} />
        
        
        <Script id="inline-script-11" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `const runPreloader = () => {
                const body = document.body;
                const preloader = document.querySelector(".preloader");

                if (!preloader)
                    return;

                body.style.overflow = "hidden";

                const observer = new MutationObserver( () => {
                    if (window.getComputedStyle(preloader).display === "none") {
                        body.style.overflow = "auto";
                        observer.disconnect();
                    }
                }
                );

                observer.observe(preloader, {
                    attributes: true
                });

                // Automatically release preloader and scroll lock once window loads
                const releasePreloader = () => {
                    const blackPreloader = document.querySelector(".black-preloader");
                    setTimeout(() => {
                        preloader.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
                        preloader.style.opacity = "0";
                        preloader.style.visibility = "hidden";
                        
                        if (blackPreloader) {
                            blackPreloader.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
                            blackPreloader.style.opacity = "0";
                            blackPreloader.style.visibility = "hidden";
                        }
                        
                        setTimeout(() => {
                            preloader.style.display = "none";
                            if (blackPreloader) {
                                blackPreloader.style.display = "none";
                            }
                            body.style.overflow = "auto";
                        }, 600);
                    }, 400);
                };

                if (document.readyState === "complete" || document.readyState === "interactive") {
                    releasePreloader();
                } else {
                    window.addEventListener("load", releasePreloader);
                }
                setTimeout(releasePreloader, 500); // Bulletproof fallback
            };

            if (document.readyState !== "loading") {
                runPreloader();
            } else {
                document.addEventListener("DOMContentLoaded", runPreloader);
            }`
}} />
        <Script id="inline-script-12" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `(function() {

                const bar = document.querySelector(".preloader-progress-bar");
                if (!bar)
                    return;

                // ambil asset aman saja (tanpa script — Safari bug)
                const assets = [...document.images, ...document.querySelectorAll('link[rel="stylesheet"]')];

                let loaded = 0;
                const total = assets.length || 1;

                let visualProgress = 0;
                let targetProgress = 0;

                // smooth animation biar IX2 gak reset
                function animateBar() {
                    visualProgress += (targetProgress - visualProgress) * 0.08;
                    bar.style.width = visualProgress + "%";

                    if (visualProgress < 99.9) {
                        requestAnimationFrame(animateBar);
                    } else {
                        bar.style.width = "100%";
                    }
                }
                animateBar();

                function update() {
                    targetProgress = (loaded / total) * 100;
                }

                function done() {
                    loaded++;
                    if (loaded > total)
                        loaded = total;
                    update();
                }

                assets.forEach(el => {
                    if (el.complete) {
                        done();
                    } else {
                        el.addEventListener("load", done, {
                            once: true
                        });
                        el.addEventListener("error", done, {
                            once: true
                        });
                    }
                }
                );

                // fallback kalau Safari skip event
                setTimeout( () => {
                    loaded = total;
                    update();
                }
                , 8000);

                // finish saat window load
                const finishProgress = () => {
                    loaded = total;
                    update();
                };

                if (document.readyState === "complete" || document.readyState === "interactive") {
                    finishProgress();
                } else {
                    window.addEventListener("load", finishProgress);
                }
                setTimeout(finishProgress, 500); // Bulletproof fallback

            }
            )();`
}} />
        <Script id="inline-script-13" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", function() {
                let gapVW = window.innerWidth * 0.01;
                const isMobile = window.innerWidth <= 767;
                // breakpoint mobile

                // Thumbnail Swiper
                var thumbSwiper = new Swiper(".swiper.thumbnail-building-3d",{
                    direction: isMobile ? "horizontal" : "vertical",
                    spaceBetween: gapVW,
                    slidesPerView: isMobile ? 5 : 6,
                    watchSlidesProgress: true,
                });

                // Main Swiper (selalu vertical untuk motion)
                var mainSwiper = new Swiper(".swiper.building-3d",{
                    direction: "vertical",
                    spaceBetween: gapVW,
                    speed: 1000,
                    preventClicks: false,
                    preventClicksPropagation: false,
                    allowTouchMove: !isMobile,
                    // disable swipe vertical di mobile
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    thumbs: {
                        swiper: thumbSwiper,
                    },
                });

                // Project Desc Swiper
                var descSwiper = new Swiper(".swiper.project-desc",{
                    slidesPerView: 1,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 1000,
                    allowTouchMove: false,
                    autoHeight: false,
                    // 🔑 tinggi dynamic sesuai slide konten
                });

                // Project Video Swiper
                var videoSwiper = new Swiper(".swiper.project-video",{
                    slidesPerView: 1,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 1000,
                    allowTouchMove: false,
                });

                // Sync semua swiper
                mainSwiper.controller.control = [thumbSwiper, descSwiper, videoSwiper];
                descSwiper.controller.control = mainSwiper;
                videoSwiper.controller.control = mainSwiper;

                // --- Custom swipe horizontal di mobile ---
                if (isMobile) {
                    let startX = 0;
                    let endX = 0;
                    const el = document.querySelector(".swiper.building-3d");

                    el.addEventListener("touchstart", (e) => {
                        startX = e.touches[0].clientX;
                    }
                    );

                    el.addEventListener("touchend", (e) => {
                        endX = e.changedTouches[0].clientX;
                        let diffX = endX - startX;

                        if (Math.abs(diffX) > 50) {
                            // threshold
                            if (diffX < 0) {
                                mainSwiper.slideNext();
                                // swipe kiri → next (motion tetap vertical)
                            } else {
                                mainSwiper.slidePrev();
                                // swipe kanan → prev
                            }
                        }
                    }
                    );
                }

                // Update gap kalau resize
                window.addEventListener("resize", () => {
                    let newGap = window.innerWidth * 0.01;
                    thumbSwiper.params.spaceBetween = newGap;
                    mainSwiper.params.spaceBetween = newGap;
                    thumbSwiper.update();
                    mainSwiper.update();
                }
                );
            });`
}} />
        <Script id="inline-script-14" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `// Testimonial swiper tetap sendiri
            document.addEventListener("DOMContentLoaded", function() {

                var swiperTesti = new Swiper(".swiper.testi",{
                    slidesPerView: 1,
                    loop: true,
                    speed: 200,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: ".testi-next",
                        prevEl: ".testi-prev",
                    },
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                });

            });`
}} />
        <Script id="inline-script-15" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", function() {
                // cek kalau desktop saja
                if (window.innerWidth >= 1024) {

                    /*** 1. Original Sections Map for scroll-rell ***/
                    const sectionsMap = {
                        "about": 0,
                        "our-values": -100,
                        "our-team": -200,
                        "founders": -300
                    };

                    const scrollRell = document.querySelector(".scroll-rell-black");
                    let activeSection = null;
                    // track the current active section

                    const observer = new IntersectionObserver( (entries) => {
                        entries.forEach( (entry) => {
                            if (entry.isIntersecting) {
                                const id = entry.target.id;
                                if (sectionsMap.hasOwnProperty(id)) {
                                    const offset = sectionsMap[id];
                                    scrollRell.style.transition = "transform 0.8s ease-in-out";
                                    scrollRell.style.transform = \`translate3d(0, \${offset}vh, 0)\`;
                                    activeSection = id;
                                }
                            }
                        }
                        );
                    }
                    ,{
                        threshold: 0.5
                    });

                    Object.keys(sectionsMap).forEach(id => {
                        const element = document.getElementById(id);
                        if (element)
                            observer.observe(element);
                    }
                    );

                    /*** 2. Image shrink effect ***/
                    const imgMap = {
                        "about": document.getElementById("img-about-us"),
                        "our-values": document.getElementById("img-our-values"),
                        "our-team": document.getElementById("img-our-team")
                    };

                    window.addEventListener("scroll", function() {
                        Object.keys(imgMap).forEach(sectionId => {
                            const section = document.getElementById(sectionId);
                            const img = imgMap[sectionId];

                            if (section && img) {
                                const rect = section.getBoundingClientRect();
                                const windowHeight = window.innerHeight;

                                if (sectionId === activeSection) {
                                    img.style.height = "100%";
                                    return;
                                }

                                const start = windowHeight;
                                const end = 0;
                                let progress = (start - rect.bottom) / (start - end);
                                progress = Math.min(Math.max(progress, 0), 1);

                                const newHeight = 100 - (progress * 100);
                                img.style.height = newHeight + "%";
                            }
                        }
                        );
                    });

                    /*** 4. Meta Opacity + Active State ***/
                    const metaMap = {
                        "about": document.getElementById("meta-about"),
                        "our-values": document.getElementById("meta-our-values"),
                        "our-team": document.getElementById("meta-our-team"),
                        "founders": document.getElementById("meta-founders")
                    };

                    // set initial active to "about"
                    if (metaMap["about"]) {
                        metaMap["about"].classList.add("active");
                    }

                    const metaObserver = new IntersectionObserver( (entries) => {
                        entries.forEach( (entry) => {
                            const id = entry.target.id;

                            if (entry.isIntersecting && metaMap.hasOwnProperty(id)) {
                                Object.keys(metaMap).forEach(key => {
                                    if (metaMap[key]) {
                                        metaMap[key].classList.toggle("active", key === id);
                                    }
                                }
                                );
                            }
                        }
                        );
                    }
                    ,{
                        threshold: 0.5
                    });

                    Object.keys(metaMap).forEach(id => {
                        const element = document.getElementById(id);
                        if (element)
                            metaObserver.observe(element);
                    }
                    );

                }
                // end if desktop
            });`
}} />
        <Script id="inline-script-16" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `window.history.scrollRestoration = "manual";`
}} />
        <Script id="inline-script-17" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", function() {
                const bg = document.querySelector(".background-tabs-abt");
                const tabs = document.querySelectorAll(".meta-about-s2-black");

                function getActiveTab() {
                    return document.querySelector(".meta-about-s2-black.active");
                }

                function moveBgToTab(tab) {
                    const index = Array.from(tabs).indexOf(tab);
                    const step = 23;
                    // fixed step
                    bg.style.left = (step * index) + "%";
                }

                // Initialize background position
                moveBgToTab(getActiveTab());

                tabs.forEach( (tab) => {
                    let isClicked = false;

                    tab.addEventListener("mouseenter", () => {
                        moveBgToTab(tab);
                    }
                    );

                    tab.addEventListener("mouseleave", () => {
                        if (!isClicked) {
                            moveBgToTab(getActiveTab());
                        }
                        isClicked = false;
                        // reset after leave
                    }
                    );

                    tab.addEventListener("click", () => {
                        // remove old active and add new
                        const oldActive = getActiveTab();
                        if (oldActive)
                            oldActive.classList.remove("active");
                        tab.classList.add("active");
                        moveBgToTab(tab);
                        isClicked = true;
                        // prevent immediate mouseleave override
                    }
                    );
                }
                );

                // Observe mutations (optional)
                const observer = new MutationObserver( () => {
                    moveBgToTab(getActiveTab());
                }
                );

                tabs.forEach(tab => observer.observe(tab, {
                    attributes: true,
                    attributeFilter: ['class']
                }));
            });`
}} />
        <Script id="inline-script-18" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `/*document.addEventListener("DOMContentLoaded", function () {
  const rail = document.querySelector(".rail-for-section-4");
  const sections = [
    ".hero",
    ".section-3",
    ".section-2-black"
  ];

  function setRailSize() {
    if (!rail) return;

    // Hitung padding top (dari tinggi section sebelum rail)
    let totalHeight = 0;
    sections.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) totalHeight += el.offsetHeight;
    });
    rail.style.paddingTop = totalHeight + "px";

    // Set tinggi rail sama dengan tinggi halaman
    const pageHeight = document.documentElement.scrollHeight;
    rail.style.height = pageHeight + "px";
  }

  // jalankan saat DOM siap
  setRailSize();

  // jalankan setelah semua asset load
  window.addEventListener("load", setRailSize);

  // jalankan saat resize / konten berubah
  window.addEventListener("resize", setRailSize);
});*/
            //new setrail
            const initRail = function() {
                const rail = document.querySelector(".rail-for-section-4");
                const sections = [".story-scroll-wrapper", ".hero", ".section-3", ".section-2-black"];

                function setRailSize() {
                    if (!rail)
                        return;

                    // Hitung paddingTop (tinggi section sebelum rail)
                    let totalHeight = 0;
                    sections.forEach(selector => {
                        const el = document.querySelector(selector);
                        if (el)
                            totalHeight += el.offsetHeight || 0;
                    }
                    );
                    rail.style.paddingTop = totalHeight + "px";

                    // Hitung tinggi yang tersisa dari posisi rail ke bawah body
                    const railTop = rail.getBoundingClientRect().top + window.scrollY;
                    const bodyHeight = document.body.offsetHeight;
                    const availableHeight = bodyHeight - railTop;

                    // Kalau hasilnya negatif (misal karena animasi belum siap), tahan dulu
                    if (availableHeight > 0) {
                        rail.style.height = availableHeight + "px";
                        console.log("✅ Rail height set:", availableHeight);
                    } else {
                        console.warn("⚠️ Rail belum siap, retrying...");
                        setTimeout(setRailSize, 300);
                    }
                }

                // Jalankan saat load penuh & resize
                setRailSize();
                window.addEventListener("resize", setRailSize);

                // Deteksi perubahan translate/footer
                let lastFooterText = "";
                let tries = 0;
                const maxTries = 20;

                const interval = setInterval( () => {
                    const locale = new URLSearchParams(window.location.search).get("locale");
                    const footerLink = document.querySelector(".footer-link._2");
                    if (!locale || !footerLink)
                        return;

                    const currentText = footerLink.textContent.trim();
                    if (currentText && currentText !== lastFooterText) {
                        console.log("🌐 Locale aktif:", locale, "| Footer berubah:", currentText);
                        setRailSize();
                        setTimeout(setRailSize, 1000);
                        clearInterval(interval);
                    }
                    lastFooterText = currentText;
                    if (++tries >= maxTries)
                        clearInterval(interval);
                }
                , 500);
            };

            if (document.readyState === "complete" || document.readyState === "interactive") {
                initRail();
            } else {
                window.addEventListener("load", initRail);
            }
            setTimeout(initRail, 500); // Bulletproof fallback`
}} />
        <Script id="inline-script-19" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener('DOMContentLoaded', function() {
                const swiper = new Swiper('.swiper.three-circle-mobs',{
                    loop: false,
                    speed: 600,
                    spaceBetween: 16,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        // Mobile (default)
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                            centeredSlides: false,
                        },
                        // Tablet
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 1,
                            centeredSlides: true,
                        },
                    },
                });
            });`
}} />
        <Script id="inline-script-20" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", function() {
                // Thumbnail Slider
                const thumbSwiper = new Swiper(".swiper.abt-thumb",{
                    slidesPerView: 4,
                    // jumlah thumbnail kelihatan
                    spaceBetween: 0,
                    centeredSlides: false,
                    slideToClickedSlide: true,
                });

                // Main Slider dengan fade crossFade
                const mainSwiper = new Swiper(".swiper.abt-slide",{
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true,
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    thumbs: {
                        swiper: thumbSwiper,
                    },
                });
            });`
}} />
        {/*  JS (replace previous modal JS)  */}
        <Script id="inline-script-21" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `(function() {
                let currentModal = null;

                // Delegated clicks: open & close
                document.addEventListener('click', function(e) {
                    // open trigger
                    const trigger = e.target.closest('[open-modal]');
                    if (trigger) {
                        e.preventDefault();
                        const slug = trigger.getAttribute('open-modal');
                        const modal = document.getElementById(slug);
                        if (!modal)
                            return;
                        openModal(modal);
                        return;
                    }

                    // close button (.close-area or .close-modal-details)
                    const closeBtn = e.target.closest('.close-area, .close-modal-details-2');
                    if (closeBtn) {
                        const modal = closeBtn.closest('.modal-single-project');
                        if (modal)
                            closeModal(modal);
                        return;
                    }

                    // click overlay (outside modal-content)
                    const overlay = e.target.closest('.modal-single-project');
                    if (overlay && e.target === overlay) {
                        closeModal(overlay);
                        return;
                    }
                });

                // ESC key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' || e.key === 'Esc') {
                        if (currentModal)
                            closeModal(currentModal);
                    }
                });

                function openModal(modal) {
                    modal.classList.remove('is-hiding');
                    void modal.offsetWidth;
                    // force reflow
                    modal.classList.add('is-active');
                    document.body.classList.add('modal-open');
                    currentModal = modal;
                }

                function closeModal(modal) {
                    if (!modal.classList.contains('is-active'))
                        return;
                    modal.classList.add('is-hiding');

                    function onTransitionEnd(ev) {
                        if (ev.propertyName !== 'opacity')
                            return;
                        modal.classList.remove('is-hiding');
                        modal.classList.remove('is-active');
                        document.body.classList.remove('modal-open');
                        modal.removeEventListener('transitionend', onTransitionEnd);
                    }
                    modal.addEventListener('transitionend', onTransitionEnd);

                    if (currentModal === modal)
                        currentModal = null;
                }

                // optional small API for manual control/debug
                window._modalHelper = {
                    openModal,
                    closeModal
                };
            }
            )();`
}} />
        <Script id="inline-script-22" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", () => {
                // Daftar pasangan section & tombol skip
                const pairs = [{
                    sectionSelector: ".section-4",
                    buttonSelector: "#skip-button-circle"
                }];

                function setupObserver(sectionSelector, buttonSelector) {
                    const section = document.querySelector(sectionSelector);
                    const skipButton = document.querySelector(buttonSelector);

                    if (!section || !skipButton) {
                        console.warn(\`❌ Tidak menemukan \${sectionSelector} atau \${buttonSelector}\`);
                        return;
                    }

                    function updateButtonVisibility() {
                        const rect = section.getBoundingClientRect();
                        const vh = window.innerHeight;
                        const isInView = rect.top < vh * 0.5 && rect.bottom > vh * 0.5;

                        if (isInView) {
                            if (!skipButton.classList.contains("show")) {
                                console.log(\`✅ \${buttonSelector} muncul (section: \${sectionSelector})\`);
                            }
                            skipButton.classList.add("show");
                        } else {
                            if (skipButton.classList.contains("show")) {
                                console.log(\`🚫 \${buttonSelector} disembunyikan (section: \${sectionSelector})\`);
                            }
                            skipButton.classList.remove("show");
                        }
                    }

                    window.addEventListener("scroll", updateButtonVisibility, {
                        passive: true
                    });
                    window.addEventListener("resize", updateButtonVisibility);

                    skipButton.addEventListener("click", () => {
                        console.log(\`⏩ \${buttonSelector} diklik, cek ulang...\`);
                        setTimeout(updateButtonVisibility, 600);
                    }
                    );

                    console.log(\`🟢 Inisialisasi deteksi untuk \${sectionSelector}\`);
                    updateButtonVisibility();
                }

                // Jalankan untuk setiap pasangan
                pairs.forEach(pair => setupObserver(pair.sectionSelector, pair.buttonSelector));
            }
            );`
}} />
        <Script id="inline-script-23" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", () => {
                setTimeout( () => {
                    // === 1. Ambil locale dari URL (default: en) ===
                    //const urlParams = new URLSearchParams(window.location.search);
                    //const locale = (urlParams.get("locale") || "en").toLowerCase();

                    const pathParts = window.location.pathname.split("/").filter(Boolean);
                    const supportedLocales = ["zh", "th", "vi"];
                    const locale = supportedLocales.includes(pathParts[0]) ? pathParts[0] : "en";

                    // === 2. Deteksi apakah saat ini mobile/tablet ===
                    const isMobile = window.matchMedia("(max-width: 991px)").matches;
                    // (<= 991px = tablet/mobile menurut breakpoint Webflow)

                    // === 3. Mapping ID untuk tiap locale ===
                    const dbaMap = {
                        "en": "dba-title",
                        "zh": "dba-title-zh",
                        "th": "dba-title-th",
                        "vi": "dba-title-vi",
                    };

                    const mofMap = {
                        "en": "mof-title",
                        "zh": "mof-title-zh",
                        "th": "mof-title-th",
                        "vi": "mof-title-vi",
                    };

                    const metaMap = {
                        "en": "meta-ab",
                        "zh": "meta-ab",
                        "th": "meta-ab",
                        "vi": "meta-ab-vi",
                    };

                    // === 4. Tentukan target ID sesuai locale + device ===
                    const dbaTarget = isMobile ? \`\${dbaMap[locale]}-mob\` : dbaMap[locale];
                    const mofTarget = isMobile ? \`\${mofMap[locale]}-mob\` : mofMap[locale];
                    const metaTarget = isMobile ? \`\${metaMap[locale]}-mob\` : metaMap[locale];

                    // === 5. Gabungkan semua ID untuk desktop & mobile agar bisa di-hide semua ===
                    const allDbaIds = Object.values(dbaMap).flatMap(id => [id, \`\${id}-mob\`]);
                    const allMofIds = Object.values(mofMap).flatMap(id => [id, \`\${id}-mob\`]);
                    const allMetaIds = Object.values(metaMap).flatMap(id => [id, \`\${id}-mob\`]);

                    // === 6. Hide semua elemen dulu ===
                    [...allDbaIds, ...allMofIds, ...allMetaIds].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) {
                            el.style.display = "none";
                            // hard hide to prevent overlap
                            el.classList.remove("is-inline");
                            el.classList.add("is-hidden");
                        }
                    }
                    );

                    // === 7. Tampilkan elemen aktif sesuai locale & device ===
                    const showElement = (id) => {
                        const el = document.getElementById(id);
                        if (el) {
                            el.style.display = "inline-block";
                            // ensure only this one shows
                            el.classList.remove("is-hidden");
                            el.classList.add("is-inline");
                        }
                    }
                    ;

                    showElement(dbaTarget);
                    showElement(mofTarget);
                    showElement(metaTarget);

                    // === 8. Logic khusus untuk meta-ab dan meta-ab-vi ===
                    for (let i = 1; i <= 4; i++) {
                        const normal = document.getElementById(\`meta-ab-\${i}\`);
                        const vi = document.getElementById(\`meta-ab-vi-\${i}\`);

                        if (locale === "vi") {
                            if (normal)
                                normal.style.display = "none";
                            if (vi) {
                                vi.style.display = "inline-block";
                                vi.classList.remove("is-hidden");
                                vi.classList.add("is-inline");
                            }
                        } else {
                            if (vi)
                                vi.style.display = "none";
                            if (normal) {
                                normal.style.display = "inline-block";
                                normal.classList.remove("is-hidden");
                                normal.classList.add("is-inline");
                            }
                        }
                    }

                }
                , 1200);
                // delay untuk pastikan semua elemen sudah ada
            }
            );`
}} />
        <Script id="inline-script-24" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `// Testimonial swiper tetap sendiri
            document.addEventListener("DOMContentLoaded", function() {

                var swiperTesti = new Swiper(".swiper.what-we-do",{
                    slidesPerView: 1,
                    loop: true,
                    speed: 200,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: ".wwd-next",
                        prevEl: ".wwd-prev",
                    },
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                });

            });`
}} />
        <Script id="inline-script-25" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", () => {
                const paths = document.querySelectorAll("svg [hover-hero-trigger]");
                const images = document.querySelectorAll(".home-new-3d");

                function hideAll() {
                    images.forEach(img => img.classList.remove("active"));
                }

                // Hover in
                paths.forEach(path => {
                    path.addEventListener("mouseenter", () => {
                        const key = path.getAttribute("hover-hero-trigger");

                        hideAll();

                        const target = document.querySelector(\`.home-new-3d[image-hero="\${key}"]\`);
                        if (target)
                            target.classList.add("active");
                    }
                    );

                    // ➜ Hover out per path
                    path.addEventListener("mouseleave", () => {
                        hideAll();
                    }
                    );
                }
                );

                // Masih boleh pakai reset seluruh SVG (opsional)
                const svg = document.querySelector("svg");
                svg.addEventListener("mouseleave", hideAll);
            }
            );`
}} />
        <Script id="inline-script-26" strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `document.addEventListener("DOMContentLoaded", () => {

                // Hanya tablet & mobile
                if (window.innerWidth > 991)
                    return;
                const images = [...document.querySelectorAll('[image-autoplay]')];
                if (images.length <= 1)
                    return;

                // Start dari image pertama
                let current = 0;
                images[current].classList.add("active");
                function crossFadeLoop() {

                    // Urut: 0 → 1 → 2 → balik lagi ke 0
                    const nextIndex = (current + 1) % images.length;
                    const currentImg = images[current];
                    const nextImg = images[nextIndex];
                    currentImg.classList.remove("active");
                    nextImg.classList.add("active");
                    current = nextIndex;
                }
                setInterval(crossFadeLoop, 1500);
            }
            );`
}} /></>)}
    
    </>
  );
}
