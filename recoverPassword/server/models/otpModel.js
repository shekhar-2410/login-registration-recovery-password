import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  timestamp: { type: Date, default: Date.now, expires: "5m" },
});

const OtpUser = mongoose.model("otpUsers", otpSchema); 

export default OtpUser;
