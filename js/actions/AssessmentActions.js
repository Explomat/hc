/*var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');*/
var AssessmentAPI = require('../api/AssessmentAPI');

var AssessmentActions = {
	createMeeting: function(paId){
		return AssessmentAPI.createMeeting(paId);
	}
}

module.exports = AssessmentActions;