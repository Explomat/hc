var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var BaseActions = require('../actions/BaseActions');

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

var Task = React.createClass({

	_isNumber(val){
		 return /^(\d+)?$/.test(val);
	},

	handleRemoveTask(){
		BaseActions.removeTask(this.props.blockId, this.props.uuid);
	},

	handleChangeTitle(e){
		BaseActions.changeTitle(this.props.blockId, this.props.uuid, e.target.value);
	},

	handleChangeUnit(e){
		var val = e.target.value;
		BaseActions.changeUnit(this.props.blockId, this.props.uuid, val);
	},

	handleChangeWeight(e){
		var val = e.target.value;
		if (this._isNumber(val)){
			BaseActions.changeWeight(this.props.blockId, this.props.uuid, e.target.value);
		}
	},

	handleChangeMin(e){
		var val = e.target.value;
		if (this._isNumber(val)){
			BaseActions.changeMin(this.props.blockId, this.props.uuid, e.target.value);
		}
	},

	handleChangeTarg(e){
		var val = e.target.value;
		if (this._isNumber(val)){
			BaseActions.changeTarg(this.props.blockId, this.props.uuid, e.target.value);
		}
	},

	handleChangeMax(e){
		var val = e.target.value;
		if (this._isNumber(val)){
			BaseActions.changeMax(this.props.blockId, this.props.uuid, e.target.value);
		}
	},

	handleChangeFact(e){
		var val = e.target.value;
		if (this._isNumber(val)){
			BaseActions.changeFact(this.props.blockId, this.props.uuid, e.target.value);
		}
	},

	render(){
		var fact = this.props.fact;
		var min = this.props.min;
		var targ = this.props.targ;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var inputStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td.input);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>
					<input type="text" onChange={this.handleChangeTitle} value={this.props.title} />
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeUnit} type="text" value={this.props.unit} />
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeWeight} type="text" value={this.props.weight} />
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeMin} type="text" value={min} />
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeTarg} type="text" value={targ} />
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeMax} type="text" value={this.props.max} />
				</td>
				<td style={factStyles}>
					<input style={inputStyles} onChange={this.handleChangeFact} type="text" value={fact} />
				</td>
				<td style={styles}>{getPercentComplete(fact, min, targ)}</td>
				<td>
					<button onClick={this.handleRemoveTask}>&times;</button>
				</td>
			</tr>
		);
	}
});

var Block = React.createClass({

	handleAddTask(){
		BaseActions.addTask(this.props.uuid);
	},

	render(){
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
							<th style={thStyles}></th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} blockId={this.props.uuid}/>
						}.bind(this))}
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td style={descriptionStyles}>Суммарный вес индивидуальных показателей</td>
							<td></td>
							<td>{getSummWeight(this.props.tasks)}%</td>
							<td>
								<button onClick={this.handleAddTask}>Добавить</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var FifthAssessment = React.createClass({

	displayName: 'FifthAssessment',

	render() {
		return (
			<div>
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
			</div>
		);
	}
});

module.exports = FifthAssessment;