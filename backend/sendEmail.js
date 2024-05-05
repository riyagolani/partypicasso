import nodemailer from "nodemailer";
import {EMAIL, PASSWORD} from './config.js';

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

//   function for sending booking email
  const sendEmail = async (email, bookingId) => {
    try {
      // Send email
      const info = await transporter.sendMail({
        from: EMAIL,
        to: email,
        subject: "Booking Confirmation",
        html: `
        <p>Dear valued customer,</p>
        <p>We are pleased to inform you that your booking with the following details has been confirmed:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p>Thank you for choosing our services. We look forward to seeing you soon!</p>
        <p>Sincerely,<br/>The ParyPicasso Team</p>
      `,
      });
  
      console.log("Email sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

export default sendEmail;
