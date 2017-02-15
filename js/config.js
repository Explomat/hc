var servers = require('./servers');
var routerId = '6251547620930508696';
var customBaseUrl = '/custom_web_template.html';

servers
	.addServer('6366510361821014881')
	.addActions(
		[
			'getData',
			'saveData',
			'logError',
			'createFile',
			'createMeeting'
		]);


module.exports = {

	url: {
		getServerId(_action) {
			var _servers = servers.getAll().filter(function(s){
				var actions = s.getActions().filter(action => {
					return action === _action;
				});
				return actions.length > 0;
			}).map(s => { return s.getId(); });
			return _servers.length > 0 ? _servers[0] : '';
		},

		createPath(obj){
			if (!('action_name' in obj)) obj.action_name = '';
			var serverId = this.getServerId(obj.action_name);
			var basePath = customBaseUrl.concat('?object_id=').concat(routerId).concat('&server_id='.concat(serverId));

			return basePath.concat(Object.keys(obj).map(function(k){
				return '&'.concat(k).concat('=').concat(obj[k]);
			}).join(''));
		}
	},

	dom: {
		appId: 'appId',
		mainZoneId: 'wt-zone-main',
		rightZoneId: 'wt-zone-right',
		leftZoneId: 'wt-zone-left',
		instructionId: 'weblms_assessment-instruction',
		buttonsId: 'wl_assessment_buttons',
		cutFormId: 'workflow_assessment_process',
		infoClass: 'wl_info'
	},

	setCustomBaseUrl(_customBaseUrl){
		customBaseUrl = _customBaseUrl;
	},

	setProductionMode() {
		process.env.NODE_ENV = 'production';
	}
}