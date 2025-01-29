const express = require('express');
const morgan = require('morgan');
const oneplusController = require('./../controllers/oneplusController');

const router = express.Router();

router
  .route('/')
  .get(oneplusController.getAllOneplusPhonesSpecificFields)
  .post(oneplusController.createNewOneplusPhone);

router.route('/alldata').get(oneplusController.getAllOneplusPhones);

router
  .route('/:id')
  .get(oneplusController.getOneplusPhone)
  .patch(oneplusController.updateOneplusPhone)
  .delete(oneplusController.deleteOneplusPhone);

module.exports = router;
