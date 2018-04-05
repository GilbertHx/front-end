import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Graduates',
		'Ungraduates',
		'In Class'
	],
	datasets: [{
		data: [1000, 1200, 2000],
		backgroundColor: [
		'#008b8b',
		'#ff7f50',
		'#87ceeb'
		],
		hoverBackgroundColor: [
		'#008b8b',
		'#ff7f50',
		'#87ceeb'
		]
	}]
};

export default class PieChart extends Component{
    displayName = 'PieXXXExample';

    render() {
        return (
        <div className="pie-chart">
            <Pie data={data} />
        </div>
        );
    }
};