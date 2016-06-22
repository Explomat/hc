var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');

var Task = React.createClass({

	render(){
		var fact = this.props.fact;
		var targ = this.props.targ;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{targ}</td>
				<td style={styles}>{this.props.max}</td>
				<td style={factStyles}>{fact}</td>
			</tr>
		);
	}
});

var Block = React.createClass({

	render(){
		if (this.props.tasks && this.props.tasks.length === 0) {
			return null;
		}
		var blockContainerStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer);
		var titleStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block);
		var thStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.th);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<table style={blockStyles}>
					<thead>
						<tr>
							<th style={thStyles}></th>
							<th style={thStyles}>ед. изм-я</th>
							<th style={thStyles}>TARG</th>
							<th style={thStyles}>MAX</th>
							<th style={thStyles}>ФАКТ</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} />
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

var SecondAssessment = React.createClass({

	displayName: 'SecondAssessment',

	render() {
		return (
			<div>
				<Buttons printAction={'createFile'} />
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
			</div>
		);
	}
});

module.exports = SecondAssessment;