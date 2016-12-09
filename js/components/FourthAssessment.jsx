var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');
var Portal = require('./modules/portal');
var BaseStore = require('../stores/BaseStore');
var filter = require('lodash/filter');

var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');
//var AssessmentActions = require('../actions/AssessmentActions');

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
		var tasksResultStyles = Obj.getScalarValues(blockContainer.block.tasksResult);
		var ratingStyles= Obj.getScalarValues(blockContainer.block.tasksResult.rating);
		var positionDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.rating.description);
		var ratingDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.position.description);
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
				<div style={tasksResultStyles}>
					<span>
						<span style={positionDescrStyles}>Позиция в рейтинге: </span>
						<span> {this.props.tasksResult.position}</span>
					</span>
					<span style={ratingStyles}>
						<span style={ratingDescrStyles}>Соответствие рейтингу: </span>
						<span> {this.props.tasksResult.rating}</span>
					</span>
				</div>
			</div>
		);
	}
});


var Task = React.createClass({

	render(){
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
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
		var tdStyles = Obj.getScalarValues(blockContainer.block.task.td);
		//var descriptionStyles = Obj.getScalarValues(blockContainer.block.description);
		var testInfoStyles = Obj.getScalarValues(blockContainer.block.testInfo);
		var testInfoDescriptionStyles = !testInfo.error ? Obj.getScalarValues(blockContainer.block.testInfo.description.displayDescription) : Obj.getScalarValues(blockContainer.block.testInfo.description);
		var testInfoErrorStyles = !testInfo.error ? Obj.getScalarValues(blockContainer.block.testInfo.error) : Obj.getScalarValues(blockContainer.block.testInfo.error.displayError);
		var monthsDataStyles = !this.state.isDisplayMonths ? Obj.getScalarValues(blockContainer.block.monthsData) : Obj.getScalarValues(blockContainer.block.monthsData.displayMonthsData);
		var tasksResultStyles = Obj.getScalarValues(blockContainer.block.tasksResult);
		var ratingStyles = Obj.getScalarValues(blockContainer.block.tasksResult.rating);
		var positionDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.rating.description);
		var ratingDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.position.description);
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
					<div style={tasksResultStyles}>
						<span>
							<span style={positionDescrStyles}>Позиция в рейтинге: </span>
							<span> {this.props.tasksResult.position}</span>
						</span>
						<span style={ratingStyles}>
							<span style={ratingDescrStyles}>Соответствие рейтингу: </span>
							<span> {this.props.tasksResult.rating}</span>
						</span>
					</div>
				</div>
				<div>
					<div style={testInfoStyles}>
						<table style={testInfoDescriptionStyles}>
							<thead>
								<tr>
									<th style={thStyles}>Название</th>
									<th style={thStyles}>Результат</th>
									<th style={thStyles}>Статус</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style={tdStyles}>{testInfo.name}</td>
									<td style={tdStyles}>{testInfo.score}</td>
									<td style={tdStyles}>{testInfo.state}</td>
								</tr>
							</tbody>
						</table>
						<span style={testInfoErrorStyles}>{testInfo.error}</span>
						{this.getToggleMonthsButtonMarkup()}
					</div>
					<div style={monthsDataStyles}>
						{this._isContainsTasks() ? this.props.monthData.map(function(m, index){
							return <MonthBlock key={index} {...m} />
						}) : <div>Нет данных</div>}
					</div>
				</div>
			</div>
		);
	}
});

var FourthAssessment = React.createClass({

	displayName: 'FourthAssessment',

	render() {
		var isBoss = BaseStore.isBoss();
		var isCollaborator = BaseStore.isCollaborator();
		return (
			<div>
				<Buttons printAction={'createFile'} />
				<Portal nodeId="wt-zone-left">
					{(isBoss && !isCollaborator) && <BossInstruction />}
					{((isCollaborator && isBoss) || (!isBoss && isCollaborator)) && <CollaboratorInstruction />}
				</Portal>
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
			</div>
		);
	}
});

module.exports = FourthAssessment;