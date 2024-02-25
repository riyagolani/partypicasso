import React from "react";

const BookingPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-black-200">
      <div className="w-full max-w-4xl bg-white bg-opacity-75 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
        <p>Lil Meech & Friends of BMF invade Polygon in Brooklyn: Free entry with RSVP</p>
        <p>March 9 · 10pm - March 10 · 3am EST</p>
        <p>Ladies free before 12am</p>

        <hr className="mt-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-3">Tickets</h3>
          <div className="flex justify-between items-center mb-4">
            <span>General Admission Ticket</span>
            <span>$17.85</span>
          </div>
          {/* Add more ticket options as needed */}
        </div>

        <hr className="my-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-4">Table Deposits</h3>
          <div className="flex justify-between items-center mb-3">
            <span>Stand Up Table Deposit 1 Bottle for $275++</span>
            <span>$81.88</span>
          </div>
          {/* Add more table deposit options as needed */}
        </div>

        <hr className="my-3 border-b border-black-300" />

        <div className="mt-3">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <span>Subtotal</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Fees</span>
            <span>$2.85</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Total</span>
            <span>$17.85</span>
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
