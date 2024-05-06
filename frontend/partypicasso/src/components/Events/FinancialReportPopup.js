// FinancialReportPopup.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const FinancialReportPopup = ({
  revenue,
  price,
  soldSeats,
  availableSeats,
  onClose,
}) => (
  <div className="popup-overlay">
    <div className="popup-content">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <div className="chart-container">
        <Doughnut
          data={{
            labels: ["Total Revenue", "Remaining Seats"],
            datasets: [
              {
                label: "Financial Status",
                data: [revenue, price * availableSeats],
                backgroundColor: ["#36a2eb", "#ff6384"],
              },
            ],
          }}
        />
      </div>
      <div className="p-4 bg-gray-200 rounded-lg mt-4">
        <h2 className="text-xl font-semibold">Financial Report</h2>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2">Item</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Total Revenue</td>
              <td className="py-2">${revenue}</td>
            </tr>
            <tr>
              <td className="py-2">Event Price</td>
              <td className="py-2">${price}</td>
            </tr>
            <tr>
              <td className="py-2">Sold Seats</td>
              <td className="py-2">{soldSeats}</td>
            </tr>
            <tr>
              <td className="py-2">Available Seats</td>
              <td className="py-2">{availableSeats}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default FinancialReportPopup;
