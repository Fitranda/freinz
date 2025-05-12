"use client";

import {
  Plus,
  Database,
  ChartBar,
  Clock,
  CreditCard,
  Package,
} from "tabler-icons-react";

import Stats from "@/components/dashboard/Stats";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="font-poppins flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2B5658]">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Selamat Datang Kembali, Verdiansyah
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
              { label: "Karyawan", icon: <Plus /> },
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
