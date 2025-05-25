"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/product";
import { createSale } from "@/services/sale";
import { fetchEmployeeById } from "@/services/employee";
import toast from "react-hot-toast";

export default function KeranjangPenjualan() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [payment, setPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Load products
        const products = await fetchProducts();
        setAllProducts(products);

        // Load current employee dari token
        const token = localStorage.getItem("token");
        if (token) {
          const employee = await fetchEmployeeById(token);
          setCurrentEmployee(employee);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Gagal memuat data");
      }
    }
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(
      (p) =>
        p.productName &&
        p.productName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.productId);
      if (exists) {
        return prev.map((item) =>
          item.id === product.productId
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.productId,
          name: product.productName,
          quantity: 1,
          price: product.price,
          total: product.price,
        },
      ];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetCart = () => {
    setCartItems([]);
    setDiscountPercentage(0);
    setPayment(0);
  };

  const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const validDiscountPercentage = Math.max(
    0,
    Math.min(100, discountPercentage)
  );
  const discountAmount = (subTotal * validDiscountPercentage) / 100;
  const totalAfterDiscount = subTotal - discountAmount;
  const change =
    payment >= totalAfterDiscount ? payment - totalAfterDiscount : 0;

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    const num = Number(value);
    if (!isNaN(num)) {
      setDiscountPercentage(num);
    }
  };

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    const num = Number(value);
    if (!isNaN(num)) {
      setPayment(num);
    }
  };

  // Generate invoice number
  const generateInvoice = () => {
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0");
    return `INV${timestamp}`;
  };

  // Handle submit transaksi
  const handleSubmitSale = async () => {
    // Validasi basic
    if (cartItems.length === 0) {
      toast.error("Keranjang masih kosong!");
      return;
    }

    if (!currentEmployee) {
      toast.error("Data employee tidak ditemukan!");
      return;
    }

    if (payment < totalAfterDiscount) {
      toast.error("Pembayaran kurang!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data sesuai API
      const saleData = {
        invoice: generateInvoice(),
        employeeId: currentEmployee.employeeId,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        method: paymentMethod,
        subtotal: subTotal,
        discountPercent: validDiscountPercentage,
        total: totalAfterDiscount,
        payment: payment,
        change: change,
        details: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.total,
        })),
      };

      console.log("Sending sale data:", saleData);

      const result = await createSale(saleData);

      if (result) {
        toast.success("Transaksi berhasil disimpan!");
        console.log("Sale created:", result);

        // Reset form setelah berhasil
        handleResetCart();
        setSearchInput("");
        setSearchResults([]);

        // Optional: redirect atau print receipt
        // router.push(`/receipt/${result.id}`);
      } else {
        throw new Error("Gagal menyimpan transaksi");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Gagal menyimpan transaksi: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white text-gray-800">
      <div className="bg-gray-100 py-2 px-4 rounded">
        <h1 className="text-xl font-semibold">Transaksi Penjualan</h1>
        {currentEmployee && (
          <p className="text-sm text-gray-600">
            Kasir: {currentEmployee.employeeName}
          </p>
        )}
      </div>

      <div className="border rounded shadow bg-white">
        <div className="bg-[#3F7F83] text-white py-3 px-4 rounded-t">
          <span className="font-semibold">Cari Barang</span>
        </div>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Masukan : Kode / Nama Barang [ENTER]"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-500"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <div>
            <h2 className="font-semibold mb-2">Hasil Pencarian</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="px-4 py-2 text-left">Nama Barang</th>
                  <th className="px-4 py-2 text-center">Stok</th>
                  <th className="px-4 py-2 text-center">Harga</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      Tidak ada hasil pencarian
                    </td>
                  </tr>
                ) : (
                  searchResults.map((item) => (
                    <tr key={item.productId} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2 text-center">{item.stock}</td>
                      <td className="px-4 py-2 text-center">
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                        >
                          Tambah
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border rounded shadow bg-white">
        <div className="bg-[#3F7F83] text-white py-3 px-4 flex justify-between items-center rounded-t">
          <span className="font-bold text-lg">KASIR</span>
          <button
            onClick={handleResetCart}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium"
          >
            RESET KERANJANG
          </button>
        </div>

        <div className="p-4">
          <table className="w-full border border-gray-300 text-sm mb-4">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="p-2 border-r">No</th>
                <th className="p-2 border-r">Nama Barang</th>
                <th className="p-2 border-r">Jumlah</th>
                <th className="p-2 border-r">Total</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-gray-500 italic font-light"
                  >
                    Keranjang kosong
                  </td>
                </tr>
              ) : (
                cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2 border-r text-center">{index + 1}</td>
                    <td className="p-2 border-r">{item.name}</td>
                    <td className="p-2 border-r text-center">
                      {item.quantity}
                    </td>
                    <td className="p-2 border-r text-center">
                      Rp {item.total.toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mb-4">
            <label className="font-semibold mr-4">Metode Pembayaran:</label>
            <label className="mr-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="mr-1"
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="qris"
                checked={paymentMethod === "qris"}
                onChange={() => setPaymentMethod("qris")}
                className="mr-1"
              />
              QRIS
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <div className="mb-2 flex items-center">
                <label className="w-1/3">Discount (%)</label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={handleDiscountChange}
                  min={0}
                  max={100}
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>
              <div className="mb-2 flex items-center">
                <label className="w-1/3">Sub Total</label>
                <input
                  type="text"
                  value={`Rp ${subTotal.toLocaleString()}`}
                  readOnly
                  className="flex-1 border border-gray-300 p-2 bg-gray-100 text-gray-800"
                />
              </div>
              <div className="mb-2 flex items-center">
                <label className="w-1/3">Total Semua</label>
                <input
                  type="text"
                  value={`Rp ${totalAfterDiscount.toLocaleString()}`}
                  readOnly
                  className="flex-1 border border-gray-300 p-2 bg-gray-100 text-gray-800 font-bold"
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center">
                <label className="w-1/3">Bayar</label>
                <input
                  type="number"
                  value={payment}
                  onChange={handlePaymentChange}
                  min={0}
                  className="flex-1 border border-gray-300 p-2"
                />
              </div>
              <div className="mb-2 flex items-center">
                <label className="w-1/3">Kembali</label>
                <input
                  type="text"
                  value={`Rp ${change.toLocaleString()}`}
                  readOnly
                  className="flex-1 border border-gray-300 p-2 bg-gray-100 text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSubmitSale}
              disabled={
                isSubmitting ||
                cartItems.length === 0 ||
                payment < totalAfterDiscount
              }
              className={`px-6 py-3 rounded font-semibold text-white ${
                isSubmitting ||
                cartItems.length === 0 ||
                payment < totalAfterDiscount
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "SIMPAN TRANSAKSI"}
            </button>
          </div>

          {/* Status indicators */}
          <div className="mt-2 text-sm">
            {cartItems.length === 0 && (
              <p className="text-red-500">• Tambahkan produk ke keranjang</p>
            )}
            {payment < totalAfterDiscount && payment > 0 && (
              <p className="text-red-500">
                • Pembayaran kurang Rp{" "}
                {(totalAfterDiscount - payment).toLocaleString()}
              </p>
            )}
            {payment >= totalAfterDiscount && cartItems.length > 0 && (
              <p className="text-green-600">• Siap untuk disimpan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
