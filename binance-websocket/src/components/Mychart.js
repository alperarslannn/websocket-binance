import React from 'react';
import { Line } from 'react-chartjs-2';

const Mychart = ({ etherium, labelChart }) => {
	const optionsLineChart = {
		// line_chart_attribute: {},
		// animation: { duration: 1800 },
		maintainAspectRatio: false,
		elements: { point: { radius: 4, hitRadius: 10 } },
		plugins: {
			title: {
				display: true,
				padding: 50,
				color: 'white',
				text: 'Live Etherium Price',
				font: {
					size: 25,
				},
			},
			//options.plugins.legend
			legend: {
				display: true,
				labels: {
					color: 'rgba(255, 99, 132,1)',
				},
				position: 'bottom',
			},
			tooltip: {
				usePointStyle: true,
				callbacks: {
					labelPointStyle: function (context) {
						return {
							pointStyle: 'triangle',
							rotation: 0,
						};
					},
				},
			},
		},
		scales: {
			y: {
				grid: {
					color: 'rgb(71, 70, 70)',
				},
				ticks: {
					precision: 1,
					color: 'white',

					// Include a dollar sign in the ticks

					callback: function (value) {
						return '$ ' + value;
					},
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: 'white',
					// For a category axis, the val is the index so the lookup via getLabelForValue is needed
					callback: function (val, index) {
						// Hide the label of every 2nd dataset
						return index % 2 === 0
							? this.getLabelForValue(val)
							: '';
					},
					//color: 'red',
				},
			},
		},
	};
	return (
		<div className='chart'>
			<Line
				data={{
					labels: labelChart[0],
					datasets: [
						{
							label: 'Etherium Price',
							data: etherium[0],
							backgroundColor: ['rgba(255, 99, 132, 0.2)'],
							borderColor: ['rgba(255, 99, 132, 1)'],
							borderWidth: 2,
							tension: 0.3,
							fill: {
								target: true,
							},
						},
					],
				}}
				options={optionsLineChart}
			/>
		</div>
	);
};

export default Mychart;
