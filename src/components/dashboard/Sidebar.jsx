"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchEmployeeById } from "@/services/employee";

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const navigationByRole = {
    Employee: [
      { name: "Dashboard", icon: "home", href: "/employee/dashboard" },
      { name: "Absensi", icon: "users", href: "/employee/attendance/list" },
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
    ],
    Admin: [
      { name: "Dashboard", icon: "home", href: "/admin/dashboard" },
      {
        name: "Barang",
        icon: "report",
        children: [
          { name: "Data Barang", href: "/admin/products/list" },
          { name: "Pesan Barang", href: "/admin/products/order/list" },
        ],
      },
      { name: "Transaksi", icon: "settings", href: "/admin/transactions/list" },
      {
        name: "Supplier",
        icon: "building-store",
        href: "/admin/suppliers/list",
      },
    ],
    supervisor: [
      { name: "Dashboard", icon: "home", href: "/supervisor/dashboard" },
      {
        name: "Barang",
        icon: "report",
        children: [
          { name: "Data Barang", href: "/supervisor/products/list" },
          { name: "Pesan Barang", href: "/supervisor/products/order/list" },
        ],
      },
      {
        name: "Transaksi",
        icon: "settings",
        href: "/supervisor/transactions/list",
      },
      { name: "Absensi", icon: "users", href: "/supervisor/attendance/list" },
      {
        name: "Data Karyawan",
        icon: "user",
        href: "/supervisor/employees/list",
      },
    ],
  };

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const employee = await fetchEmployeeById(token);
        console.log("data: ", employee);
        setRole(employee?.role);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    const navItems = navigationByRole[role] || [];
    const activeParent = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    setOpenMenu(activeParent?.name || null);
  }, [pathname, role]);

  const navigation = navigationByRole[role] || [];

  const isParentActive = (item) => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  const isChildActive = (href) => pathname === href;

  const handleToggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  if (!role) return null; // Bisa diganti dengan loading spinner

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
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isParentActive(item)
                        ? "bg-gray-100 text-gray-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <i className={`ti ti-${item.icon} text-xl mr-3`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => handleToggleMenu(item.name)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        isParentActive(item)
                          ? "bg-gray-100 text-gray-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className={`ti ti-${item.icon} text-xl mr-3`} />
                      <span className="font-medium flex-1 text-left">
                        {item.name}
                      </span>
                      <i
                        className={`ti ${
                          openMenu === item.name
                            ? "ti-chevron-up"
                            : "ti-chevron-down"
                        } text-sm`}
                      />
                    </button>

                    {openMenu === item.name && (
                      <ul className="pl-11 mt-1 space-y-1 text-sm">
                        {item.children.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className={`block py-2 px-3 rounded-lg transition-colors ${
                                isChildActive(sub.href)
                                  ? "bg-gray-100 text-gray-800"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
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
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <i className="ti ti-logout text-xl mr-3" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
