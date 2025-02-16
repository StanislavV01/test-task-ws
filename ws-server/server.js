const express = require('express')
const http = require('http')


const { Server } = require('socket.io')


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
	cors: { origin: '*' }
});


io.on("connection", (socket) => {
	console.log('Client connected', socket.id)

	socket.on('CounterData', (data) => {
		console.log('Recieved data from client:', socket.id, 'value:', data.counter)
	})

	socket.on('disconnect', () => {
		console.log('Client disconnected', socket.id)
	})

});

setInterval(() => {
	io.emit("GET_VALUE")
}, 1000)


const port = 8080;

server.listen(port, () => {
	console.log('Server has been started on port:', port)
})