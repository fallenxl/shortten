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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (extractTokenFromCookie()) {
      getProfile()
        .then((res) => {
          if (!res) {
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
      setIsLoading(false);
    }
  }, []);

  return isLoading ? <ProcessingLoading /> : <>{children}</>;
}
