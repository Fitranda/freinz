import Stats from "@/components/dashboard/Stats";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Admin</p>
      </div>

      <Stats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3F7F83] mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
                  <i className="ti ti-activity" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Activity {item}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3F7F83] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {["Users", "Reports", "Settings", "Help"].map((action) => (
              <button
                key={action}
                className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#3F7F83] flex items-center justify-center text-white mb-2">
                  <i className={`ti ti-${action.toLowerCase()}`} />
                </div>
                <p className="text-sm font-medium">{action}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
