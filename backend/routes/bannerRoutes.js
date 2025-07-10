// routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const { createBanner, getBanners, deleteBanner, updateBanner } = require('../controllers/bannerController');

const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', adminMiddleware, upload.single('bannerImage'), createBanner); // Admin adds banner
router.get('/', getBanners);             // Public: fetch all banners for carousel
router.delete('/:id', adminMiddleware, deleteBanner); // Admin deletes banner
router.patch('/:id', adminMiddleware, upload.single('bannerImage'), updateBanner);

module.exports = router;
