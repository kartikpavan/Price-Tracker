"use client";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineShareAlt } from "react-icons/ai";

const notify = () =>
  toast.success("Link Copied to Clipboard", {
    duration: 4000,
    position: "top-center",
  });

const CopyToClipboard = () => {
  function handleCopyToClipboard() {
    // Copy url to clipboard
    navigator.clipboard.writeText(window.location.href);
    // open toast
    notify();
  }
  return (
    <>
      <div
        onClick={handleCopyToClipboard}
        className="px-3 py-1 bg-base-200 rounded-lg cursor-pointer tooltip hover:bg-base-300 transition-all ease-in-out duration-200 active:scale-90"
        data-tip="Share"
      >
        <AiOutlineShareAlt className="text-xl" />
      </div>
    </>
  );
};

export default CopyToClipboard;
