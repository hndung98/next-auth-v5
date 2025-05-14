"use client";

import { SearchIcon } from "lucide-react";

export const SearchBar = ({ channel }: { channel: string }) => {
  function onSubmit(formData: FormData) {
    console.log(formData, channel);
  }

  return (
    <form
      action={onSubmit}
      className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
    >
      <label className="w-full ">
        <span className="sr-only">search for products</span>
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="on"
          required
          className="h-10 w-full rounded-md border border-neutral-300 bg-transparent px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black my-dark-style"
        />
      </label>
      <div className="absolute inset-y-0 right-1 flex items-center">
        <button
          type="submit"
          className="inline-flex aspect-square w-8 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80 my-dark-style"
        >
          <span className="sr-only">search</span>
          <SearchIcon aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
