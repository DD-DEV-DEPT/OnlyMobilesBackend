const { Samsung } = require('../models/mobileModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllSamsungPhonesSpecificFields = catchAsync(
  async (req, res, next) => {
    const samsungData = await Samsung.find(
      {},
      'phnTitle ram1 ram2 rom1 rom2 price1 camera src color colorText'
    );
    if (!samsungData) {
      return next(new AppError('Not Found', 404));
    }
    res.status(200).json({
      status: 'success',
      results: samsungData.length,
      data: {
        data: samsungData,
      },
    });
  }
);

exports.getAllSamsungPhones = catchAsync(async (req, res, next) => {
  const samsungData = await Samsung.find();
  if (!samsungData) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: samsungData.length,
    data: {
      data: samsungData,
    },
  });
});

exports.createNewSamsungPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const samsung = await Samsung.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: samsung,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.getSamsungPhone = catchAsync(async (req, res, next) => {
  const samsung = await Samsung.findById(req.params.id);
  if (!samsung) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: samsung,
    },
  });
});

// Need to look at this post functionality later for accessing restrictions

exports.updateSamsungPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const samsung = await Samsung.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: samsung,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.deleteSamsungPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    await Samsung.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } else {
    return next(new AppError('Access Denied', 400));
  }
});
