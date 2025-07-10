import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${BASE}/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBooking = async () => {
  try {
    // Confirm login
    const role = localStorage.getItem('role');
if (role !== 'user') {
  alert('Please login as user');
  navigate('/login');
}


    // Proceed to book
    const res = await axios.post(
      `${BASE}/api/tickets/book`,
      { eventId: id, quantity },
      { withCredentials: true }
    );

    setMessage('✅ Ticket booked successfully!');
  } catch (err) {
    console.error(err);
    alert('You must login to book a ticket.');
    navigate('/login');
  }
};


  if (!event) return <div className="text-center mt-10">Loading event...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={`${BASE}/${event.image}`}
        alt={event.name}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-6 text-purple-700">{event.name}</h2>
      <p className="text-gray-600 mt-2">📍 {event.location}</p>
      <p className="text-lg font-semibold mt-3 text-green-600">₹ {event.ticketPrice}</p>
      <p className="mt-4 text-gray-700">{event.description}</p>

      <div className="mt-6 flex gap-4 items-center">
        <label className="font-medium">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          max={event.availableTickets}
          className="border px-3 py-1 w-20 rounded"
        />
        <span className="text-sm text-gray-600">({event.availableTickets} available)</span>
      </div>

      <button
        onClick={handleBooking}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
      >
        Buy Ticket
      </button>

      {message && <p className="mt-4 text-blue-600 font-semibold">{message}</p>}
    </div>
  );
}

export default EventDetail;
