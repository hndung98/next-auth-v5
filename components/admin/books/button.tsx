"use client";

import { deleteBook } from "@/actions/book";
import { DeleteButton } from "@/components/common/button";

type DeleteBookButtonProps = {
  id: string;
};
export function DeleteBookButton({ id }: DeleteBookButtonProps) {
  return (
    <>
      <DeleteButton
        onAction={async (id: string) => {
          const action = await deleteBook(id);
          if (action.message)
            return { hasError: true, message: action.message };
          return { message: "Deleted!" };
        }}
        id={id}
      />
    </>
  );
}
