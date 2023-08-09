// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDb = require('./config/dbconn');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
connectDb();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors(corsOption));
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join_room', room => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('message', data => {
    io.to(data.room).emit('message', data.message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(bodyParser.json());

// Import and use routes
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

// Start the server
mongoose.connection.once('open', () => {
  console.log('connected to mongo db');
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
