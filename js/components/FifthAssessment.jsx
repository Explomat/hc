var React = require('react');
var BaseStore = require('../stores/BaseStore');
var BaseActions = require('../actions/BaseActions');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var ButtonsClasses = require('../styles/ButtonsClasses');
var Steps = require('../utils/steps');
var Buttons = require('./Buttons');
var Config = require('../config');
var commonFuncs = require('../utils/commonFuncs');
var UrlUtils = require('../utils/url');
var TextView = require('./modules/TextView');
var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');

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

	_isNumberOrReal(val){
		 return /^[+-]?([0-9]{1,}(\d+)?|[0-9]{1,}\.(\d+))$/.test(val) || val === '';
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

	handleChangeWeight(val){
		BaseActions.changeWeight(this.props.blockId, this.props.uuid, val);
	},

	handleChangeMin(val){
		BaseActions.changeMin(this.props.blockId, this.props.uuid, val);
	},

	handleChangeTarg(val){
		BaseActions.changeTarg(this.props.blockId, this.props.uuid,val);
	},

	handleChangeMax(val){
		BaseActions.changeMax(this.props.blockId, this.props.uuid, val);
	},

	handleChangeFact(val){
		BaseActions.changeFact(this.props.blockId, this.props.uuid, val);
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
		var max = this.props.max;
		var styles = Obj.getScalarValues(block.task.td);
		var inputStyles = Obj.getScalarValues(block.task.td.input);
		var factStyles = assign(Obj.getScalarValues(block.task.fact), styles);
		var textareaStyles = Obj.getScalarValues(block.task.textarea);
		return(
			<tr>
				<td style={styles}>
					<textarea style={{resize: 'none'}} rows={4} onChange={this.handleChangeTitle} disabled={isDisabledAll} value={this.props.title}></textarea>
				</td>
				<td style={styles}>
					<input style={inputStyles} onChange={this.handleChangeUnit} type="text" value={this.props.unit} disabled={isDisabledAll}/>
				</td>
				<td style={styles}>
					<TextView onBlur={this.handleChangeWeight} isValid={this._isNumberOrReal} style={inputStyles} value={this.props.weight} disabled={isDisabledAll} />
				</td>
				<td style={styles}>
					<TextView onBlur={this.handleChangeMin} isValid={this._isNumberOrReal} style={inputStyles} value={min} disabled={isDisabledAll} />
				</td>
				<td style={styles}>
					<TextView onBlur={this.handleChangeTarg} isValid={this._isNumberOrReal} style={inputStyles} value={targ} disabled={isDisabledAll} />
				</td>
				<td style={styles}>
					<TextView onBlur={this.handleChangeMax} isValid={this._isNumberOrReal} style={inputStyles} value={max} disabled={isDisabledAll} />
				</td>
				<td style={factStyles}>
					<TextView onBlur={this.handleChangeFact} isValid={this._isNumberOrReal} style={inputStyles} value={fact} disabled={isDisabledFact} />
				</td>
				<td style={styles}>{commonFuncs.getPercentComplete(fact, min, targ, max)}</td>
				<td style={styles}>
					<textarea style={textareaStyles} rows={4} onChange={this.handleChangeComment} disabled={isDisabledTextarea} value={this.props.comment}></textarea>
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

	_saveDataBeforeSubmit(){
		var self = this;
		$('#f_switch').submit(function (e) {
			if (!self._isSaved){
				e.preventDefault();
				var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
				BaseActions.saveData(BaseStore.getData(), paId).then(function(){
					self._isSaved = true;
					$('#f_switch').submit();
				})
			}
		});
		/*var container = document.getElementsByClassName('WTCSS-comp-body')[0];
		var button = container.querySelector('div.ass-button-container > input');
		if (button){
			button.addEventListener('click', function(){
				var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
				BaseActions.saveData(BaseStore.getData(), paId);
			})
		}*/
	},

	componentDidMount() {
		this._isSaved = false;
		this._changeZonesStyles();
		this._saveDataBeforeSubmit();
	},

	render() {
		var isBoss = BaseStore.isBoss();
		var isCollaborator = BaseStore.isCollaborator();
		var step = BaseStore.getStep();

		if (step !== Steps.keys.firstStep || (step === Steps.keys.firstStep && isCollaborator)){
			return (
				<div>
					<Buttons printAction={'createFile'} />
					{(isBoss && !isCollaborator) && <BossInstruction />}
					{((isCollaborator && isBoss) || (!isBoss && isCollaborator)) && <CollaboratorInstruction />}
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