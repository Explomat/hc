var Task = require('./Task');
var TaskResult = require('./TaskResult');

module.exports = function(args){
	args = args || {};

	this.title = args.title || '';
	this.tasks = args.tasks || [];
	this.tasks = this.tasks.map(function(t){
		return new Task(t);
	});
	this.tasksResult = new TaskResult(args.tasksResult);
}