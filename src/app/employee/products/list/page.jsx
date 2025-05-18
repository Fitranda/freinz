"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product/index";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // which productId is editing
  const [newProduct, setNewProduct] = useState(null); // for new product row
  const [tempData, setTempData] = useState({}); // temporary edited data

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter products based on search term (case-insensitive)
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    return products.filter((p) =>
      p.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Pagination calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / rowsPerPage)
  );
  // Clamp currentPage if totalPages decreased
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredProducts.slice(start, start + rowsPerPage);
  }, [filteredProducts, currentPage, rowsPerPage]);

  // Handlers

  function handleEdit(product) {
    setEditingId(product.productId);
    setTempData({
      productName: product.productName,
      price: product.price,
      stock: product.stock,
    });
    setNewProduct(null); // cancel adding new if editing existing
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: name === "productName" ? value : Number(value) || "",
    }));
  }

  async function handleSaveEdit(productId) {
    if (
      !tempData.productName ||
      tempData.price === "" ||
      tempData.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const updateData = {
        productName: tempData.productName,
        price: Number(tempData.price),
        stock: Number(tempData.stock),
      };
      const updated = await updateProduct(productId, updateData);
      const normalizedUpdated = {
        productId: productId,
        productName: updated.productName ?? tempData.productName ?? "",
        price: updated.price ?? tempData.price ?? 0,
        stock: updated.stock ?? tempData.stock ?? 0,
      };
      setProducts((prev) =>
        prev.map((p) => (p.productId === productId ? normalizedUpdated : p))
      );
      setEditingId(null);
      setTempData({});
    } catch (error) {
      console.error("Update product error details:", error);
      alert(`Failed to update product: ${error.message}`);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTempData({});
  }

  function handleAddNew() {
    setNewProduct({ productName: "", price: "", stock: "" });
    setEditingId(null);
    setTempData({});
  }

  function handleChangeNew(e) {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "productName" ? value : value === "" ? "" : Number(value),
    }));
  }

  async function handleSaveNew() {
    if (
      !newProduct.productName ||
      newProduct.price === "" ||
      newProduct.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const productData = {
        productName: newProduct.productName,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      };
      const created = await createProduct(productData);
      const normalizedCreated = {
        ...created,
        stock: created.stock ?? productData.stock ?? 0,
      };
      setProducts((prev) => [normalizedCreated, ...prev]);
      setNewProduct(null);
      setCurrentPage(1); // show newest on first page
    } catch (error) {
      console.error("Create product error details:", error);
      alert(`Failed to create product: ${error.message}`);
    }
  }

  function handleCancelNew() {
    setNewProduct(null);
  }

  // Delete product handler
  async function handleDelete(productId) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.productId !== productId));
      // Adjust current page if last item on last page is deleted
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Delete product error details:", error);
      alert(`Failed to delete product: ${error.message}`);
    }
  }

  // Search input change
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when searching
  }

  // Rows per page change
  function handleRowsPerPageChange(e) {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset page when rows per page changes
  }

  // Pagination buttons
  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">List Barang</h1>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <select
            className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>
        </div>

        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Cari Barang..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleAddNew}
            className="w-[150px] px-4 py-2 border bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition"
          >
            Tambah Barang
          </button>
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
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* New Product Row */}
            {newProduct && (
              <tr className="border-b bg-gray-100">
                <td className="px-4 py-2 text-gray-700 w-[120px]">-</td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleChangeNew}
                    className="w-full px-2 py-1 border rounded text-gray-700"
                    placeholder="Nama Barang"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChangeNew}
                    className="w-[80px] px-2 py-1 border rounded text-center text-gray-700"
                    min={0}
                  />
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChangeNew}
                    className="w-[140px] px-2 py-1 border rounded text-center text-gray-700"
                    min={0}
                  />
                </td>
                <td className="px-4 py-2 text-center w-[200px]">
                  <div className="flex space-x-2 justify-center">
                    <button
                      onClick={handleSaveNew}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelNew}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* No Data */}
            {paginatedProducts.length === 0 && !newProduct && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data produk
                </td>
              </tr>
            )}

            {/* Existing Products Paginated */}
            {paginatedProducts.map((product) => (
              <tr
                key={product.productId}
                className="border-b bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-4 py-2 text-gray-700 w-[120px]">
                  {product.productId}
                </td>

                <td className="px-4 py-2 text-gray-700">
                  {editingId === product.productId ? (
                    <input
                      type="text"
                      name="productName"
                      value={tempData.productName ?? ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded text-gray-700"
                    />
                  ) : (
                    product.productName
                  )}
                </td>

                <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                  {editingId === product.productId ? (
                    <input
                      type="number"
                      name="stock"
                      value={tempData.stock ?? ""}
                      onChange={handleChange}
                      className="w-[80px] px-2 py-1 border rounded text-center text-gray-700"
                      min={0}
                    />
                  ) : (
                    `${product.stock ?? 0} Pcs`
                  )}
                </td>

                <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                  {editingId === product.productId ? (
                    <input
                      type="number"
                      name="price"
                      value={tempData.price ?? ""}
                      onChange={handleChange}
                      className="w-[140px] px-2 py-1 border rounded text-center text-gray-700"
                      min={0}
                    />
                  ) : (
                    `Rp ${(product.price ?? 0).toLocaleString("id-ID")}`
                  )}
                </td>

                <td className="px-4 py-2 text-center w-[200px]">
                  {editingId === product.productId ? (
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleSaveEdit(product.productId)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(product)}
                        className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#3F7F83] text-white hover:bg-[#4F969A]"
            }`}
          >
            Previous
          </button>

          <div className="text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#3F7F83] text-white hover:bg-[#4F969A]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
