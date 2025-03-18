const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

router.get('/', chatRoomController.getAllChatRoom);
router.get('/:id', chatRoomController.getChatRoom);
router.post('/', chatRoomController.createChatRoom);
router.patch('/:id', chatRoomController.updateChatRoom);
router.delete('/:id', chatRoomController.deleteChatRoom);

module.exports = router;