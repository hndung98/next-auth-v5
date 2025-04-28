"use client";

import { deleteWidget } from "@/actions/widget";
import { DeleteButton } from "@/components/common/button";

type DeleteButtonProps = {
  id: string;
};
export const DeleteWidgetButton = ({ id }: DeleteButtonProps) => {
  return (
    <>
      <DeleteButton
        onAction={async (id: string) => {
          const action = await deleteWidget(id);
          if (action.message)
            return { hasError: true, message: action.message };
          return { message: "Deleted!" };
        }}
        id={id}
      />
    </>
  );
};
