"use client";
import config from "@/config";
import { useEffect } from "react";

export default function SlugRedirect() {
  useEffect(() => {
    const slug = window.location.pathname.split("/")[1];
    window.open(config.API_URL + slug, "_self");
  }, []);
  return;
}
