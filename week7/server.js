// server.js
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server from Express app and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Socket logic: on connect, start a 1s timer that emits server time
io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  const tick = setInterval(() => {
    socket.emit('time', new Date().toLocaleTimeString());
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(tick);
    console.log('socket disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
