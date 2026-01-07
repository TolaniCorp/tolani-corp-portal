import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function asSingleLine(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = asSingleLine(String(formData.get("name") ?? ""));
    const org = asSingleLine(String(formData.get("org") ?? ""));
    const message = String(formData.get("message") ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.redirect(new URL("/#contact?status=error", req.url), 303);
    }

    if (!message || message.length < 10) {
      return NextResponse.redirect(new URL("/#contact?status=error", req.url), 303);
    }

    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");

    const to = process.env.CONTACT_TO ?? smtpUser;
    const from = process.env.CONTACT_FROM ?? smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `TolaniCorp.us contact: ${name}${org ? ` (${org})` : ""}`;
    const text = [
      `Name: ${name}`,
      `Organization: ${org || "(not provided)"}`,
      "",
      message,
    ].join("\n");

    await transporter.sendMail({
      to,
      from,
      replyTo: smtpUser,
      subject,
      text,
    });

    return NextResponse.redirect(new URL("/#contact?status=sent", req.url), 303);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/#contact?status=error", req.url), 303);
  }
}
