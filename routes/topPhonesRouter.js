const express = require('express');
const topPhonesController = require('./../controllers/topPhonesController');

const router = express.Router();

router.route('/').get(topPhonesController.getTopPhones);

module.exports = router;
