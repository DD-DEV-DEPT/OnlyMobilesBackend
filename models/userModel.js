const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email Id is required'],
    unique: [true, 'Email ID already exists'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'A Password cannot be more than 20 Characters'],
    minlength: [5, 'A Password cannot be less than 5 Characters'],
  },
  cart: {
    type: [Object],
  },
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
