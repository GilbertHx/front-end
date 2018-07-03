import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchSummary } from '../../../actions/summary_actions';


class DoughnutChart extends Component{
	componentDidMount() {
        this.props.fetchSummary();
	}
	
    displayName = 'PieXXXExample';

    render() {
		const data = {
			labels: [
				'Users',
				'Vs Target'
			],
			datasets: [{
				data: [ this.props.summary.staff_number, this.props.summary.student_number ],
				backgroundColor: [
				'#ff7f50',
				'#008b8b',
				],
				hoverBackgroundColor: [
				'#ff7f50',
				'#008b8b',
				]
			}]
		};
        return (
        <div className="doughnut-chart">
            <Doughnut data={data} />
        </div>
        );
    }
};

function mapStateToProprs(state) {
    return {
        summary: state.summary
    };
}

export default connect(mapStateToProprs, { fetchSummary })(DoughnutChart);