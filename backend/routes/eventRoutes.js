const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', adminMiddleware, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', adminMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', adminMiddleware, deleteEvent);

module.exports = router;
