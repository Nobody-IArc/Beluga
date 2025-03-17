const chatUser = require("../models/chatUser");

// 유저 생성
async function createChatUser (req, res) {
    try {
        const newUser = new chatUser({ ...req.body });
        await newUser.save();
        res.status(201).json({ message: "ChatUser Successfully created!", data: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ChatUser create Failed... ", error: err.message });
    }
}

// 모든 유저 조회
async function getAllChatUsers (req, res)  {
    try {
        const page = req.body.page;
        const pageLimit = 20;
        const allChatUser =
            await chatUser
                .find({ _id: { $exists: true }}, {}, {})
                .sort({ createdAt: -1 })
                .skip( (page - 1) * pageLimit)
                .limit(pageLimit);

        res.status(200).json(allChatUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ChatUser getting failed... ", error: err.message});
    }
}

// 유저 id로 조회
async function getChatUser (req, res) {
    try {
        const targetUser = await chatUser.findById(req.params.id, {}, {});
        if (!targetUser) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json(targetUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ChatUser getting failed!", error: err.message});
    }
}

// 유저 정보 수정
async function updateChatUser (req, res) {
    try {
        const { nickname, email, password } = req.body;

        const updateChatUser = await chatUser.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { nickname, email, password } }, {}
        );

        if (!updateChatUser) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json(updateChatUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ChatUser update failed!", error: err.message});
    }
}

// 유저 정보 삭제
async function deleteChatUser (req, res) {
    try {
        const id = req.params.id;

        const deleteChatUser = await chatUser.findOneAndDelete(
            { _id: id, }, {} );

        res.status(200).json({ message: "Delete chatUser Success!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ChatUser deleted failed!", error: err.message});
    }
}

module.exports = {
    createChatUser,
    getAllChatUsers,
    getChatUser,
    updateChatUser,
    deleteChatUser,
};