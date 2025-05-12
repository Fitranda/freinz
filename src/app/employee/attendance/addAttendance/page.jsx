"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAttendance() {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState(null);

  const currentEmployee = {
    employeeId: "EMP9281",
    employeeName: "Fitranda Ramadhana",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    latitude: "-6.2094",
    longitude: "106.8462",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Absensi berhasil ditambahkan!");
    setPhotoFile(null);
    router.push("/attendance");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tambah Absensi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "ID Karyawan", value: currentEmployee.employeeId },
          { label: "Nama Karyawan", value: currentEmployee.employeeName },
          { label: "Tanggal", value: currentEmployee.date, type: "date" },
          { label: "Waktu", value: currentEmployee.time },
          { label: "Latitude", value: currentEmployee.latitude },
          { label: "Longitude", value: currentEmployee.longitude },
        ].map(({ label, value, type = "text" }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-800">
              {label}
            </label>
            <input
              type={type}
              value={value}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Foto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-800
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3F7F83] file:text-white
              hover:file:bg-[#4F969A]"
            required
          />
          {photoFile && (
            <div className="mt-2 text-sm text-gray-700">
              Selected file: {photoFile.name}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3F7F83] hover:bg-[#4F969A]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
