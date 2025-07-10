const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const Message = require('../models/Message');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalMessages = await Message.countDocuments();

    res.json({
      users: totalUsers,
      tickets: totalTickets,
      events: totalEvents,
      messages: totalMessages,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
