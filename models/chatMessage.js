const mongoose = require('mongoose');

const chatMessage = new mongoose.Schema ({
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    sendAt: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Message', chatMessage);