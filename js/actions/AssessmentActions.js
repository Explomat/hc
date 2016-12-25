var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');
var AssessmentAPI = require('../api/AssessmentAPI');

var AssessmentActions = {
	
	createMeeting: function(paId){
		return AssessmentAPI.createMeeting(paId);
	},
	
	createTest: function(paId){
		AssessmentAPI.createTest(paId).then(function(data){
			AppDispatcher.handleAction({
				actionType: AssessmentConstants.CREATE_TEST,
				message: data.message,
				isAssignTest: data.isAssignTest,
				isPassTest: data.isPassTest
			});
		});
	}
}

module.exports = AssessmentActions;