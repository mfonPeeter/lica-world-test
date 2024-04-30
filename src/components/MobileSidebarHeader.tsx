"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { AppContext } from "@/context/app-context";

export default function MobileSideBarHeader() {
  const { showSidebarHandler } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between spaxe-x-2 mb-6 xs:items-start">
      <div className="flex items-center space-x-0 md:hidden xs:space-x-2">
        <button
          onClick={showSidebarHandler}
          className="p-1 transition-colors rounded-md hover:bg-gray-200"
        >
          <Image
            src="/svg/hamburger.svg"
            alt="Hamburger Button"
            width="28"
            height="28"
          />
        </button>
        <Link href="/" className="inline-block">
          <Image src="/logo.webp" alt="Logo" width="170" height="170" />
        </Link>
      </div>

      <div className="md:hidden">
        <UserButton />
      </div>
    </div>
  );
}
