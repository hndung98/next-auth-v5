import * as React from "react";

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";

interface EmailTemplateProps {
  token: string;
}

export const PaswordResetEmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>
        Click{" "}
        <a href={`${domain}/auth/new-password?token=${token}`}>this link</a> to
        reset your password!
      </p>
    </div>
  );
};

export const TwoFactorTokenEmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>Your two factor token is {`${token}`}.</p>
    </div>
  );
};

export const VerificationEmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>
        Click{" "}
        <a href={`${domain}/auth/new-verification?token=${token}`}>this link</a>{" "}
        to verify your account!
      </p>
    </div>
  );
};
