import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HeroCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
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
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={`${BASE}/uploads/${banner.bannerImage}`}
            alt={banner.eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold">{banner.eventName}</h2>
            <p className="text-sm md:text-lg mt-2">{banner.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroCarousel;
