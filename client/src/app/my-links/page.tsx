"use client";
import ShortenedUrlCard from "@/components/component/shortened-url-card";
import { ShortenedUrlSkeleton } from "@/components/component/shortened-url-skeleton";
import { IAppStore } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Page() {
  const { urls, isLoading } = useSelector((state: IAppStore) => state.url);
  return (
    <div className="flex flex-col   h-full">
      <div className="flex items-center gap-2">
        <Link href="/">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">My Links</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {isLoading && <ShortenedUrlSkeleton/>}
        {urls.map((url) => (
          <ShortenedUrlCard key={url.id} url={url} variant="detail" />
        ))}
      </div>
    </div>
  );
}
