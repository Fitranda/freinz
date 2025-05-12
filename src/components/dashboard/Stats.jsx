import {
  ShoppingCart,
  UserCheck,
  CurrencyDollar,
  Receipt,
} from "tabler-icons-react";

export default function Stats() {
  const stats = [
    { name: "Total Barang", value: "132", icon: <ShoppingCart /> }, // ShoppingCart for products
    { name: "Absensi Pegawai", value: "3/4", icon: <UserCheck /> }, // UserCheck for employee attendance
    {
      name: "Omset Bulan Ini",
      value: "Rp. 3.123.000",
      icon: <CurrencyDollar />,
    }, // CurrencyDollar for sales/revenue
    { name: "Transaksi Hari Ini", value: "6", icon: <Receipt /> }, // Receipt for transactions
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#3F7F83] to-[#2B5658] flex items-center justify-center text-white">
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-[#2B5658]">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
