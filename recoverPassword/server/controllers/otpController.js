import User from "../models/userModel.js";
import OtpUser from "../models/otpModel.js";
import { generateOTP, sendEmail } from "../helpers/otpHelper.js";

export const otpController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the email already exists in the OtpUser schema
    let otpUser = await OtpUser.findOne({ email });

    if (!otpUser) {
      // If the user does not exist in the OtpUser schema, create a new instance
      otpUser = new OtpUser({ email });
    }

    // Generate and save OTP
    const otp = generateOTP();
    otpUser.otp = otp;
    await otpUser.save();

    // Send email with OTP
    sendEmail(email, otp);

    res
      .status(200)
      .json({ success: true, message: "Reset OTP sent to your email", email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
