const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
router.post('/', messageController.handlePostMessage);
router.get('/all', messageController.handleGetALLMessages);
module.exports = router;
