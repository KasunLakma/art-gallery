import React from "react";
import LoginView from "@/components/LoginView";

export const metadata = {
  title: "Admin Portal | Art Gallery",
  description: "Secure login for Art Gallery boutique administrators.",
};

export default function LoginPage() {
  return (
    <main className="pt-12 md:pt-24 pb-24 min-h-screen bg-artBg flex flex-col justify-center">
      <LoginView />
    </main>
  );
}
