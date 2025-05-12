"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupplierList() {
  const [search, setSearch] = useState("");

  const suppliers = [
    {
      id: "SUP001",
      name: "PT PRIMA SEJAHTERA",
      contact: "08123456789",
      address: "Jl. Raya No. 12, Surabaya",
    },
    {
      id: "SUP002",
      name: "PT MAJU BERSAMA",
      contact: "08234567890",
      address: "Jl. Merdeka No. 45, Malang",
    },
    {
      id: "SUP003",
      name: "PT SINERGI INDONESIA",
      contact: "08345678901",
      address: "Jl. Sudirman No. 78, Jakarta",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">Supplier List</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link href="/supervisor/suppliers/add">
            <button className="w-[170px] px-4 py-2 border bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
              Tambah Supplier
            </button>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Cari:</span>
            <input
              type="text"
              placeholder="Nama / ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-2xl shadow-sm overflow-x-auto">
          <thead>
            <tr className="bg-[#3F7F83] text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Perusahaan</th>
              <th className="px-4 py-2">Kontak</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {suppliers
              .filter(
                (s) =>
                  s.name.toLowerCase().includes(search.toLowerCase()) ||
                  s.id.toLowerCase().includes(search.toLowerCase())
              )
              .map((sup, index) => (
                <tr
                  key={sup.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-gray-700">{sup.id}</td>
                  <td className="px-4 py-2 text-gray-700">{sup.name}</td>
                  <td className="px-4 py-2 text-gray-700">{sup.contact}</td>
                  <td className="px-4 py-2 text-gray-700">{sup.address}</td>
                  <td className="px-4 py-2 text-center w-[200px]">
                    <div className="flex space-x-2">
                      <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
