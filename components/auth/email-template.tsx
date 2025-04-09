import * as React from "react";

interface EmailTemplateProps {
  token: string;
}

export const EmailTemplate = ({ token }: EmailTemplateProps) => {
  return (
    <div>
      <p>
        Click this{" "}
        <a href={`http://localhost:3000/auth/new-verifictation?token=${token}`}>
          link
        </a>{" "}
        to verify your account!
      </p>
    </div>
  );
};
