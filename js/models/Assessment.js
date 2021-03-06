var Block = require('./Block');

module.exports = function(args){
	args = args || {};

	this.step = args.step || null;
	this.isReady = args.isReady || false;
	this.isBoss = args.isBoss || false;

	this.blocks = args.blocks || [];
	this.blocks = this.blocks.map(function(b){
		return new Block(b);
	});
}