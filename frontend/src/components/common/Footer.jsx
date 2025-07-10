import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Eventify</h3>
          <p className="text-sm text-gray-400">
            Your one-stop platform to explore, book and enjoy amazing events happening around you.
            Simple, fast and secure ticketing experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/events" className="hover:text-white transition">Events</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FiMail className="text-purple-400" />
              <span>support@eventify.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-purple-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin className="text-purple-400" />
              <span>Bengaluru, India</span>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-4 flex gap-4 text-xl text-gray-400">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FiTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FiInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Eventify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
