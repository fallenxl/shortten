"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { extractTokenFromCookie } from "../utils";
import { getProfile, logout } from "../services";
import { IUser } from "../interfaces";
import { setUser } from "../store/user.slice";
import { getURLs, getURLsFromLocalStorage } from "@/store/url.slice";
import { ProcessingLoading } from "@/components/component/processing-loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  useEffect(() => {
    if (extractTokenFromCookie()) {
      setIsLoading(true);
      getProfile()
        .then((res) => {
          alert(JSON.stringify(res));
          if (!res || typeof res === "string") {
            setIsLoading(false);
            return logout();
          }
          if (res.data) {
            dispatch(setUser(res.data as IUser));
            dispatch(getURLs() as any);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          logout();
        });
    } else {
      dispatch(getURLsFromLocalStorage() as any);
    }
  }, []);

  return isLoading ? <ProcessingLoading /> : <>{children}</>;
}
