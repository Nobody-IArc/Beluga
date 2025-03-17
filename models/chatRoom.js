const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema ({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    roomDescription: {
        type: String,
        required: false,
        default: '이 방은 설명이 없습니다.',
    },
    participants: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserId" },],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);