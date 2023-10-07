"use client";

const Searchbar = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM SUBMIT");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="Pase your URL here..."
          className="input input-bordered w-full  my-8"
        />
        <button type="submit" className="btn btn-neutral px-8">
          SEARCH
        </button>
      </form>
    </>
  );
};

export default Searchbar;
