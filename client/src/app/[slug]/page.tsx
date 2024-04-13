"use client";
import { ProcessingLoading } from "@/components/component/processing-loading";
import config from "@/config";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const slug = window.location.pathname.split("/")[1];
    window.open(config.API_URL + slug, "_self");
  }, []);


  
  return <ProcessingLoading />;
}
