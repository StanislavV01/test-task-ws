const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: "*" },
});

io.on('connection', (socket) => {
	console.log('Client connected:', socket.id);

	socket.on('counterValue', (data) => {
		console.log(`Received counter value from ${socket.id}:`, data.counter);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id);
	});
});

setInterval(() => {
	io.emit('GET_COUNTER');
}, 1000);

const PORT = 8080;
server.listen(PORT, () => {
	console.log('Server started on port:', PORT);
});
