"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractTokenFromCookie } from "../utils";
import { getProfile, logout } from "../services";
import { IAppStore, IUser } from "../interfaces";
import {
  isErrored,
  isLoading,
  isSuccessful,
  setUser,
} from "../store/user.slice";
import { getURLs, getURLsFromLocalStorage } from "@/store/url.slice";
import { ProcessingLoading } from "@/components/component/processing-loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (extractTokenFromCookie()) {
      dispatch(isLoading() as any);
      getProfile()
        .then((res) => {
          if (!res || typeof res === "string") {
            dispatch(isErrored() as any);
            return logout();
          }
          if (res.data) {
            dispatch(setUser(res.data as IUser));
            dispatch(getURLs() as any);
            dispatch(isSuccessful() as any);
          }
        })

        .catch(() => {
          dispatch(isErrored() as any);
        });
    } else {
      dispatch(isSuccessful() as any);
      dispatch(getURLsFromLocalStorage() as any);
    }
  }, []);

  return  <>{children}</>;
}
