const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/chatUser');

const SECRET = process.env.JWT_SECRET;

// 회원 가입
async function register (req, res) {
    const { nickname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }, {}, {});
        if (!existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ nickname, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'User successfully registered' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
}

// 로그인
async function login (req, res) {
    const { email, password } = req.body;

    try {
        const targetUser = await User.findOne({ email }, {}, {});

        if (!targetUser) {
            return res.status(400).json({ message: 'User email doesn\'t exists' });
        }

        const isMatch = await bcrypt.compare(password, targetUser.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Wrong Password' });
        }

        const token = jwt.sign({ userId: targetUser._id }, SECRET, { expiresIn: '1h' } );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {
    register,
    login,
};