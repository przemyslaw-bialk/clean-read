const nodemailer = require("nodemailer");
const handleContactForm = async (req, res) => {
  const { email, userMessage } = req.body;

  if (!email || !userMessage) {
    return res.status(400).json({ message: "all fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.APP_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: "Wiadomość z formularza kontaktowego",
      text: `Wiadomość od: ${email}\n\n${userMessage}`,
    });

    res.status(200).json({ message: "sent! :)" });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    res.status(500).json({ message: "something went wrong!" });
  }
};

module.exports = { handleContactForm };
