const express = require('express');
const router = express.Router();
const { getMessages, createMessage, deleteMessage } = require('../controllers/messageController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', createMessage); // anyone can send
router.get('/', adminMiddleware, getMessages); // admin only
router.delete('/:id', adminMiddleware, deleteMessage); // admin only

module.exports = router;
