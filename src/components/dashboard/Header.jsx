import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchEmployeeById } from "@/services/employee/index";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const token = useSelector((state) => state.auth.token);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!token) return;

    const getEmployee = async () => {
      const data = await fetchEmployeeById(token);
      if (data) setEmployee(data);
    };

    getEmployee();
  }, [token]);

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
              <p className="text-sm text-gray-500 font-medium">
                {employee?.employeeName}
              </p>
              <p className="text-xs text-gray-500">
                ID: {employee?.employeeId}
              </p>
            </div>
            {employee?.profilePicture ? (
              <img
                src={employee.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
                <i className="ti ti-user text-xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
