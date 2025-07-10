import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function HeroCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
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
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  if (banners.length === 0) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-6xl relative h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden shadow-md md:shadow-xl">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
          >
            <img
              src={`${BASE}/uploads/${banners[current].bannerImage.replace(/\\/g, '/')}`}
              alt={banners[current].eventName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 flex flex-col items-center justify-end pb-4 sm:pb-6 md:pb-8 px-4 text-center">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg"
              >
                {banners[current].eventName}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xs sm:text-sm md:text-base text-gray-200 max-w-md"
              >
                {banners[current].location}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots - Smaller on mobile */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-20 flex justify-center gap-1 sm:gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === current ? 'bg-white w-3 sm:w-4 md:w-5' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Smaller on mobile */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() => {
                setDirection(-1);
                setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
              }}
              className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-1.5 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                setDirection(1);
                setCurrent((prev) => (prev + 1) % banners.length);
              }}
              className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-1.5 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HeroCarousel;