"use client";
import { formatDate, parseURLShortened } from "@/utils";
import { Check, ChevronsUpDown, Copy, Trash } from "lucide-react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { IAppStore, IUrl } from "@/interfaces";
import { Dialog } from "./dialog";
import { deleteURL } from "@/store/url.slice";

interface Props {
  url: IUrl;
  variant?: "detail" | "compact";
}
export default function ShortenedUrlCard({ url, variant = "compact" }: Props) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state: IAppStore) => state.user);

  const { copied, copyToClipboard } = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(url.shortURL);
  };

  const { copied: copiedOriginal, copyToClipboard: copyToClipboardOriginal } = useCopyToClipboard();
  const handleCopyOriginal = () => {
    copyToClipboardOriginal(url.originalURL);
  };
  const handleDelete = () => {
    dispatch(deleteURL(url.id) as any).then(() => setOpenModal(false));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-4 rounded-lg border border-dashed border-gray-400 bg-white flex items-center gap-4 mr-2">
      <div className="flex-1 grid gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none dark:text-gray-400">
            Your Shortened URL
          </p>
          {url.expiresAt && (
            <p className="text-xs  text-gray-400">
              Expires on {formatDate(url.expiresAt)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url.shortURL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            {parseURLShortened(url.shortURL)}
          </a>
          {!copied ? (
            <Copy
              onClick={handleCopy}
              size={14}
              className="inline  text-gray-600 cursor-pointer"
            />
          ) : (
            <>
              <div className="flex items-center">
                <Check
                  size={14}
                  className="inline text-green-600 cursor-pointer"
                />
              </div>
            </>
          )}
          {}
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between ">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-0 "
              >
                <p className="text-sm font-medium text-gray-400">
                  Show original URL
                </p>
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="flex items-center gap-2 w-[15rem] sm:w-[22rem] ">
              <a
                href={url.originalURL}
                target="_blank"
                rel="noreferrer"
                className=" text-sm font-semibold text-blue-600 hover:underline truncate overflow-hidden"
              >
                {url.originalURL}
              </a>
              <div className="flex items-center gap-2">
                {!copiedOriginal ? (
                  <Copy
                    onClick={handleCopyOriginal}
                    size={14}
                    className="inline  text-gray-600 cursor-pointer"
                  />
                ) : (
                  <>
                    <div className="flex items-center">
                      <Check
                        size={14}
                        className="inline text-green-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        {user && variant === "detail" && (
          <>
            <div className="flex items-center justify-between ">
              <p className="text-xs text-gray-400">
                Clicks: {url.clicks} | Created on {formatDate(url.createdAt)}
              </p>
              <div className="flex items-center gap-2 ">
                <Button
                  variant="ghost"
                  className="text-xs font-medium text-red-600 p-0"
                  onClick={() => setOpenModal(true)}
                >
                  <Trash size={12} className="mr-1" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {openModal && (
        <Dialog
          title="Delete URL"
          description="Are you sure you want to delete?"
        >
          <div className="flex flex-row-reverse items-center justify-center gap-2 mt-4">
            <Button
              className="text-red-500 flex gap-2 hover:bg-gray-100"
              onClick={handleDelete}
            >
              <Trash size={10} className="p-0" />
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
