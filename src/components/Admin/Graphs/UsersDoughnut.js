import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'Users',
		'Vs Target'
	],
	datasets: [{
		data: [ 4200,6000-4200 ],
		backgroundColor: [
		'#bdb76b',
		],
		hoverBackgroundColor: [
		'#bdb76b',
		]
	}]
};

export default class DoughnutChart extends Component{
    displayName = 'PieXXXExample';

    render() {
        return (
        <div className="doughnut-chart">
            <Doughnut data={data} />
        </div>
        );
    }
};