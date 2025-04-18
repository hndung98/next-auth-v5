"use client";

import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineFlag } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { AuthorState, createAuthor } from "@/actions/author";
import { useActionState } from "react";

const updateAuthor = () => {
  return;
};

export function CreateForm() {
  const initialState: AuthorState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAuthor, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Author Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Author Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                placeholder="Enter Author Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                // required
              />
              <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Nationality */}
        <div className="mb-4">
          <label
            htmlFor="nationality"
            className="mb-2 block text-sm font-medium"
          >
            Nationality
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nationality"
                name="nationality"
                placeholder="Enter Author's Nationality"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="nationality-error"
                // required
              />
              <HiOutlineFlag className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="nationality-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nationality &&
              state.errors.nationality.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <div id="system-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button className="cursor-pointer" type="submit">
          Create
        </Button>
        <Link
          href="/admin/authors"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

export function EditForm() {
  const state = { message: null, errors: { name: [""], nationality: [""] } };
  const author = {
    name: "",
    nationality: "",
  };
  return (
    <form action={updateAuthor}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Author Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Author Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                placeholder="Enter Author Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={author.name}
                // required
              />
              <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Nationality */}
        <div className="mb-4">
          <label
            htmlFor="nationality"
            className="mb-2 block text-sm font-medium"
          >
            Nationality
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nationality"
                name="nationality"
                placeholder="Enter Author's Nationality"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="nationality-error"
                defaultValue={author.nationality}
                // required
              />
              <HiOutlineFlag className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="nationality-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nationality &&
              state.errors.nationality.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button className="cursor-pointer" type="submit">
          Update
        </Button>
        <Link
          href="/admin/authors"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
