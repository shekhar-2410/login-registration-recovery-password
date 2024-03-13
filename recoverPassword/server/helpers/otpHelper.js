import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

// Helper function to generate OTP
// export const generateOTP = () => {
//   return otpGenerator.generate(6, { upperCase: false, specialChars: false });
// };
export const generateOTP = () => {
  return otpGenerator.generate(4, { upperCase: false, specialChars: false });
};

// Helper function to send email
export const sendEmail = (to, otp) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "zevin022019@gmail.com",
      pass: "bnzq gfrg lhpe tkor",
    },
  });

  const mailOptions = {
    from: "zevin022019@gmail.com",
    to,
    subject: "Password Reset OTP",
    text: `OTP for reset your password: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
