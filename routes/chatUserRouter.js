const express = require('express');
const router = express.Router();
const chatUserController = require("../controllers/chatUserController");

router.get('/', chatUserController.getAllChatUsers);
router.get('/:id', chatUserController.getChatUser);
router.post('/', chatUserController.createChatUser);
router.put('/:id', chatUserController.updateChatUser);
router.delete('/:id', chatUserController.deleteChatUser);

module.exports = router;