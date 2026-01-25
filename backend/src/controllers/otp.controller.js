import bcrypt from "bcryptjs";
import OTP from "../models/OTP.model.js";
import User from "../models/user.model.js";

export const reqOTP = async (req, res, next) => {
  try {
    const userID = req.user?._id;

    if (!userID)
      return res.status(401).json({ message: "Not authorized, please login" });

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Email service removed - OTP verification is now optional
    return res.status(200).json({ 
      message: "Email verification is no longer required. Your account is already verified." 
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const user = await User.findOne({ _id: userID }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Email service removed - Mark as verified without OTP check
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      message: "Account verified successfully",
    });
  } catch (err) {
    next(err);
  }
};
