const express = require('express');
const messageRoutes = require('./message.route');

const router = express.Router();
router.use('/', messageRoutes);
router.use('/message', messageRoutes);

module.exports = router;
