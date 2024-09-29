import Link from "next/link";
import { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { PiPhone, PiUserCircleLight } from "react-icons/pi";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <header className="relative flex items-center w-full h-[48px] justify-between px-[32px] z-20 bg-white text-gray-800">
      <div className="block">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={!open ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>
      </div>
      <Link href="/" className="font-bold text-lg">
        REVEL Demo
      </Link>
      <div className="flex items-center ">
        <div className="hover:bg-[#eee] cursor-pointer h-[48px] flex items-center px-[16px]">
          <PiPhone className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
        </div>
        <div className="hover:bg-[#eee] cursor-pointer h-[48px] flex items-center px-[16px]">
          <PiUserCircleLight className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;
