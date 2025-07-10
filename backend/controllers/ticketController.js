const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Book Ticket
exports.bookTicket = async (req, res) => {
  const { eventId, quantity } = req.body;
  const userId = req.userId;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.availableTickets < quantity) {
      return res.status(400).json({ msg: "Not enough tickets available" });
    }

    const totalPrice = quantity * event.ticketPrice;

    event.availableTickets -= quantity;
    await event.save();

    const ticket = await Ticket.create({
      user: userId,
      event: event._id,
      quantity,
      totalPrice
    });

    res.status(201).json({ msg: "Ticket booked", ticket });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// User: Get my tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.userId }).populate('event');
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Admin: Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('event').populate('user', 'email');
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Admin: Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Admin: Update ticket status
exports.updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ msg: 'Ticket updated', ticket: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
