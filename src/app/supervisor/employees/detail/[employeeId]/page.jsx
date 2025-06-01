"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { fetchEmployeeById } from "@/services/employee/index";

export default function EmployeeDetailPage() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNumericParam = (param) => {
    const id = Array.isArray(param) ? param[0] : param;
    const numeric = parseInt(id ?? "", 10);
    return isNaN(numeric) ? null : numeric;
  };

  const loadEmployeeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      const numericId = getNumericParam(employeeId);
      if (!numericId) {
        setError("Invalid employee ID");
        setLoading(false);
        return;
      }

      const employeeData = await fetchEmployeeById(numericId, token);

      if (employeeData) {
        const formatted = {
          id: employeeData.employeeId,
          name: employeeData.employeeName,
          address: employeeData.address,
          contact: employeeData.contact,
          username: employeeData.username,
          password: "********",
          salary: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(employeeData.basicSalary),
          role: employeeData.role,
          storename: employeeData.storename,
          status: employeeData.status === 1 ? "Aktif" : "Tidak Aktif",
          profilePicture: employeeData.profilePicture,
        };
        setEmployee(formatted);
      } else {
        setError(`Employee with ID ${numericId} not found.`);
      }
    } catch (error) {
      console.error("Failed to load employee data:", error);
      const msg = error.message || "";
      if (msg.includes("404") || msg.includes("not found")) {
        setError("Employee not found");
      } else if (msg.includes("403")) {
        setError("You don't have permission to view this employee's details");
      } else if (msg.includes("401")) {
        setError("Your session has expired. Please log in again");
      } else {
        setError("Failed to load employee data: " + msg);
      }
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) {
      loadEmployeeData();
    }
  }, [employeeId, loadEmployeeData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading employee details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-lg text-red-600">{error}</div>
        <button
          onClick={loadEmployeeData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Employee not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-[#2B5658]">Detail Karyawan</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* Profile Picture Section */}
        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-300">
            <img
              src={
                employee.profilePicture ??
                "https://via.placeholder.com/150?text=No+Image"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(employee)
            .filter(([key]) => key !== "profilePicture")
            .map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold capitalize">{key}</p>
                <p>{value}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
