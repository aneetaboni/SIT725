// public/scripts.js
const statusEl = document.getElementById('status');
const timeEl = document.getElementById('time');

// Connect to the server's Socket.IO endpoint
const socket = io();

socket.on('connect', () => {
  statusEl.textContent = 'Connected';
});

socket.on('disconnect', () => {
  statusEl.textContent = 'Disconnected — retrying…';
});

socket.on('time', (str) => {
  timeEl.textContent = str;
});
