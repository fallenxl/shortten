"use client";
import Footer from "@/components/component/footer";
import Header from "@/components/component/header";
import {  IUser } from "@/interfaces";
import { getProfile, logout } from "@/services";
import { getURLsFromLocalStorage } from "@/store/url.slice";
import { setUser } from "@/store/user.slice";
import { extractTokenFromCookie } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (extractTokenFromCookie()) {
      getProfile()
        .then((res) => {
          if (!res || typeof res === "string") {
            return logout();
          }
          if (res.data) {
            dispatch(setUser(res.data as IUser));
          }
        })
        .catch(() => {
          logout();
        });
    } else {
      dispatch(getURLsFromLocalStorage() as any);
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

