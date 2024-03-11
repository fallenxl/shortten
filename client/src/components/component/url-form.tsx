"use client";
import { createURL } from "@/store/url.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { isValidHttpsUrl, isValidSlug } from "@/utils";
import { Button } from "../ui/button";
import { IAppStore, ICreateURL } from "@/interfaces";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

export default function URLForm() {
  const dispatch = useDispatch();
  const urlInitialState: ICreateURL = {
    originalURL: "",
    slug: "",
  };
  const [url, setUrl] = useState<ICreateURL>(urlInitialState);
  const [isError, setIsError] = useState<string>("");
  const URLState = useSelector((state: IAppStore) => state.url);
  const user = useSelector((state: IAppStore) => state.user);

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl({ ...url, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createURL(url) as any).then((res: any) => {
      if (res) {
       return setIsError(res);
      }
      setUrl(urlInitialState);
      setIsError("");
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setUrl({ ...url, slug: "" });
    }
  }, [isOpen]);

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <Input
        name="originalURL"
        className="w-full outline-none focus-visible:ring-0"
        placeholder="Enter your URL"
        type="url"
        value={url.originalURL}
        onChange={handleUrlChange}
      />
      {url.originalURL && (
        <span className="text-xs  mb-2 transition duration-300 text-gray-500 ">
          {isValidHttpsUrl(url.originalURL)
            ? ""
            : "* The URL is not valid, the URL must start with https://"}
        </span>
      )}
      {user && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between px-2">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-0 "
              >
                <p className="text-sm font-medium text-gray-400">Custom URL</p>
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="flex items-center h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <span className="text-sm text-gray-500">
                https://shorttener.link/
              </span>
              <input
                name="slug"
                className="w-full text-sm outline-none text-gray-500 "
                type="text"
                value={url.slug ? url.slug : ""}
                onChange={handleUrlChange}
              />
            </div>
            {url.slug && !isValidSlug(url.slug) && (
              <span className="text-xs  mb-2 transition duration-300 text-gray-500 ">
                * The slug is not valid, the slug must contain only letters,
                numbers, and hyphens
              </span>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
      {isError && <span className="text-xs text-red-500 mb-2">{isError}</span>}
      <Button
        type="submit"
        className="bg-black text-white hover:bg-gray-800"
        onClick={handleSubmit}
        disabled={
          !isValidHttpsUrl(url.originalURL) ||
          (url.slug.length > 0 && !isValidSlug(url.slug))
        }
      >
        Shorten
      </Button>
    </form>
  );
}
