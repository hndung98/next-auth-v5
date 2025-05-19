"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createBook, updateBook } from "@/actions/book";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import ComboBox from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookSchema } from "@/schemas";

async function getAuthors(
  query: string,
  offset = 1,
  size = 10
): Promise<AuthorInfo[]> {
  return fetch(
    `/api/authors?offset=${offset}&size=${size}&query=${query}`
  ).then((res) => res.json());
}

async function getAuthorById(id: string): Promise<AuthorInfo> {
  return fetch(`/api/authors/${id}`).then((res) => res.json());
}

type AuthorInfo = {
  id: string;
  name: string;
  nationality: string;
};

export function CreateForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorInfo>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (filesList?.length || 0 > 0) {
      setFiles(filesList);
    } else {
      setFiles(null);
    }
  };

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: "",
      authorId: "",
      coverImage: null,
      pageCount: 0,
      publishedYear: 0,
    },
  });

  function onSubmit(values: z.infer<typeof BookSchema>) {
    startTransition(() => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("authorId", values.authorId);
      formData.append("pageCount", values.pageCount.toString());
      formData.append("publishedYear", values.publishedYear.toString());
      if (values.coverImage) formData.append("coverImage", values.coverImage);
      createBook(formData).then((res) => {
        console.log("onSubmit-res", res);
        setError("");
        setSuccess("");
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[780px]"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="authorId"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Author</FormLabel>
                <ComboBox<AuthorInfo>
                  {...fieldProps}
                  title="Author"
                  valueKey="id"
                  value={selectedAuthor}
                  searchFn={getAuthors}
                  renderText={(author: AuthorInfo) => `${author?.name}`}
                  onChange={(author) => {
                    console.log({ value });
                    onChange(author.id);
                    setSelectedAuthor(author);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="War And Peace"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Year</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="2014"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                      {...fieldProps}
                      id="picture"
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        console.log(value);
                        onChange(event.target.files && event.target.files[0]);
                        handleFileChange(event);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
                <div>
                  {files && files?.length > 0 && (
                    <Image
                      width={580}
                      height={780}
                      src={URL.createObjectURL(files[0])}
                      alt="Cover image of the book"
                    />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />
        <div className="w-full flex gap-4 justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-[120px] cursor-pointer"
          >
            Create
          </Button>
          <Link
            href="/dashboard/books"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 my-dark-style"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}

export function EditForm({ book }: { book: Book }) {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorInfo>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (filesList?.length || 0 > 0) {
      setFiles(filesList);
    } else {
      setFiles(null);
    }
  };

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: book.title,
      authorId: book.authorId,
      coverImage: null,
      pageCount: book.pageCount ?? 0,
      publishedYear: book.publishedYear ?? 0,
    },
  });

  function onSubmit(values: z.infer<typeof BookSchema>) {
    startTransition(() => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("authorId", values.authorId);
      formData.append("pageCount", values.pageCount.toString());
      formData.append("publishedYear", values.publishedYear.toString());
      if (values.coverImage) formData.append("coverImage", values.coverImage);
      updateBook(book.productId, formData).then((res) => {
        console.log("onSubmit-res", res);
        setError("");
        setSuccess("");
      });
    });
  }

  useEffect(() => {
    fetch(`/api/authors/${book.authorId}`)
      .then((res) => res.json())
      .then(setSelectedAuthor);
  }, [book.authorId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[780px]"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="authorId"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Author</FormLabel>
                <ComboBox<AuthorInfo>
                  {...fieldProps}
                  title="Author"
                  valueKey="id"
                  value={selectedAuthor}
                  searchFn={getAuthors}
                  oldValueId={book.authorId}
                  getOldValueFn={getAuthorById}
                  renderText={(author: AuthorInfo) => `${author?.name}`}
                  onChange={(author) => {
                    console.log({ value });
                    onChange(author.id);
                    setSelectedAuthor(author);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="War And Peace"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Year</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="2014"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                      {...fieldProps}
                      id="picture"
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        console.log(value);
                        onChange(event.target.files && event.target.files[0]);
                        handleFileChange(event);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
                <div>
                  {!files && book.coverImagePath && (
                    <>
                      <p>Old image</p>
                      <Image
                        width={580}
                        height={780}
                        src={book.coverImagePath}
                        alt="Old cover image of the book"
                      />
                    </>
                  )}
                  {files && files?.length > 0 && (
                    <>
                      <p>New image</p>
                      <Image
                        width={580}
                        height={780}
                        src={URL.createObjectURL(files[0])}
                        alt="New cover image of the book"
                      />
                    </>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />
        <div className="w-full flex gap-4 justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-[120px] cursor-pointer"
          >
            Update
          </Button>
          <Link
            href="/dashboard/books"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 my-dark-style"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}
