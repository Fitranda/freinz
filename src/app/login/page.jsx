"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="w-full h-screen flex relative overflow-hidden bg-white">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute rounded-full bg-gradient-to-b from-[#3F7F83] to-[#2B5658] w-[941px] h-[794px] -left-[225px] -top-[117px]" />
        <div className="absolute rounded-full bg-gradient-to-b from-[#3F7F83] to-[#2B5658] w-[398px] h-[349px] -left-[77px] top-[553px]" />
        <div className="absolute rounded-full bg-gradient-to-b from-[#3F7F83] to-[#2B5658] w-[283px] h-[248px] left-[419px] top-[454px]" />
      </div>

      <div className="flex w-full max-w-[1280px] mx-auto p-5 relative z-[1] lg:flex-row flex-col items-center lg:p-10">
        <div className="font-poppins text-[48px] font-bold text-[#3F7F83] lg:mt-[100px] lg:ml-[100px] mt-5 uppercase tracking-[2px] text-center lg:text-left">
          <span>Frenz</span>
          <div className="text-[24px] -mt-[10px] text-[#2B5658]">Indonesia</div>
        </div>

        <div className="lg:ml-auto p-10 w-full max-w-[472px] lg:w-[472px]">
          <div className="font-poppins text-[53px] font-bold text-black mb-10 sm:text-[53px] text-[36px] text-center sm:text-left">
            Selamat Datang!
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[50px]">
            <div className="relative rounded-[20px] p-5 h-[76px] flex items-center bg-[#D9D9D9] sm:h-[76px] h-[60px]">
              <i className="ti ti-user text-[24px] text-black mr-5" />
              <input
                type="text"
                placeholder="Nomor Id"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                className="bg-transparent border-none font-poppins text-[24px] font-light text-black w-full sm:text-[24px] text-[18px] focus:outline-none"
              />
            </div>

            <div className="relative rounded-[20px] p-5 h-[76px] flex items-center bg-[#D9D9D9] sm:h-[76px] h-[60px]">
              <i className="ti ti-lock text-[24px] text-black mr-5" />
              <input
                type="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-transparent border-none font-poppins text-[24px] font-light text-black w-full sm:text-[24px] text-[18px] focus:outline-none"
              />
            </div>

            <div className="h-[1px] my-10 bg-black" />

            <button
              type="submit"
              className="w-full h-[76px] rounded-[20px] border-none text-white font-poppins text-[36px] font-bold cursor-pointer bg-[#3F7F83] sm:h-[76px] h-[60px] sm:text-[36px] text-[24px]"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
