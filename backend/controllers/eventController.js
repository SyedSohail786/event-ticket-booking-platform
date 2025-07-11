// controllers/eventController.js
const Event = require('../models/Event');

// ✅ Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, location, date, availableTickets, ticketPrice } = req.body;

    const image = req.file ? req.file.path : null;

    // ✅ Ensure date is properly cast to JavaScript Date object
    const event = await Event.create({
      name,
      description,
      location,
      date: new Date(date),
      availableTickets,
      ticketPrice,
      image
    });

    res.status(201).json({ msg: 'Event created', event });
  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Read All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Optional: sort by upcoming date
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { date, ...rest } = req.body;

    const updateData = { ...rest };
    if (date) updateData.date = new Date(date); // ✅ convert if date is updated

    if (req.file) {
      updateData.image = req.file.path;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json({ msg: 'Event updated', event });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
