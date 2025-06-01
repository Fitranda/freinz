"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import { fetchPurchaseOrders } from "@/services/purchase";

export default function PurchaseOrderListPage() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadPurchaseOrders = async () => {
      try {
        const data = await fetchPurchaseOrders(token);
        setPurchaseOrders(data);
      } catch (error) {
        toast.error("Failed to load purchase orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadPurchaseOrders();
    }
  }, [token]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      approved: { color: "bg-green-100 text-green-800", text: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", text: "Rejected" },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch =
      order.invoice?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      order.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });
  console.log("Filtered Orders:", filteredOrders);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading purchase orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          History Purchase Orders
        </h1>
        <Link
          href="/employee/purchase-orders/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="ti ti-plus mr-2"></i>
          New Purchase Order
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <i className="ti ti-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>{" "}
              <input
                type="text"
                placeholder="Search by invoice or employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>{" "}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <i className="ti ti-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "No purchase orders found matching your criteria"
                : "No purchase orders yet"}
            </p>
            <Link
              href="/employee/purchase-orders/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <i className="ti ti-plus mr-2"></i>
              Create Your First Purchase Order
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.purchaseDetailId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {order.invoice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {order.detail?.length || 0} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Rp {order.total?.toLocaleString()}
                      </div>
                      {order.discount > 0 && (
                        <div className="text-sm text-gray-500">
                          Discount: Rp {order.discount.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {order?.supplierName || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">
            {purchaseOrders.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {
              purchaseOrders.filter(
                (order) => order.status?.toLowerCase() === "pending"
              ).length
            }
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {
              purchaseOrders.filter(
                (order) => order.status?.toLowerCase() === "approved"
              ).length
            }
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Rejected</div>
          <div className="text-2xl font-bold text-red-600">
            {
              purchaseOrders.filter(
                (order) => order.status?.toLowerCase() === "rejected"
              ).length
            }
          </div>
        </div>
      </div>
    </div>
  );
}
