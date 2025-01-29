const express = require('express');
const morgan = require('morgan');
const appleController = require('./../controllers/appleController');

const router = express.Router();

router
  .route('/')
  .get(appleController.getAllApplePhonesSpecificFields)
  .post(appleController.createNewApplePhone);

router.route('/allData').get(appleController.getAllApplePhones);

router
  .route('/:id')
  .get(appleController.getApplePhone)
  .patch(appleController.updateApplePhone)
  .delete(appleController.deleteApplePhone);

module.exports = router;
