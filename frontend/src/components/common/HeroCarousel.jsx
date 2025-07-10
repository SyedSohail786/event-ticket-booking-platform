import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function HeroCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${BASE}/api/banners`);
        setBanners(res.data);
      } catch (err) {
        console.error('Failed to load banners:', err.message);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % (banners.length || 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? '-100%' : '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={`${BASE}/uploads/${banners[current].bannerImage.replace(/\\/g, '/')}`}
            alt={banners[current].eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 flex flex-col items-center justify-end pb-8 md:pb-16 px-4 text-center">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg"
            >
              {banners[current].eventName}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm md:text-lg lg:text-xl text-gray-200 max-w-2xl"
            >
              {banners[current].location}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => {
              setDirection(-1);
              setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setDirection(1);
              setCurrent((prev) => (prev + 1) % banners.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default HeroCarousel;