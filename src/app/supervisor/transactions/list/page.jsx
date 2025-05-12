"use client";

import Link from "next/link";

export default function Sales() {
  // Mock data for multiple items per transaction
  const salesData = [
    {
      transactionId: "TRX0001",
      date: "2025-05-05",
      cashier: "Alex",
      discount: 5000, // Discount applied
      items: [
        { name: "TEMP GLASS IP 11", quantity: 3, price: 10000 },
        { name: "TEMP GLASS IP 11 PRO MAX", quantity: 2, price: 10000 },
      ],
      totalPrice: 50000, // Sum of all items' price * quantity
      payment: 100000, // Amount paid
    },
    {
      transactionId: "TRX0002",
      date: "2025-05-06",
      cashier: "Naya",
      discount: 10000, // Discount applied
      items: [
        { name: "TG BLUE CLR IP 11", quantity: 1, price: 55000 },
        { name: "CASE PIC MATTE IP 11", quantity: 5, price: 35000 },
      ],
      totalPrice: 350000,
      payment: 500000,
    },
    // Add more transactions here...
  ];

  // Calculate total omzet (total sales)
  const totalOmzet = salesData.reduce(
    (total, transaction) => total + transaction.totalPrice,
    0
  );

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">Riwayat Penjualan</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700">
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
          </select>

          <input
            type="text"
            placeholder="Cari Riwayat Penjualan..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
          />

          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Tanggal:</span>
            <input
              type="date"
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            />
            <span className="text-gray-700">-</span>
            <input
              type="date"
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            />
          </div>
        </div>

        {/* Revenue Button */}
        <Link href="/supervisor/revenue">
          <button className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
            Lihat Omzet
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-2xl shadow-sm overflow-x-auto">
          <thead>
            <tr className="bg-[#3F7F83] text-white">
              <th className="px-4 py-2">Kode Transaksi</th>
              <th className="px-4 py-2 w-[150px]">Tanggal</th>
              <th className="px-4 py-2 w-[200px]">Nama Kasir</th>
              <th className="px-4 py-2 w-[200px]">Nama Barang</th>
              <th className="px-4 py-2 text-center w-[120px]">Jumlah Barang</th>
              <th className="px-4 py-2 text-center w-[120px]">Discount</th>
              <th className="px-4 py-2 text-center w-[150px]">Total Harga</th>
              <th className="px-4 py-2 text-center w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((transaction, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-gray-700 w-[120px]">
                  {transaction.transactionId}
                </td>
                <td className="px-4 py-2 text-gray-700">{transaction.date}</td>
                <td className="px-4 py-2 text-gray-700">
                  {transaction.cashier}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {transaction.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {transaction.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  Pcs
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  Rp {transaction.discount.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  Rp {transaction.totalPrice.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="px-3 py-1 text-sm bg-[#3F7F83] text-white rounded hover:bg-[#4F969A] transition">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center px-2">
          <button className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
