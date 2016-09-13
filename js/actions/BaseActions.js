var AppDispatcher = require('../dispatcher/AppDispatcher');
var BaseConstants = require('../constants/BaseConstants');
var BaseAPI = require('../api/BaseAPI');

var BaseActions = {
	
	receiveData: function(data) {
		AppDispatcher.handleAction({
			actionType: BaseConstants.RECEIVE_DATA,
			data: data
		});
	},
	saveData: function(data, paId){
		return BaseAPI.saveData(data, paId);
	},
	removeTask: function(blockId, uuid){
		AppDispatcher.handleAction({
			actionType: BaseConstants.REMOVE_TASK,
			blockId: blockId,
			uuid: uuid
		});
	},
	addTask: function(blockId){
		AppDispatcher.handleAction({
			actionType: BaseConstants.ADD_TASK,
			blockId: blockId
		});
	},
	changeTitle: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_TITLE,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeUnit: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_UNIT,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeWeight: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_WEIGHT,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeMin: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_MIN,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeTarg: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_TARGET,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeMax: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_MAX,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeFact: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_FACT,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	},
	changeComment: function(blockId, taskId, val){
		AppDispatcher.handleAction({
			actionType: BaseConstants.CHANGE_COMMENT,
			blockId: blockId,
			taskId: taskId,
			val: val
		});
	}
}

module.exports = BaseActions;