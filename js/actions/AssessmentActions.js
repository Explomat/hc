var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');
var AssessmentAPI = require('../api/AssessmentAPI');

var AssessmentActions = {
	
	receiveData: function(data) {
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.RECEIVE_ASSESSMENT_DATA,
			data: data
		});
	},

	createMeeting: function(paId){
		return AssessmentAPI.createMeeting(paId);
	}
}

module.exports = AssessmentActions;