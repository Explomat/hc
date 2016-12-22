var React = require('react');
var Obj = require('../utils/object');
var AssessmentClasses = require('../styles/AssessmentClasses');

var Competence = React.createClass({
	render(){
		var data = this.props.data;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		return(
			<tr>
				{data.map(function(d, index){
					return <td key={index} style={styles}>{d}</td>
				})}
			</tr>
		);
	}
});

var AssessmentOfCompetencies = React.createClass({

	displayName: 'AssessmentOfCompetencies',

	render() {
		var headers = this.props.headers;
		var data = this.props.data;
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var blockContainerStyles = Obj.getScalarValues(blockContainer);
		var titleStyles = Obj.getScalarValues(blockContainer.block.title);
		var tableStyles = Obj.getScalarValues(blockContainer.block);
		var thStyles = Obj.getScalarValues(blockContainer.block.th);
		return (
			<div style={blockContainerStyles}>
				<div style={titleStyles}>Оценка по компетенциям за первое полугодие</div>
				<table style={tableStyles}>
					<thead>
						<tr>
							{headers.map(function(h, index) {
								return <th key={index} style={thStyles}>{h}</th>
							})}
						</tr>
					</thead>
					<tbody>
						{data.map(function(d, index){
							return <Competence key={index} data={d}/>
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = AssessmentOfCompetencies;