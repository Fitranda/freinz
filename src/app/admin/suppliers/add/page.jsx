"use client";

import { useState } from "react";

export default function AddEmployee() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    role: "",
    storename: "",
    username: "",
    password: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee submitted:", form);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#2B5658] mb-8">
        Tambah Karyawan
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">
              ID Karyawan
            </label>
            <input
              name="id"
              type="text"
              value={form.id}
              onChange={handleChange}
              placeholder="Masukkan ID Karyawan"
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">Nama</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 bg-white"
            >
              <option value="">Pilih Role</option>
              <option value="Karyawan Toko">Karyawan Toko</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">
              Cabang Toko
            </label>
            <select
              name="storename"
              value={form.storename}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 bg-white"
            >
              <option value="">Pilih Cabang Toko</option>
              <option value="Frenz Rungkut">Frenz Rungkut</option>
              <option value="Frenz Sukolilo">Frenz Sukolilo</option>
              <option value="Frenz Head Office">Frenz Head Office</option>
              <option value="Frenz Jemursari">Frenz Jemursari</option>
              {/* Add more branches as needed */}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan Username"
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan Password"
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-gray-800 font-medium">Kontak</label>
            <input
              name="contact"
              type="text"
              value={form.contact}
              onChange={handleChange}
              placeholder="Masukkan Kontak"
              className="w-full px-4 py-3 border-2 border-[#3F7F83] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-gray-400 text-gray-800 rounded-xl hover:bg-gray-100 font-medium transition cursor-pointer"
          >
            Kembali
          </div>
          <div
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#3F7F83] text-white rounded-xl hover:bg-[#2B5658] font-medium transition shadow-md cursor-pointer"
          >
            Simpan
          </div>
        </div>
      </div>
    </div>
  );
}
