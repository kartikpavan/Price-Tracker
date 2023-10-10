"use client";
import { addUserEmailToAssociatedProduct } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMail } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast.success("Email sent successfully", {
    duration: 4000,
    position: "top-center",
  });

const Modal = ({ productId }: { productId: string }) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsloading(true);
      await addUserEmailToAssociatedProduct(productId, email);
      setIsloading(false);
      setEmail("");
      notify();
      // @ts-ignore
      document.getElementById("my_modal_2").close();
    } catch (error) {
      if (error instanceof Error) {
        alert(`OOPS:${error.message}`);
        setIsloading(false);
        // @ts-ignore
        document.getElementById("my_modal_2").close();
      }
    }
  };

  return (
    <>
      <button
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_2")!.showModal()}
        type="button"
        className="btn btn-accent"
      >
        Notify Me
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          {/* Header */}
          <div className="flex items-centr justify-between">
            <div className="flex items-center gap-1">
              <Image
                src={"/assets/logo.png"}
                alt="logo"
                width={20}
                height={20}
              />
              <p className="text-md font-semibold text-primary-content ">
                Price<span className="text-primary">Tracker</span>
              </p>
            </div>
            <AiOutlineCloseCircle
              className="text-error cursor-pointer"
              size={26}
              // @ts-ignore
              onClick={() => document.getElementById("my_modal_2").close()}
            />
          </div>
          {/* Body */}
          <form onSubmit={handleSubmit} className="pt-6">
            <p className="font-semibold tracking-wide">
              Stay updated with product pricing alerts right in your inbox.
            </p>
            <p className="text-gray-400/70 text-sm font-light py-1">
              Never miss a bargain again with our timely alerts.
            </p>
            {/* Email address */}
            <div className="form-control w-full pt-4">
              <label className="label">
                <span className="label-text">Email address</span>
              </label>
              <div className="flex items-center gap-3 border px-2 py-3 rounded-md">
                <AiOutlineMail size={24} />
                <input
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  type="text"
                  placeholder="contact@gmail.com"
                  className="w-full border-none outline-none bg-transparent "
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              disabled={email === ""}
              type="submit"
              className="mt-6 btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Just a moment
                </>
              ) : (
                <> Track Product Now</>
              )}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Toaster />
    </>
  );
};

export default Modal;
