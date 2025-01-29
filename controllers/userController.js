const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUser = catchAsync(async (req, res, next) => {
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
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
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
});

exports.updateUser = catchAsync(async (req, res, next) => {
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
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await Users.findByIdAndDelete(req.patrams.id);
  res.status(200).json({
    status: 'success',
  });
});

// exports.updateUserCart = async (req, res) => {
//   try {
//     const user = Users.find
//   } catch (err) {}
// };
