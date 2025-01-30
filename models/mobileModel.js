const { builtinModules } = require('module');
const mongoose = require('mongoose');

const mobileSchema = mongoose.Schema({
  phnTitle: {
    type: String,
    maxlength: [40, 'A Phone title can only have upto 40 characters'],
    minlength: [5, 'A Phone title must have atleast 5 characters'],
    unique: [true, 'Phone title should be unique'],
    required: [true, 'Phone title is required'],
  },
  description: {
    type: String,
    maxlength: [1250, 'A Phone Description can only have upto 1250 characters'],
    minlength: [5, 'A Phone Description must have atleast 5 characters'],
    required: [true, 'Phone Description is required'],
  },
  ram1: {
    type: String,
    required: [true, 'ROM Specification is required'],
  },
  ram2: {
    type: String,
  },
  rom1: {
    type: String,
    required: [true, 'ROM Specification is required'],
  },
  rom2: String,
  camera: {
    type: String,
    required: [true, 'Camera Specifications required'],
  },
  price1: {
    type: Number,
    required: [true, 'Price is Required'],
  },
  price2: Number,
  src: {
    type: String,
    required: [true, 'A Source Image is required'],
  },
  ratingsAverage: {
    type: Number,
    default: 1,
    min: [1, 'Ratings Average must be atleast 1'],
    max: [5, 'Ratings Average cant be more than 5'],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  color1: String,
  color2: String,
  color3: String,
  colorText: {
    type: String,
    default: '',
  },
  color: {
    type: [String],
  },
  reviews: {
    type: [Object],
  },
});

const samsung = mongoose.model('Samsung', mobileSchema);
const oneplus = mongoose.model('oneplus', mobileSchema);
const xiaomi = mongoose.model('Xiaomi', mobileSchema);
const apple = mongoose.model('Apple', mobileSchema);
const TopPhones = mongoose.model('Top-Phones', mobileSchema);

exports.Samsung = samsung;
exports.Oneplus = oneplus;
exports.Xiaomi = xiaomi;
exports.Apple = apple;
exports.TopPhones = TopPhones;
