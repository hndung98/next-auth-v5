"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Widget } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createWidget, updateWidget } from "@/actions/widget";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WidgetSchema } from "@/schemas";

type CustomerInfo = {
  id: string;
  name: string;
  email: string;
};

export const CreateForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [customers, setCustomers] = useState<CustomerInfo[]>([]);

  const form = useForm<z.infer<typeof WidgetSchema>>({
    resolver: zodResolver(WidgetSchema),
    defaultValues: {
      name: "",
      url: "",
      userId: "",
    },
  });

  function onSubmit(values: z.infer<typeof WidgetSchema>) {
    startTransition(() => {
      console.log(values);
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("name", values.name);
      formData.append("url", values.url);

      createWidget(formData).then((res) => {
        if (res.message) setError(res.message);
        console.log(res);

        setSuccess("");
      });
    });
  }

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a Customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Type a name of widget"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Type a URL of widget"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            href="/dashboard/widgets"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};

export const EditForm = ({ widget }: { widget: Widget }) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [customers, setCustomers] = useState<CustomerInfo[]>([]);

  const form = useForm<z.infer<typeof WidgetSchema>>({
    resolver: zodResolver(WidgetSchema),
    defaultValues: {
      name: widget.name,
      url: widget.url,
      userId: widget.userId,
    },
  });

  function onSubmit(values: z.infer<typeof WidgetSchema>) {
    startTransition(() => {
      console.log(values);
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("name", values.name);
      formData.append("url", values.url);

      updateWidget(widget.id, formData).then((res) => {
        if (res.message) setError(res.message);
        console.log(res);

        setSuccess("");
      });
    });
  }

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a Customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Type a name of widget"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Type a URL of widget"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            href="/dashboard/widgets"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};
