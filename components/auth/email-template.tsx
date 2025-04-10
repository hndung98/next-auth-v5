import * as React from "react";

interface EmailTemplateProps {
  token: string;
}

export const PaswordResetEmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>
        Click{" "}
        <a href={`http://localhost:3000/auth/new-password?token=${token}`}>
          this link
        </a>{" "}
        to reset your password!
      </p>
    </div>
  );
};

export const VerificationEmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>
        Click{" "}
        <a href={`http://localhost:3000/auth/new-verification?token=${token}`}>
          this link
        </a>{" "}
        to verify your account!
      </p>
    </div>
  );
};
