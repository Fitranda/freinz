"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { fetchEmployeeById } from "@/services/employee"; // adjust path if needed
import { createAttendance } from "@/services/attendance"; // adjust path if needed

export default function AddAttendance() {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentDate = () => new Date().toISOString().split("T")[0];
  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const employeeId = decoded.employeeId || decoded.id;

      if (!employeeId) {
        setError("Employee ID not found in token");
        setLoading(false);
        return;
      }

      const employee = await fetchEmployeeById(employeeId, token);

      if (!employee) {
        setError("Failed to fetch employee data");
        setLoading(false);
        return;
      }
      setEmployeeData(employee);
      setLoading(false);
    };

    fetchData();

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
      toast.error("Please select a photo first.");
      return;
    }
    if (!employeeData) {
      toast.error("Employee data is not available.");
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
      toast.success("Attendance successfully added!");
      setPhotoFile(null);
      setTimeout(() => {
        router.push("/employee/attendance/list");
      }, 1500);
    } catch (error) {
      toast.error(`Failed to add attendance: ${error.message || error}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Add Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Employee ID", value: employeeData.employeeId },
          { label: "Employee Name", value: employeeData.employeeName },
          { label: "Date", value: getCurrentDate(), type: "date" },
          { label: "Time", value: getCurrentTime() },
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
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhotoFile(e.target.files ? e.target.files[0] : null)
            }
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
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3F7F83] hover:bg-[#4F969A]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
