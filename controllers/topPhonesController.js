const { TopPhones } = require('./../models/mobileModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getTopPhones = catchAsync(async (req, res, next) => {
  const topPhones = await TopPhones.find(
    {},
    'phnTitle ram1 ram2 rom1 rom2 price1 camera src color colorText'
  );
  if (!topPhones) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      results: topPhones.length,
      data: {
        topPhones,
      },
    },
  });
});
