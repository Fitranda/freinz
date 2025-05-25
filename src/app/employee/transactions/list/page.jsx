"use client";

import { useEffect, useState } from "react";
import { fetchSales } from "@/services/sale";
import Link from "next/link";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadSales = async () => {
      const data = await fetchSales();
      data.sort((a, b) => a.id - b.id);
      setSalesData(data);
    };

    loadSales();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Filtering data based on search and date range
  const filteredSales = salesData.filter((item) => {
    const matchesSearch =
      item.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const itemDate = new Date(item.date);

    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    const matchesDateFrom = fromDate ? itemDate >= fromDate : true;
    const matchesDateTo = toDate ? itemDate <= toDate : true;

    return matchesSearch && matchesDateFrom && matchesDateTo;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
    setCurrentPage(1);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 font-poppins">
      <h1 className="text-3xl font-bold text-[#2B5658]">Riwayat Penjualan</h1>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>

          <input
            type="text"
            placeholder="Cari Riwayat Penjualan..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Tanggal:</span>
            <input
              type="date"
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
              value={dateFrom}
              onChange={handleDateFromChange}
            />
            <span className="text-gray-700">-</span>
            <input
              type="date"
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
              value={dateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-2xl shadow-sm overflow-x-auto">
          <thead>
            <tr className="bg-[#3F7F83] text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Invoice</th>
              <th className="px-4 py-2 w-[200px]">ID Karyawan</th>
              <th className="px-4 py-2 w-[150px]">Tanggal</th>
              <th className="px-4 py-2 text-center w-[150px]">Total</th>
              <th className="px-4 py-2 text-center w-[150px]">Metode</th>
              <th className="px-4 py-2 text-center w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Tidak ada data penjualan.
                </td>
              </tr>
            ) : (
              paginatedSales.map((transaction, index) => (
                <tr
                  key={transaction.id || index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-gray-700 w-[120px]">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {transaction.invoice}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {transaction.employeeId}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700">
                    Rp {transaction.total?.toLocaleString("id-ID") || 0}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700">
                    {transaction.method}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      href={`/employee/transactions/detail/${transaction.id}`}
                    >
                      <button className="px-3 py-1 text-sm bg-[#3F7F83] text-white rounded hover:bg-[#4F969A] transition">
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-2">
          <button
            className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition disabled:opacity-50"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
