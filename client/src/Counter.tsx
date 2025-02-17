import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const Counter: React.FC = () => {
	const [counter, setCounter] = useState<number>(0);
	const counterRef = useRef<number>(0);
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		const socket = io('http://localhost:8080', {
			reconnectionAttempts: 5,
			transports: ['websocket'],
		});
		socketRef.current = socket;

		socket.on('connect', () => {
			console.log(' Connected to server:', socket.id);
		});

		socket.on('connect_error', (err: Error) => {
			console.error(' Connection error:', err);
		});

		socket.on('GET_COUNTER', () => {
			console.log(' Server requested counter value:', counterRef.current);
			socket.emit('counterValue', { counter: counterRef.current });
		});

		return () => {
			console.log(' Disconnecting WebSocket...');
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		counterRef.current = counter;
	}, [counter]);

	const handleIncrement = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Counter Component</h2>
			<p style={styles.counter}>Counter Value: <span style={styles.number}>{counter}</span></p>
			<button style={styles.button} onClick={handleIncrement}>Increment</button>
		</div>
	);
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
	container: {
		textAlign: 'center',
		backgroundColor: '#f5f5f5',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
		width: '300px',
		margin: '50px auto',
	},
	title: {
		color: '#333',
		fontSize: '24px',
		marginBottom: '10px',
	},
	counter: {
		fontSize: '20px',
		color: '#555',
		marginBottom: '15px',
	},
	number: {
		fontWeight: 'bold',
		color: '#007bff',
	},
	button: {
		backgroundColor: '#007bff',
		color: '#fff',
		padding: '10px 15px',
		fontSize: '16px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		transition: 'background 0.3s',
	},
	buttonHover: {
		backgroundColor: '#0056b3',
	},
};

export default Counter;
