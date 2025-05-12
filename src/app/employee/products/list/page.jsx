export default function Products() {
  return (
    <div className="space-y-4">
      <div className="font-poppins">
        <h1 className="text-3xl font-bold text-[#2B5658]">List Barang</h1>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <select className="px-3 py-2 border-2 border-[#3F7F83] rounded-lg text-gray-700">
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
          </select>
        </div>

        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Cari Barang..."
            className="w-[200px] px-4 py-2 border-2 text-gray-700 border-[#3F7F83] rounded-lg placeholder-gray-500"
          />
          <button className="w-[150px] px-4 py-2 border bg-[#3F7F83] text-white rounded-lg hover:bg-[#4F969A] transition">
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
            <tr className="border-b bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-700 w-[120px]">FRZ000196</td>
              <td className="px-4 py-2 text-gray-700">TEMP GLASS IP 11</td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                17 Pcs
              </td>
              <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                Rp 10.000
              </td>
              <td className="px-4 py-2 text-center w-[200px]">
                <div className="flex space-x-2">
                  <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b bg-white hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-700 w-[120px]">FRZ000195</td>
              <td className="px-4 py-2 text-gray-700">
                TEMP GLASS IP 11 PRO MAX
              </td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                19 Pcs
              </td>
              <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                Rp 10.000
              </td>
              <td className="px-4 py-2 text-center w-[200px]">
                <div className="flex space-x-2">
                  <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-700 w-[120px]">FRZ000373</td>
              <td className="px-4 py-2 text-gray-700">TG BLUE CLR IP 11</td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                15 Pcs
              </td>
              <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                Rp 55.000
              </td>
              <td className="px-4 py-2 text-center w-[200px]">
                <div className="flex space-x-2">
                  <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b bg-white hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-700 w-[120px]">FRC02492</td>
              <td className="px-4 py-2 text-gray-700">CASE PIC MATTE IP 11</td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                0 Pcs
              </td>
              <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                Rp 35.000
              </td>
              <td className="px-4 py-2 text-center w-[200px]">
                <div className="flex space-x-2">
                  <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-700 w-[120px]">FRZ000374</td>
              <td className="px-4 py-2 text-gray-700">TG BLUE CLR IP 11 PRO</td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                5 Pcs
              </td>
              <td className="px-4 py-2 text-center text-gray-700 min-w-[180px] whitespace-nowrap">
                Rp 55.000
              </td>
              <td className="px-4 py-2 text-center w-[200px]">
                <div className="flex space-x-2">
                  <button className="w-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="w-1/2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
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
