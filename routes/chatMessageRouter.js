const express = require('express');
const { MessageReadCheck, messageReadCheck} = require('../controllers/chatMessageController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.patch('/:id/read', authenticate, messageReadCheck);

module.exports = router;