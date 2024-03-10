"use client";
import Footer from "@/components/component/footer";
import Header from "@/components/component/header";
import { IAppStore } from "@/interfaces";
import { logout } from "@/services";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useSelector((state: IAppStore) => state.user);

  useEffect(() => {
    if (!user) {
      return logout();
    }
  }, []);
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 md:px-6 pb-16 pt-8">
          <Header />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
