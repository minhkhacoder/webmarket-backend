/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      min: 3,
      max: 16,
    },
    lastName: {
      type: String,
      trim: true,
      min: 3,
      max: 20,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Fullname
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hashing password
userSchema.methods = {
  authenticate: async function(password) {
      return await bcrypt.compare(password, this.hash_password);
  }
}

module.exports = mongoose.model("User", userSchema);
