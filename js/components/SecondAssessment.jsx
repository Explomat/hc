var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');
var commonFuncs = require('../utils/commonFuncs');
var Portal = require('./modules/portal');
var BaseStore = require('../stores/BaseStore');

var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');
var AssessmentOfCompetencies = require('./AssessmentOfCompetencies');
var filter = require('lodash/filter');

var config = require('../config');
//var AssessmentActions = require('../actions/AssessmentActions');


var Task = React.createClass({

	render(){
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
		var targ = this.props.targ ? ceil(this.props.targ, 2) : this.props.targ;
		var max = this.props.max ? ceil(this.props.max, 2) : this.props.max;
		var min = this.props.min ? ceil(this.props.min, 2) : this.props.min;
		
		var percent = this.props.percent ? ceil(this.props.percent, 2) : this.props.percent;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{this.props.weight}</td>
				<td style={styles}>{min}</td>
				<td style={styles}>{targ}</td>
				<td style={styles}>{max}</td>
				<td style={factStyles}>{fact}</td>
				<td style={styles}>{percent}</td>
			</tr>
		);
	}
});

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
		var descriptionStyles = Obj.getScalarValues(blockContainer.block.description);
		var descTableStyles = Obj.getScalarValues(blockContainer.descriptionTable);
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
				<table style={descTableStyles}>
					<tbody>
						<tr>
							<td style={descriptionStyles}>Суммарный вес индивидуальных показателей</td>
							<td></td>
							<td>{commonFuncs.getSummWeight(this.props.tasks)}%</td>
						</tr>
						<tr>
							<td style={descriptionStyles}>% выполнения</td>
							<td></td>
							<td>{commonFuncs.getAllPercentComplete(this.props.tasks)}%</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var Block = React.createClass({

	getInitialState(){
		return {
			isDisplayMonths: false
		}
	},

	_isContainsTasks(){
		var data = this.props.monthData;
		var isContains = false;
		if (data) {
			isContains = filter(data, function(item) {
				return item.tasks.length > 0
			}).length > 0;
		}
		return isContains;
	},

	getToggleMonthsButtonMarkup(){
		var showMonthsStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.testInfo.showMonths);
		showMonthsStyles.marginTop = '36px';
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
		var blockContainerStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer);
		var titleStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block);
		var thStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.th);
		var descriptionStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.description);
		var descTableStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.descriptionTable);
		var monthsDataStyles = !this.state.isDisplayMonths ? Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.monthsData) : 
															 Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.monthsData.displayMonthsData);
		
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<div>
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
					<table style={descTableStyles}>
						<tbody>
							<tr>
								<td style={descriptionStyles}>Суммарный вес индивидуальных показателей</td>
								<td></td>
								<td>{commonFuncs.getSummWeight(this.props.tasks)}%</td>
							</tr>
							<tr>
								<td style={descriptionStyles}>% выполнения</td>
								<td></td>
								<td>{commonFuncs.getAllPercentComplete(this.props.tasks)}%</td>
							</tr>
						</tbody>
					</table>
					{this.getToggleMonthsButtonMarkup()}
				</div>
				<div style={monthsDataStyles}>
					{this._isContainsTasks() ? this.props.monthData.map(function(m, index){
							return <MonthBlock key={index} {...m} />
						}) : <div>Нет данных</div>}
				</div>
			</div>
		);
	}
});

var SecondAssessment = React.createClass({

	displayName: 'SecondAssessment',
	
	hasPreviosAssessment(){
		var previosAssessment = BaseStore.getPreviosAssessment();
		return (previosAssessment.headers !== undefined && previosAssessment.data !== undefined);
	},

	getAveragePercentComplete(_blocks){
		var blocks = _blocks.filter(function(b){
			return b.tasks.length > 0
		});
		var percent = 0;
		blocks.forEach(function(b){
			percent += commonFuncs.getAllPercentComplete(b.tasks);
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
		var isBoss = BaseStore.isBoss();
		var isCollaborator = BaseStore.isCollaborator();
		var percentAverage = AssessmentClasses.assessmentContainer.percentAverage;
		var percentAverageStyles = this.getCountBlocksWithTasks() > 0 ? Obj.getScalarValues(percentAverage.displayAverage) :
																		Obj.getScalarValues(percentAverage);
		var previosAssessment = BaseStore.getPreviosAssessment();
		return (
			<div>
				<Portal nodeId={config.dom.buttonsId}>
					<Buttons printAction={'createFile'} />
				</Portal>
				<Portal nodeId={config.dom.instructionId}>
					{(isBoss && !isCollaborator) && <BossInstruction />}
					{((isCollaborator && isBoss) || (!isBoss && isCollaborator)) && <CollaboratorInstruction />}
				</Portal>
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
				<div style={percentAverageStyles}>
					<h3>Средний процент выполнения по полугодиям: {this.getAveragePercentComplete(this.props.blocks)}</h3>
				</div>
				{this.hasPreviosAssessment() && <AssessmentOfCompetencies {...previosAssessment} />}
			</div>
		);
	}
});

module.exports = SecondAssessment;