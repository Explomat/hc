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

var MonthBlock = React.createClass({

	render(){
		if (this.props.tasks && this.props.tasks.length === 0) {
			return null;
		}
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var blockContainerStyles = Obj.getScalarValues(blockContainer);
		var titleStyles = Obj.getScalarValues(blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(blockContainer.block);
		var thStyles = Obj.getScalarValues(blockContainer.block.th);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<table style={blockStyles}>
					<thead>
						<tr>
							<th style={thStyles}>Наименование</th>
							<th style={thStyles}>ед. изм-я</th>
							<th style={thStyles}>вес, %</th>
							<th style={thStyles}>ФАКТ</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} />
						})}
					</tbody>
				</table>
				<div>
					<span>{this.props.tasksResult.position}</span>
					<span>{this.props.tasksResult.rating}</span>
				</div>
			</div>
		);
	}
});


var Task = React.createClass({

	render(){
		var fact = this.props.fact ? ceil(this.props.fact, 1) : this.props.fact;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{this.props.weight}</td>
				<td style={factStyles}>{fact}</td>
			</tr>
		);
	}
});

var Block = React.createClass({

	getInitialState(){
		return {
			isDisplayMonths: false
		}
	},

	getToggleMonthsButtonMarkup(){
		var showMonthsStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.testInfo.showMonths);
		return this.state.isDisplayMonths ?
				<span onClick={this.handleToggleMonthsData} style={showMonthsStyles}>Скрыть &uarr;</span>:
				<span onClick={this.handleToggleMonthsData} style={showMonthsStyles}>Показать по месяцам &darr;</span>
	},

	handleToggleMonthsData(){
		this.setState({isDisplayMonths: !this.state.isDisplayMonths});
	},

	render(){
		if (this.props.tasks && this.props.tasks.length === 0) {
			return null;
		}
		var testInfo = this.props.testInfo;
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var blockContainerStyles = Obj.getScalarValues(blockContainer);
		var titleStyles = Obj.getScalarValues(blockContainer.block.title);
		//var tableContainerStyles = Obj.getScalarValues(blockContainer.block.tableContainer);
		var blockStyles = Obj.getScalarValues(blockContainer.block);
		var thStyles = Obj.getScalarValues(blockContainer.block.th);
		//var descriptionStyles = Obj.getScalarValues(blockContainer.block.description);
		var testInfoStyles = Obj.getScalarValues(blockContainer.block.testInfo);
		var testInfoDescriptionStyles = !testInfo.error ? Obj.getScalarValues(blockContainer.block.testInfo.description.displayDescription) : Obj.getScalarValues(blockContainer.block.testInfo.description);
		var testInfoErrorStyles = !testInfo.error ? Obj.getScalarValues(blockContainer.block.testInfo.error) : Obj.getScalarValues(blockContainer.block.testInfo.error.displayError);
		var monthsDataStyles = !this.state.isDisplayMonths ? Obj.getScalarValues(blockContainer.block.monthsData) : Obj.getScalarValues(blockContainer.block.monthsData.displayMonthsData);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<div style={{paddingBottom: '10px', borderBottom: '1px solid #ccc'}}>
					<table style={blockStyles}>
						<thead>
							<tr>
								<th style={thStyles}>Наименование</th>
								<th style={thStyles}>ед. изм-я</th>
								<th style={thStyles}>вес, %</th>
								<th style={thStyles}>ФАКТ</th>
							</tr>
						</thead>
						<tbody>
							{this.props.tasks.map(function(t, index){
								return <Task key={index} {...t} />
							})}
						</tbody>
					</table>
					<div>
						<span>{this.props.tasksResult.position}</span>
						<span>{this.props.tasksResult.rating}</span>
					</div>
				</div>
				<div>
					<div style={testInfoStyles}>
						<span style={testInfoDescriptionStyles}>{testInfo.name}: {testInfo.score}</span>
						<span style={testInfoErrorStyles}>{testInfo.error}</span>
						{this.getToggleMonthsButtonMarkup()}
					</div>
					<div style={monthsDataStyles}>
						{this.props.monthData.map(function(m, index){
							return <MonthBlock key={index} {...m} />
						})}
					</div>
				</div>
			</div>
		);
	}
});

var FourthAssessment = React.createClass({

	displayName: 'FourthAssessment',

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

module.exports = FourthAssessment;