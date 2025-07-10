const express = require('express');
const router = express.Router();
const {
  bookTicket,
  getMyTickets,
  getAllTickets,
  deleteTicket,
  updateTicket
} = require('../controllers/ticketController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// User routes
router.post('/book', authMiddleware, bookTicket);
router.get('/my', authMiddleware, getMyTickets);

// Admin routes
router.get('/', adminMiddleware, getAllTickets);
router.delete('/:id', adminMiddleware, deleteTicket);
router.patch('/:id', adminMiddleware, updateTicket);

module.exports = router;
