"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2"; // Change from Bar to Line
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Revenue() {
  const salesData = [
    {
      transactionId: "TRX0001",
      date: "2025-05-05",
      cashier: "Alex",
      discount: 5000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 3, price: 10000 },
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 2, price: 10000 },
      ],
      totalPrice: 50000,
      payment: 100000,
    },
    {
      transactionId: "TRX0002",
      date: "2025-05-06",
      cashier: "Naya",
      discount: 10000,
      items: [
        { name: "TG BLUE CLR IP 11", quantity: 1, price: 55000 },
        { name: "CASE PIC MATTE IP 11", quantity: 5, price: 35000 },
      ],
      totalPrice: 350000,
      payment: 500000,
    },
    {
      transactionId: "TRX0003",
      date: "2025-05-10",
      cashier: "Liam",
      discount: 2000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 4, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 3, price: 35000 },
      ],
      totalPrice: 170000,
      payment: 200000,
    },
    {
      transactionId: "TRX0004",
      date: "2025-05-12",
      cashier: "Sasha",
      discount: 0,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 2, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 1, price: 55000 },
      ],
      totalPrice: 75000,
      payment: 100000,
    },
    {
      transactionId: "TRX0005",
      date: "2025-05-15",
      cashier: "Mia",
      discount: 3000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 5, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 2, price: 35000 },
      ],
      totalPrice: 225000,
      payment: 300000,
    },
    {
      transactionId: "TRX0006",
      date: "2025-05-17",
      cashier: "John",
      discount: 5000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 6, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 1, price: 55000 },
      ],
      totalPrice: 165000,
      payment: 200000,
    },
    {
      transactionId: "TRX0007",
      date: "2025-05-18",
      cashier: "Olivia",
      discount: 4000,
      items: [
        { name: "CASE PIC MATTE IP 11", quantity: 4, price: 35000 },
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 3, price: 10000 },
      ],
      totalPrice: 180000,
      payment: 250000,
    },
    {
      transactionId: "TRX0008",
      date: "2025-05-20",
      cashier: "Ethan",
      discount: 0,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 7, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 3, price: 35000 },
      ],
      totalPrice: 285000,
      payment: 350000,
    },
    {
      transactionId: "TRX0009",
      date: "2025-05-22",
      cashier: "Sophia",
      discount: 15000,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 5, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 2, price: 55000 },
      ],
      totalPrice: 275000,
      payment: 400000,
    },
    {
      transactionId: "TRX0010",
      date: "2025-05-24",
      cashier: "James",
      discount: 8000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 8, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 4, price: 35000 },
      ],
      totalPrice: 330000,
      payment: 400000,
    },
    // Additional data for June
    {
      transactionId: "TRX0011",
      date: "2025-06-01",
      cashier: "Emma",
      discount: 2000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 3, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 2, price: 55000 },
      ],
      totalPrice: 180000,
      payment: 200000,
    },
    {
      transactionId: "TRX0012",
      date: "2025-06-05",
      cashier: "Leo",
      discount: 5000,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 6, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 2, price: 35000 },
      ],
      totalPrice: 250000,
      payment: 300000,
    },
    {
      transactionId: "TRX0013",
      date: "2025-06-07",
      cashier: "Oliver",
      discount: 3000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 4, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 1, price: 55000 },
      ],
      totalPrice: 135000,
      payment: 150000,
    },
    {
      transactionId: "TRX0014",
      date: "2025-06-10",
      cashier: "Zoe",
      discount: 0,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 3, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 4, price: 35000 },
      ],
      totalPrice: 290000,
      payment: 350000,
    },
    {
      transactionId: "TRX0015",
      date: "2025-06-15",
      cashier: "Jack",
      discount: 5000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 5, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 2, price: 55000 },
      ],
      totalPrice: 210000,
      payment: 250000,
    },
    // Additional data for July
    {
      transactionId: "TRX0016",
      date: "2025-07-01",
      cashier: "Amelia",
      discount: 10000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 2, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 1, price: 35000 },
      ],
      totalPrice: 55000,
      payment: 100000,
    },
    {
      transactionId: "TRX0017",
      date: "2025-07-03",
      cashier: "Ben",
      discount: 15000,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 6, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 3, price: 55000 },
      ],
      totalPrice: 330000,
      payment: 350000,
    },
    {
      transactionId: "TRX0018",
      date: "2025-07-08",
      cashier: "Grace",
      discount: 2000,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 3, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 5, price: 35000 },
      ],
      totalPrice: 235000,
      payment: 250000,
    },
    {
      transactionId: "TRX0019",
      date: "2025-07-12",
      cashier: "Mason",
      discount: 0,
      items: [
        { name: "TEMP GLASS IP 11", quantity: 8, price: 10000 },
        { name: "TG BLUE CLR IP 11", quantity: 2, price: 55000 },
      ],
      totalPrice: 290000,
      payment: 350000,
    },
    {
      transactionId: "TRX0020",
      date: "2025-07-15",
      cashier: "Chloe",
      discount: 8000,
      items: [
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 4, price: 10000 },
        { name: "CASE PIC MATTE IP 11", quantity: 2, price: 35000 },
      ],
      totalPrice: 210000,
      payment: 250000,
    },
  ];

  // Grouping by month
  const groupedByMonth = salesData.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.totalPrice;
    return acc;
  }, {});

  const targetRevenue = 5000000; // Target revenue for the months (adjusted to 5,000,000)

  // Monthly line chart data
  const chartData = {
    labels: Object.keys(groupedByMonth),
    datasets: [
      {
        label: "Revenue (Rp)",
        data: Object.values(groupedByMonth),
        backgroundColor: "rgba(63, 127, 131, 0.7)",
        borderColor: "rgba(63, 127, 131, 1)",
        borderWidth: 1,
        fill: false, // Line chart without fill
        tension: 0.1, // Adjust the line smoothness
      },
    ],
  };

  return (
    <div className=" bg-gray-50">
      <div className="font-poppins flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold text-[#2B5658]">Revenue Dashboard</h1>
      </div>

      {/* Main content with line chart on the left and stats cards on the right */}
      <div className="flex space-x-4 px-6 ">
        {/* Line chart */}
        <div className="w-full lg:w-2/3">
          <div
            className="bg-white rounded-xl p-6 shadow-lg"
            style={{ height: "350px" }}
          >
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    min: 0,
                    max: 10000000, // Set the y-axis max value to 10,000,000
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Stats cards */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Revenue This Month
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xl text-gray-600 font-semibold">
                Rp 1,120,000
              </span>
              <span className="text-green-600">10%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg  font-semibold text-gray-700">
              Target Revenue
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xl text-gray-600 font-semibold">
                Rp 5,000,000
              </span>
              <span className="text-gray-600">100%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Transactions
            </h3>
            <span className="text-xl text-gray-600 font-semibold">
              {salesData.length} transactions
            </span>
          </div>
        </div>
      </div>

      {/* Table for revenue and most bought items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Sales by Month
          </h2>
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="bg-[#3F7F83] text-white">
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2 text-center">Revenue</th>
                <th className="px-4 py-2 text-center">Most Bought Item</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedByMonth).map((month, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-gray-700">{month}</td>
                  <td className="px-4 py-2 text-center text-gray-700">
                    Rp {groupedByMonth[month].toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700">
                    TEMP GLASS IP 11 (3x)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Most Bought Items */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Most Bought Items
          </h3>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">TEMP GLASS IP 11</span>
              <span className="text-gray-600">60 sold</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">CASE PIC MATTE IP 11</span>
              <span className="text-gray-600">45 sold</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">TG BLUE CLR IP 11</span>
              <span className="text-gray-600">30 sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
