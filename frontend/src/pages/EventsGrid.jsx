import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventsGrid() {
  const [events, setEvents] = useState([]);
  const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${BASE}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
          <img
            src={`${BASE}/${event.image}`}
            alt={event.name}
            className="h-48 w-full object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-3">{event.name}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">
            {event.description.length > 100
              ? event.description.slice(0, 100) + '...'
              : event.description}
          </p>
          <div className="text-center mt-4">
            <Link
              to={`/event/${event._id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              View Event
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsGrid;
