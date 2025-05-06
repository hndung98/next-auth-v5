"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Invoice, InvoiceStatus, PaymentMethod } from "@prisma/client";
import { addMonths } from "date-fns";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createInvoice, updateInvoice } from "@/actions/invoice";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentDateFormatted } from "@/lib/utils";
import { InvoiceSchema } from "@/schemas";

async function getCustomers(
  query: string,
  offset = 1,
  size = 10
): Promise<CustomerInfo[]> {
  console.log({ offset, size });
  return fetch(`/api/customers?query=${query}`).then((res) => res.json());
}

type CustomerInfo = {
  id: string;
  name: string;
  email: string;
};

export const CreateForm = () => {
  const today = new Date();
  const nextMonth = addMonths(today, 1);

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo>();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState(nextMonth);

  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      amount: 0,
      status: "PENDING",
      date: getCurrentDateFormatted(),
      paymentMethod: "CASH",
      userId: "",
    },
  });

  function onSubmit(values: z.infer<typeof InvoiceSchema>) {
    startTransition(() => {
      console.log(values);
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("amount", values.amount.toString());
      formData.append("date", values.date);
      formData.append("status", values.status);
      formData.append("paymentMethod", values.paymentMethod);

      createInvoice(formData).then((res) => {
        if (res.message) setError(res.message);
        console.log(res);

        setSuccess("");
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Customer</FormLabel>
              <ComboBox<CustomerInfo>
                {...fieldProps}
                title="Customer"
                valueKey="id"
                value={selectedCustomer}
                searchFn={getCustomers}
                renderText={(customer: CustomerInfo) => `${customer?.name}`}
                onChange={(customer) => {
                  console.log({ value });
                  onChange(customer.id);
                  setSelectedCustomer(customer);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={InvoiceStatus.PENDING}>
                    {InvoiceStatus.PENDING}
                  </SelectItem>
                  <SelectItem value={InvoiceStatus.PAID}>
                    {InvoiceStatus.PAID}
                  </SelectItem>
                  <SelectItem value={InvoiceStatus.CANCELED}>
                    {InvoiceStatus.CANCELED}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PaymentMethod.CASH}>
                    {PaymentMethod.CASH}
                  </SelectItem>
                  <SelectItem value={PaymentMethod.CREDIT}>
                    {PaymentMethod.CREDIT}
                  </SelectItem>
                  <SelectItem value={PaymentMethod.OTHER}>
                    {PaymentMethod.OTHER}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  placeholder={getCurrentDateFormatted()}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                const offset = date?.getTimezoneOffset();
                const localDate = new Date(
                  date?.getTime() - offset * 60 * 1000
                );
                const ymd = localDate.toISOString().split("T")[0];
                form.setValue("date", ymd);
                console.log({ ymd });
              }
            }}
            month={month}
            onMonthChange={setMonth}
            startMonth={new Date(2025, today.getMonth() - 2)}
            endMonth={today}
          />
          <Button
            variant="secondary"
            className="cursor-pointer w-[100px]"
            type="button"
            onClick={() => setMonth(today)}
          >
            Go to Today
          </Button>
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
            href="/dashboard/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 my-dark-style"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};

export const EditForm = ({ invoice }: { invoice: Invoice }) => {
  const today = new Date();
  const nextMonth = addMonths(today, 1);

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [customers, setCustomers] = useState<CustomerInfo[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState(nextMonth);

  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      paymentMethod: invoice.paymentMethod,
      userId: invoice.userId,
    },
  });

  function onSubmit(values: z.infer<typeof InvoiceSchema>) {
    startTransition(() => {
      console.log(values);
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("amount", values.amount.toString());
      formData.append("date", values.date);
      formData.append("status", values.status);
      formData.append("paymentMethod", values.paymentMethod);

      updateInvoice(invoice.id, formData).then((res) => {
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={InvoiceStatus.PENDING}>
                    {InvoiceStatus.PENDING}
                  </SelectItem>
                  <SelectItem value={InvoiceStatus.PAID}>
                    {InvoiceStatus.PAID}
                  </SelectItem>
                  <SelectItem value={InvoiceStatus.CANCELED}>
                    {InvoiceStatus.CANCELED}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PaymentMethod.CASH}>
                    {PaymentMethod.CASH}
                  </SelectItem>
                  <SelectItem value={PaymentMethod.CREDIT}>
                    {PaymentMethod.CREDIT}
                  </SelectItem>
                  <SelectItem value={PaymentMethod.OTHER}>
                    {PaymentMethod.OTHER}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  placeholder={getCurrentDateFormatted()}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                const offset = date?.getTimezoneOffset();
                const localDate = new Date(
                  date?.getTime() - offset * 60 * 1000
                );
                const ymd = localDate.toISOString().split("T")[0];
                form.setValue("date", ymd);
                console.log({ ymd });
              }
            }}
            month={month}
            onMonthChange={setMonth}
            startMonth={new Date(2025, today.getMonth() - 2)}
            endMonth={today}
          />
          <Button
            variant="secondary"
            className="cursor-pointer w-[100px]"
            type="button"
            onClick={() => setMonth(today)}
          >
            Go to Today
          </Button>
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
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 my-dark-style"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};
