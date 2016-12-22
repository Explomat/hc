var React = require('react');
var ReactDOM = require('react-dom');
var Base = require('../components/Base');
var BaseAPI = require('../api/BaseAPI');
var BaseActions = require('../actions/BaseActions');
var Config = require('../config');

var exp = {

	start: function(paId){
		var app = document.getElementById(Config.dom.appId) || document.body;
		
		return BaseAPI.getData(paId).then(function(data){
			BaseActions.receiveData(data);
			ReactDOM.render(React.createElement(Base), app);
		}.bind(this), function(err){
			//BaseAPI.logError(err.message);
			console.log(err, err.stack);
		}).catch(function(e){
			//BaseAPI.logError(e.message);
			console.log(e, e.stack);
		});
	}
}

module.exports = exp;

