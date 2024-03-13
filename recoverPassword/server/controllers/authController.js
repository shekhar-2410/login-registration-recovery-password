import { comparePassword, hasPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// registerController
export const registerController = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    // validation
    if (!firstname) {
      return res.send({ error: "Name is Required" });
    }
    if (!lastname) {
      return res.send({ error: "Name is Required" });
    }

    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    // existing user
    const existingUser = await userModel.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      let errorMessage = "Already registered, please login.";

      // Check if the existing user has the same email
      if (existingUser.email === email) {
        errorMessage =
          "Email already exists, please login with your existing account.";
      }

      return res.status(200).send({
        success: false,
        message: errorMessage,
      });
    }
    const hasedPassword = await hasPassword(password);
    const user = await new userModel({
      firstname,
      lastname,
      email,
      password: hasedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registartion",
      error,
    });
  }
};

// loginController
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registred",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    });
  }
};

// testController

export const testController = (req, res) => {
  res.status(200).send("Test route");
};
