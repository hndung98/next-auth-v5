import { PaswordResetEmailTemplate, VerificationEmailTemplate } from "@/components/auth/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.AUTH_RESEND_EMAIL_FROM ?? "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: PaswordResetEmailTemplate({ token }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.AUTH_RESEND_EMAIL_FROM ?? "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerificationEmailTemplate({ token }),
  });
};
