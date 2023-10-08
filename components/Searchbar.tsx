"use client";
import { scrapeAndStoreProducts } from "@/lib/actions";
import { useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (
      hostname.includes("amazon.in") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return false;
    }
  }
  return false;
};

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchTerm);
    if (!isValidLink) {
      return alert("Please provide a valid Amazon Link");
    }
    try {
      setIsLoading(true);
      // Scrape the product page
      const product = await scrapeAndStoreProducts(searchTerm);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
        <input
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          type="text"
          placeholder="Pase your URL here..."
          className="input input-bordered w-full  my-8"
        />
        <button
          type="submit"
          className="btn btn-neutral px-8"
          disabled={searchTerm === ""}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Fetching
            </>
          ) : (
            <>SEARCH</>
          )}
        </button>
      </form>
    </>
  );
};

export default Searchbar;
