"use client";
import Footer from "@/components/component/footer";
import Header from "@/components/component/header";
import { ProcessingLoading } from "@/components/component/processing-loading";
import ShortenedUrlCard from "@/components/component/shortened-url-card";
import { ShortenedUrlSkeleton } from "@/components/component/shortened-url-skeleton";
import URLForm from "@/components/component/url-form";
import { IAppStore } from "@/interfaces";
import { ArrowRight, ClockIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { urls, isLoading, isCreateLoading } = useSelector((state: IAppStore) => state.url);

  const { data: user } = useSelector((state: IAppStore) => state.user);


  return (
    <>
      {isCreateLoading && <ProcessingLoading />}
      <div className="bg-gray-50 ">
        <div className=" max-w-screen-xl mx-auto px-6 md:px-6 pb-24 pt-8">
          <Header />
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12  ">
            <div className="space-y-4 flex flex-col items-center ">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Shorten links. Share with ease.
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Enter your long URL to generate a shortened link that's perfect
                for sharing on social media, in emails, or anywhere you need to
                save space.
              </p>

              <URLForm />
            </div>
            <div className="grid gap-4 max-h-[25.5em] px-0 lg:px-4 ">
              {(isLoading && urls.length === 0 )? (
                <ShortenedUrlSkeleton />
              ) : (!isLoading && urls.length === 0 )? (
                <p className="text-sm font-medium leading-none border border-dashed border-gray-400 dark:text-gray-400 text-center py-4">
                  No shortened URLs yet
                </p>
              ) : (
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-6 h-6 text-gray-600" />
                    <h2 className="text-xl font-bold tracking-tighter  text-gray-600">
                      Latest Links
                    </h2>
                  </div>
                  {user && (
                    <Link
                      href="/my-links"
                      className="text-gray-600 font-medium hover:text-gray-800  text-xs flex items-center gap-1"
                    >
                      See all
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              )}
              {urls.map((url, index) => {
                if (index < 3)
                  return <ShortenedUrlCard key={url.id} url={url} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container-center px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                The URL shortener you can trust.
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Shorten links to make them easier to share, analyze clicks with
                detailed analytics, and rest easy knowing your links are secure.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
