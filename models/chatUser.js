const mongoose = require('mongoose');

const chatUserSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    nickname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // banned: {
    //     type: Boolean,
    //     default: false,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = mongoose.model('ChatUser', chatUserSchema);