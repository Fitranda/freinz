import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchEmployeeById } from "@/services/employee/index";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const token = useSelector((state) => state.auth.token);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setEmployee(null);
      setError(null);
      return;
    }

    const getEmployee = async () => {
      setLoading(true);
      setError(null);

      try {
        // Decode token to get employee ID
        const decoded = jwtDecode(token);
        const employeeId = decoded.employeeId || decoded.id;

        if (!employeeId) {
          setError("Employee ID not found in token");
          setLoading(false);
          return;
        }

        // Fetch employee data with correct parameters
        const data = await fetchEmployeeById(employeeId, token);

        if (data) {
          setEmployee(data);
        } else {
          setError("Failed to fetch employee data");
        }
      } catch (err) {
        console.error("Failed to fetch employee:", err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    getEmployee();
  }, [token]);

  // Function to get employee initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <i className="ti ti-menu-2 text-2xl" />
        </button>

        <div className="ml-auto flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className="ti ti-bell text-xl text-gray-600" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              ) : error ? (
                <div>
                  <p className="text-sm text-red-500 font-medium">Error</p>
                  <p className="text-xs text-red-400">Failed to load</p>
                </div>
              ) : employee ? (
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {employee.employeeName || employee.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {employee.employeeId || employee.id || "N/A"}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 font-medium">Guest</p>
                  <p className="text-xs text-gray-400">Not logged in</p>
                </div>
              )}
            </div>

            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : employee?.profilePicture ? (
              <img
                src={employee.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            {/* Fallback avatar - shows when no profile picture or image fails to load */}
            <div
              className={`w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white text-sm font-medium ${
                employee?.profilePicture ? "hidden" : "flex"
              }`}
            >
              {employee ? (
                getInitials(employee.employeeName || employee.name)
              ) : (
                <i className="ti ti-user text-xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
