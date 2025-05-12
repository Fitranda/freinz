"use client";

import { useState } from "react";
import Link from "next/link";

export default function Attendance() {
  const [dateFilter, setDateFilter] = useState("");

  // Sample attendance data (added `time`)
  const attendanceData = [
    {
      attendanceId: "ATT001",
      employeeId: "EMP1234",
      employeeName: "John Doe",
      date: "2025-05-01",
      time: "08:00",
      photo: "photo1.jpg",
      status: "Present",
    },
    {
      attendanceId: "ATT002",
      employeeId: "EMP2345",
      employeeName: "Jane Smith",
      date: "2025-05-01",
      time: "08:20",
      photo: "photo2.jpg",
      status: "Late",
    },
    {
      attendanceId: "ATT003",
      employeeId: "EMP3456",
      employeeName: "Michael Johnson",
      date: "2025-05-01",
      time: "07:55",
      photo: "photo3.jpg",
      status: "Present",
    },
    {
      attendanceId: "ATT005",
      employeeId: "EMP5678",
      employeeName: "David Brown",
      date: "2025-05-01",
      time: "08:05",
      photo: "photo5.jpg",
      status: "Present",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">Absensi</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link href="/employee/attendance/addAttendance">
            <button className="w-[170px] px-4 py-2 border bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
              Tambah Absensi
            </button>
          </Link>

          {/* Date Range Picker */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Tanggal:</span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-2xl shadow-sm overflow-x-auto">
          <thead>
            <tr className="bg-[#3F7F83] text-white">
              <th className="px-4 py-2">ID Absensi</th>
              <th className="px-4 py-2">ID Karyawan</th>
              <th className="px-4 py-2">Nama Karyawan</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Waktu</th>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr
                key={item.attendanceId}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-gray-700">{item.attendanceId}</td>
                <td className="px-4 py-2 text-gray-700">{item.employeeId}</td>
                <td className="px-4 py-2 text-gray-700">{item.employeeName}</td>
                <td className="px-4 py-2 text-gray-700">{item.date}</td>
                <td className="px-4 py-2 text-gray-700">{item.time}</td>
                <td className="px-4 py-2 text-gray-700">{item.photo}</td>
                <td className="px-4 py-2 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Late"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
