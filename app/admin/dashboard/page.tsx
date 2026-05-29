import React from "react";
import DashboardView from "@/components/DashboardView";

export const metadata = {
  title: "Admin Dashboard | Art Gallery",
  description: "Administrative console to manage shop inventory and categories.",
};

export default function DashboardPage() {
  return (
    <main className="pt-12 md:pt-24 pb-24 min-h-screen bg-artBg">
      <DashboardView />
    </main>
  );
}
