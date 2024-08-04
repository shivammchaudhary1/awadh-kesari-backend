import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    // The user and pass is temporary and it would be changed with career explorer's domain
    const transporter = nodemailer.createTransport({
      host: "trackify.ai",
      port: 465,
      auth: {
        user: "support@trackify.ai",
        pass: "support@trackify.ai",
      },
    });

    const mailOptions = {
      from: "support@trackify.ai",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

export { sendEmail };
