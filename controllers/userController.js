const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUser = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const users = await Users.find();
    if (!users) {
      return next(new AppError('Not Found', 404));
    }
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        data: users,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.createUser = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const user = await Users.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return next(new AppError('Not Found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    await Users.findByIdAndDelete(req.patrams.id);
    res.status(200).json({
      status: 'success',
    });
  } else {
    return next(new AppError('Access Denied', 400));
  }
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return next(new AppError('Account Not found. Try creating an Account'));
  }
  if (user.password === password) {
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } else {
    return next(new AppError('Incorrect Password'));
  }
});
exports.updateUserCart = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await Users.updateOne({ email }, { cart });
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
