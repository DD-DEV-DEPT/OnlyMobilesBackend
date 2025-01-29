const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const mobileModel = require('./models/mobileModel');
const Users = require('./models/userModel');
const AppReviews = require('./models/appReviewModel');

// DATABASE CONNECTION
const DB = process.env.DATABASE.replaceAll(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DATABASE CONNECTION SUCCESSFUL');
  });

// ALL SAMSUNG, XIAOMI, ONEPLUS APPLE ARE CREATED ON BTHE BASIS OF SAME MOBILE SCHEMA SO WE CREATED ALL 4 AT THE
//  MOBILEMODEL AND IMPORTED AS AN OBJECT HERE
const Samsung = mobileModel.Samsung;
const Xiaomi = mobileModel.Xiaomi;
const Oneplus = mobileModel.Oneplus;
const Apple = mobileModel.Apple;
const TopPhones = mobileModel.TopPhones;

// DATA READING PHASE

const samsungData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/samsungData.json`, 'utf-8')
);
const oneplusData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/oneplusData.json`, 'utf-8')
);
const appleData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/appleData.json`, 'utf-8')
);
const xiaomiData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/xiaomiData.json`, 'utf-8')
);

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/userData.json`, 'utf-8')
);

const appReviewsData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/appReviews.json`, 'utf-8')
);

const topPhonesData = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/topPhones.json`, 'utf-8')
);

// FUNCTIONS

// IMPORTS (SAVING TO DATABASE)

// SAVING ALL DATA

const importAllData = async () => {
  try {
    await Samsung.create(samsungData);
    await Oneplus.create(oneplusData);
    await Apple.create(appleData);
    await Xiaomi.create(xiaomiData);
    await Users.create(userData);
    await AppReviews.create(appReviewsData);
    await TopPhones.create(topPhonesData);
    console.log('All data imported Successfully');
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// SAVING ONLY MOBILES DATA

const importMobileData = async () => {
  try {
    await Samsung.create(samsungData);
    await Oneplus.create(oneplusData);
    await Apple.create(appleData);
    await Xiaomi.create(xiaomiData);
    console.log('All Mobiles data imported Successfully');
  } catch (err) {
    console.log(err);
  }
};

// SAVING ONLY USER DATA

const importUserData = async () => {
  try {
    await Users.create(userData);
    console.log('All User Data Imported Successfully');
  } catch (err) {
    console.log(err);
  }
};

// SAVING ONLY APPREVIEWS DATA

const importAppReviewsData = async () => {
  try {
    await AppReviews.create(appReviewsData);
    console.log('All App reviews data imported successfully');
  } catch (err) {
    console.log(err);
  }
};

// SAVING ONLY TOP PHONES DATA

const importTopPhonesData = async () => {
  try {
    await TopPhones.create(topPhonesData);
    console.log('All Top Phones data imported successfully');
  } catch (err) {
    console.log(err);
  }
};

// DELETING DATA FROM DATABASE

// DELETING ALL DATA

const deleteAllData = async () => {
  try {
    await Samsung.deleteMany();
    await Oneplus.deleteMany();
    await Apple.deleteMany();
    await Xiaomi.deleteMany();
    await AppReviews.deleteMany();
    await Users.deleteMany();
    console.log('Deleted all data');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETING ONLY MOBILE DATA

const deleteMobileData = async () => {
  try {
    await Samsung.deleteMany();
    await Oneplus.deleteMany();
    await Apple.deleteMany();
    await Xiaomi.deleteMany();
    console.log('All Mobile Data was deleted');
  } catch (err) {
    console.log(err);
  }
};

// DELETING ONLY USER DATA

const deleteUserData = async () => {
  try {
    await Users.deleteMany();
    console.log('All User Data was deleted');
  } catch (err) {
    console.log(err);
  }
};

// DELETING ONLY APPREVIEWS DATA

const deleteAppReviewsData = async () => {
  try {
    await AppReviews.deleteMany();
    console.log('All App reviews data deleted successfully');
  } catch (error) {
    console.log(err);
  }
};

// DELETING TOP PHONES DATA

const deleteTopPhonesData = async () => {
  try {
    await TopPhones.deleteMany();
    console.log('All Top Phones data deleted successfully');
  } catch (err) {
    console.log(err);
  }
};

// CONDITIONS ACCORDING TO TERMINAL COMMAND

if (process.argv[2] === '--importAll') {
  importAllData();
} else if (process.argv[2] === '--importUsers') {
  importUserData();
} else if (process.argv[2] === '--importMobiles') {
  importMobileData();
} else if (process.argv[2] === '--importAppReviews') {
  importAppReviewsData();
} else if (process.argv[2] === '--importTopPhones') {
  importTopPhonesData();
} else if (process.argv[2] === '--deleteAll') {
  deleteAllData();
} else if (process.argv[2] === '--deleteMobiles') {
  deleteMobileData();
} else if (process.argv[2] === '--deleteUsers') {
  deleteUserData();
} else if (process.argv[2] === '--deleteAppReviews') {
  deleteAppReviewsData();
} else if (process.argv[2] === '--deleteTopPhones') {
  deleteTopPhonesData();
}
