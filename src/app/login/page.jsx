"use client";

import { useState } from "react";
import Link from "next/link";

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
      <div className="hidden lg:block absolute w-full h-full overflow-hidden">
        <div
          className="absolute rounded-full w-[941px] h-[800px] -left-[225px] -top-[117px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0E1C1D 0%, #264E50 38%, #336669 56%, #3F7F82 75%)",
          }}
        />
        <div
          className="absolute rounded-full w-[398px] h-[400px] -left-[77px] top-[553px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0E1C1D 0%, #264E50 38%, #336669 56%, #3F7F82 75%)",
          }}
        />
        <div
          className="absolute rounded-full w-[283px] h-[280px] left-[419px] top-[454px]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0E1C1D 0%, #264E50 38%, #336669 56%, #3F7F82 75%)",
          }}
        />
        <div className="absolute left-[50px] top-[20px]">
          <img
            src="/images/frenzLogo.png"
            alt="Frenz logo"
            className="rounded-full w-[600px] h-[600px]"
          />
        </div>
      </div>

      <div className="flex w-full max-w-[1280px] mx-auto p-5 relative z-[1] lg:flex-row flex-col items-center lg:p-10">
        <div className="lg:ml-auto p-10 w-full max-w-[472px] lg:w-[472px] shadow-2xl rounded-[20px] bg-white">
          <div className="font-poppins text-[48px] font-bold text-black mb-5 text-center sm:text-left">
            Selamat Datang!
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            <div className="relative rounded-[20px] p-5 h-[76px] flex items-center bg-[#D9D9D9] sm:h-[76px] ">
              <i className="ti ti-user text-[24px] text-black mr-5" />
              <input
                type="text"
                placeholder="Nomor ID"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                className="bg-transparent border-none font-poppins text-[24px] font-light text-black w-full focus:outline-none"
              />
            </div>

            <div className="relative rounded-[20px] p-5 h-[76px] flex items-center bg-[#D9D9D9] sm:h-[76px]">
              <i className="ti ti-lock text-[24px] text-black mr-5" />
              <input
                type="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-transparent border-none font-poppins text-[24px] font-light text-black w-full focus:outline-none"
              />
            </div>

            <Link
              href="/employee/dashboard"
              className="w-full h-[76px] rounded-[20px] border-none text-white font-poppins font-bold mt-[20px] cursor-pointer bg-[#3F7F83] sm:h-[76px] sm:text-[36px] text-[24px] flex items-center justify-center"
            >
              Masuk
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
