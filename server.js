import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import { connectdb } from './mongodb.js';
import { chatModel } from './chat.schema.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

connectdb();

// Maintain a list of connected users
const connectedUsers = new Set();
console.log("This is connectedUsers :", connectedUsers);

io.on('connection', (socket) => {
  console.log('Connection is established');

  socket.on('join', (data) => {
    socket.username = data;
    connectedUsers.add(socket.username);

    // Notify all clients about the updated user count and list
    io.emit('update_users', {
      userCount: connectedUsers.size,
      users: Array.from(connectedUsers),
    });

    chatModel.find().sort({ timestamp: 1 }).limit(50)
      .then((messages) => {
        console.log(messages);
        socket.emit('load_messages', messages);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('new_message', (message) => {
    let userMessage = {
      username: socket.username,
      message: message,
    };

    const newChat = new chatModel({
      username: socket.username,
      message: message,
      timestamp: new Date(),
    });

    newChat.save().then(() => {
      io.emit('broadcast_message', userMessage);
    });
  });

  socket.on('disconnect', () => {
    connectedUsers.delete(socket.username);

    // Notify all clients about the updated user count and list
    io.emit('update_users', {
      userCount: connectedUsers.size,
      users: Array.from(connectedUsers),
    });

    console.log('Connection is disconnected');
  });
});

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});