var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var BaseActions = require('../actions/BaseActions');
var ButtonsClasses = require('../styles/ButtonsClasses');
var Steps = require('../utils/steps');
var BaseStore = require('../stores/BaseStore');
var Buttons = require('./Buttons');
var Config = require('../config');
var commonFuncs = require('../utils/commonFuncs');

function _isDisabledAll(step, isCollaborator, isBoss){
	if (!isCollaborator && !isBoss){
		return true;
	}
	if (step === Steps.keys.firstStep && isCollaborator){
		return false;
	}
	else if (step === Steps.keys.secondStep && isBoss){
		return false;
	}
	return true;
}

function _isDisabledFact(/*step, isCollaborator, isBoss*/){
/*	if (!isCollaborator && !isBoss) {
		return true;
	}

	if (step === Steps.keys.firstStep || step === Steps.keys.secondStep) {
		return true;
	}
	else if (step === Steps.keys.thirdStep && isBoss) {
		return true;
	}
	else if (step === Steps.keys.fourthStep && isCollaborator) {
		return true;
	}
	else if (step === Steps.keys.fifthStep) {
		return true
	}*/
	return true;
}


function _isDisabledTextarea(step, isCollaborator, isBoss){
	if (!isCollaborator && !isBoss) {
		return true;
	}

	if (step === Steps.keys.firstStep){
		return true;
	}
	else if(step === Steps.keys.secondStep && isBoss){
		return false;
	}
	return true;
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

	handleChangeComment(e){
		BaseActions.changeComment(this.props.blockId, this.props.uuid, e.target.value);
	},

	render(){
		var step = BaseStore.getStep();
		var isCollaborator = BaseStore.isCollaborator();
		var isBoss = BaseStore.isBoss();
		var isDisabledAll = _isDisabledAll(step, isCollaborator, isBoss);
		var isDisabledFact = _isDisabledFact();
		var isDisabledTextarea = _isDisabledTextarea(step, isCollaborator, isBoss);

		var block = AssessmentClasses.assessmentContainer.blockContainer.block;
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
		var min = this.props.min;
		var targ = this.props.targ;
		var styles = Obj.getScalarValues(block.task.td);
		var inputStyles = Obj.getScalarValues(block.task.td.input);
		var factStyles = assign(Obj.getScalarValues(block.task.fact), styles);
		var textareaStyles = Obj.getScalarValues(block.task.textarea);
		return(
			<tr>
				<td style={styles}>
					<textarea style={{rezize: 'none'}} onChange={this.handleChangeTitle} disabled={isDisabledAll} value={this.props.title}></textarea>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeUnit} type="text" value={this.props.unit} disabled={isDisabledAll}/>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeWeight} type="text" value={this.props.weight} disabled={isDisabledAll}/>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeMin} type="text" value={min} disabled={isDisabledAll}/>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeTarg} type="text" value={targ} disabled={isDisabledAll}/>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeMax} type="text" value={this.props.max} disabled={isDisabledAll}/>
				</td>
				<td style={factStyles}>
					<input style={inputStyles} onChange={this.handleChangeFact} type="text" value={fact} disabled={isDisabledFact}/>
				</td>
				<td style={styles}>{commonFuncs.getPercentComplete(fact, min, targ)}</td>
				<td style={styles}>
					<textarea style={textareaStyles} onChange={this.handleChangeComment} disabled={isDisabledTextarea} value={this.props.comment}></textarea>
				</td>
				<td style={styles}>
					<button style={ButtonsClasses} onClick={this.handleRemoveTask} disabled={isDisabledAll}>&times;</button>
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
		var step = BaseStore.getStep();
		var isCollaborator = BaseStore.isCollaborator();
		var isBoss = BaseStore.isBoss();
		var isDisabledAddButton = _isDisabledAll(step, isCollaborator, isBoss);

		var blockContainerStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer);
		var titleStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block);
		var thStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.th);
		var descriptionStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.description);
		var tdButtonStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td.tdButton);
		var buttonStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td.tdButton.button), ButtonsClasses);
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
							<th style={thStyles}>Комментарий</th>
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
							<td>{commonFuncs.getSummWeight(this.props.tasks)}%</td>
							<td style={tdButtonStyles}>
								<button style={buttonStyles} onClick={this.handleAddTask} disabled={isDisabledAddButton}>Добавить</button>
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

	_changeZonesStyles(){
		var mainZone = document.getElementById(Config.dom.mainZoneId);
		var rightZone = document.getElementById(Config.dom.rightZoneId);
		if (!mainZone || !rightZone){
			return;
		}
		mainZone.style.margin = '0px';
		mainZone.style.width = '100%';
		rightZone.style.display = 'none';
	},

	componentDidMount() {
		this._changeZonesStyles();
	},

	render() {
		var isCollaborator = BaseStore.isCollaborator();
		var step = BaseStore.getStep();

		if (step !== Steps.keys.firstStep || (step === Steps.keys.firstStep && isCollaborator)){
			return (
				<div>
					<Buttons printAction={'createFile'} />
					{this.props.blocks.map(function(b, index){
						return <Block key={index} {...b} />
					})}
				</div>
			);
		}
		return null;
	}
});

module.exports = FifthAssessment;