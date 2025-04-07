export default function Stats() {
  const stats = [
    { name: "Total Users", value: "1,234", icon: "users" },
    { name: "Active Sessions", value: "56", icon: "activity" },
    { name: "Total Revenue", value: "$12,345", icon: "currency-dollar" },
    { name: "Growth Rate", value: "+12.5%", icon: "chart-line" },
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
              <i className={`ti ti-${stat.icon} text-2xl`} />
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
