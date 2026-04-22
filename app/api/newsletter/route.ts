import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ success: false, message: "Email required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Send to YOU
    await transporter.sendMail({
      from: `"Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscriber",
      html: `<p><b>Email:</b> ${email}</p>`,
    });

    // 📩 Auto reply to user
    await transporter.sendMail({
      from: `"Starnext" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Subscribed Successfully 🎉",
      html: `
        <h3>Thanks for subscribing!</h3>
        <p>You’ll now receive updates from us.</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false });
  }
}