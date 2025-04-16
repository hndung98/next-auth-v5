"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isPending?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  isPending,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social isPending={isPending} />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton isPending={isPending} href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
