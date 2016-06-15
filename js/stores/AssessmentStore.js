var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var Assessment = require('../models/Assessment');
var extend = require('extend');

var _assessment = {};

function loadData(data) {
	_assessment = new Assessment(data);
}

var AssessmentStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _assessment;
	},

	getStep: function(){
		return _assessment.step;
	},

	isReady: function(){
		return _assessment.isReady;
	},

	isBoss: function(){
		return _assessment.isBoss;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

AssessmentStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case AssessmentConstants.RECEIVE_ASSESSMENT_DATA:
			loadData(action.data);
			break;
		//---------------------------------------
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
