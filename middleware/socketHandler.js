const { Server } = require('socket.io');
const mongoose = require('mongoose');

const Message = require('../models/chatMessage');
const ChatRoom = require('../models/chatRoom');

async function setUpSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            method: ['GET', 'POST', 'DELETE']
        }
    });

    io.on('connection', (socket) => {
        console.log('User Connected: ', socket.id);

        socket.on('joinRoom', async (roomId) => {
            try {
                console.log(`${socket.id} connected`);

                if(!roomId){
                    console.error(`Room ${socket.id} not connected`);
                    return;
                }

                let room = await ChatRoom.findOne({ _id: roomId}, {}, {});
                if(!room){
                    console.error(`Room ${socket.id} not connected`);
                }

                socket.join(roomId);
                console.log(`${socket.id} joined`);
            } catch (err) {
                console.error(err.message);
            }
        });

        socket.on('message', async (data) => {
            const { roomId, writer, message } = data;

            try {
                console.log(`${socket.id} send Message`);

                if(!message){
                    console.error(`Error to Send Message: ${message}`);
                    return;
                }

                const writerId = new mongoose.Types.ObjectId(writer);

                const newMessage = new Message({
                    roomId: new mongoose.Types.ObjectId(roomId),
                    writer: writerId,
                    message: message
                });

                await newMessage.save();

                console.log(`${writerId}'s message sent and saved`);

                const populatedMessage = await Message
                    .findById(newMessage._id, {}, {})
                    .populate('writer', 'writer')
                    .exec();

                console.log(populatedMessage);

                io.to(roomId).emit('message', {
                    writer: populatedMessage.writer,
                    message: populatedMessage.message,
                    sendAt: populatedMessage.sendAt,
                });
            } catch (err) {
                console.error(err.message);
            }
        });

        socket.on('messageReadCheck', async (data) => {
            const { messageId, userId } = data;

            try {
                await Message.findByIdAndUpdate(
                    messageId,
                    { $push: { readBy: userId } },
                    {}
                );

                console.log(`${socket.id} received a message`);

                io.emit('messageReadCheck', { messageId, userId });
            } catch (err) {
                console.error(err.message);
            }
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
        });
    });

    return io;
}

module.exports = setUpSocket;