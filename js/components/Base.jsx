var React = require('react');
var BaseStore = require('../stores/BaseStore');
var Steps = require('../utils/steps');
var Assessment = require('./Assessment');
var SecondAssessment = require('./SecondAssessment');
var ThirdAssessment = require('./ThirdAssessment');
var FourthAssessment = require('./FourthAssessment');
var FifthAssessment = require('./FifthAssessment');
var SixthAssessment = require('./SixthAssessment');

var config = require('../config');

function getState() {
	return BaseStore.getData();
}

var Base = React.createClass({

	_changeAssessmentCollName(){
		var elems= document.getElementsByClassName('th-ass_mark');
		if (elems.length > 0 && BaseStore.getStep() === Steps.keys.firstStep){
			elems[0].textContent = 'Моя оценка';
		}
	},

	_preventFormSubmit(){
		var self = this;
		$('#f_switch').submit(function (evt) {
			var isReady = BaseStore.isReady();
			var curStep = BaseStore.getStep();
			if (!isReady && curStep === Steps.keys.secondStep){
				alert('Перед проставлением оценок Вам необходимо провести оценочную встречу. Для этого в бланке нажмите "Назначить оценочную встречу"');
				evt.preventDefault();
			}
			else if (isReady && curStep === Steps.keys.secondStep) {
				if (!self._isSaved){
					self._isSaved = true;
					alert("После сохранения бланка и проведения оценочной встречи со своим сотрудником обязательно завершите процедуру оценки, нажатием кнопки «Завершить оценку».");
				}
			}
		});
	},
	
	_changeSomeStyles(){
		$(".ass-button-container").css({marginTop: "0px", borderTop: "none"});	
	},
	
	_cutDefaultForm(){
		var formNode = document.getElementById(config.dom.cutFormId);
		var appendNode = document.getElementById(config.dom.buttonsId);
		if (formNode && appendNode){
			//var outerHtml = formNode.outerHTML;
			appendNode.appendChild(formNode);
		}
	},

	componentDidMount() {
		this._isSaved = false;
		BaseStore.addChangeListener(this._onChange);
		this._preventFormSubmit();
		this._changeAssessmentCollName();
		this._cutDefaultForm();
		this._changeSomeStyles();
	},

	componentWillUnmount() {
		BaseStore.removeChangeListener(this._onChange);
	},

	getInitialState() {
		return getState();
	},

	_onChange() {
		this.setState(getState());
	},

	getView(views, viewName){
		for (var i = views.length - 1; i >= 0; i--) {
			if (views[i].displayName === viewName) {
				var Component = views[i];
				return <Component blocks={this.state.blocks}/>
			}
		};
		return null;
	},

	render() {
		var views = [Assessment, SecondAssessment, ThirdAssessment, FourthAssessment, FifthAssessment, SixthAssessment];
		var viewName = this.state.viewName;
		var style = {
			margin: '20px'
		}
		return (
			<div style={style}>
				{this.getView(views, viewName)}
			</div>
		)
	}
});

module.exports = Base;