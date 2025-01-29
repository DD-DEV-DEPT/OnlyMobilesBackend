const mongoose = require('mongoose');

const appReviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  rating: {
    type: Number,
    required: [true, 'rating is Required'],
    max: [5, 'ratings cant be more than 5'],
    min: [1, 'ratings cant be less than 1 '],
  },
  review: {
    type: String,
  },
});

const AppReviews = mongoose.model('AppReviews', appReviewSchema);
module.exports = AppReviews;
