var React = require('react');
var ReactDOM = require('react-dom');
var Assessment = require('../components/Assessment');
var AssessmentAPI = require('../api/AssessmentAPI');
var AssessmentActions = require('../actions/AssessmentActions');
var Config = require('../config');

var exp = {

	start: function(paId){
		var app = document.getElementById(Config.dom.appId) || document.body;
		
		return AssessmentAPI.getData(paId).then(function(calendarData){
			AssessmentActions.receiveData(calendarData);
			ReactDOM.render(React.createElement(Assessment), app);
		}.bind(this), function(err){
			console.log(err, err.stack);
		}).catch(function(e){
			console.log(e, e.stack);
		});
	}
}

module.exports = exp;

