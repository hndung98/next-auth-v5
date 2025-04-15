"use server";

import sgMail from "@sendgrid/mail";

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";
const emailFrom =
  process.env.AUTH_SENDGRID_EMAIL_FROM || "no-reply@example.com";

sgMail.setApiKey(process.env.AUTH_SENDGRID_API_KEY ?? "");

type EmailInfo = {
  from: string;
  to: string;
  subject: string;
  html: string;
};
export const sendEmail = async (data: EmailInfo) => {
  try {
    const result = await sgMail.send(data);
    console.log("Email sent:", result[0].statusCode);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const msg = {
    to: email,
    from: emailFrom,
    subject: "Reset your password",
    html: `
    <p>
        Click
        <a href="${domain}/auth/new-password?token=${token}">
            this link
        </a>
        to reset your password!
    </p>
    `,
  };
  await sendEmail(msg);
};

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  const msg = {
    to: email,
    from: emailFrom,
    subject: "Two Factor Token",
    html: `
    <p>
        Your two factor token is ${token}.
    </p>
    `,
  };
  await sendEmail(msg);
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const msg = {
    to: email,
    from: emailFrom,
    subject: "Verification Email",
    html: `
      <p>
        Click
        <a href=${domain}/auth/new-verification?token=${token}>
            this link
        </a>
        to verify your account!
      </p>
    `,
  };
  await sendEmail(msg);
};
