const express = require('express');
const publicRouter = express.Router();
const router = express.Router();

const authRouter = require('./authRouter');
const chatUserRouter = require('./chatUserRouter');
const chatRoomRouter = require('./chatRoomRouter');

// 테스트 필요
publicRouter.use('/', authRouter);
router.use('/', authRouter);

// 사용 가능
router.use('/user', chatUserRouter);
router.use('/room', chatRoomRouter);

module.exports = { publicRouter, router };