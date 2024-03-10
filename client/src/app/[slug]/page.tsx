"use client";
import config from "@/config";
import { useEffect } from "react";

export default function SlugRedirect() {
  useEffect(() => {
    const slug = window.location.pathname.split("/")[1];
    window.open('https://shorttener-production.up.railway.app/' + slug, "_self");
  }, []);
  return;
}
