module.exports = function(args){
	args = args || {};

	this.name = args.name || null;
	this.score = args.score || null;
	this.state = args.state || null;
	this.error = args.error || null;
}