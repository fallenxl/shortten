"use client";
import { useEffect } from "react";

export default function SlugRedirect() {
  useEffect(() => {
    const slug = window.location.pathname.split("/")[1];
    window.open(`http://localhost:4001/${slug}`, "_self");
  }, []);
  return;
}
