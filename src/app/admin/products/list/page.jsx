export default function Products() {
  // Data for products
  const products = [
    {
      code: "FRZ000196",
      name: "TEMP GLASS IP 11",
      stock: "17 Pcs",
      price: "Rp 10.000",
    },
    {
      code: "FRZ000195",
      name: "TEMP GLASS IP 11 PRO MAX",
      stock: "19 Pcs",
      price: "Rp 10.000",
    },
    {
      code: "FRZ000373",
      name: "TG BLUE CLR IP 11",
      stock: "15 Pcs",
      price: "Rp 55.000",
    },
    {
      code: "FRC02492",
      name: "CASE PIC MATTE IP 11",
      stock: "0 Pcs",
      price: "Rp 35.000",
    },
    {
      code: "FRZ000374",
      name: "TG BLUE CLR IP 11 PRO",
      stock: "5 Pcs",
      price: "Rp 55.000",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">List Barang</h1>
      </div>

      <div className="flex justify-between items-center">
        {/* Swapped Cari Barang and Rows position */}
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Cari Barang..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
          />
        </div>

        <div>
          <select className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700">
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
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
            {products.map((product, index) => (
              <tr
                key={product.code}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-gray-700 w-[120px]">
                  {product.code}
                </td>
                <td className="px-4 py-2 text-gray-700">{product.name}</td>
                <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                  {product.stock}
                </td>
                <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                  {product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center px-2">
          <button className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
