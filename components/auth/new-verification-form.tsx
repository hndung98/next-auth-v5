"use client";

import { useSearchParams } from "next/navigation";
import { PropagateLoader } from "react-spinners";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { confirmVerificationToken } from "@/actions/verification-token";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type NewVerificationFormProps = {
  children?: React.ReactNode;
};

export const NewVerificationForm = ({ children }: NewVerificationFormProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(async () => {
    if (error || success) return;
    await delay(1000);
    if (!token) {
      setError("Missing token!");
      return;
    }
    confirmVerificationToken(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      headerLabel="Confirm your verification"
    >
      <div className="flex flex-col w-full space-y-4 items-center justify-center">
        {!success && !error && <PropagateLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
