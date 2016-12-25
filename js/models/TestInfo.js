module.exports = function(args){
	args = args || {};

	this.name = args.name || null;
	this.score = args.score || null;
	this.state = args.state || null;
	this.error = args.error || null;
	
	this.message = args.message || null; // сообщение пользователю после назначения теста
	this.isAssignTest = args.isAssignTest || false; //	назначен/не назначен тест для 6 процедуры
	this.isPassTest = args.isPassTest || false;	//	пройден/не пройден тест для 6 процедуры
}