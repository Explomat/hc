var React = require('react');
var BaseStore = require('../stores/BaseStore');
var BaseActions = require('../actions/BaseActions');
var Assessment = require('./Assessment');
var SecondAssessment = require('./SecondAssessment');
var ThirdAssessment = require('./ThirdAssessment');
var FourthAssessment = require('./FourthAssessment');
var FifthAssessment = require('./FifthAssessment');
var UrlUtils = require('../utils/url');
var Config = require('../config');

function getState() {
	return BaseStore.getData();
}

var Base = React.createClass({

	_changeZonesStyles(){
		var mainZone = document.getElementById(Config.dom.mainZoneId);
		var rightZone = document.getElementById(Config.dom.rightZoneId);
		mainZone.style.margin = '0px';
		mainZone.style.width = '100%';
		rightZone.style.display = 'none';
	},

	componentDidMount() {
		this._changeZonesStyles();
		BaseStore.addChangeListener(this._onChange);
		var container = document.getElementsByClassName('WTCSS-comp-body')[0];
		var button = container.querySelector('div.ass-button-container > input');
		if (button){
			button.addEventListener('click', function(){
				var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
				BaseActions.saveData(BaseStore.getData(), paId);
			})
		}
		
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