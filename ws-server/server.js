const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const io = new Server(server, {
	cors: { origin: "*" },
});

io.on('connection', (socket) => {
	console.log(`Client connected: ${socket.id}`);

	socket.on('counterValue', (data) => {
		console.log(` Received counter value from ${socket.id}: ${data.counter}`);
	});

	socket.on('disconnect', () => {
		console.log(`Client disconnected: ${socket.id}`);
	});
});

// Broadcast "GET_COUNTER" event every second to all clients
const intervalId = setInterval(() => {
	try {
		io.emit('GET_COUNTER');
	} catch (error) {
		console.error('Error emitting GET_COUNTER:', error);
	}
}, 1000);

// Graceful shutdown handling
const shutdown = () => {
	console.log(' Shutting down server...');
	clearInterval(intervalId);
	io.close(() => {
		console.log(' WebSocket server closed.');
		process.exit(0);
	});
};

// Listen for exit signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
