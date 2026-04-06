declare module "nodemailer";

import type { APIRoute } from "astro"
import nodemailer from "nodemailer"

export const POST: APIRoute = async ({ request }) => {
  const { email, name, items } = await request.json()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASS,
    },
  })

  const itemList = items
    .map((i: any) => `${i.name} x${i.quantity}`)
    .join("\n")

  await transporter.sendMail({
    from: email,
    to: import.meta.env.EMAIL_USER,
    subject: "New Order Request",
    text: `
Customer: ${name}
Email: ${email}

Items:
${itemList}
    `,
  })

  return new Response(JSON.stringify({ ok: true }))
}