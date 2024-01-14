import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  // Validacija
  const isEmailCorrect = emeilas.indexOf("@") !== -1;
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
    });

    const response = await user.save();

    return res
      .status(201)
      .json({ message: "User was created", user: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const LOGIN = async (req, res) => {};

export { SIGN_UP, LOGIN };
