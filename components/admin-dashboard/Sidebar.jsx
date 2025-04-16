"use client"; // Mark this as a Client Component in Next.js 13+
import Link from "next/link"; // Correct import for Next.js Link
import { BiLogInCircle } from "react-icons/bi";
import Image from "next/image"; // Use Next.js's Image component for optimized images
import logo from "@/public/assets/logo.png"; // Ensure this path is correct
import { usePathname } from "next/navigation";
import { navItems } from "@/data";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const path = usePathname();
  return (
    <div className=''>
      {/* Overlay to close sidebar on click */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}
      ></div>

      {/* Sidebar container */}
      <div
        className={`w-[260px] fixed   bg-[#283046]  h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        {/* Logo */}
        <div className='h-[70px] flex justify-center items-center'>
          <Link href='/' className='w-[180px] h-[50px]'>
            <Image
              src={logo}
              alt='Logo'
              className='w-full h-full'
              width={180}
              height={50}
            />
          </Link>
        </div>

        {/* Navigation links */}
        <div className='px-[16px]'>
          <ul>
            {navItems.map((n, i) => (
              <li key={i}>
                <Link
                  href={n.path}
                  className={`${
                    n.path === path
                      ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500"
                      : "text-[#d0d2d6] font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            {/* Logout button */}
            <li>
              <button className='text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'>
                <span>
                  <BiLogInCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
