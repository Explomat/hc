var UUID = require('../utils/UUID');

module.exports = function(args){
	args = args || {};
	
	this.uuid = UUID.generate();
	this.title = args.title || '';
	this.unit = args.unit || '';
	this.weight = args.weight || '';
	this.min = args.min || '';
	this.targ = args.targ || '';
	this.max = args.max || '';
	this.fact = args.fact || '';
}