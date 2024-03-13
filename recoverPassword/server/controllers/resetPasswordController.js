
import User from "../models/userModel.js";

export const resetPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password with the new one
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
