"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "@/services/product/index";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, []);

  // Filter products by search term (case-insensitive)
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    return products.filter((product) =>
      (product.productName ?? product.name ?? product.nama ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Calculate total pages for pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / rowsPerPage)
  );

  // Ensure currentPage is valid when rowsPerPage or filteredProducts changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredProducts.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredProducts, currentPage, rowsPerPage]);

  // Handlers
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  }

  function handleRowsPerPageChange(e) {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on rows per page change
  }

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">List Barang</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari Barang..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
          />
        </div>

        <div>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-2xl shadow-sm overflow-x-auto">
          <thead>
            <tr className="bg-[#3F7F83] text-white">
              <th className="px-4 py-2">Kode</th>
              <th className="px-4 py-2 w-full">Nama Barang</th>
              <th className="px-4 py-2 text-center">Stok</th>
              <th className="px-4 py-2 text-center">Harga Jual Satuan</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  Tidak ada data barang ditemukan
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, index) => (
                <tr
                  key={product.productId ?? index} // Prefer productId for key
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-gray-700 w-[120px]">
                    {product.productId}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {product.productName ?? product.name ?? product.nama}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {product.stock ?? 0} Pcs
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                    Rp {Number(product.price ?? 0).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white transition ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#3F7F83] hover:bg-[#4F969A]"
            }`}
          >
            Previous
          </button>

          <div className="text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white transition ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#3F7F83] hover:bg-[#4F969A]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
