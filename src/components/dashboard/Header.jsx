export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <i className="ti ti-menu-2 text-2xl" />
        </button>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className="ti ti-bell text-xl text-gray-600" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#3F7F83] flex items-center justify-center text-white">
              <i className="ti ti-user text-xl" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@frenz.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
