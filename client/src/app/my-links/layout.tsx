"use client";
import Footer from "@/components/component/footer";
import Header from "@/components/component/header";
import { IAppStore } from "@/interfaces";
import { useSelector } from "react-redux";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useSelector((state: IAppStore) => state.user);
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 md:px-6 pb-16 pt-8">
          <Header user={user}/>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

