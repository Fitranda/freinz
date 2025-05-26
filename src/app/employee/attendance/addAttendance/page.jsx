"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchEmployeeById } from "@/services/employee"; // adjust path if needed
import { createAttendance } from "@/services/attendance"; // adjust path if needed

export default function AddAttendance() {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current date and time strings
  const getCurrentDate = () => new Date().toISOString().split("T")[0];
  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Get lat/long from browser geolocation if possible
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    // Fetch employee from token
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        router.push("/login");
        return;
      }

      const emp = await fetchEmployeeById(token);
      if (!emp) {
        alert("Failed to fetch employee data");
        router.push("/");
        return;
      }
      setEmployeeData(emp);
      setLoading(false);
    };

    fetchData();

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          });
        },
        () => {
          setLocation({ latitude: "", longitude: "" });
        }
      );
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      alert("Mohon pilih foto terlebih dahulu.");
      return;
    }
    if (!employeeData) {
      alert("Data karyawan belum tersedia.");
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", employeeData.employeeId);
    formData.append("employeeName", employeeData.employeeName);
    formData.append("date", getCurrentDate());
    formData.append("time", getCurrentTime());
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("photo", photoFile);

    try {
      await createAttendance(formData);
      alert("Absensi berhasil ditambahkan!");
      setPhotoFile(null);
      router.push("/employee/attendance/list");
    } catch (error) {
      alert(`Gagal menambahkan absensi: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tambah Absensi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "ID Karyawan", value: employeeData.employeeId },
          { label: "Nama Karyawan", value: employeeData.employeeName },
          { label: "Tanggal", value: getCurrentDate(), type: "date" },
          { label: "Waktu", value: getCurrentTime() },
          { label: "Latitude", value: location.latitude || "-6.2094" },
          { label: "Longitude", value: location.longitude || "106.8462" },
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
