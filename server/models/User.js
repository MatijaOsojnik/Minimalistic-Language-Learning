const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  }, {
      collection: 'users'
  })

const User = mongoose.model('User', userSchema)
  module.exports = User;