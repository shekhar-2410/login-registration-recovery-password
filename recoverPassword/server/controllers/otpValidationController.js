// otpValidationController.js
import User from "../models/userModel.js";
import OtpUser from "../models/otpModel.js";

export const otpValidationController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the corresponding OTP record in the OtpUser model
    const otpUser = await OtpUser.findOne({ email, otp });

    if (!otpUser) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear the OTP after successful validation (optional)
    otpUser.otp = null;
    await otpUser.save();

    return res
      .status(200)
      .json({ success: true, message: "OTP validated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
