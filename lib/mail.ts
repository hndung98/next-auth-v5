import { EmailTemplate } from "@/components/auth/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmLink = `http://localhost:3000/auth/new-verifictation?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: EmailTemplate({ token }),
  });
};
