var Task = require('./Task');
var TestInfo = require('./TestInfo');
var MonthBlock = require('./MonthBlock');
var TaskResult = require('./TaskResult');
var UUID = require('../utils/UUID');

module.exports = function(args){
	args = args || {};

	this.uuid = UUID.generate();
	this.title = args.title || '';
	this.tasks = args.tasks || [];
	this.tasks = this.tasks.map(function(t){
		return new Task(t);
	});
	this.tasksResult = new TaskResult(args.tasksResult);
	this.monthData = args.monthData || [];
	this.monthData = this.monthData.map(function(m){
		return new MonthBlock(m);
	})
	this.testInfo = new TestInfo(args.testInfo);
}