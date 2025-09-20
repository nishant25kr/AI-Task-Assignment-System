import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  console.log("📧 Sending mail to", to);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: parseInt(process.env.MAILTRAP_SMTP_PORT, 10),
      secure: false,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Inngest TMS" <no-reply@example.com>',
      to,
      subject,
      text,
    });

    console.log("✅ Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("❌ Mail error:", error.message);
    throw error;
  }
};
