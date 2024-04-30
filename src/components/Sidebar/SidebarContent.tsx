"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/context/app-context";
import SidebarFooter from "./SidebarFooter";

export default function SidebarContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showSidebar, showSidebarHandler } = useContext(AppContext);
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={showSidebarHandler}
        className={`fixed z-10 w-full h-screen bg-gray-900/10 transition-all duration-500 ${
          showSidebar ? "block" : "hidden"
        }`}
      />
      <nav
        className={`absolute z-20 flex flex-col justify-between bg-gray-100 pt-4 pb-2 text-[14.5px] w-[80%] transition-all duration-500 md:h-screen md:relative md:w-[250px] md:translate-x-0 ${
          showSidebar ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-screen px-3">
          <div className="flex flex-col-reverse space-y-reverse space-y-2 items-center justify-between mb-6 xs:flex-row xs:space-y-0">
            <Link href="/" className="self-start">
              <Image src="/logo.webp" alt="Logo" width="170" height="170" />
            </Link>
            <button
              onClick={showSidebarHandler}
              className="self-end flex items-center justify-between p-2 bg-gray-200 rounded-lg transition-colors focus:outline-none hover:bg-gray-300 md:hidden"
            >
              <Image
                src="/svg/close.svg"
                alt="Close sidebar button"
                width="20"
                height="20"
              />
            </button>
          </div>
          <ul className="flex flex-col space-y-3 h-full">
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/create.svg"
                  alt="Create"
                  width="20"
                  height="20"
                />
                <span>Create</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/posts"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/posts"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/posts.svg"
                  alt="Posts"
                  width="20"
                  height="20"
                />
                <span>Posts</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/carousel-creator"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/carousel-creator"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/carousel.svg"
                  alt="Carousel creator"
                  width="20"
                  height="20"
                />
                <span>Carousel creator</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/ideas-generator"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/ideas-generator"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/ideas.svg"
                  alt="Ideas generator"
                  width="20"
                  height="20"
                />
                <span>Ideas generator</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/analytics"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/analytics"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/analytics.svg"
                  alt="Analytics"
                  width="20"
                  height="20"
                />
                <span>Analytics</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/tools"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/tools"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/tools.svg"
                  alt="Tools"
                  width="20"
                  height="20"
                />
                <span>Tools</span>
              </Link>
            </li>
            <li onClick={showSidebarHandler}>
              <Link
                href="/dashboard/upgrade"
                className={`flex space-x-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/upgrade"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Image
                  src="/svg/upgrade.svg"
                  alt="Upgrade"
                  width="20"
                  height="20"
                />
                <span>Upgrade</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="px-3">
            <Link
              href="/"
              className="flex space-x-1.5 py-2 px-3 mb-2 rounded-lg transition-colors hover:bg-gray-200"
            >
              <Image
                src="/svg/feedback.svg"
                alt="Send Feedback"
                width="20"
                height="20"
              />
              <span>Send Feedback</span>
            </Link>
          </div>
          {children}
        </div>
      </nav>
    </>
  );
}
