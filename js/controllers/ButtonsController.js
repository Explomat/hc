var React = require('react');
var ReactDOM = require('react-dom');
var Buttons = require('../components/Buttons');
var Config = require('../config');

var exp = {

	start: function(paId){
		var app = document.getElementById(Config.dom.appButtonsId);
		if (app){
			ReactDOM.render(React.createElement(Buttons, {paId: paId}), app);
		}
	}
}

module.exports = exp;

