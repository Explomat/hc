var React = require('react');
var BaseStore = require('../stores/BaseStore');
var Steps = require('../utils/steps');
var Assessment = require('./Assessment');
var SecondAssessment = require('./SecondAssessment');
var ThirdAssessment = require('./ThirdAssessment');
var FourthAssessment = require('./FourthAssessment');
var FifthAssessment = require('./FifthAssessment');

function getState() {
	return BaseStore.getData();
}

var Base = React.createClass({

	componentDidMount() {
		BaseStore.addChangeListener(this._onChange);
		$('#f_switch').submit(function (evt) {
			if (!BaseStore.isReady() && BaseStore.getStep() === Steps.keys.secondStep){
				alert('Перед проставлением оценок Вам необходимо провести оценочную встречу. Для этого в бланке нажмите "Назначить оценочную встречу"');
				evt.preventDefault();
			}
		});
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
		var views = [Assessment, SecondAssessment, ThirdAssessment, FourthAssessment, FifthAssessment];
		var viewName = this.state.viewName;
		return this.getView(views, viewName);
	}
});

module.exports = Base;