const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle email sending
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use SMTP details for a custom provider
    //   auth: {
    //     user: "your-email@gmail.com", // Replace with your email
    //     pass: "your-email-password", // Replace with your app-specific password
    //   },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "th1044225@gmail.com", // Your email to receive messages
      subject: `New Message from ${name}`,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
