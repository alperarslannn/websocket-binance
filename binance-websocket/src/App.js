import React, { useState, useEffect } from 'react';
import Mychart from './components/Mychart';

function App() {
	//States
	const [etherium, setEtherium] = useState([]);
	const [labelChart, setLabelChart] = useState([]);

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
				conn.onmessage = async function (e) {
					let data1 = JSON.parse(e.data);
					// console.log(data1);
					if (data1.data === undefined) {
						return;
					} else {
						data1.data.map((coin) => {
							if (coin.s === 'ETHUSDT') {
								etheriumObj.push(parseFloat(coin.c).toFixed(1));
								//console.log(etheriumObj);
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

					if (etheriumObj.length > 50) {
						// console.log('bye');
						etheriumObj.shift();
						labelss.shift();
					}
					await setLabelChart((prevState) => {
						return [labelss];
					});
					await setEtherium((prevState) => {
						return [etheriumObj];
					});

					// console.log(etheriumObj);
					// console.log(labelss);
				};
			};
		};
		socketConnection();
	}, []);

	return (
		<div className='App'>
			<Mychart etherium={etherium} labelChart={labelChart} />

			{/* {JSON.stringify(etherium)} */}
		</div>
	);
}

export default App;
