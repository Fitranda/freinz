"use client";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", icon: "home", href: "/employee/dashboard" },
  {
    name: "Absensi",
    icon: "users",
    href: "/employee/attendance/list",
  },
  {
    name: "Barang",
    icon: "report",
    children: [
      { name: "Data Barang", href: "/employee/products/list" },
      { name: "Pesan Barang", href: "/employee/products/order/list" },
    ],
  },
  {
    name: "Transaksi",
    icon: "settings",
    children: [
      { name: "Data Penjualan", href: "/employee/transactions/list" },
      { name: "Tambah Transaksi", href: "/employee/transactions/sales" },
    ],
  },
];

export default function Sidebar({ isOpen }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-60 bg-white border-r transform lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out shadow-lg shadow-black/10`}
    >
      <div className="h-full flex flex-col">
        <div className="h-[72px] flex items-center justify-center border-b">
          <img
            src="/images/frenzLogo.png"
            alt="Frenz logo"
            className="w-[200px] h-[200px]"
          />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <i className={`ti ti-${item.icon} text-xl mr-3`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <i className={`ti ti-${item.icon} text-xl mr-3`} />
                      <span className="font-medium flex-1 text-left">
                        {item.name}
                      </span>
                      <i
                        className={`ti ${
                          openMenus[item.name]
                            ? "ti-chevron-up"
                            : "ti-chevron-down"
                        } text-sm`}
                      />
                    </button>

                    {openMenus[item.name] && (
                      <ul className="pl-11 mt-1 space-y-1 text-sm text-gray-600">
                        {item.children.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="block py-2 px-3 rounded-lg hover:bg-gray-100"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Link
            href="/login"
            className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="ti ti-logout text-xl mr-3" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
