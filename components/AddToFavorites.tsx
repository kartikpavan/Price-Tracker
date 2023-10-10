"use client";
import React from "react";
import { BiBookmark } from "react-icons/bi";

const AddToFavorites = () => {
  function handleAddToFavorites() {
    const currentpath = window.location.href;
    alert("Feature not available");
  }

  return (
    <>
      <div
        onClick={handleAddToFavorites}
        className="px-3 py-1 bg-base-200 rounded-lg cursor-pointer tooltip hover:bg-base-300 transition-all ease-in-out duration-200 active:scale-90"
        data-tip="Add to favorites"
      >
        <BiBookmark className="text-xl" />
      </div>
    </>
  );
};

export default AddToFavorites;
