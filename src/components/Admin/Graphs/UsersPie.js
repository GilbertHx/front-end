import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchSummary } from '../../../actions/summary_actions';

class PieChart extends Component{
	componentDidMount() {
        this.props.fetchSummary();
	}
    displayName = 'PieXXXExample';

    render() {
		const { summary } = this.props
		const data = {
			labels: [
				'Graduates',
				'Done Exam',
				'Still Learning'
			],
			datasets: [{
				data: [summary.graduates_number, summary.ungraduates_number, summary.still_learning_number],
				backgroundColor: [
				'#87ceeb',
				'#bdb76b',
				'#808080'
				],
				hoverBackgroundColor: [
				'#87ceeb',
				'#bdb76b',
				'#808080'
				]
			}]
		};
        return (
        <div className="pie-chart">
            <Pie data={data} />
        </div>
        );
    }
};

function mapStateToProprs(state) {
    return {
        summary: state.summary
    };
}

export default connect(mapStateToProprs, { fetchSummary })(PieChart);