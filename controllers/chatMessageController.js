const Message = require('../models/chatMessage');

async function messageReadCheck (req, res) {
    try {
        const messageId = req.params.id;
        const userId = req.user.userId; // JWT 인증 토큰 부여 후

        const updatedMessage = await Message.findByIdAndUpdate(
            { _id: messageId } ,
            { $push: { readBy: userId } },
            {}
        ).populate('writer', 'nickname');

        if(!updatedMessage) {
            return res.status(404).json({ message: 'Not Found!' });
        }

        res.status(200).json(updatedMessage);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { messageReadCheck };