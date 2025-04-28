"use client";

import { deleteInvoice } from "@/actions/invoice";
import { DeleteButton } from "@/components/common/button";

type DeleteButtonProps = {
  id: string;
};
export const DeleteInvoiceButton = ({ id }: DeleteButtonProps) => {
  return (
    <>
      <DeleteButton
        onAction={async (id: string) => {
          const action = await deleteInvoice(id);
          if (action.message)
            return { hasError: true, message: action.message };
          return { message: "Deleted!" };
        }}
        id={id}
      />
    </>
  );
};
