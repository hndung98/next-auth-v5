"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegStar } from "react-icons/fa";
import { toast } from "sonner";
import xss from "xss";
import { z } from "zod";

import { AddButton } from "@/components/shop/products/AddButton";
import { AvailabilityMessage } from "@/components/shop/products/AvailabilityMessage";
import { ProductElementType } from "@/components/shop/products/ProductElement";
import { ProductImageWrapper } from "@/components/shop/products/ProductImageWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  option: z.string().min(2, {
    message: "Please choose an option!",
  }),
});

export const ProductDetails = ({
  product,
}: {
  product: ProductElementType;
}) => {
  const firstImage = product.thumbnail;
  const description = product.description;
  const options = product.options;
  const price = product.price;
  const isAvailable = true;
  const disabled = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      option: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    );
  }
  return (
    <>
      <div className="w-full grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
        <div className="md:col-span-1 lg:col-span-5">
          {firstImage && (
            <ProductImageWrapper
              priority={true}
              alt={firstImage.alt ?? ""}
              width={1024}
              height={1024}
              src={firstImage.url}
            />
          )}
        </div>
        <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900 my-text-dark-style">
                {product?.name}
              </h1>
              <div className="mb-4 flex items-center gap-1">
                <FaRegStar />
                <p>{product.averageRating}</p>
              </div>
              <p className="mb-8 text-sm " data-testid="ProductElement_Price">
                {formatCurrency(price)}
              </p>
              <AvailabilityMessage isAvailable={isAvailable} />
              <FormField
                control={form.control}
                name="option"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        type="single"
                        className="w-full mt-2 flex flex-wrap gap-2"
                      >
                        {options.map((option, idx) => (
                          <ToggleGroupItem
                            key={`product-option-${idx}`}
                            variant={"outline"}
                            className="hover:cursor-pointer"
                            value={option}
                            aria-label={`Toggle ${option}`}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="overflow-hidden">
                                    {option}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{option}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-8">
                <AddButton disabled={disabled} />
              </div>
              {description && (
                <div className="mt-8 space-y-6 text-sm text-neutral-500 my-text-dark-style">
                  {description.map((content) => (
                    <div
                      key={content}
                      dangerouslySetInnerHTML={{ __html: xss(content) }}
                    />
                  ))}
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
