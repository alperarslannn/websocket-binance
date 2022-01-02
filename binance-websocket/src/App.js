import React, { useState, useEffect } from 'react';
import Mychart from './components/Mychart';

function App() {
	//States
	const [etherium, setEtherium] = useState([]);
	const [labelChart, setLabelChart] = useState([]);

	//Subscription with Binance WS
	useEffect(() => {
		let etheriumObj = [];
		let labelss = [];
		const socketConnection = () => {
			const conn = new WebSocket('wss://stream.binance.com/stream');
			conn.onopen = function (event) {
				conn.send(
					JSON.stringify({
						method: 'SUBSCRIBE',
						params: ['!miniTicker@arr@3000ms'],
						id: 1,
					})
				);
				conn.onmessage = function (e) {
					let data1 = JSON.parse(e.data);
					if (data1.data === undefined) {
						return;
					} else {
						data1.data.map((coin) => {
							if (coin.s === 'ETHUSDT') {
								etheriumObj.push(parseFloat(coin.c).toFixed(1));
								labelss.push([
									`${new Date().toLocaleDateString('tr-TR')}`,
									`${new Date().getHours()}:${new Date()
										.getMinutes()
										.toString()
										.padStart(2, '0')}:${new Date()
										.getSeconds()
										.toString()
										.padStart(2, '0')}`,
								]);
							}
						});
					}

					if (etheriumObj.length > 30) {
						etheriumObj.shift();
						labelss.shift();
					}
					setLabelChart((prevState) => {
						return [...labelss];
					});
					setEtherium((prevState) => {
						return [etheriumObj];
					});

				};
			};
		};
		socketConnection();
	}, []);

	return (
		<div className='App'>
			<Mychart etherium={etherium} labelChart={labelChart} />
		</div>
	);
}

export default App;
