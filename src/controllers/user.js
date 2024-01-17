import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  // Validacija
  const isEmailCorrect = email.indexOf("@") !== -1;
  const isNameCorrect = name.charAt(0) === name.charAt(0).toUpperCase();
  const isPasswordCorrect = /\d/.test(password) && password.length > 5;

  if (!(isEmailCorrect && isNameCorrect && isPasswordCorrect)) {
    return res.status(400).json({ message: "Validation do not pass" });
  }

  // Password hash
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = new UserModel({
      name: name,
      email: email,
      password: hash,
      bought_tickets: [],
      money_balance: 120,
    });

    const response = await user.save();

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const jwtRefreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User was created",
      user: response,
      jwt_token: jwtToken,
      jwt_refresh_token: jwtRefreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Bad auth" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Bad auth" });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const jwtRefreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      jwt_token: jwtToken,
      jwt_refresh_token: jwtRefreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const REFRESH_TOKEN = async (req, res) => {
  try {
    const jwtRefreshToken = req.body.jwt_refresh_token;
    const decoded = jwt.verify(jwtRefreshToken, process.env.JWT_REFRESH_SECRET);
    console.log(decoded);
    const user = await UserModel.findById(decoded.id);

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      jwt_token: jwtToken,
      jwt_refresh_token: jwtRefreshToken,
    });
  } catch (err) {
    return res.status(400).json({ message: "user should login" });
  }
};

const GET_ALL_USERS = async (req, res) => {
  const users = await UserModel.find().sort({ name: "asc" });

  return res.status(200).json(users);
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "User not found" });
  }
};

export { SIGN_UP, LOGIN, REFRESH_TOKEN, GET_ALL_USERS, GET_USER_BY_ID };
