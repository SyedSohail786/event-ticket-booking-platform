// controllers/eventController.js
const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
  try {
    const { name, description, location, time, availableTickets, ticketPrice } = req.body;

    const image = req.file ? req.file.path : null;

    const event = await Event.create({
      name,
      description,
      location,
      time,
      availableTickets,
      ticketPrice,
      image
    });

    res.status(201).json({ msg: 'Event created', event });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Read All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json({ msg: 'Event updated', event });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
