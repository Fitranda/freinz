import Link from "next/link";

const navigation = [
  { name: "Dashboard", icon: "home", href: "/dashboard" },
  { name: "Users", icon: "users", href: "/dashboard/users" },
  { name: "Reports", icon: "report", href: "/dashboard/reports" },
  { name: "Settings", icon: "settings", href: "/dashboard/settings" },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <div className="font-poppins text-2xl font-bold text-[#3F7F83]">
            Frenz
            <span className="text-sm text-[#2B5658] block -mt-1">
              Indonesia
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className={`ti ti-${item.icon} text-xl mr-3`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="ti ti-logout text-xl mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
