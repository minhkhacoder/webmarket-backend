/** @format */

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ phone: req.body.phone }).exec(async (error, user) => {
    // Admin already registered
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, phone, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    // Create new user role admin
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      hash_password,
      role: "user",
    });

    newUser.save((error, data) => {
      // Error create new user
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      // Create new user success
      if (data) {
        return res.status(201).json({
          message: "User create successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ phone: req.body.phone }).exec(async (error, user) => {
    // Error account
    if (error) return res.status(400).json({ error });
    // Signin account
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        const token = jwt.sign(
          { _id: user, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        const { _id, firstName, lastName, phone, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, phone, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
