const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AuthModel = mongoose.model("auth", authSchema);

module.exports = { AuthModel };
