const express = require('express');
const cors = require('cors');
const appleRouter = require('./routes/appleRouter');
const oneplusRouter = require('./routes/oneplusRouter');
const samsungRouter = require('./routes/samsungRouter');
const xiaomiRouter = require('./routes/xiaomiRouter');
const userRouter = require('./routes/userRouter');
const appReviewRouter = require('./routes/appReviewRouter');
const topPhonesRouter = require('./routes/topPhonesRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authRoutes = require('./routes/auth');
const app = express();

app.use(cors());

app.use(express.json()); //Middleware for accessing req.body Otherwise it will be Undefined

// app.use('/images', express.static('public/images'));
app.use('/images', express.static('public/images'));
app.use('/images/samsung', express.static('public/images/samsung'));
app.use('/images/oneplus', express.static('public/images/oneplus'));
app.use('/images/apple', express.static('public/images/apple'));
app.use('/images/xiaomi', express.static('public/images/xiaomi'));
app.use('/images/logos', express.static('public/images/brandlogos'));

// Authentication routes
app.use('/api/auth', authRoutes);

app.use('/top-phones', topPhonesRouter);

app.use('/apple', appleRouter);

app.use('/oneplus', oneplusRouter);

app.use('/samsung', samsungRouter);

app.use('/xiaomi', xiaomiRouter);

app.use('/users', userRouter);

app.use('/app-reviews', appReviewRouter);

app.all('*', (req, res, next) => {
  const error = new AppError(`can't find ${req.originalUrl}`, 500);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
