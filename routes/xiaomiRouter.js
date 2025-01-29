const express = require('express');
const xiaomiController = require('./../controllers/xiaomiController');

const router = express.Router();

router
  .route('/')
  .get(xiaomiController.getAllXiaomiPhonesSpecificFields)
  .post(xiaomiController.createNewXiaomiPhone);

router.route('/allData').get(xiaomiController.getAllXiaomiPhones);

router
  .route('/:id')
  .get(xiaomiController.getXiaomiPhone)
  .patch(xiaomiController.updateXiaomiPhone)
  .delete(xiaomiController.deleteXiaomiPhone);

module.exports = router;
