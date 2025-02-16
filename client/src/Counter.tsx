import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";



function Counter() {
	const [counter, setCounter] = useState<number>(0);
	const counterRef = useRef<number>(counter)
	const SocketRef = useRef<Socket | null>()

	useEffect(() => {

		counterRef.current = counter;
	}, [counter]);

	useEffect(() => {
		const socket = io('http://localhost:8080')
		SocketRef.current = socket;

		socket.on("connect", () => {
			console.log('Connected with', socket.id);
		});
		socket.on('GET_VALUE', () => {
			socket.emit('CounterData', { counter: counterRef.current })
		})
		socket.on("disconnect", () => {
			console.log('Disconnected with', socket.id);
		});
		return () => {
			socket.disconnect()
		};
	}, []);

	const handleIncrement = () => {
		setCounter(prev => prev + 1)
	}
	return (
		<div>
			<p>Counter data</p>
			<p> counter value: {counter}</p>
			<button onClick={handleIncrement}> increment value</button>
		</div>
	)
}

export default Counter