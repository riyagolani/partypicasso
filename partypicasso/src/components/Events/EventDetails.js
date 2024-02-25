import React from "react";

const EventDetails = () => {
  // Static hard-coded event data
  const event = {
    name: 'NFT.NYC 2024',
    date: 'Wed, Apr 3',
    time: '8:30 am',
    price: '$224',
    img: './images/musicconcert.jpg',
    category: 'Music Concerts',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, magna et convallis lobortis, augue purus vehicula ex, at faucibus quam mi nec mi.'
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
          <img src={event.img} alt="" className="h-44 w-44 rounded-full" />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <p className="text-xl font-bold">{event.name}</p>
          <p>{event.date} {event.time}</p>
          <p className="font-semibold">{event.price}</p>
          <p>{event.description}</p>
          {/* Add any additional details you want to display */}
          <button className="bg-neutral-700 text-white text-l w-40 px-5 py-1 rounded">Book this Events</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
