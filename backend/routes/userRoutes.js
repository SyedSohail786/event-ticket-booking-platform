// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateProfilePic, getProfile, getAllUsers, deleteUser } = require('../controllers/userController');

const userMiddleware = require('../middleware/userMiddleware');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// POST /api/users/profile-pic
router.post('/profile-pic', userMiddleware, upload.single('profilePic'), updateProfilePic);
router.get('/profile', authMiddleware, getProfile);
router.get('/', adminMiddleware, getAllUsers);
router.delete('/:id', adminMiddleware, deleteUser);
router.put('/profile-pic', authMiddleware, upload.single('profilePic'), updateProfilePic);

module.exports = router;
