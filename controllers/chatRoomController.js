const chatRoom = require("../models/chatRoom");
const {createChatUser} = require("./chatUserController");

// 채팅방 생성
async function createChatRoom (req, res) {
    try {
        const newChatRoom = new chatRoom({ ...req.body });
        await newChatRoom.save();
        res.status(201).json({ message: "Create ChatRoom Success", data: newChatRoom });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating ChatRoom", error: err.message });
    }
}

// 모든 채팅방 조회
async function getAllChatRoom (req, res) {
    try {
        const page = req.body.page;
        const pageLimit = 20;
        const allChatRoom =
            await chatRoom
                .find({ _id: {$exists: true} }, {}, {})
                .sort({ createdAt: -1 })
                .skip((page -1) * pageLimit )
                .limit(pageLimit);

        res.status(200).json(allChatRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting chatRoom", error: err.message });
    }
}

// 채팅방 id로 조회
async function getChatRoom (req, res) {
    try {
        const targetChatRoom = await chatRoom.findById(req.params._id, {}, {});
        if (!targetChatRoom) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json(targetChatRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting chatRoom", error: err.message });
    }
}

// 채팅방 수정
async function updateChatRoom (req, res) {
    try {
        const { roomName, roomDescription } = req.body;

        const updateChatRoom = await chatRoom.findOneAndUpdate(
            { _id: req.params._id },
            { $set: { roomName, roomDescription }}, {}
        );

        if (!updateChatRoom) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json(updateChatRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating chatRoom", error: err.message });
    }
}

// 채팅방 삭제
async function deleteChatRoom (req, res) {
    try {
        const id = req.params.id;

        const deleteChatUser = await chatRoom.findOneAndDelete(
            { _id: req.params._id }, {} );

        res.status(200).json({ message: "Delete ChatRoom Success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting ChatRoom", error: err.message });
    }
}

module.exports = {
    createChatRoom,
    getAllChatRoom,
    getChatRoom,
    updateChatRoom,
    deleteChatRoom,
};