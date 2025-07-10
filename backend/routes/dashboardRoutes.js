const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  getDashboardStats,
} = require('../controllers/dashboardController');

router.get('/stats', adminMiddleware, getDashboardStats);

module.exports = router;
