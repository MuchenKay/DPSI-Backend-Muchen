const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOwner: {
    type: Boolean,
    default: false, // Optional: set default value to false
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
