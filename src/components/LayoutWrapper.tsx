"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/src/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/management-secure-portal");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 flex-1 flex flex-col">
        {children}
      </main>
    </>
  );
}
