const express = require('express');
const appReviewController = require('./../controllers/appreviewController');

const router = express.Router();

router.route('/').get(appReviewController.getAllAppReviews);

module.exports = router;
