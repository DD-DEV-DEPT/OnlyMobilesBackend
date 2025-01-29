const express = require('express');
const samsungController = require('./../controllers/samsungController');

const router = express.Router();

router
  .route('/')
  .get(samsungController.getAllSamsungPhonesSpecificFields)
  .post(samsungController.createNewSamsungPhone);

router.route('/alldata').get(samsungController.getAllSamsungPhones);

router
  .route('/:id')
  .get(samsungController.getSamsungPhone)
  .patch(samsungController.updateSamsungPhone)
  .delete(samsungController.deleteSamsungPhone);

module.exports = router;
