import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // ✅ Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Create transporter (more reliable than "service: gmail")
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Verify connection (important for live)
    await transporter.verify();

    // =========================
    // 📩 EMAIL TO YOU
    // =========================
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      replyTo: email, // 🔥 important (reply directly to user)
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Service:</b> ${service || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    // =========================
    // 📬 AUTO REPLY
    // =========================
    await transporter.sendMail({
  from: `"${name}" <${process.env.EMAIL_USER}>`,  // 👈 dynamic name
  replyTo: email, // 👈 VERY IMPORTANT
  to: process.env.EMAIL_USER,
  subject: `New Contact from ${name}`,
  html: `
    <h3>New Message</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Service:</b> ${service}</p>
    <p><b>Message:</b> ${message}</p>
  `,
});

    return Response.json({ success: true });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}