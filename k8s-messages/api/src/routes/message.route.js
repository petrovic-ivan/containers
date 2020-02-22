const express = require('express');
const asyncHandler = require('express-async-handler');

const messageCtrl = require('../controllers/message.controller');

const router = express.Router();

router.route('/publish')
  .post(asyncHandler(messageCtrl.publish));

router.route('/read')
  .get(asyncHandler(messageCtrl.read));

router.route('/')
  .get(asyncHandler(messageCtrl.test));

module.exports = router;
