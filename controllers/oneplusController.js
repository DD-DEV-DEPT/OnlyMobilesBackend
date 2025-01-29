const { Oneplus } = require('../models/mobileModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllOneplusPhonesSpecificFields = catchAsync(
  async (req, res, next) => {
    const oneplusData = await Oneplus.find(
      {},
      'phnTitle ram1 ram2 rom1 rom2 price1 camera src color colorText'
    );
    if (!oneplusData) {
      return next(new AppError('Not Found', 404));
    }
    res.status(200).json({
      status: 'success',
      results: oneplusData.length,
      data: {
        data: oneplusData,
      },
    });
  }
);

exports.getAllOneplusPhones = catchAsync(async (req, res, next) => {
  const oneplusData = await Oneplus.find();
  if (!oneplusData) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: oneplusData.length,
    data: {
      data: oneplusData,
    },
  });
});

exports.createNewOneplusPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const oneplus = await Oneplus.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: oneplus,
      },
    });
  } else {
    return next(new AppError('Access Denied'), 400);
  }
});

exports.getOneplusPhone = catchAsync(async (req, res, next) => {
  const oneplus = await Oneplus.findById(req.params.id);
  if (!oneplus) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: oneplus,
    },
  });
});

// Need to look at this post functionality later for accessing restrictions

exports.updateOneplusPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const oneplus = await Oneplus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: oneplus,
      },
    });
  } else {
    return next(new AppError('Access Denied'), 400);
  }
});

exports.deleteOneplusPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    await Oneplus.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } else {
    return next(new AppError('Access Denied'), 400);
  }
});
