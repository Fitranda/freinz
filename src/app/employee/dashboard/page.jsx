"use client";

import {
  Plus,
  Database,
  ChartBar,
  Clock,
  CreditCard,
  Package,
} from "tabler-icons-react";

import { useSelector } from "react-redux";
import Stats from "@/components/dashboard/Stats";

export default function Dashboard() {
  const employee = useSelector((state) => state.auth.user);
  return (
    <div className="space-y-8">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat Datang Kembali, {employee?.employeeName || "Guest"}
        </p>
      </div>

      <Stats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3F7F83] mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
                <CreditCard className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">
                  Transaksi: #2039182 | 2 Produk | Rp.50.000
                </p>
                <p className="text-xs text-gray-500">30 Menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
                <Package className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">
                  Order Barang: #ORD-39238
                </p>
                <p className="text-xs text-gray-500">09:00 WIB</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
                <Clock className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">
                  Absensi: Fitranda Ramadhana
                </p>
                <p className="text-xs text-gray-500">08:30 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3F7F83] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Transaksi Baru", icon: <Plus /> },
              { label: "Data Produk", icon: <Database /> },
              { label: "Data Penjualan", icon: <ChartBar /> },
              { label: "Absensi", icon: <Clock /> },
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
