var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BaseConstants = require('../constants/BaseConstants');
var AssessmentConstants = require('../constants/AssessmentConstants');
var Base = require('../models/Base');
var Task = require('../models/Task');
var extend = require('extend');
var find = require('lodash/find');
var assign = require('lodash/assign');

var _base = {};

function _findElem(array, uuid){
	var elem = find(array, function(e){
		return e.uuid == uuid;
	});
	return elem;
}

function loadData(data) {
	_base = new Base(data);
}

function removeTask(blockId, uuid){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		block.tasks = block.tasks.filter(function(t){
			return t.uuid != uuid;
		})
	}
}

function addTask(blockId){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		block.tasks.push(new Task());
	}
}

function changeTitle(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.title = val;
		}
	}
}

function changeUnit(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.unit = val;
		}
	}
}

function changeWeight(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.weight = val;
		}
	}
}

function changeMin(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.min = val;
		}
	}
}

function changeTarg(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.targ = val;
		}
	}
}

function changeMax(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.max = val;
		}
	}
}

function changeFact(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.fact = val;
		}
	}
}

function changeComment(blockId, taskId, val){
	var block = _findElem(_base.blocks, blockId);
	if (block){
		var task = _findElem(block.tasks, taskId)
		if (task){
			task.comment = val;
		}
	}
}

function createTest(message, isAssignTest, isPassTest){
	var block = _base.blocks.length > 0 ? _base.blocks[0] : null;
	if (block){
		block.testInfo = assign(block.testInfo, {
			message: message,
			isAssignTest: isAssignTest,
			isPassTest: isPassTest
		})
	}
}

var BaseStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _base;
	},

	getStep: function(){
		return _base.step;
	},

	isReady: function(){
		return _base.isReady;
	},

	isBoss: function(){
		return _base.isBoss;
	},

	isCollaborator: function(){
		return _base.isCollaborator;
	},
	
	getPreviosAssessment: function(){
		return _base.previosAssessmentResult;
	},
	
	getFirstBlockForSixthAssessment: function(){
		return _base.blocks.length > 0 ? _base.blocks[0] : null;
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

BaseStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case BaseConstants.RECEIVE_DATA:
			loadData(action.data);
			break;
		case BaseConstants.REMOVE_TASK:
			removeTask(action.blockId, action.uuid);
			break;
		case BaseConstants.ADD_TASK:
			addTask(action.blockId);
			break;

		case BaseConstants.CHANGE_TITLE:
			changeTitle(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_UNIT:
			changeUnit(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_WEIGHT:
			changeWeight(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_MIN:
			changeMin(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_TARGET:
			changeTarg(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_MAX:
			changeMax(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_FACT:
			changeFact(action.blockId, action.taskId, action.val);
			break;
		case BaseConstants.CHANGE_COMMENT:
			changeComment(action.blockId, action.taskId, action.val);
			break;
			
		case AssessmentConstants.CREATE_TEST:
			createTest(action.message, action.isAssignTest, action.isPassTest);
			break;
		//---------------------------------------
		default:
			return true;
	}

	BaseStore.emitChange();
	return true;
});

module.exports = BaseStore;
