const { Xiaomi } = require('../models/mobileModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllXiaomiPhonesSpecificFields = catchAsync(
  async (req, res, next) => {
    const xiaomiData = await Xiaomi.find(
      {},
      'phnTitle ram1 ram2 rom1 rom2 price1 camera src color colorText'
    );
    if (!xiaomiData) {
      return next(new AppError('Not Found'), 404);
    }
    res.status(200).json({
      status: 'success',
      results: xiaomiData.length,
      data: {
        data: xiaomiData,
      },
    });
  }
);

exports.getAllXiaomiPhones = catchAsync(async (req, res, next) => {
  const xiaomiData = await Xiaomi.find();
  if (!xiaomiData) {
    return next(new AppError('Not Found'), 404);
  }
  res.status(200).json({
    status: 'success',
    results: xiaomiData.length,
    data: {
      data: xiaomiData,
    },
  });
});

exports.createNewXiaomiPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const xiaomiData = await Xiaomi.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: xiaomiData,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.getXiaomiPhone = catchAsync(async (req, res, next) => {
  const xiaomi = await Xiaomi.findById(req.params.id);
  if (!xiaomi) {
    return next(new AppError('Not Found'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: xiaomi,
    },
  });
});

// Need to look at this post functionality later for accessing restrictions

exports.updateXiaomiPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const xiaomi = await Xiaomi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: xiaomi,
      },
    });
  } else {
    return next(new AppError('Access Denied'), 404);
  }
});

exports.deleteXiaomiPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    await Xiaomi.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } else {
    return next(new AppError('Access Denied'), 404);
  }
});
