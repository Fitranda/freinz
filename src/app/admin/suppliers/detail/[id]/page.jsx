"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockEmployee = {
      id: "EMP001",
      name: "Indra Gunawan",
      address: "Jl. Mawar No. 10",
      contact: "08123456789",
      username: "indrag",
      password: "********",
      salary: "5.000.000",
      role: "Karyawan Toko",
      storename: "Frenz Rungkut",
      status: "Aktif",
    };

    const mockAttendance = [
      {
        attendanceid: "ATT001",
        employeeid: "EMP001",
        date: "2025-05-10",
        time: "08:05",
        photo: "/photos/att001.jpg",
        latitude: "-7.2575",
        longitude: "112.7521",
        status: "Hadir",
      },
      {
        attendanceid: "ATT002",
        employeeid: "EMP001",
        date: "2025-05-09",
        time: "08:07",
        photo: "/photos/att002.jpg",
        latitude: "-7.2574",
        longitude: "112.7519",
        status: "Tidak Hadir",
      },
    ];

    setEmployee(mockEmployee);
    setAttendances(mockAttendance);
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-[#2B5658]">Detail Karyawan</h1>

      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        {Object.entries(employee).map(([key, value]) => (
          <div key={key}>
            <p className="font-semibold capitalize">{key}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-[#2B5658] mb-4">
          Riwayat Absensi
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-2xl shadow text-sm text-gray-800">
            <thead>
              <tr className="bg-[#3F7F83] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Waktu</th>
                <th className="px-4 py-2">Foto</th>
                <th className="px-4 py-2">Latitude</th>
                <th className="px-4 py-2">Longitude</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr
                  key={att.attendanceid}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{att.attendanceid}</td>
                  <td className="px-4 py-2">{att.date}</td>
                  <td className="px-4 py-2">{att.time}</td>
                  <td className="px-4 py-2">
                    <a
                      href={att.photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      View Photo
                    </a>
                  </td>
                  <td className="px-4 py-2">{att.latitude}</td>
                  <td className="px-4 py-2">{att.longitude}</td>
                  <td className="px-4 py-2">{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
