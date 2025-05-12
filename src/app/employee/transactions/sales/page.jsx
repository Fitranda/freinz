export default function KeranjangPenjualan() {
  // Sample search results data
  const searchResults = [
    { id: 1, name: "TEMP GLASS IP 11", stock: 15, price: 10000 },
    { id: 2, name: "TEMP GLASS IP 11 PRO MAX", stock: 8, price: 10000 },
    { id: 3, name: "TG BLUE CLR IP 11", stock: 12, price: 55000 },
    { id: 4, name: "CASE PIC MATTE IP 11", stock: 20, price: 35000 },
  ];

  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: "TEMP GLASS IP 11",
      quantity: 2,
      price: 10000,
      total: 20000,
    },
    {
      id: 2,
      name: "CASE PIC MATTE IP 11",
      quantity: 1,
      price: 35000,
      total: 35000,
    },
  ];

  // Calculate totals
  const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountPercentage = 10;
  const discountAmount = (subTotal * discountPercentage) / 100;
  const totalAfterDiscount = subTotal - discountAmount;
  const payment = 100000;
  const change = payment - totalAfterDiscount;

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 py-2 px-4">
        <h1 className="text-xl text-gray-600 font-medium">
          Transaksi Penjualan
        </h1>
      </div>

      {/* Combined search and results in a single container */}
      <div className="border rounded shadow">
        <div className="bg-[#3F7F83] text-white py-3 px-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Cari Barang</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Search input */}
          <div>
            <input
              type="text"
              placeholder="Masukan : Kode / Nama Barang [ENTER]"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-700"
            />
          </div>

          {/* Search results */}
          <div>
            <div className="border-b border-gray-300 pb-2 mb-2">
              <h2 className="font-medium text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Hasil Pencarian
              </h2>
            </div>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-4 py-2 w-full text-left text-gray-700 font-medium whitespace-nowrap">
                    Nama Barang
                  </th>
                  <th className="px-4 py-2 text-center text-gray-700 font-medium whitespace-nowrap">
                    Stok
                  </th>
                  <th className="px-4 py-2 text-center text-gray-700 font-medium whitespace-nowrap">
                    Harga Jual Satuan
                  </th>
                  <th className="px-4 py-2 text-center text-gray-700 font-medium whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                      {item.stock}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                      Rp {item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Tambah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cashier section */}
      <div className="border rounded shadow">
        <div className="bg-[#3F7F83] text-white py-3 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span className="font-bold">KASIR</span>
          </div>
          <button className="bg-red-600 text-white px-4 py-1 rounded font-medium">
            RESET KERANJANG
          </button>
        </div>

        <div className="p-4">
          {/* Date section */}
          <div className="flex mb-4">
            <div className="w-1/6 border border-gray-300 p-2 bg-gray-50 font-medium text-gray-700">
              <label>Tanggal</label>
            </div>
            <div className="flex-1 border border-gray-300 bg-gray-100 p-2 text-gray-700">
              <span>12 December 2022, 9:26</span>
            </div>
          </div>

          {/* Table section */}
          <div className="mb-4">
            <div className="flex items-center mb-2 text-gray-700">
              <div>
                <span>Show </span>
                <select className="border border-gray-300 px-2 py-1 rounded">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span> entries</span>
              </div>
              <div className="ml-auto">
                <span>Search: </span>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              </div>
            </div>

            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-2 text-left border-r border-gray-300 text-gray-700 font-medium">
                    No
                  </th>
                  <th className="p-2 text-left border-r border-gray-300 text-gray-700 font-medium">
                    Nama Barang
                  </th>
                  <th className="p-2 text-left border-r border-gray-300 text-gray-700 font-medium">
                    Jumlah
                  </th>
                  <th className="p-2 text-left border-r border-gray-300 text-gray-700 font-medium">
                    Total
                  </th>
                  <th className="p-2 text-left text-gray-700 font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-2 text-gray-700 border-r border-gray-300">
                      {index + 1}
                    </td>
                    <td className="p-2 text-gray-700 border-r border-gray-300">
                      {item.name}
                    </td>
                    <td className="p-2 text-gray-700 border-r border-gray-300 text-center">
                      {item.quantity}
                    </td>
                    <td className="p-2 text-gray-700 border-r border-gray-300 text-center">
                      Rp {item.total.toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="bg-[#3F7F83] text-white px-2 py-1 rounded text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-2 text-gray-700">
              <div>
                Showing 1 to {cartItems.length} of {cartItems.length} entries
              </div>
              <div>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded mr-1 border border-gray-300">
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded border border-gray-300">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Payment section */}
          <div className="flex">
            <div className="w-1/2 pr-2">
              <div className="flex mb-2">
                <div className="w-1/4 p-2 border border-gray-300 bg-gray-50 text-gray-700 font-medium">
                  <label>Discount (%)</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={discountPercentage}
                    readOnly
                    className="w-full border border-gray-300 p-2 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-1/4 p-2 border border-gray-300 bg-gray-50 text-gray-700 font-medium">
                  <label>Total Semua</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={`Rp ${totalAfterDiscount.toLocaleString()}`}
                    readOnly
                    className="w-full border border-gray-300 p-2 text-gray-700"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              {/* Row 1: Bayar */}
              <div className="flex mb-2">
                <div className="w-1/4 p-2 border border-gray-300 bg-gray-50 text-gray-700 font-medium">
                  <label>Bayar</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={`Rp ${payment.toLocaleString()}`}
                    readOnly
                    className="w-full border border-gray-300 p-2 text-gray-700"
                  />
                </div>
              </div>

              {/* Row 2: Kembali + Bayar Button */}
              <div className="flex mb-2 items-center">
                <div className="w-1/4 p-2 border border-gray-300 bg-gray-50 text-gray-700 font-medium">
                  <label>Kembali</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={`Rp ${change.toLocaleString()}`}
                    className="w-full border border-gray-300 p-2 text-gray-700"
                    readOnly
                  />
                </div>
                <div className="ml-2">
                  <button className="bg-green-600 text-white p-2 rounded flex items-center font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Bayar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
