var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');
//var AssessmentActions = require('../actions/AssessmentActions');


function getPercentComplete(fact, min, targ){
	fact = Number(fact);
	min = Number(min);
	targ = Number(targ);

	if (fact <= min) {
		return 0;
	}
	var percent = ((fact - min) * 100) / (targ - min);
	return Math.round(percent > 100 ? 100 : percent);

}

function getSummWeight(tasks){
	return ceil(tasks.length === 0 ? 0 : (tasks.map(function(t){
		return Number(t.weight);
	}).reduce(function(first, second){
		return first +  second;
	})), 1);
}

function getAllPercentComplete(tasks){
	var summWeight = getSummWeight(tasks);

	return ceil((tasks.length === 0 ? 0 : (tasks.map(function(t){
		var percentComplete = getPercentComplete(t.fact, t.min, t.targ);
		return Number(t.weight) * percentComplete;
	}).reduce(function(first, second){
		return first + second;
	}))) / summWeight, 1);
}


var Task = React.createClass({

	render(){
		var fact = this.props.fact;
		var min = this.props.min;
		var targ = this.props.targ;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{this.props.weight}</td>
				<td style={styles}>{min}</td>
				<td style={styles}>{targ}</td>
				<td style={styles}>{this.props.max}</td>
				<td style={factStyles}>{fact}</td>
				<td style={styles}>{getPercentComplete(fact, min, targ)}</td>
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
		var descriptionStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.description);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<table style={blockStyles}>
					<thead>
						<tr>
							<th style={thStyles}>Наименование</th>
							<th style={thStyles}>ед. изм-я</th>
							<th style={thStyles}>вес, %</th>
							<th style={thStyles}>MIN</th>
							<th style={thStyles}>TARG</th>
							<th style={thStyles}>MAX</th>
							<th style={thStyles}>ФАКТ</th>
							<th style={thStyles}>% выполнения</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} />
						})}
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td style={descriptionStyles}>Суммарный вес индивидуальных показателей</td>
							<td></td>
							<td>{getSummWeight(this.props.tasks)}%</td>
						</tr>
						<tr>
							<td style={descriptionStyles}>% выполнения</td>
							<td></td>
							<td>{getAllPercentComplete(this.props.tasks)}%</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var Assessment = React.createClass({

	displayName: 'Assessment',

	getAveragePercentComplete(_blocks){
		var blocks = _blocks.filter(function(b){
			return b.tasks.length > 0
		});
		var percent = 0;
		blocks.forEach(function(b){
			percent += getAllPercentComplete(b.tasks);
		});
		return ceil(percent / blocks.length, 1);
	},

	getCountBlocksWithTasks(){
		var blocks = this.props.blocks;
		return blocks.filter(function(b){
			return b.tasks.length > 0
		}).length;
	},

	render() {
		var percentAverageStyles = this.getCountBlocksWithTasks() > 0 ? Obj.getScalarValues(AssessmentClasses.assessmentContainer.percentAverage.displayAverage) :
																		Obj.getScalarValues(AssessmentClasses.assessmentContainer.percentAverage)
		return (
			<div>
				<Buttons printAction={'createFile'} />
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
				<div style={percentAverageStyles}>
					<h1>Средний процент выполнения по кварталам: {this.getAveragePercentComplete(this.props.blocks)}</h1>
				</div>
			</div>
		);
	}
});

module.exports = Assessment;