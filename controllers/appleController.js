const { Apple } = require('../models/mobileModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllApplePhonesSpecificFields = catchAsync(async (req, res, next) => {
  const appleData = await Apple.find(
    {},
    'phnTitle ram1 ram2 rom1 rom2 price1 camera src color colorText'
  );
  if (!appleData) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: appleData.length,
    data: {
      data: appleData,
    },
  });
});

exports.getAllApplePhones = catchAsync(async (req, res, next) => {
  const appleData = await Apple.find();
  if (!appleData) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: appleData.length,
    data: {
      data: appleData,
    },
  });
});

exports.createNewApplePhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const apple = await Apple.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: apple,
      },
    });
  } else {
    return next(new AppError('Access Denied'), 400);
  }
});

exports.getApplePhone = catchAsync(async (req, res, next) => {
  const apple = await Apple.findById(req.params.id);
  if (!apple) {
    return next(new AppError('Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: apple,
    },
  });
});

// Need to look at this post functionality later for accessing restrictions

exports.updateApplePhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const apple = await Apple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: apple,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.deleteApplePhone = catchAsync(async (req, res, next) => {
  if (process.env_NODE_ENV === 'development') {
    await Apple.findByIdAndDelete(req.params.id);
    res.status(200).json({});
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////NEED TO LOOK INTO ERROR HANDLING AND CHECK ALL THE FUNCTIONALITIES IN TERMS OF USER AND APP PERSPECTIVE/////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
