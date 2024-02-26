import React, { useState } from "react";

const BookingPage = () => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [tableQuantity, setTableQuantity] = useState(1);

  const ticketPrice = 17.85;
  const tablePrice = 81.88;
  const serviceFee = 3.0;

  const handleTicketQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setTicketQuantity(quantity >= 1 ? quantity : 1);
  };

  const handleTableQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setTableQuantity(quantity >= 1 ? quantity : 1);
  };

  const calculateTotal = () => {
    const ticketTotal = ticketPrice * ticketQuantity;
    const tableTotal = tablePrice * tableQuantity;
    const subtotal = ticketTotal + tableTotal;
    const total = subtotal + serviceFee;
    return total;
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-black-200"
      style={{ marginTop: "-30px" }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-75 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
        <p>
          Lil Meech & Friends of BMF invade Polygon in Brooklyn: Free entry with
          RSVP
        </p>
        <p>March 9 · 10pm - March 10 · 3am EST</p>
        <p>Ladies free before 12am</p>

        <hr className="mt-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-3">Tickets</h3>
          <div className="flex justify-between items-center mb-4">
            <span>General Admission Ticket</span>
            <span>$17.85</span>
            <input
              type="number"
              min="1"
              value={ticketQuantity}
              onChange={handleTicketQuantityChange}
            />
          </div>
          {/* Add more ticket options as needed */}
        </div>

        <hr className="my-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-4">Table Deposits</h3>
          <div className="flex justify-between items-center mb-3">
            <span>Stand Up Table Deposit 1 Bottle for $275++</span>
            <span>$81.88</span>
            <input
              type="number"
              min="1"
              value={tableQuantity}
              onChange={handleTableQuantityChange}
            />
          </div>
          {/* Add more table deposit options as needed */}
        </div>

        <hr className="my-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <span>Subtotal</span>
            <span>
              $
              {(
                ticketPrice * ticketQuantity +
                tablePrice * tableQuantity
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <hr className="my-3 border-b border-black-300" />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-3 w-full">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
