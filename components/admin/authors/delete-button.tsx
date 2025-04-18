"use client";

import { deleteAuthor } from "@/actions/author";
import { DeleteButton } from "@/components/common/button";

type DeleteAuthorButtonProps = {
  id: string;
};
export const DeleteAuthorButton = ({ id }: DeleteAuthorButtonProps) => {
  return (
    <>
      <DeleteButton
        onAction={async (id: string) => {
          const action = await deleteAuthor(id);
          if (action.error) return { hasError: true, message: action.error };
          return { message: "Deleted!" };
        }}
        id={id}
      />
    </>
  );
};
