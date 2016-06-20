var Config = require('../config');
var Ajax = require('../utils/Ajax');
//var Promise = require('es6-promise').Promise;

module.exports = {
	createMeeting: function(paId){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'createMeeting', pa_id: paId}), null, false).then(function(data){
			return JSON.parse(data);
		});
	}
}