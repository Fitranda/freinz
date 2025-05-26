"use client";

import {
  Plus,
  Database,
  ChartBar,
  Clock,
  CreditCard,
  Package,
  CurrencyDollar,
  User,
  MapPin,
  Phone,
  Building,
  Shield,
  Hash,
} from "tabler-icons-react";

import { useEffect, useState } from "react";
import { fetchEmployeeById } from "@/services/employee";
import { useSelector } from "react-redux";
import Stats from "@/components/dashboard/Stats";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEmployee() {
      if (!token) return;

      setLoading(true);
      const data = await fetchEmployeeById(token);
      setEmployee(data);
      setLoading(false);
    }

    getEmployee();
  }, [token]);

  const getIconForField = (label) => {
    const iconMap = {
      "ID Pegawai": <Hash className="w-5 h-5" />,
      Nama: <User className="w-5 h-5" />,
      Alamat: <MapPin className="w-5 h-5" />,
      Kontak: <Phone className="w-5 h-5" />,
      "Nama Toko": <Building className="w-5 h-5" />,
      Peran: <Shield className="w-5 h-5" />,
    };
    return iconMap[label] || <User className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      <div className="font-poppins flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2B5658]">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Selamat Datang Kembali,{" "}
            {employee?.employeeName || (loading ? "Memuat..." : "Guest")}
          </p>
        </div>
        <div>
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pilih Cabang
          </label>
          <select
            id="branch"
            name="branch"
            className="px-4 py-2 text-black border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3F7F83] focus:border-transparent"
            onChange={(e) => {
              console.log("Cabang selected:", e.target.value);
            }}
          >
            <option value="rungkut">Cabang Rungkut</option>
            <option value="sukolilo">Cabang Sukolilo</option>
            <option value="manyar">Cabang Manyar</option>
          </select>
        </div>
      </div>

      <Stats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informasi Pegawai */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3F7F83] to-[#2B5658] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-[#3F7F83] ml-4">
              Informasi Pegawai
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3F7F83]" />
              <p className="text-gray-500 text-sm ml-4">
                Memuat data pegawai...
              </p>
            </div>
          ) : employee ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "ID Pegawai", value: employee.employeeId },
                { label: "Nama", value: employee.employeeName },
                { label: "Alamat", value: employee.address },
                { label: "Kontak", value: employee.contact },
                { label: "Nama Toko", value: employee.storename },
                { label: "Peran", value: employee.role },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center space-x-4 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[#3F7F83] group-hover:from-[#3F7F83] group-hover:to-[#2B5658] group-hover:text-white transition-all duration-200">
                    {getIconForField(label)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {label === "Peran" && value === "Employee"
                        ? "Karyawan Toko"
                        : value || (
                            <span className="text-gray-400 italic">
                              Tidak tersedia
                            </span>
                          )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <User className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-red-500 text-sm font-medium">
                Gagal memuat data pegawai
              </p>
              <p className="text-gray-400 text-xs">Silakan coba lagi nanti</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3F7F83] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Omset Penjualan", icon: <CurrencyDollar /> },
              { label: "Data Produk", icon: <Database /> },
              { label: "Data Penjualan", icon: <ChartBar /> },
              { label: "Order Produk", icon: <Package /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#3F7F83] flex items-center justify-center text-white mb-2">
                  {icon}
                </div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
