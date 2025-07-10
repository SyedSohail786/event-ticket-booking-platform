// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/authRoutes');
const Admin = require('./models/Admin');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/banners', bannerRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/dashboard', dashboardRoutes);

const createDefaultAdmin = async () => {
  const email = 'admin@email.com';
  const password = 'admin@123';

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({ email, password: hashedPassword });
      console.log('✅ Default admin created.');
    } else {
      console.log('✅ Default admin already exists.');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected.');
    await createDefaultAdmin(); // Create admin after DB connection
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));