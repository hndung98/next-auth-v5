import { Resend } from "resend";

import {
  PaswordResetEmailTemplate,
  TwoFactorTokenEmailTemplate,
  VerificationEmailTemplate,
} from "@/components/auth/email-template";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.AUTH_RESEND_EMAIL_FROM ?? "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: PaswordResetEmailTemplate({ token }),
  });
};

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: process.env.AUTH_RESEND_EMAIL_FROM ?? "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Token",
    react: TwoFactorTokenEmailTemplate({ token }),
  });
}

export const sendVerificationEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.AUTH_RESEND_EMAIL_FROM ?? "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerificationEmailTemplate({ token }),
  });
};
