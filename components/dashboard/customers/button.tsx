"use client";

import { deleteCustomer } from "@/actions/customer";
import { DeleteButton } from "@/components/common/button";

type DeleteButtonProps = {
  id: string;
};
export const DeleteCustomerButton = ({ id }: DeleteButtonProps) => {
  return (
    <>
      <DeleteButton
        onAction={async (id: string) => {
          const action = await deleteCustomer(id);
          if (action.message)
            return { hasError: true, message: action.message };
          return { message: "Deleted!" };
        }}
        id={id}
      />
    </>
  );
};
