import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.post("http://localhost:5555/events/getUser");
            const data = response.data;
            console.log("API response:", data);
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const cancelBooking = async bookingId => {
        const confirmed = window.confirm("Are you sure you want to cancel this booking?");
        if (confirmed) {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.put(`http://localhost:5555/events/cancelBooking/${bookingId}`);
            alert("Booking Canceled");
            fetchBookings();
            console.log(`Cancelled booking with ID: ${bookingId}`);
        }
    };

    return (
        <div className="container mx-auto py-8" style={{ height: "100vh" }}>
            <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>
            {bookings && bookings.length > 0 ? (<>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map(({ BookingId, eventData, eventName, quantity }) => (
                        <div key={BookingId} className="border rounded-lg p-4 bg-gray-100">
                            <h2 className="text-xl font-semibold mb-2">{eventName}</h2>
                            {/* <p>Description: {eventData.description}</p> */}
                            <p>Date: {new Date(eventData.date).toLocaleDateString()}</p>
                            <p>Time: {eventData.startTime}</p>
                            <p>Tickets: {quantity}</p>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={() => cancelBooking(BookingId)}
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
                </div></>
            ) : (
                <p className="text-center text-xl font-bold">No bookings available</p>
            )}
        </div>
    );
};

export default BookingPage;
