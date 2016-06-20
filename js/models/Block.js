var Task = require('./Task');
var UUID = require('../utils/UUID');

module.exports = function(args){
	args = args || {};

	this.uuid = UUID.generate();
	this.title = args.title;
	this.tasks = args.tasks || [];
	this.tasks = this.tasks.map(function(t){
		return new Task(t);
	});
}