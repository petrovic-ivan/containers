const express = require('express');
const asyncHandler = require('express-async-handler');

const messageCtrl = require('../controllers/message.controller');

const router = express.Router();

router.route('/consume')
  .post(asyncHandler(messageCtrl.consume));


module.exports = router;
