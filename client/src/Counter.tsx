import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const Counter: React.FC = () => {
	const [counter, setCounter] = useState<number>(0);
	const counterRef = useRef<number>(counter);
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		counterRef.current = counter;
	}, [counter]);


	useEffect(() => {
		const socket = io('http://localhost:8080', {
			reconnectionAttempts: 5,
			transports: ['websocket'],
		});
		socketRef.current = socket;

		socket.on('connect', () => {
			console.log('Connected to server:', socket.id);
		});

		socket.on('connect_error', (err: Error) => {
			console.error('Connection error:', err);
		});


		socket.on('GET_COUNTER', () => {
			console.log('Received GET_COUNTER event');
			socket.emit('counterValue', { counter: counterRef.current });
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleIncrement = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div>
			<h2>Counter Component</h2>
			<p>Counter Value: {counter}</p>
			<button onClick={handleIncrement}>Increment</button>
		</div>
	);
};

export default Counter;
