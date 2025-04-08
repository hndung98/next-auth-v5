import { ErrorCard } from "@/components/auth/error-card";

export default function Page() {
  return (
    <ErrorCard
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    />
  );
}
