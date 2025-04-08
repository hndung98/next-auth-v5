"use client";

import { FaExclamationTriangle } from "react-icons/fa";

import { CardWrapper } from "@/components/auth/card-wrapper";

type ErrorCardProps = {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
};

export const ErrorCard = ({
  headerLabel,
  backButtonHref,
  backButtonLabel,
}: ErrorCardProps) => {
  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonHref={backButtonHref}
      backButtonLabel={backButtonLabel}
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
