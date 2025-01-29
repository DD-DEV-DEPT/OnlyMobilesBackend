const AppReviews = require('./../models/appReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllAppReviews = catchAsync(async (req, res, next) => {
  const appReviews = await AppReviews.find();
  res.status(200).json({
    status: 'success',
    results: appReviews.length,
    data: {
      data: appReviews,
    },
  });
});
