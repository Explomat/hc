var Config = require('../config');
var Ajax = require('../utils/Ajax');
//var Promise = require('es6-promise').Promise;

module.exports = {

	getData: function(paId){
		/*return Promise.resolve([
							[
								{title: 'title_1', unit: '%', weight: 1, min: '', targ: 1, max: 3, fact: 2, percentComplete: 30},
								{title: 'title_1', unit: '%', weight: '', min: '', targ: 1, max: 3, fact: 2, percentComplete: 30},
								{title: 'title_1', unit: '%', weight: 4, min: '', targ: 1, max: 3, fact: 2, percentComplete: 30}
							],
							[
								{title: 'title_2', unit: '', weight: 3, min: '', targ: 3, max: 4, fact: 1, percentComplete: 40 }
							]
						])*/
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getData', action: 'getData', pa_id: paId}), null, false).then(function(data){
			return JSON.parse(data, (key, value) => {
				return value === 'true' ? true : value === 'false' ? false : value;
			});
		});
	},

	saveData: function(data, paId){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getData', action: 'saveData', pa_id: paId}), JSON.stringify(data), false, true, null, 'POST');
	},

	logError: function(err){
		Ajax.sendRequest(Config.url.createPath({action_name: 'getData', action: 'logError', error: err}), null, false);
	}
}